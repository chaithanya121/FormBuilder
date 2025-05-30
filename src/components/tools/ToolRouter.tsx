
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AIFormGenerator } from './ai/AIFormGenerator';
import { SmartSuggestions } from './ai/SmartSuggestions';
import { AutoComplete } from './ai/AutoComplete';
import { TemplatesGallery } from './design/TemplatesGallery';
import { ThemeStudio } from './design/ThemeStudio';
import { StyleEditor } from './design/StyleEditor';
import { AdvancedAnalytics } from './analytics/AdvancedAnalytics';
import { RealtimeDashboard } from './analytics/RealtimeDashboard';
import { CustomReports } from './analytics/CustomReports';
import { TeamManagement } from './collaboration/TeamManagement';
import { WorkflowBuilder } from './collaboration/WorkflowBuilder';
import { CommentsSystem } from './collaboration/CommentsSystem';

const ToolRouter = () => {
  const { toolId } = useParams();

  const toolComponents: { [key: string]: React.ComponentType } = {
    'ai-form-generator': AIFormGenerator,
    'smart-suggestions': SmartSuggestions,
    'auto-complete': AutoComplete,
    'templates-gallery': TemplatesGallery,
    'theme-studio': ThemeStudio,
    'style-editor': StyleEditor,
    'advanced-analytics': AdvancedAnalytics,
    'realtime-dashboard': RealtimeDashboard,
    'custom-reports': CustomReports,
    'team-management': TeamManagement,
    'workflow-builder': WorkflowBuilder,
    'comments-system': CommentsSystem,
  };

  const ToolComponent = toolComponents[toolId || ''];

  if (!ToolComponent) {
    return <Navigate to="/tools" replace />;
  }

  return <ToolComponent />;
};

export default ToolRouter;
