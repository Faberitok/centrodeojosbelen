# Makefile — Centro de Ojos Belén
# Uso:  make <target>
# Requiere: Node.js 20+, npm, GNU make
#
# En Windows, instalar GNU make con:
#   winget install GnuWin32.Make   (y agregar C:\Program Files (x86)\GnuWin32\bin al PATH)
#   o:  choco install make

.PHONY: help install env setup dev build start lint

help:
	@echo ""
	@echo "  Centro de Ojos Belen — Comandos disponibles"
	@echo "  ==========================================="
	@echo ""
	@echo "  Primera vez"
	@echo "    make setup         install + copia .env.local"
	@echo "    make install       solo npm install"
	@echo "    make env           copia .env.example -> .env.local (no pisa si existe)"
	@echo ""
	@echo "  Desarrollo"
	@echo "    make dev           servidor de desarrollo en http://localhost:3000"
	@echo "    make build         build de produccion"
	@echo "    make start         servidor de produccion (correr build antes)"
	@echo "    make lint          ESLint"
	@echo ""

install:
	npm install

env:
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "✓ .env.local creado — completá RESEND_API_KEY y NEXT_PUBLIC_WHATSAPP_NUMBER"; \
	else \
		echo ".env.local ya existe — omitido"; \
	fi

setup: install env
	@echo ""
	@echo "✓ Setup completo. Corré: make dev"

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint
