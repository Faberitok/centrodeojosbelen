export interface EmailPayload {
  to: string
  subject: string
  html: string
}

export interface EmailAdapter {
  send(payload: EmailPayload): Promise<void>
}
