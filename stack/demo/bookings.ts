export const demos = pgTable("demos", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id),
  scheduledFor: timestamp("scheduled_for"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow()
});
