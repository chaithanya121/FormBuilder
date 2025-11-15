import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResumeContentIntelligence } from '@/types/resume-schema';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Lightbulb, 
  TrendingUp,
  FileText,
  Eye,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumeContentIntelligencePanelProps {
  intelligence: ResumeContentIntelligence;
  onApplySuggestion?: (phrase: string, suggestion: string) => void;
}

export const ResumeContentIntelligencePanel: React.FC<ResumeContentIntelligencePanelProps> = ({
  intelligence,
  onApplySuggestion,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(142, 71%, 45%)';
    if (score >= 60) return 'hsl(47, 100%, 50%)';
    return 'hsl(0, 84%, 60%)';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-4">
      {/* Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resume Intelligence Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: getScoreColor(intelligence.atsScore) }}
              >
                {intelligence.atsScore}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <FileText className="h-3 w-3" />
                ATS Score
              </div>
              <Badge variant="outline" className="mt-2">
                {getScoreLabel(intelligence.atsScore)}
              </Badge>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: getScoreColor(intelligence.readabilityScore) }}
              >
                {intelligence.readabilityScore}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Eye className="h-3 w-3" />
                Readability
              </div>
              <Badge variant="outline" className="mt-2">
                {getScoreLabel(intelligence.readabilityScore)}
              </Badge>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: getScoreColor(intelligence.impactScore) }}
              >
                {intelligence.impactScore}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Target className="h-3 w-3" />
                Impact
              </div>
              <Badge variant="outline" className="mt-2">
                {getScoreLabel(intelligence.impactScore)}
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Weak Phrases */}
      {intelligence.weakPhrases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Weak Phrases Detected ({intelligence.weakPhrases.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {intelligence.weakPhrases.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 border rounded-lg bg-muted/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-destructive mb-1">
                      "{item.phrase}"
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {item.location}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Suggestions:</strong> {item.suggestion}
                    </div>
                  </div>
                  {onApplySuggestion && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApplySuggestion(item.phrase, item.suggestion)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {intelligence.weakPhrases.length > 5 && (
              <p className="text-xs text-muted-foreground text-center">
                And {intelligence.weakPhrases.length - 5} more...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {intelligence.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {intelligence.suggestions.map((suggestion, index) => (
              <Alert
                key={index}
                variant={suggestion.type === 'error' ? 'destructive' : 'default'}
              >
                {suggestion.type === 'error' && <AlertTriangle className="h-4 w-4" />}
                {suggestion.type === 'warning' && <Info className="h-4 w-4" />}
                {suggestion.type === 'improvement' && <CheckCircle className="h-4 w-4" />}
                <AlertDescription>
                  <strong className="capitalize">{suggestion.section}:</strong>{' '}
                  {suggestion.message}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Missing Keywords */}
      {intelligence.missingKeywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Suggested Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {intelligence.missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
