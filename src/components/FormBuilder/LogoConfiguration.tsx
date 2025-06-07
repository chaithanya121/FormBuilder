
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Upload, RotateCcw, AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { FormConfig } from './types';

interface LogoConfigurationProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const LogoConfiguration: React.FC<LogoConfigurationProps> = ({
  formConfig,
  onUpdate
}) => {
  const logoSettings = formConfig.settings?.logo || {};

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

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
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
        <CardContent className="space-y-6">
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
              <div className="space-y-4">
                <Label htmlFor="logo-url">Logo Image</Label>
                
                {/* URL Input */}
                <div className="flex gap-2">
                  <Input
                    id="logo-url"
                    placeholder="https://example.com/logo.png"
                    value={logoSettings.url || ''}
                    onChange={(e) => updateLogoSetting('url', e.target.value)}
                  />
                  <Button
                    variant="outline"
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
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo Image
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports PNG, JPG, SVG up to 5MB
                  </p>
                </div>
              </div>

              {/* Logo Preview */}
              {logoSettings.url && (
                <Card className="p-4 bg-gray-50">
                  <Label className="block mb-3 font-medium">Preview</Label>
                  <div className="flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg p-6">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-width">Width (px)</Label>
                  <Input
                    id="logo-width"
                    type="number"
                    min="10"
                    max="500"
                    value={logoSettings.width || 100}
                    onChange={(e) => updateLogoSetting('width', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-height">Height (px)</Label>
                  <Input
                    id="logo-height"
                    type="number"
                    min="10"
                    max="500"
                    value={logoSettings.height || 100}
                    onChange={(e) => updateLogoSetting('height', parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* Enhanced Position Settings */}
              <div className="space-y-4">
                <Label>Position & Alignment</Label>
                
                {/* Alignment Presets */}
                <div className="space-y-2">
                  <Label className="text-sm">Quick Alignment</Label>
                  <Select
                    value={logoSettings.position?.alignment || 'top-left'}
                    onValueChange={(value) => updateLogoPosition('alignment', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">
                        <div className="flex items-center gap-2">
                          <AlignLeft className="h-4 w-4" />
                          Top Left
                        </div>
                      </SelectItem>
                      <SelectItem value="top-center">
                        <div className="flex items-center gap-2">
                          <AlignCenter className="h-4 w-4" />
                          Top Center
                        </div>
                      </SelectItem>
                      <SelectItem value="top-right">
                        <div className="flex items-center gap-2">
                          <AlignRight className="h-4 w-4" />
                          Top Right
                        </div>
                      </SelectItem>
                      <SelectItem value="center">
                        <div className="flex items-center gap-2">
                          <AlignCenter className="h-4 w-4" />
                          Center
                        </div>
                      </SelectItem>
                      <SelectItem value="bottom-left">
                        <div className="flex items-center gap-2">
                          <AlignLeft className="h-4 w-4" />
                          Bottom Left
                        </div>
                      </SelectItem>
                      <SelectItem value="bottom-center">
                        <div className="flex items-center gap-2">
                          <AlignCenter className="h-4 w-4" />
                          Bottom Center
                        </div>
                      </SelectItem>
                      <SelectItem value="bottom-right">
                        <div className="flex items-center gap-2">
                          <AlignRight className="h-4 w-4" />
                          Bottom Right
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fine-tune Position */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-top">Top Offset (px)</Label>
                    <Input
                      id="logo-top"
                      type="number"
                      min="0"
                      max="200"
                      value={logoSettings.position?.top || 20}
                      onChange={(e) => updateLogoPosition('top', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-left">Left Offset (px)</Label>
                    <Input
                      id="logo-left"
                      type="number"
                      min="0"
                      max="200"
                      value={logoSettings.position?.left || 20}
                      onChange={(e) => updateLogoPosition('left', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Style Settings */}
              <div className="space-y-4">
                {/* Opacity Slider */}
                <div className="space-y-3">
                  <Label>Opacity</Label>
                  <Slider
                    value={[logoSettings.opacity || 1]}
                    onValueChange={(value) => updateLogoSetting('opacity', value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 text-center">
                    {Math.round((logoSettings.opacity || 1) * 100)}%
                  </div>
                </div>

                {/* Border Radius */}
                <div className="space-y-2">
                  <Label htmlFor="logo-border-radius">Border Radius (px)</Label>
                  <Input
                    id="logo-border-radius"
                    type="number"
                    min="0"
                    max="50"
                    value={logoSettings.borderRadius || 0}
                    onChange={(e) => updateLogoSetting('borderRadius', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-gray-500">
                    0 = Square, higher values = more rounded
                  </p>
                </div>
              </div>

              {/* Tips */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Tips for best results:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use transparent PNG files for best appearance</li>
                    <li>• Keep logos under 200x200px for mobile compatibility</li>
                    <li>• Use alignment presets for quick positioning</li>
                    <li>• Use 80-90% opacity for subtle branding</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoConfiguration;
