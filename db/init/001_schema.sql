-- Auto-runs on first container startup (docker-entrypoint-initdb.d)
-- Equivalent to: db/migrations/001_create_contact_messages.sql

CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email      TEXT        NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone      TEXT        CHECK (phone IS NULL OR char_length(phone) <= 50),
  company    TEXT        CHECK (company IS NULL OR char_length(company) <= 200),
  message    TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 10000),
  source     TEXT        NOT NULL DEFAULT 'landing',
  status     TEXT        NOT NULL DEFAULT 'new'
                         CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata   JSONB
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
  ON contact_messages (status);
