import React, { ReactNode } from 'react';
import { SharedNavigation } from './SharedNavigation';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; path: string }>;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showBreadcrumbs = true,
  breadcrumbItems,
  className = ''
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavigation />
      {showBreadcrumbs && <Breadcrumbs items={breadcrumbItems} />}
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
