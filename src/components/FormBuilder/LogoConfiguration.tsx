
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Image, Upload } from 'lucide-react';
import { FormConfig } from './types';

interface LogoConfigurationProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const LogoConfiguration: React.FC<LogoConfigurationProps> = ({
  formConfig,
  onUpdate
}) => {
  const logoSettings = formConfig.settings.logo || {};

  const updateLogoSetting = (key: string, value: any) => {
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
  };

  const updateLogoPosition = (axis: 'top' | 'left', value: number) => {
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
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateLogoSetting('url', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Logo Configuration
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
            {/* Logo URL */}
            <div className="space-y-2">
              <Label htmlFor="logo-url">Logo URL</Label>
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
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Logo Preview */}
            {logoSettings.url && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <Label className="block mb-2">Preview</Label>
                <img
                  src={logoSettings.url}
                  alt="Logo Preview"
                  className="max-w-32 max-h-32 object-contain"
                />
              </div>
            )}

            {/* Size Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo-width">Width (px)</Label>
                <Input
                  id="logo-width"
                  type="number"
                  value={logoSettings.width || 100}
                  onChange={(e) => updateLogoSetting('width', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-height">Height (px)</Label>
                <Input
                  id="logo-height"
                  type="number"
                  value={logoSettings.height || 100}
                  onChange={(e) => updateLogoSetting('height', parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Position Settings */}
            <div className="space-y-4">
              <Label>Position</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-top">Top (px)</Label>
                  <Input
                    id="logo-top"
                    type="number"
                    value={logoSettings.position?.top || 20}
                    onChange={(e) => updateLogoPosition('top', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-left">Left (px)</Label>
                  <Input
                    id="logo-left"
                    type="number"
                    value={logoSettings.position?.left || 20}
                    onChange={(e) => updateLogoPosition('left', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="space-y-2">
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
                value={logoSettings.borderRadius || 0}
                onChange={(e) => updateLogoSetting('borderRadius', parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LogoConfiguration;
