export interface EmailPayload {
  to: string
  subject: string
  html: string
  /** Para que el centro pueda responderle al paciente directo desde su casilla. */
  replyTo?: string
}

export interface EmailAdapter {
  send(payload: EmailPayload): Promise<void>
}
