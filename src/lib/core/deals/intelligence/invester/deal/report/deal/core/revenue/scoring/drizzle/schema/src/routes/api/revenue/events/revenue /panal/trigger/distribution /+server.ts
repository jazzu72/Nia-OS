import { json } from "@sveltejs/kit";
import { distributeRevenue } from "$lib/core/revenue/distribute";

export async function POST({ request }) {
  const body = await request.json();
  const result = await distributeRevenue(body);
  return json(result);
}
