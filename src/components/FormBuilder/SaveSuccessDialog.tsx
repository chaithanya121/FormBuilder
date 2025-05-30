
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Share2, Eye } from 'lucide-react';

interface SaveSuccessDialogProps {
  open: boolean;
  onPublish: () => void;
  onClose: () => void;
}

const SaveSuccessDialog: React.FC<SaveSuccessDialogProps> = ({ open, onPublish, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <DialogTitle>Form Saved Successfully!</DialogTitle>
          </div>
          <DialogDescription>
            Your form has been saved. You can now publish it to make it live.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onPublish} className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Publish Form
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            Continue Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveSuccessDialog;
