export const proposals = pgTable("proposals", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id),
  content: text("content"),
  amount: numeric("amount"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow()
});
