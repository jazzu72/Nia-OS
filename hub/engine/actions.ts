export async function executeAction(intent) {
  if (intent.type === "transfer") {
    await fetch("/api/transfer", {
      method: "POST",
      body: JSON.stringify({
        from: intent.from,
        to: intent.to,
        amount: intent.amount
      })
    });

    return { reply: `Transfer complete. $${intent.amount} moved to Treasury.` };
  }

  if (intent.type === "summary") {
    const res = await fetch("/api/summary");
    const data = await res.json();
    return { reply: `Current system summary: ${JSON.stringify(data)}` };
  }

  if (intent.type === "automation_query") {
    return { reply: "Automation engine is active. What rule would you like to create?" };
  }

  return { reply: "Understood." };
}
