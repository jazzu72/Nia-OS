export async function createDeal(input) {
  const id = crypto.randomUUID();

  const [row] = await db.insert(properties).values({
    id,
    address: input.address,
    arv: input.arv,
    askingPrice: input.askingPrice,
    estimatedRepairs: input.estimatedRepairs,
    source: input.source
  }).returning();

  return {
    id: row.id,
    address: row.address,
    arv: Number(row.arv),
    askingPrice: Number(row.askingPrice),
    estimatedRepairs: Number(row.estimatedRepairs),
    createdAt: row.createdAt
  };
}
