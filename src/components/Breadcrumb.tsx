import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">›</span>}
            {item.path ? (
              <button
                onClick={() => navigate(item.path!)}
                className="px-3 py-1.5 rounded-md bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-all duration-200 font-medium cursor-pointer shadow-sm hover:shadow-md"
              >
                {item.label}
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 font-medium border border-blue-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;