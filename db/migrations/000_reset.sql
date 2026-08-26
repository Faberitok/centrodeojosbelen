-- Reset: drops the contact_messages table and all its indexes/policies.
-- WARNING: This destroys all stored leads. Only use in development.
--
-- After running this, apply the migration again:
--   db/migrations/001_create_contact_messages.sql

DROP TABLE IF EXISTS contact_messages CASCADE;
