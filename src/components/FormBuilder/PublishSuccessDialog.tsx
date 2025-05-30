
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Copy, ExternalLink, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishSuccessDialogProps {
  open: boolean;
  formId: string;
  onClose: () => void;
}

const PublishSuccessDialog: React.FC<PublishSuccessDialogProps> = ({ open, formId, onClose }) => {
  const { toast } = useToast();
  const formUrl = `${window.location.origin}/form/${formId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    toast({
      title: "Copied!",
      description: "Form URL copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <DialogTitle>Form Published Successfully!</DialogTitle>
          </div>
          <DialogDescription>
            Your form is now live and ready to receive submissions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Form URL</label>
            <div className="flex items-center gap-2 mt-1">
              <Input value={formUrl} readOnly className="flex-1" />
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button onClick={() => window.open(formUrl, '_blank')} className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Form
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishSuccessDialog;
