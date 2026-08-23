import BetterSqlite3 from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { seed } from "./seed";

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  location: string;
  now_statement: string;
  initials: string;
}

export interface Social {
  label: string;
  url: string;
}

export interface Experience {
  dates: string;
  role: string;
  company: string;
  description: string;
}

export interface SkillGroup {
  label: string;
  items: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string;
  url: string;
}

export interface Education {
  institution: string;
  credential: string;
  years: string;
}

export interface Writing {
  title: string;
  url: string;
  published: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  now_statement TEXT NOT NULL,
  initials TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS socials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dates TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS skill_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  items TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  stack TEXT NOT NULL,
  url TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution TEXT NOT NULL,
  credential TEXT NOT NULL,
  years TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS writing (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  published TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT NOT NULL,
  attribution TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);
`;

// One connection per process, surviving Next.js dev-server HMR reloads.
const globalForDb = globalThis as unknown as {
  _resumeDb?: BetterSqlite3.Database;
};

function open(): BetterSqlite3.Database {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const db = new BetterSqlite3(path.join(dir, "resume.db"));
  db.pragma("journal_mode = WAL");
  db.exec(SCHEMA);
  const { n } = db.prepare("SELECT COUNT(*) AS n FROM profile").get() as {
    n: number;
  };
  if (n === 0) seed(db);
  return db;
}

const db = (globalForDb._resumeDb ??= open());

export function getProfile(): Profile {
  return db.prepare("SELECT * FROM profile WHERE id = 1").get() as Profile;
}

export function getSocials(): Social[] {
  return db.prepare("SELECT * FROM socials ORDER BY sort").all() as Social[];
}

export function getExperience(): Experience[] {
  return db
    .prepare("SELECT * FROM experience ORDER BY sort")
    .all() as Experience[];
}

export function getSkillGroups(): SkillGroup[] {
  return db
    .prepare("SELECT * FROM skill_groups ORDER BY sort")
    .all() as SkillGroup[];
}

export function getProjects(): Project[] {
  return db.prepare("SELECT * FROM projects ORDER BY sort").all() as Project[];
}

export function getEducation(): Education[] {
  return db
    .prepare("SELECT * FROM education ORDER BY sort")
    .all() as Education[];
}

export function getWriting(): Writing[] {
  return db.prepare("SELECT * FROM writing ORDER BY sort").all() as Writing[];
}

export function getTestimonials(): Testimonial[] {
  return db
    .prepare("SELECT * FROM testimonials ORDER BY sort")
    .all() as Testimonial[];
}
