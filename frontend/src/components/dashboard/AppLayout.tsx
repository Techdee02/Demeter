import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 ml-[280px]">
          <div className="container-demeter py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
