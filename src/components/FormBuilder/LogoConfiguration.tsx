
import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Upload, RotateCcw } from 'lucide-react';
import { FormConfig } from './types';

interface LogoConfigurationProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

type AlignmentType = 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const LogoConfiguration: React.FC<LogoConfigurationProps> = ({
  formConfig,
  onUpdate
}) => {
  const logoSettings = useMemo(() => formConfig.settings?.logo || {}, [formConfig.settings?.logo]);

  const updateLogoSetting = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        logo: {
          ...logoSettings,
          [key]: value
        }
      }
    });
  }, [formConfig, logoSettings, onUpdate]);

  const updateLogoPosition = useCallback((axis: 'top' | 'left' | 'alignment', value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        logo: {
          ...logoSettings,
          position: {
            ...logoSettings.position,
            [axis]: value
          }
        }
      }
    });
  }, [formConfig, logoSettings, onUpdate]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateLogoSetting('url', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [updateLogoSetting]);

  const resetLogoSettings = useCallback(() => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        logo: {
          enabled: false,
          url: '',
          width: 100,
          height: 100,
          position: { top: 20, left: 20, alignment: 'top-left' },
          opacity: 1,
          borderRadius: 0
        }
      }
    });
  }, [formConfig, onUpdate]);

  const handleAlignmentChange = useCallback((alignment: AlignmentType) => {
    let newTop = 20;
    let newLeft = 20;

    // Calculate position based on alignment
    switch (alignment) {
      case 'top-left':
        newTop = 20;
        newLeft = 20;
        break;
      case 'top-center':
        newTop = 20;
        newLeft = 50; // Will be centered using CSS transform
        break;
      case 'top-right':
        newTop = 20;
        newLeft = 80; // Percentage from left
        break;
      case 'center':
        newTop = 50;
        newLeft = 50;
        break;
      case 'bottom-left':
        newTop = 80;
        newLeft = 20;
        break;
      case 'bottom-center':
        newTop = 80;
        newLeft = 50;
        break;
      case 'bottom-right':
        newTop = 80;
        newLeft = 80;
        break;
      default:
        break;
    }

    // Update both alignment and position
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        logo: {
          ...logoSettings,
          position: {
            ...logoSettings.position,
            alignment: alignment,
            top: newTop,
            left: newLeft
          }
        }
      }
    });
  }, [formConfig, logoSettings, onUpdate]);

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-4 p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Logo Configuration
              </div>
              <Button variant="outline" size="sm" onClick={resetLogoSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Enable Logo */}
            <div className="flex items-center justify-between">
              <Label htmlFor="logo-enabled">Enable Logo</Label>
              <Switch
                id="logo-enabled"
                checked={logoSettings.enabled || false}
                onCheckedChange={(checked) => updateLogoSetting('enabled', checked)}
              />
            </div>

            {logoSettings.enabled && (
              <>
                {/* Logo Upload Section */}
                <div className="space-y-3">
                  <Label htmlFor="logo-url">Logo Image</Label>
                  
                  {/* URL Input */}
                  <div className="flex gap-2">
                    <Input
                      id="logo-url"
                      placeholder="https://example.com/logo.png"
                      value={logoSettings.url || ''}
                      onChange={(e) => updateLogoSetting('url', e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* File Upload */}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="w-full"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>

                {/* Logo Preview */}
                {logoSettings.url && (
                  <Card className="p-3 bg-gray-50">
                    <Label className="block mb-2 text-sm font-medium">Preview</Label>
                    <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-4">
                      <img
                        src={logoSettings.url}
                        alt="Logo Preview"
                        style={{
                          width: `${logoSettings.width || 100}px`,
                          height: `${logoSettings.height || 100}px`,
                          borderRadius: `${logoSettings.borderRadius || 0}px`,
                          opacity: logoSettings.opacity || 1
                        }}
                        className="object-contain"
                      />
                    </div>
                  </Card>
                )}

                {/* Size Settings */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="logo-width" className="text-sm">Width (px)</Label>
                    <Input
                      id="logo-width"
                      type="number"
                      min="10"
                      max="500"
                      value={logoSettings.width || 100}
                      onChange={(e) => updateLogoSetting('width', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-height" className="text-sm">Height (px)</Label>
                    <Input
                      id="logo-height"
                      type="number"
                      min="10"
                      max="500"
                      value={logoSettings.height || 100}
                      onChange={(e) => updateLogoSetting('height', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Quick Alignment */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quick Alignment</Label>
                  <Select
                    value={logoSettings.position?.alignment || 'top-left'}
                    onValueChange={handleAlignmentChange}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-center">Top Center</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-center">Bottom Center</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fine-tune Position */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="logo-top" className="text-sm">Top Offset (px)</Label>
                    <Input
                      id="logo-top"
                      type="number"
                      min="0"
                      max="500"
                      value={logoSettings.position?.top || 20}
                      onChange={(e) => updateLogoPosition('top', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-left" className="text-sm">Left Offset (px)</Label>
                    <Input
                      id="logo-left"
                      type="number"
                      min="0"
                      max="500"
                      value={logoSettings.position?.left || 20}
                      onChange={(e) => updateLogoPosition('left', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Opacity Slider */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Opacity</Label>
                  <Slider
                    value={[logoSettings.opacity || 1]}
                    onValueChange={(value) => updateLogoSetting('opacity', value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600 text-center">
                    {Math.round((logoSettings.opacity || 1) * 100)}%
                  </div>
                </div>

                {/* Border Radius */}
                <div className="space-y-2">
                  <Label htmlFor="logo-border-radius" className="text-sm">Border Radius (px)</Label>
                  <Input
                    id="logo-border-radius"
                    type="number"
                    min="0"
                    max="50"
                    value={logoSettings.borderRadius || 0}
                    onChange={(e) => updateLogoSetting('borderRadius', parseInt(e.target.value))}
                    className="text-sm"
                  />
                </div>

                {/* Tips */}
                <Card className="bg-blue-50 border-blue-200 p-3">
                  <h4 className="font-medium text-blue-900 mb-2 text-sm">💡 Tips:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Use transparent PNG files for best results</li>
                    <li>• Keep logos under 200x200px for mobile</li>
                    <li>• Use alignment presets for quick positioning</li>
                  </ul>
                </Card>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoConfiguration;
