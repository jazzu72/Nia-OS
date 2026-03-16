import { json } from "@sveltejs/kit";
import { db } from "$lib/db/client";
import { revenueEvents } from "../../../../../drizzle/schema";

export async function GET() {
  const rows = await db.select().from(revenueEvents).orderBy(revenueEvents.createdAt);
  return json(rows);
}
