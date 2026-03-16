import { db } from "$lib/db/client";
import { revenueEvents, wallets, journalEntries, ledgerLines } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function distributeRevenue({ amount, allocations }) {
  return db.transaction(async (tx) => {

    // 1. Record the revenue event
    const [rev] = await tx.insert(revenueEvents)
      .values({
        amount,
        metadata: JSON.stringify(allocations)
      })
      .returning();

    // 2. Create a journal entry
    const [journal] = await tx.insert(journalEntries)
      .values({
        description: "revenue_distribution"
      })
      .returning();

    const journalId = journal.id;

    // 3. Credit the revenue wallet
    const [revenueWallet] = await tx.select()
      .from(wallets)
      .where(eq(wallets.walletType, "revenue"));

    await tx.insert(ledgerLines).values({
      journalId,
      accountId: revenueWallet.id,
      debit: 0,
      credit: amount
    });

    // 4. Debit each allocation wallet
    for (const [walletType, value] of Object.entries(allocations)) {
      const [target] = await tx.select()
        .from(wallets)
        .where(eq(wallets.walletType, walletType));

      await tx.insert(ledgerLines).values({
        journalId,
        accountId: target.id,
        debit: value,
        credit: 0
      });

      // 5. Update wallet balances
      await tx.update(wallets)
        .set({
          balance: (Number(target.balance) + Number(value)).toString()
        })
        .where(eq(wallets.id, target.id));
    }

    return {
      status: "ok",
      revenueEventId: rev.id,
      journalId
    };
  });
}
