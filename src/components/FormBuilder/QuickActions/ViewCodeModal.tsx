
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Eye, Code, FileText, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FormConfig } from '../types';
import { motion } from 'framer-motion';

interface ViewCodeModalProps {
  formConfig: FormConfig;
  onClose: () => void;
}

const ViewCodeModal: React.FC<ViewCodeModalProps> = ({ formConfig, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('react');

  const generateReactCode = () => {
    return `import React, { useState } from 'react';

const ${formConfig.name.replace(/\s+/g, '')}Form = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">${formConfig.name}</h2>
      
      ${formConfig.elements.map(element => {
        switch (element.type) {
          case 'text':
          case 'email':
          case 'password':
            return `<div className="mb-4">
        <label className="block text-sm font-medium mb-2">${element.label}</label>
        <input
          type="${element.type}"
          placeholder="${element.placeholder || ''}"
          ${element.required ? 'required' : ''}
          onChange={(e) => handleChange('${element.id}', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>`;
          case 'textarea':
            return `<div className="mb-4">
        <label className="block text-sm font-medium mb-2">${element.label}</label>
        <textarea
          placeholder="${element.placeholder || ''}"
          ${element.required ? 'required' : ''}
          onChange={(e) => handleChange('${element.id}', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>`;
          case 'select':
            return `<div className="mb-4">
        <label className="block text-sm font-medium mb-2">${element.label}</label>
        <select
          ${element.required ? 'required' : ''}
          onChange={(e) => handleChange('${element.id}', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
          ${element.options?.map(option => `<option value="${option}">${option}</option>`).join('\n          ') || ''}
        </select>
      </div>`;
          default:
            return `<div className="mb-4">
        <label className="block text-sm font-medium mb-2">${element.label}</label>
        <input
          type="text"
          placeholder="${element.placeholder || ''}"
          onChange={(e) => handleChange('${element.id}', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>`;
        }
      }).join('\n      ')}
      
      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        ${formConfig.settings.submitButton?.text || 'Submit'}
      </button>
    </form>
  );
};

export default ${formConfig.name.replace(/\s+/g, '')}Form;`;
  };

  const generateHTMLCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formConfig.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 py-8">
    <form class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">${formConfig.name}</h2>
        
        ${formConfig.elements.map(element => {
          switch (element.type) {
            case 'text':
            case 'email':
            case 'password':
              return `<div class="mb-4">
            <label class="block text-sm font-medium mb-2">${element.label}</label>
            <input
                type="${element.type}"
                placeholder="${element.placeholder || ''}"
                ${element.required ? 'required' : ''}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        </div>`;
            case 'textarea':
              return `<div class="mb-4">
            <label class="block text-sm font-medium mb-2">${element.label}</label>
            <textarea
                placeholder="${element.placeholder || ''}"
                ${element.required ? 'required' : ''}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
            ></textarea>
        </div>`;
            default:
              return `<div class="mb-4">
            <label class="block text-sm font-medium mb-2">${element.label}</label>
            <input
                type="text"
                placeholder="${element.placeholder || ''}"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        </div>`;
          }
        }).join('\n        ')}
        
        <button
            type="submit"
            class="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            ${formConfig.settings.submitButton?.text || 'Submit'}
        </button>
    </form>
</body>
</html>`;
  };

  const generateJSONConfig = () => {
    return JSON.stringify(formConfig, null, 2);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              View Generated Code
              <Badge variant="secondary" className="ml-auto">
                {formConfig.elements.length} elements
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b p-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="react" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    React
                  </TabsTrigger>
                  <TabsTrigger value="html" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    HTML
                  </TabsTrigger>
                  <TabsTrigger value="json" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    JSON Config
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4">
                <TabsContent value="react" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(generateReactCode())}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy React Code
                      </Button>
                      <Button
                        onClick={() => downloadCode(generateReactCode(), `${formConfig.name.replace(/\s+/g, '')}.jsx`)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                      <code>{generateReactCode()}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="html" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(generateHTMLCode())}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy HTML Code
                      </Button>
                      <Button
                        onClick={() => downloadCode(generateHTMLCode(), `${formConfig.name.replace(/\s+/g, '')}.html`)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                      <code>{generateHTMLCode()}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="json" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(generateJSONConfig())}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy JSON
                      </Button>
                      <Button
                        onClick={() => downloadCode(generateJSONConfig(), `${formConfig.name.replace(/\s+/g, '')}-config.json`)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                      <code>{generateJSONConfig()}</code>
                    </pre>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ViewCodeModal;
