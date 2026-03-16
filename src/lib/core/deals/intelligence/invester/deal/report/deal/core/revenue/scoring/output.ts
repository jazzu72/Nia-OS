export const leadScores = pgTable("lead_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id),
  score: numeric("score"),
  reasoning: text("reasoning"),
  createdAt: timestamp("created_at").defaultNow()
});
