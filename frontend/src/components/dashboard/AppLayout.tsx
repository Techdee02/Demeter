'use client';

import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { FloatingDecorations } from '@/components/ui/FloatingElements';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCFA] via-[#FFF8F5] to-[#EEFBF3] relative overflow-x-hidden">
      {/* Floating Agricultural Decorations */}
      <FloatingDecorations />
      
      {/* Navbar */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-[280px] w-full">
          <div className="container-demeter py-4 md:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
