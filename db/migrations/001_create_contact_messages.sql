-- Migration 001: Create contact_messages table
-- Run this in your Supabase SQL editor:
-- https://supabase.com/dashboard/project/_/sql
--
-- Safe to run multiple times (uses IF NOT EXISTS / IF NOT VALID).

-- ── Table ────────────────────────────────────────────────────────────────────

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

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
  ON contact_messages (status);

-- ── Row-Level Security ───────────────────────────────────────────────────────

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Service role can insert (used by the API route handler)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'contact_messages' AND policyname = 'service_role_insert'
  ) THEN
    CREATE POLICY "service_role_insert" ON contact_messages
      FOR INSERT TO service_role WITH CHECK (true);
  END IF;
END $$;

-- Service role can select (for future admin use)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'contact_messages' AND policyname = 'service_role_select'
  ) THEN
    CREATE POLICY "service_role_select" ON contact_messages
      FOR SELECT TO service_role USING (true);
  END IF;
END $$;
