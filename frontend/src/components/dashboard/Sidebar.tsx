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
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r border-[var(--color-border)] bg-[var(--bg-card)] overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                    : 'text-[var(--color-bark)] hover:bg-[var(--color-dust)] hover:text-[var(--color-soil)]'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-bark)] hover:bg-[var(--color-dust)] hover:text-[var(--color-soil)] transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
