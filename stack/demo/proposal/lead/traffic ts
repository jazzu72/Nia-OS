export const trafficEvents = pgTable("traffic_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clientProfiles.id),
  source: text("source"),
  url: text("url"),
  timestamp: timestamp("timestamp").defaultNow()
});
