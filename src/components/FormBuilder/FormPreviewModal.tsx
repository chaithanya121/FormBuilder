
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import FormPreview from './FormPreview';
import { FormConfig } from './types';

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
}

const FormPreviewModal: React.FC<FormPreviewModalProps> = ({ isOpen, onClose, formConfig }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Form Preview</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <FormPreview formConfig={formConfig} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPreviewModal;
