export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clientProfiles.id),
  name: text("name"),
  email: text("email"),
  company: text("company"),
  source: text("source"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow()
});
