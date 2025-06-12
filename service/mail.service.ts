import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

type EmailOptions = {
  to: string;
  subject: string;
  templateName: string;
  data?: Record<string, string>;
  text?: string;
};

export class EmailService {
  private transporter: nodemailer.Transporter;
  private templatesDir: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.templatesDir = path.join(__dirname,'../mails/');
  }

  setTemplatesDir(dirPath: string): void {
    this.templatesDir = dirPath;
  }

  private renderTemplate(templateName: string, data: Record<string, string> = {}): string {
    try {
      const templatePath = path.join(this.templatesDir, templateName);
      let html = fs.readFileSync(templatePath, 'utf8');

      for (const [key, value] of Object.entries(data)) {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }

      return html;
    } catch (error) {
      throw new Error(`Failed to render template: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async sendMail(options: EmailOptions): Promise<nodemailer.SentMessageInfo> {
    try {
      const html = this.renderTemplate(options.templateName, options.data);

      const mailOptions: nodemailer.SendMailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'No Reply'}" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html,
        text: options.text || 'Please enable HTML to view this email',
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${options.to}: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
}