
import { FormElement } from '../components/FormBuilder/types';

export interface CalculationField {
  id: string;
  name: string;
  formula: string;
  type: 'sum' | 'average' | 'count' | 'custom';
  dependentFields: string[];
  displayFormat?: 'currency' | 'percentage' | 'decimal' | 'integer';
}

export interface NotificationRule {
  id: string;
  name: string;
  trigger: 'submission' | 'condition' | 'schedule';
  conditions?: {
    field: string;
    operator: 'equals' | 'contains' | 'greater' | 'less';
    value: any;
  }[];
  channels: ('email' | 'sms' | 'webhook')[];
  template: string;
  recipients: string[];
  enabled: boolean;
}

export interface EnhancedFormConfig {
  id: string;
  name: string;
  elements: FormElement[];
  calculations: CalculationField[];
  notifications: NotificationRule[];
  integrations: {
    api: boolean;
    cloudStorage: ('google-drive' | 'dropbox' | 'onedrive')[];
    database: boolean;
    realTimeTracking: boolean;
  };
  accessibility: {
    screenReader: boolean;
    wcagCompliant: boolean;
    highContrast: boolean;
  };
  collaboration: {
    comments: boolean;
    assignments: boolean;
    workflow: boolean;
  };
  mobileLayout: {
    responsive: boolean;
    customBreakpoints: Record<string, number>;
    mobileSpecificElements: string[];
  };
  settings: any;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  calculatedValues: Record<string, number>;
  timestamp: string;
  status: 'pending' | 'processed' | 'approved' | 'rejected';
  assignee?: string;
  comments: Comment[];
  metadata: {
    ip: string;
    userAgent: string;
    location?: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'approval' | 'rejection';
}

export interface ReportConfig {
  id: string;
  name: string;
  formId: string;
  filters: any[];
  groupBy: string[];
  aggregations: any[];
  visualization: 'table' | 'chart' | 'graph';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
}
