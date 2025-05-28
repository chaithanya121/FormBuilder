
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SaveSuccessDialogProps {
  open: boolean;
  onPublish: () => void;
  onClose: () => void;
}

const SaveSuccessDialog = ({ open, onPublish, onClose }: SaveSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl font-semibold">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            Form Successfully Saved
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-6">
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            Your form has been saved successfully. What would you like to do next?
          </p>
          
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 px-6"
            >
              Close
            </Button>
            <Button 
              onClick={onPublish}
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 px-6 shadow-lg hover:shadow-xl"
            >
              Publish Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveSuccessDialog;
