import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronDown, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface JsonNodeProps {
  keyName: string | null;
  value: any;
  isRoot?: boolean;
  isExpanded?: boolean;
  isLastChild?: boolean;
  path: string[];
  isSearchMatch?: boolean;
  expandedPaths: Set<string>;
  onTogglePath: (path: string) => void;
}

const JsonNode: React.FC<JsonNodeProps> = ({
  keyName,
  value,
  isRoot = false,
  isLastChild = true,
  path,
  isSearchMatch = false,
  expandedPaths,
  onTogglePath
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value);
  const isExpandable = type === 'object' || type === 'array';
  const pathString = path.join('.');
  const isExpanded = expandedPaths.has(pathString);
  
  const hasChildren = isExpandable && value !== null && Object.keys(value).length > 0;
  
  const handleToggle = useCallback(() => {
    if (hasChildren) {
      onTogglePath(pathString);
    }
  }, [hasChildren, onTogglePath, pathString]);
  
  const handleCopy = useCallback((e: React.MouseEvent, valueToCopy: any) => {
    e.stopPropagation();
    let textToCopy = typeof valueToCopy === 'object' && valueToCopy !== null
      ? JSON.stringify(valueToCopy, null, 2)
      : String(valueToCopy);
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Value has been copied to your clipboard",
        duration: 2000,
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, []);
  
  const renderValue = () => {
    if (value === null) {
      return <span className="json-null">null</span>;
    }
    
    switch (type) {
      case 'string':
        return <span className="json-string">"{value}"</span>;
      case 'number':
        return <span className="json-number">{value}</span>;
      case 'boolean':
        return <span className="json-boolean">{value.toString()}</span>;
      case 'array':
        return (
          <span className="json-array">
            [] {hasChildren ? `(${Object.keys(value).length} items)` : '(empty)'}
          </span>
        );
      case 'object':
        return (
          <span className="json-object">
            {} {hasChildren ? `(${Object.keys(value).length} keys)` : '(empty)'}
          </span>
        );
      default:
        return <span>{String(value)}</span>;
    }
  };
  
  const renderChildren = () => {
    if (!isExpandable || !isExpanded) return null;
    
    const keys = Object.keys(value);
    
    return (
      <div className={cn("tree-line", {"fade-in": isExpanded})}>
        {keys.map((key, index) => (
          <JsonNode
            key={key}
            keyName={key}
            value={value[key]}
            isLastChild={index === keys.length - 1}
            path={[...path, key]}
            expandedPaths={expandedPaths}
            onTogglePath={onTogglePath}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className={cn("mb-1", { "opacity-75": !isSearchMatch && path.length > 0 })}>
      <div
        className={cn(
          "flex items-start group json-node-hover py-1 rounded-sm",
          {"pl-1": !isRoot},
          {"bg-purple-900 bg-opacity-20": isSearchMatch},
        )}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {hasChildren && (
          <div className="mr-1 cursor-pointer pt-1" onClick={handleToggle}>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
        
        {!hasChildren && (
          <div className="w-4 mr-1"></div>
        )}
        
        <div className="flex-1">
          {keyName !== null && (
            <span className="json-key mr-1">{keyName}: </span>
          )}
          
          {renderValue()}
          
          <span className="json-node-actions ml-2">
            <Copy 
              className="inline-block h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-white" 
              onClick={(e) => handleCopy(e, keyName !== null ? value : value)}
            />
          </span>
        </div>
      </div>
      
      {renderChildren()}
    </div>
  );
};

export default JsonNode;
