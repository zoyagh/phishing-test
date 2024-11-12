import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: process.env.NODEMAILER_HOST,
      port: +process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }


  async sendPhishingEmail(to: string, emailContent: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'Security Team <noreply@company.com>',
        to,
        subject: 'Security Awareness Test',
        html: emailContent,
      });
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`, error.stack);
      throw new Error('Failed to send email');
    }
  }
}
