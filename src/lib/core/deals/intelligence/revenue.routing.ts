import {
  assignmentFees,
  dealClosings,
  revenueEvents
} from "../../../../drizzle/schema";
import { distributeRevenue } from "$lib/core/revenue/distribute";

export async function closeDealAndRouteRevenue(params: {
  dealId: string;
  assignmentFee: number;
}): Promise<AssignmentResult> {
  return db.transaction(async (tx) => {
    const { dealId, assignmentFee } = params;

    // 1. record assignment fee
    const [fee] = await tx
      .insert(assignmentFees)
      .values({
        dealId,
        amount: assignmentFee
      })
      .returning();

    // 2. record closing
    await tx.insert(dealClosings).values({
      dealId,
      assignmentFeeId: fee.id
    });

    // 3. create revenue event
    const [rev] = await tx
      .insert(revenueEvents)
      .values({
        amount: assignmentFee,
        metadata: JSON.stringify({
          type: "assignment_fee",
          dealId
        })
      })
      .returning();

    // 4. route revenue through existing engine
    const { journalId } = await distributeRevenue({
      amount: assignmentFee,
      allocations: {
        founder: assignmentFee * 0.4,
        treasury: assignmentFee * 0.4,
        trust: assignmentFee * 0.1,
        growth: assignmentFee * 0.1
      },
      tx // pass transaction‑scoped db if your implementation supports it
    });

    return {
      dealId,
      assignmentFee,
      revenueEventId: rev.id,
      journalId
    };
  });
}
