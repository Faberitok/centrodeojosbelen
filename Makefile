# Makefile — Landing Page
# Usage:  make <target>
# Requires: Node.js 20+, npm, Docker, GNU make
#
# On Windows install GNU make via:
#   winget install GnuWin32.Make   (then add C:\Program Files (x86)\GnuWin32\bin to PATH)
#   or:  choco install make

.PHONY: help install env setup dev build start lint \
        db-up db-down db-reset db-migrate db-logs db-psql

# ─── Default ─────────────────────────────────────────────────────────────────

help:
	@echo ""
	@echo "  Landing Page — Available Commands"
	@echo "  ==================================="
	@echo ""
	@echo "  First-time setup"
	@echo "    make setup         install + copy .env.local + start DB container"
	@echo "    make install       npm install only"
	@echo "    make env           copy .env.example -> .env.local (skips if exists)"
	@echo ""
	@echo "  Development"
	@echo "    make dev           start dev server at http://localhost:3000"
	@echo "    make build         production build"
	@echo "    make start         start production server (run build first)"
	@echo "    make lint          run ESLint"
	@echo ""
	@echo "  Database (local Docker)"
	@echo "    make db-up         start PostgreSQL container"
	@echo "    make db-down       stop PostgreSQL container"
	@echo "    make db-logs       tail container logs"
	@echo "    make db-psql       open psql shell inside container"
	@echo "    make db-reset      drop + recreate schema (DESTRUCTIVE)"
	@echo "    make db-migrate    show production Supabase migration SQL"
	@echo ""

# ─── Setup ───────────────────────────────────────────────────────────────────

install:
	npm install

env:
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "✓ .env.local created — DATABASE_URL already set for local Docker DB"; \
	else \
		echo ".env.local already exists — skipped"; \
	fi

setup: install env db-up
	@echo ""
	@echo "✓ Setup complete."
	@echo "  DB is running at localhost:5433 (postgres/postgres/landing)"
	@echo "  Run: make dev"

# ─── Development ─────────────────────────────────────────────────────────────

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

# ─── Database (local Docker) ──────────────────────────────────────────────────

db-up:
	@echo "Starting PostgreSQL container..."
	docker compose up -d --wait db
	@echo "✓ DB ready at localhost:5433 (user: postgres, pass: postgres, db: landing)"

db-down:
	docker compose down

db-logs:
	docker compose logs -f db

db-psql:
	docker compose exec db psql -U postgres -d landing

db-reset:
	@echo "WARNING: Dropping and recreating contact_messages..."
	docker compose exec db psql -U postgres -d landing \
	  -c "DROP TABLE IF EXISTS contact_messages CASCADE;"
	docker compose exec db psql -U postgres -d landing \
	  -f /docker-entrypoint-initdb.d/001_schema.sql
	@echo "✓ Schema recreated"

# ─── Database (Supabase production migration) ─────────────────────────────────

db-migrate:
	@echo ""
	@echo "Run this file in the Supabase SQL editor:"
	@echo "  db/migrations/001_create_contact_messages.sql"
	@echo ""
	@echo "Dashboard: https://supabase.com/dashboard/project/_/sql"
	@echo ""
	@cat db/migrations/001_create_contact_messages.sql
