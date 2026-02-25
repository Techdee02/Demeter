'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Droplets, 
  Settings,
  FileText,
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Risk Analysis',
    href: '/risk',
    icon: Target,
  },
  {
    label: 'Forecasting',
    href: '/forecast',
    icon: TrendingUp,
  },
  {
    label: 'Irrigation',
    href: '/irrigation',
    icon: Droplets,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r border-white/50 bg-white/80 backdrop-blur-xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-[#E86B45] to-[#F28B68] text-white shadow-[0_4px_16px_rgba(232,107,69,0.35)]'
                      : 'text-[var(--color-bark)] hover:bg-white hover:text-[var(--color-soil)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[rgba(45,31,26,0.06)]">
            <Link
              href="/help"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-bark)] hover:bg-white hover:text-[var(--color-soil)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <aside 
        className={cn(
          'lg:hidden fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r border-white/50 bg-white/95 backdrop-blur-xl overflow-y-auto z-50 transition-transform duration-300 shadow-[8px_0_30px_rgba(0,0,0,0.1)]',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-[rgba(45,31,26,0.06)]">
            <h2 className="font-display text-lg font-bold text-[var(--color-soil)]">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-[#E86B45] to-[#F28B68] text-white shadow-[0_4px_16px_rgba(232,107,69,0.35)]'
                      : 'text-[var(--color-bark)] hover:bg-white hover:text-[var(--color-soil)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[rgba(45,31,26,0.06)]">
            <Link
              href="/help"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-bark)] hover:bg-white hover:text-[var(--color-soil)] transition-all duration-200"
            >
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
