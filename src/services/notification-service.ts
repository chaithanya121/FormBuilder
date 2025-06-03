
import { NotificationRule, FormSubmission } from '@/types/enhanced-form';

export class NotificationService {
  static async sendNotification(
    rule: NotificationRule,
    submission: FormSubmission,
    template: string
  ): Promise<void> {
    console.log('Sending notification:', rule.name);

    const processedTemplate = this.processTemplate(template, submission);

    for (const channel of rule.channels) {
      switch (channel) {
        case 'email':
          await this.sendEmail(rule.recipients, processedTemplate);
          break;
        case 'sms':
          await this.sendSMS(rule.recipients, processedTemplate);
          break;
        case 'webhook':
          await this.sendWebhook(processedTemplate, submission);
          break;
      }
    }
  }

  static checkConditions(rule: NotificationRule, submission: FormSubmission): boolean {
    if (!rule.conditions || rule.conditions.length === 0) return true;

    return rule.conditions.every(condition => {
      const fieldValue = submission.data[condition.field];
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value;
        case 'contains':
          return String(fieldValue).includes(String(condition.value));
        case 'greater':
          return parseFloat(fieldValue) > parseFloat(condition.value);
        case 'less':
          return parseFloat(fieldValue) < parseFloat(condition.value);
        default:
          return false;
      }
    });
  }

  private static processTemplate(template: string, submission: FormSubmission): string {
    let processed = template;
    
    // Replace placeholders with actual data
    Object.keys(submission.data).forEach(key => {
      processed = processed.replace(
        new RegExp(`{{${key}}}`, 'g'),
        String(submission.data[key])
      );
    });

    // Add system variables
    processed = processed
      .replace(/{{timestamp}}/g, submission.timestamp)
      .replace(/{{submissionId}}/g, submission.id)
      .replace(/{{status}}/g, submission.status);

    return processed;
  }

  private static async sendEmail(recipients: string[], content: string): Promise<void> {
    // Mock email sending - would integrate with real email service
    console.log('Email sent to:', recipients, 'Content:', content);
  }

  private static async sendSMS(recipients: string[], content: string): Promise<void> {
    // Mock SMS sending - would integrate with real SMS service
    console.log('SMS sent to:', recipients, 'Content:', content);
  }

  private static async sendWebhook(content: string, submission: FormSubmission): Promise<void> {
    // Mock webhook sending
    console.log('Webhook sent:', { content, submission });
  }
}
