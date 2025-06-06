
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from 'lucide-react';

const ModernBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatBreadcrumbName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getBreadcrumbPath = (index: number) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  if (pathnames.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            const path = getBreadcrumbPath(index);
            
            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium text-gray-900">
                      {formatBreadcrumbName(name)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={path} className="text-gray-600 hover:text-gray-900">
                        {formatBreadcrumbName(name)}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ModernBreadcrumb;
