export const outreachEvents = pgTable("outreach_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id),
  channel: text("channel"),
  message: text("message"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow()
});
