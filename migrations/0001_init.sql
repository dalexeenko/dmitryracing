-- Edge data: newsletter, open-date notifications, track calendar events
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS date_notify_interests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  track_slug TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO events (id, title, event_date, track_slug) VALUES
  ('seed-portimao-2026-09', 'Algarve Racing School — September weekend', '2026-09-12', 'portimao'),
  ('seed-estoril-2026-10', 'Estoril evening track session', '2026-10-03', 'estoril'),
  ('seed-pacific-2026-06', 'Pacific Raceways — DE weekend', '2026-06-21', 'pacific');
