
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Zap, Download, Copy, Star, Heart, 
  Palette, Type, Layout, Sparkles 
} from 'lucide-react';
import { CustomTheme } from '../types';

interface ThemePreviewProps {
  theme: CustomTheme;
  onApplyTheme: (theme: CustomTheme) => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, onApplyTheme }) => {
  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyTheme = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
  };

  return (
    <div className="h-full flex">
      {/* Theme Details */}
      <div className="w-1/3 border-r bg-gray-50 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-gray-900">{theme.name}</h2>
              <Badge variant="outline">{theme.category || 'Custom'}</Badge>
            </div>
            <p className="text-sm text-gray-600">
              {theme.created ? `Created ${new Date(theme.created).toLocaleDateString()}` : 'Custom Theme'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => onApplyTheme(theme)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Zap className="h-4 w-4 mr-2" />
              Apply Theme
            </Button>
            <Button variant="outline" size="icon" onClick={exportTheme}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={copyTheme}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Color Palette */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-purple-500" />
              <h3 className="font-semibold">Colors</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <span className="text-sm text-gray-600">Primary</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">{theme.primaryColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
                <span className="text-sm text-gray-600">Secondary</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">{theme.secondaryColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.formBackgroundColor }}
                />
                <span className="text-sm text-gray-600">Form Background</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">{theme.formBackgroundColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.fontColor }}
                />
                <span className="text-sm text-gray-600">Font Color</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">{theme.fontColor}</span>
              </div>
            </div>
          </Card>

          {/* Typography */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4 text-blue-500" />
              <h3 className="font-semibold">Typography</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Font Family</span>
                <span className="font-medium">{theme.fontFamily || 'Default'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Font Size</span>
                <span className="font-medium">{theme.fontSize || 16}px</span>
              </div>
            </div>
          </Card>

          {/* Layout */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layout className="h-4 w-4 text-green-500" />
              <h3 className="font-semibold">Layout</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Border Radius</span>
                <span className="font-medium">{theme.borderRadius || '8px'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Padding</span>
                <span className="font-medium">{theme.padding || '24px'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Form Width</span>
                <span className="font-medium">{theme.formWidth || 600}px</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg shadow-lg overflow-hidden"
            style={{
              background: theme.backgroundColor,
              fontFamily: theme.fontFamily || 'Inter',
              fontSize: `${theme.fontSize || 16}px`
            }}
          >
            <div
              className="p-8"
              style={{
                backgroundColor: theme.formBackgroundColor,
                borderRadius: theme.borderRadius || '12px',
                margin: '32px',
                padding: theme.padding || '32px',
                color: theme.fontColor,
                maxWidth: `${theme.formWidth || 600}px`
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.primaryColor }}>
                Sample Form Preview
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span style={{ color: theme.secondaryColor }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 border rounded transition-all focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: theme.secondaryColor,
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address <span style={{ color: theme.secondaryColor }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded transition-all focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: theme.secondaryColor,
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Your message here..."
                    rows={4}
                    className="w-full p-3 border rounded transition-all focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: theme.secondaryColor,
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    className="w-full p-3 border rounded transition-all"
                    style={{
                      borderColor: theme.secondaryColor,
                      borderRadius: '8px'
                    }}
                  >
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Text Message</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="rounded"
                    style={{ accentColor: theme.primaryColor }}
                  />
                  <label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded font-medium transition-all duration-200 shadow-lg"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: theme.formBackgroundColor,
                    borderRadius: theme.borderRadius || '12px'
                  }}
                >
                  Submit Form
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
