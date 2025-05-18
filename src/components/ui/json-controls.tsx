
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Maximize2, Minimize2, RefreshCw, Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface JsonControlsProps {
  onCopy: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onLoadSample: () => void;
  onUpload: () => void;
}

const JsonControls: React.FC<JsonControlsProps> = ({
  onCopy,
  onExpandAll,
  onCollapseAll,
  onLoadSample,
  onUpload,
}) => {
  const handleCopy = () => {
    onCopy();
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end mb-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
        onClick={onExpandAll}
      >
        <Maximize2 className="h-4 w-4 mr-2" />
        Expand All
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
        onClick={onCollapseAll}
      >
        <Minimize2 className="h-4 w-4 mr-2" />
        Collapse All
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
        onClick={handleCopy}
      >
        <Clipboard className="h-4 w-4 mr-2" />
        Copy
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
        onClick={onUpload}
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
        onClick={onLoadSample}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Load Sample
      </Button>
    </div>
  );
};

export default JsonControls;
