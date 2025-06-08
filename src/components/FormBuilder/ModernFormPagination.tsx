
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernFormPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

const ModernFormPagination: React.FC<ModernFormPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  searchQuery = '',
  onSearchChange,
  showSearch = true
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-sm"
    >
      {/* Search and Items per page */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        {showSearch && onSearchChange && (
          <div className="relative flex-1 lg:flex-none lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-9 bg-white/80 border-gray-200"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-gray-600">Show</span>
          <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
            <SelectTrigger className="w-20 h-9 bg-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600 text-center lg:text-left">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-1">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 bg-white/80 border-gray-200 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 bg-white/80 border-gray-200 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-400 text-sm">...</span>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={`h-9 w-9 p-0 text-sm ${
                      page === currentPage 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-md' 
                        : 'bg-white/80 border-gray-200 hover:bg-blue-50'
                    }`}
                  >
                    {page}
                  </Button>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 bg-white/80 border-gray-200 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 bg-white/80 border-gray-200 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModernFormPagination;
