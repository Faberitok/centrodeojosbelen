import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'

export interface ContactMessageInsert {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message: string
  source?: string
}

export interface ContactMessage extends ContactMessageInsert {
  id: string
  status: string
  created_at: string
  metadata?: Record<string, unknown> | null
}

// ─── Local dev: plain PostgreSQL via DATABASE_URL ─────────────────────────────

let _pool: Pool | null = null

function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL })
  }
  return _pool
}

async function insertViaPg(data: ContactMessageInsert): Promise<ContactMessage> {
  const payload = { ...data, source: data.source ?? 'landing' }
  const { rows } = await getPool().query<ContactMessage>(
    `INSERT INTO contact_messages (name, email, phone, company, message, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [payload.name, payload.email, payload.phone ?? null, payload.company ?? null, payload.message, payload.source]
  )
  return rows[0]
}

// ─── Production: Supabase ─────────────────────────────────────────────────────

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Missing DB configuration: set DATABASE_URL (local) or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (production)'
    )
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

async function insertViaSupabase(data: ContactMessageInsert): Promise<ContactMessage> {
  const supabase = getSupabaseAdmin()
  const { data: row, error } = await supabase
    .from('contact_messages')
    .insert({ ...data, source: data.source ?? 'landing' })
    .select()
    .single()

  if (error) throw error
  return row as ContactMessage
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function insertContactMessage(
  data: ContactMessageInsert
): Promise<ContactMessage> {
  if (process.env.DATABASE_URL) {
    return insertViaPg(data)
  }
  return insertViaSupabase(data)
}
