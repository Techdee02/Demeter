import Link from 'next/link';
import { Sprout, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--bg-card)] shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-sun">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-[var(--color-soil)]">Demeter</h1>
            <p className="text-xs text-[var(--color-bark)]">Farm Co-Pilot</p>
          </div>
        </Link>

        {/* Center - Farm Selector (placeholder for now) */}
        <div className="flex-1 max-w-md mx-8">
          <div className="text-sm text-[var(--color-bark)] text-center">
            🌾 Select your farm
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--color-critical)]" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
