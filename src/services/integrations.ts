export interface IntegrationConfig {
  id: string;
  formId: string;
  type: string;
  enabled: boolean;
  config: any;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionData {
  formId: string;
  submissionId: string;
  timestamp: string;
  data: Record<string, any>;
  metadata?: {
    ip?: string;
    userAgent?: string;
    location?: string;
  };
}

export class IntegrationsService {
  private static getIntegrationKey(formId: string, integrationType: string): string {
    return `integration_${formId}_${integrationType}`;
  }

  static saveIntegration(formId: string, integrationType: string, config: any): void {
    const integrationData: IntegrationConfig = {
      id: `${formId}_${integrationType}`,
      formId,
      type: integrationType,
      enabled: config.enabled || false,
      config,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const key = this.getIntegrationKey(formId, integrationType);
    localStorage.setItem(key, JSON.stringify(integrationData));
    
    // Also save to a global integrations list for monitoring
    this.updateIntegrationsList(integrationData);
  }

  static getIntegration(formId: string, integrationType: string): IntegrationConfig | null {
    const key = this.getIntegrationKey(formId, integrationType);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static getFormIntegrations(formId: string): IntegrationConfig[] {
    const integrations: IntegrationConfig[] = [];
    
    // Check for common integration types
    const types = ['email', 'webhook', 'slack', 'zapier', 'database', 'google-sheets', 'stripe', 'calendar', 'crm', 'cloud-storage', 'analytics'];
    
    types.forEach(type => {
      const integration = this.getIntegration(formId, type);
      if (integration && integration.enabled) {
        integrations.push(integration);
      }
    });

    return integrations;
  }

  static async processSubmission(submissionData: SubmissionData): Promise<void> {
    console.log('Processing submission for integrations:', submissionData);
    
    const integrations = this.getFormIntegrations(submissionData.formId);
    
    if (integrations.length === 0) {
      console.log('No integrations configured for form:', submissionData.formId);
      return;
    }

    for (const integration of integrations) {
      if (!integration.enabled) continue;

      try {
        await this.executeIntegration(integration, submissionData);
        console.log(`Integration ${integration.type} executed successfully`);
        
        // Log success
        this.logIntegrationEvent(integration.id, 'success', submissionData.submissionId);
      } catch (error) {
        console.error(`Integration ${integration.type} failed:`, error);
        
        // Log error
        this.logIntegrationEvent(integration.id, 'error', submissionData.submissionId, error instanceof Error ? error.message : 'Unknown error');
      }
    }
  }

  private static async executeIntegration(integration: IntegrationConfig, submissionData: SubmissionData): Promise<void> {
    switch (integration.type) {
      case 'email':
        await this.executeEmailIntegration(integration.config, submissionData);
        break;
      case 'webhook':
        await this.executeWebhookIntegration(integration.config, submissionData);
        break;
      case 'slack':
        await this.executeSlackIntegration(integration.config, submissionData);
        break;
      case 'zapier':
        await this.executeZapierIntegration(integration.config, submissionData);
        break;
      case 'database':
        await this.executeDatabaseIntegration(integration.config, submissionData);
        break;
      case 'google-sheets':
        await this.executeGoogleSheetsIntegration(integration.config, submissionData);
        break;
      default:
        console.log(`Integration type ${integration.type} not implemented yet`);
    }
  }

  private static async executeEmailIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    // In a real implementation, this would use nodemailer or similar
    console.log('Sending email notification:', {
      to: config.recipients,
      subject: this.processTemplate(config.subject, submissionData),
      body: this.processTemplate(config.template, submissionData)
    });

    // Mock email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private static async executeWebhookIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    const headers: Record<string, string> = {};
    
    config.headers?.forEach((header: any) => {
      if (header.key && header.value) {
        headers[header.key] = header.value;
      }
    });

    if (config.authType === 'bearer' && config.authToken) {
      headers['Authorization'] = `Bearer ${config.authToken}`;
    }

    const payload = this.processTemplate(config.payload, submissionData);

    const response = await fetch(config.url, {
      method: config.method || 'POST',
      headers,
      body: payload
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private static async executeSlackIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    const message = this.processTemplate(config.template, submissionData);

    const payload = {
      channel: config.channel,
      username: config.username,
      icon_emoji: config.emoji,
      text: message
    };

    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
  }

  private static async executeZapierIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook error: ${response.statusText}`);
    }
  }

  private static async executeDatabaseIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    // In a real implementation, this would connect to the actual database
    console.log('Saving to database:', {
      table: config.tableName,
      data: submissionData
    });
    
    // Mock database save
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  private static async executeGoogleSheetsIntegration(config: any, submissionData: SubmissionData): Promise<void> {
    // In a real implementation, this would use Google Sheets API
    console.log('Saving to Google Sheets:', {
      spreadsheetId: config.spreadsheetId,
      worksheet: config.worksheetName,
      data: submissionData
    });
    
    // Mock Google Sheets save
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  private static processTemplate(template: string, submissionData: SubmissionData): string {
    let processed = template || '';
    
    // Replace submission data placeholders
    Object.keys(submissionData.data).forEach(key => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(placeholder, String(submissionData.data[key] || ''));
    });

    // Replace system placeholders
    processed = processed
      .replace(/{{formId}}/g, submissionData.formId)
      .replace(/{{submissionId}}/g, submissionData.submissionId)
      .replace(/{{timestamp}}/g, submissionData.timestamp)
      .replace(/{{submissionData}}/g, JSON.stringify(submissionData.data, null, 2))
      .replace(/{{formName}}/g, 'Form') // This would come from form data in real implementation
      .replace(/{{date}}/g, new Date().toLocaleDateString())
      .replace(/{{time}}/g, new Date().toLocaleTimeString());

    return processed;
  }

  private static updateIntegrationsList(integration: IntegrationConfig): void {
    const allIntegrations = this.getAllIntegrations();
    const existingIndex = allIntegrations.findIndex(i => i.id === integration.id);
    
    if (existingIndex >= 0) {
      allIntegrations[existingIndex] = integration;
    } else {
      allIntegrations.push(integration);
    }
    
    localStorage.setItem('all_integrations', JSON.stringify(allIntegrations));
  }

  static getAllIntegrations(): IntegrationConfig[] {
    const data = localStorage.getItem('all_integrations');
    return data ? JSON.parse(data) : [];
  }

  private static logIntegrationEvent(integrationId: string, type: 'success' | 'error', submissionId: string, error?: string): void {
    const events = this.getIntegrationEvents(integrationId);
    const event = {
      id: Date.now().toString(),
      integrationId,
      type,
      submissionId,
      timestamp: new Date().toISOString(),
      error
    };
    
    events.unshift(event); // Add to beginning
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(100);
    }
    
    localStorage.setItem(`integration_events_${integrationId}`, JSON.stringify(events));
  }

  static getIntegrationEvents(integrationId: string): any[] {
    const data = localStorage.getItem(`integration_events_${integrationId}`);
    return data ? JSON.parse(data) : [];
  }

  static getIntegrationStats(integrationId: string): { total: number; success: number; error: number; successRate: number } {
    const events = this.getIntegrationEvents(integrationId);
    const total = events.length;
    const success = events.filter(e => e.type === 'success').length;
    const error = events.filter(e => e.type === 'error').length;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
    
    return { total, success, error, successRate };
  }

  static deleteIntegration(formId: string, integrationType: string): void {
    const key = this.getIntegrationKey(formId, integrationType);
    localStorage.removeItem(key);
    
    // Remove from global list
    const allIntegrations = this.getAllIntegrations();
    const filtered = allIntegrations.filter(i => !(i.formId === formId && i.type === integrationType));
    localStorage.setItem('all_integrations', JSON.stringify(filtered));
  }
}

// Hook this into form submissions
export const triggerIntegrations = async (formId: string, submissionData: Record<string, any>) => {
  const submissionPayload: SubmissionData = {
    formId,
    submissionId: `sub_${Date.now()}`,
    timestamp: new Date().toISOString(),
    data: submissionData,
    metadata: {
      ip: 'unknown',
      userAgent: navigator.userAgent
    }
  };

  try {
    await IntegrationsService.processSubmission(submissionPayload);
  } catch (error) {
    console.error('Error processing integrations:', error);
  }
};
