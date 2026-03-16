export async function interpret(text: string) {
  text = text.toLowerCase();

  if (text.includes("transfer")) {
    return {
      type: "transfer",
      from: "founder_wallet",
      to: "treasury_wallet",
      amount: extractAmount(text)
    };
  }

  if (text.includes("automation") || text.includes("rule")) {
    return {
      type: "automation_query"
    };
  }

  if (text.includes("summary") || text.includes("balance")) {
    return { type: "summary" };
  }

  return { type: "chat", text };
}

function extractAmount(text: string) {
  const match = text.match(/\$?(\d+)/);
  return match ? Number(match[1]) : 0;
}
