
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

  const saveIntegration = useCallback((formId: string, integrationType: string, config: any) => {
    try {
      IntegrationsService.saveIntegration(formId, integrationType, config);
      toast({
        title: "Integration Saved",
        description: `${integrationType} integration has been configured successfully.`
      });
      return true;
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save integration configuration.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const deleteIntegration = useCallback((formId: string, integrationType: string) => {
    try {
      IntegrationsService.deleteIntegration(formId, integrationType);
      toast({
        title: "Integration Deleted",
        description: `${integrationType} integration has been removed.`
      });
      return true;
    } catch (error) {
      console.error('Error deleting integration:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete integration.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const testIntegration = useCallback(async (formId: string, integrationType: string) => {
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test submission to verify the integration is working correctly.',
        timestamp: new Date().toISOString()
      };

      await triggerIntegrations(formId, testData);
      
      toast({
        title: "Test Successful",
        description: `${integrationType} integration test completed successfully.`
      });
      return true;
    } catch (error) {
      console.error('Error testing integration:', error);
      toast({
        title: "Test Failed",
        description: "Integration test failed. Please check your configuration.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const getFormIntegrations = useCallback((formId: string) => {
    return IntegrationsService.getFormIntegrations(formId);
  }, []);

  const getIntegrationConfig = useCallback((formId: string, integrationType: string) => {
    return IntegrationsService.getIntegration(formId, integrationType);
  }, []);

  const getAllIntegrations = useCallback(() => {
    return IntegrationsService.getAllIntegrations();
  }, []);

  const getIntegrationStats = useCallback((integrationId: string) => {
    return IntegrationsService.getIntegrationStats(integrationId);
  }, []);

  return {
    processFormSubmission,
    saveIntegration,
    deleteIntegration,
    testIntegration,
    getFormIntegrations,
    getIntegrationConfig,
    getAllIntegrations,
    getIntegrationStats
  };
};
