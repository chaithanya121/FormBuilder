import React, { useState, useCallback, useEffect, useRef } from 'react';
import JsonNode from '@/components/ui/json-node';
import JsonControls from '@/components/ui/json-controls';
import SearchBar from '@/components/ui/serach-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { formatJson, isValidJson, searchJson, generateSampleJson, SearchResult } from '@/components/utils/jsonUtils';

interface JsonViewerProps {
  initialJson?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ initialJson }) => {
  const [jsonText, setJsonText] = useState(initialJson || generateSampleJson());
  const [parsedJson, setParsedJson] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('viewer');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['']));
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse JSON on initial load and when JSON text changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonText);
      setParsedJson(parsed);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Invalid JSON: ${e.message}`);
      } else {
        setError('Invalid JSON');
      }
    }
  }, [jsonText]);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = searchJson(parsedJson, searchTerm);
    setSearchResults(results);

    // Automatically expand paths containing search results
    const newExpandedPaths = new Set(expandedPaths);
    results.forEach(result => {
      // Add all parent paths to ensure the result is visible
      let currentPath = '';
      result.path.forEach(segment => {
        currentPath = currentPath ? `${currentPath}.${segment}` : segment;
        newExpandedPaths.add(currentPath);
      });
    });
    setExpandedPaths(newExpandedPaths);
  }, [searchTerm, parsedJson]);

  // Toggle node expansion
  const handleTogglePath = useCallback((path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  // Expand all nodes
  const handleExpandAll = useCallback(() => {
    const allPaths = new Set<string>([]);
    
    // Recursive function to get all possible paths
    const addAllPaths = (obj: any, currentPath: string = '') => {
      if (typeof obj !== 'object' || obj === null) return;
      
      allPaths.add(currentPath);
      
      Object.keys(obj).forEach(key => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        allPaths.add(newPath);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          addAllPaths(obj[key], newPath);
        }
      });
    };
    
    addAllPaths(parsedJson);
    setExpandedPaths(allPaths);
  }, [parsedJson]);

  // Collapse all nodes
  const handleCollapseAll = useCallback(() => {
    setExpandedPaths(new Set(['']));
  }, []);

  // Copy JSON to clipboard
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(formatJson(jsonText));
  }, [jsonText]);

  // Load sample JSON
  const handleLoadSample = useCallback(() => {
    const sample = generateSampleJson();
    setJsonText(sample);
  }, []);

  // Format JSON
  const handleFormat = useCallback(() => {
    if (isValidJson(jsonText)) {
      setJsonText(formatJson(jsonText));
    }
  }, [jsonText]);

  // Handle file upload
  const handleUpload = useCallback(() => {
    setUploadDialogOpen(true);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        // Test if valid JSON
        JSON.parse(content);
        setJsonText(content);
        setUploadDialogOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(`Invalid JSON file: ${e.message}`);
        }
      }
    };
    reader.readAsText(file);
  }, []);

  // Check if a path is in search results
  const isPathInSearchResults = useCallback((path: string[]): boolean => {
    if (!searchTerm) return false;
    
    const pathStr = path.join('.');
    return searchResults.some(result => {
      const resultPathStr = result.path.join('.');
      return pathStr === resultPathStr || resultPathStr.startsWith(pathStr + '.');
    });
  }, [searchResults, searchTerm]);

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="viewer"
              className="data-[state=active]:bg-gray-700"
            >
              Viewer
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="data-[state=active]:bg-gray-700"
              disabled
            >
              Editor
            </TabsTrigger>
          </TabsList>
          
          <div className="w-1/3">
            <SearchBar 
              onSearch={setSearchTerm} 
              resultsCount={searchResults.length} 
            />
          </div>
        </div>
        
        <TabsContent value="viewer" className="mt-0">
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-4">
              <JsonControls
                onCopy={handleCopy}
                onExpandAll={handleExpandAll}
                onCollapseAll={handleCollapseAll}
                onLoadSample={handleLoadSample}
                onUpload={handleUpload}
              />
              
              <div className="overflow-auto max-h-[70vh] font-mono text-sm py-2">
                {error ? (
                  <div className="text-red-500 p-4">{error}</div>
                ) : Object.keys(parsedJson).length > 0 ? (
                  <JsonNode
                    keyName={null}
                    value={parsedJson}
                    isRoot
                    path={[]}
                    isSearchMatch={searchResults.length > 0 && isPathInSearchResults([])}
                    expandedPaths={expandedPaths}
                    onTogglePath={handleTogglePath}
                  />
                ) : (
                  <div className="text-gray-400 p-4">No JSON data to display</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="mt-0">
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-4">
              <div className="flex justify-end gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleFormat}
                  className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                >
                  Format JSON
                </Button>
              </div>
              
              <Textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="min-h-[70vh] font-mono text-sm p-3 bg-gray-900 border-gray-700 text-gray-100"
                placeholder="Paste your JSON here..."
              />
              
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle>Upload JSON File</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-md p-8">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
                id="json-file"
              />
              <label 
                htmlFor="json-file" 
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-300">Click to select a JSON file</p>
                <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JsonViewer;
