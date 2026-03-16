import { dealReports } from "../../../../drizzle/schema";

export async function generateDealReport(deal: Deal): Promise<DealReport> {
  const spread = deal.arv - deal.askingPrice - deal.estimatedRepairs;
  const totalCost = deal.askingPrice + deal.estimatedRepairs;
  const roi = totalCost > 0 ? spread / totalCost : 0;

  // simple scoring heuristic – can be replaced by AI later
  const score = Math.max(
    0,
    Math.min(100, Math.round(roi * 100 + (spread > 0 ? 20 : -20)))
  );

  const exitStrategy: DealReport["exitStrategy"] =
    roi > 0.35 ? "flip" : roi > 0.15 ? "wholesale" : "rental";

  const [row] = await db
    .insert(dealReports)
    .values({
      dealId: deal.id,
      spread,
      roi,
      score,
      exitStrategy
    })
    .returning();

  return {
    id: row.id,
    dealId: row.dealId,
    spread: Number(row.spread),
    roi: Number(row.roi),
    score: Number(row.score),
    exitStrategy: row.exitStrategy
  };
}
