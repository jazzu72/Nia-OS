export async function generateDealReport(deal) {
  const spread = deal.arv - deal.askingPrice - deal.estimatedRepairs;
  const totalCost = deal.askingPrice + deal.estimatedRepairs;
  const roi = totalCost > 0 ? spread / totalCost : 0;

  const score = Math.max(0, Math.min(100, Math.round(roi * 100 + (spread > 0 ? 20 : -20))));
  const exitStrategy = roi > 0.35 ? "flip" : roi > 0.15 ? "wholesale" : "rental";

  const [row] = await db.insert(dealReports).values({
    dealId: deal.id,
    spread,
    roi,
    score,
    exitStrategy
  }).returning();

  return {
    id: row.id,
    dealId: row.dealId,
    spread: Number(row.spread),
    roi: Number(row.roi),
    score: Number(row.score),
    exitStrategy: row.exitStrategy
  };
}
