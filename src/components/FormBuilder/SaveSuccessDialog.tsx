
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Share2, Eye, Copy, Home, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SaveSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: () => void;
  onClose: () => void;
  formId?: string;
  formName?: string;
}

const SaveSuccessDialog: React.FC<SaveSuccessDialogProps> = ({ 
  open, 
  onOpenChange,
  onPublish, 
  onClose, 
  formId = 'current',
  formName = 'Untitled Form' 
}) => {
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const formUrl = `${window.location.origin}/form/${formId}`;

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing delay
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      onPublish();
      
      toast({
        title: "Form Published Successfully!",
        description: "Your form is now live and ready to receive submissions.",
      });
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
    toast({
      title: "Link Copied!",
      description: "Form link has been copied to your clipboard.",
    });
  };

  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  const handleViewForm = () => {
    window.open(formUrl, '_blank');
  };

  const handleClose = () => {
    onOpenChange(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {!isPublished ? (
            <motion.div
              key="save-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">Form Saved Successfully!</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                      "{formName}" has been saved to your account.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-3 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 text-sm">Ready to go live?</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Publishing your form will make it accessible to anyone with the link.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handlePublish} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isPublishing}
                  >
                    {isPublishing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 mr-2"
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Share2 className="h-4 w-4 mr-2" />
                    )}
                    {isPublishing ? 'Publishing...' : 'Publish Form'}
                  </Button>
                  
                  <Button variant="outline" onClick={handleClose} className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Continue Editing
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="publish-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-white" />
                  </motion.div>
                  <DialogTitle className="text-xl">Successfully Published!</DialogTitle>
                  <DialogDescription className="text-gray-600 mt-2">
                    Your form is now live and ready to receive submissions.
                  </DialogDescription>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 mb-1">Form URL</p>
                      <Input
                        value={formUrl}
                        readOnly
                        className="text-xs bg-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={handleGoHome}
                    className="w-full"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  
                  <Button
                    onClick={handleViewForm}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Form
                  </Button>
                </div>

                <Button variant="ghost" onClick={handleClose} className="w-full text-gray-600">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SaveSuccessDialog;
