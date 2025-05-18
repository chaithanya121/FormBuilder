import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
  resultsCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, resultsCount }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for keys or values..."
          className="pl-8 pr-16 py-2 bg-gray-900 text-gray-100 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-0 h-full px-3 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {searchTerm && (
        <div className="absolute right-2 top-12 text-sm text-gray-400">
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'} found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
