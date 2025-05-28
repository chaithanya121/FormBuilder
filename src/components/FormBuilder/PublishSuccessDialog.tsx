
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PublishSuccessDialogProps {
  open: boolean;
  formId: string;
  onClose: () => void;
}

const PublishSuccessDialog = ({ open, formId, onClose }: PublishSuccessDialogProps) => {
  const { toast } = useToast();
  const shareableLink = `${window.location.origin}/form/${formId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link Copied",
      description: "Form link copied to clipboard",
      className: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-2xl">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-0 top-0 h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl font-semibold pr-10">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            Form Published Successfully
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 text-base font-medium mb-2">
              🎉 Congratulations!
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your form is now live and ready to receive submissions!
            </p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
              Shareable Link:
            </label>
            <div className="flex gap-2">
              <Input
                value={shareableLink}
                readOnly
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Share this link with your audience to start collecting responses
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishSuccessDialog;
