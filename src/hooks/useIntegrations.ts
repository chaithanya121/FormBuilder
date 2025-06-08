
import { useCallback } from 'react';
import { IntegrationsService, triggerIntegrations } from '@/services/integrations';
import { useToast } from '@/hooks/use-toast';

export const useIntegrations = () => {
  const { toast } = useToast();

  const processFormSubmission = useCallback(async (formId: string, submissionData: Record<string, any>) => {
    try {
      console.log('Processing form submission for integrations:', { formId, submissionData });
      
      // Get all configured integrations for this form
      const integrations = IntegrationsService.getFormIntegrations(formId);
      
      if (integrations.length === 0) {
        console.log('No integrations configured for form:', formId);
        return;
      }

      console.log(`Found ${integrations.length} configured integrations for form ${formId}`);
      
      // Trigger all integrations
      await triggerIntegrations(formId, submissionData);
      
      toast({
        title: "Integrations Processed",
        description: `${integrations.length} integration(s) processed successfully.`
      });
      
    } catch (error) {
      console.error('Error processing integrations:', error);
      toast({
        title: "Integration Error",
        description: "Some integrations failed to process. Please check your configuration.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const getFormIntegrations = useCallback((formId: string) => {
    return IntegrationsService.getFormIntegrations(formId);
  }, []);

  const getIntegrationConfig = useCallback((formId: string, integrationType: string) => {
    return IntegrationsService.getIntegration(formId, integrationType);
  }, []);

  return {
    processFormSubmission,
    getFormIntegrations,
    getIntegrationConfig
  };
};
