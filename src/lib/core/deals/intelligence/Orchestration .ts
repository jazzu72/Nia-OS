export async function processDeal(input: DealInput) {
  const deal = await createDeal(input);
  const report = await generateDealReport(deal);
  const { notified } = await notifyInvestors(report);

  return {
    deal,
    report,
    investorsNotified: notified
  };
}
