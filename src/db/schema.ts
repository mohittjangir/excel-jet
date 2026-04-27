import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(), // Clerk ID
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  rawVideoUrl: text("raw_video_url"),
  status: varchar("status").default("pending").notNull(), // pending, transcribing, clipping, completed, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ownerId: varchar("owner_id").references(() => users.id).notNull(),
});

export const clips = pgTable("clips", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  title: text("title").notNull(),
  startTime: integer("start_time").notNull(), // in seconds
  endTime: integer("end_time").notNull(),
  clipUrl: text("clip_url"),
  caption: text("caption"),
  hook: text("hook"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
