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
      <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r border-[rgba(45,27,14,0.06)] bg-gradient-to-b from-white to-[#FDFCFA] overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 p-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-[var(--color-primary)] to-[#D4725C] text-white shadow-[0_2px_12px_rgba(198,93,59,0.3)]'
                      : 'text-[var(--color-bark)] hover:bg-[rgba(45,27,14,0.04)] hover:text-[var(--color-soil)]'
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[rgba(45,27,14,0.06)]">
            <Link
              href="/help"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-bark)] hover:bg-[rgba(45,27,14,0.04)] hover:text-[var(--color-soil)] transition-all duration-200"
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
          'lg:hidden fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r border-[rgba(45,27,14,0.06)] bg-white/95 backdrop-blur-xl overflow-y-auto z-50 transition-transform duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.08)]',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-[rgba(45,27,14,0.06)]">
            <h2 className="font-display text-lg font-bold text-[var(--color-soil)]">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-[var(--color-primary)] to-[#D4725C] text-white shadow-[0_2px_12px_rgba(198,93,59,0.3)]'
                      : 'text-[var(--color-bark)] hover:bg-[rgba(45,27,14,0.04)] hover:text-[var(--color-soil)]'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[rgba(45,27,14,0.06)]">
            <Link
              href="/help"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-bark)] hover:bg-[var(--color-dust)] hover:text-[var(--color-soil)] transition-colors"
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
