import { db } from "$lib/db/client";
import { properties } from "../../../../drizzle/schema";
import { randomUUID } from "crypto";

export async function createDeal(input: DealInput): Promise<Deal> {
  const id = randomUUID();

  const [row] = await db
    .insert(properties)
    .values({
      id,
      address: input.address,
      arv: input.arv,
      askingPrice: input.askingPrice,
      estimatedRepairs: input.estimatedRepairs,
      source: input.source
    })
    .returning();

  return {
    id: row.id,
    address: row.address,
    arv: Number(row.arv),
    askingPrice: Number(row.askingPrice),
    estimatedRepairs: Number(row.estimatedRepairs),
    createdAt: row.createdAt
  };
}
