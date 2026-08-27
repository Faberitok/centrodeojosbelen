import { Resend } from 'resend'
import type { EmailAdapter, EmailPayload } from './adapter'

export class ResendAdapter implements EmailAdapter {
  private client: Resend
  private fromEmail: string

  constructor() {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('Falta la variable de entorno RESEND_API_KEY')
    this.client = new Resend(apiKey)
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  }

  async send(payload: EmailPayload): Promise<void> {
    const { error } = await this.client.emails.send({
      from: this.fromEmail,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
    })
    if (error) throw new Error(error.message)
  }
}

export function createEmailAdapter(): EmailAdapter {
  return new ResendAdapter()
}
