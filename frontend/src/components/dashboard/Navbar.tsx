'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sprout, User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FarmSelector, FarmSelectorCompact } from './FarmSelector';

interface NavbarProps {
  defaultFarmId?: string;
  onMenuClick?: () => void;
}

export function Navbar({ defaultFarmId = '1', onMenuClick }: NavbarProps) {
  const [selectedFarmId, setSelectedFarmId] = useState(defaultFarmId);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--bg-card)] shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-sun">
            <Sprout className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold text-[var(--color-soil)]">Demeter</h1>
            <p className="text-xs text-[var(--color-bark)]">Farm Co-Pilot</p>
          </div>
        </Link>

        {/* Center - Farm Selector (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center mx-8 max-w-md">
          <FarmSelector
            selectedFarmId={selectedFarmId}
            onSelectFarm={setSelectedFarmId}
          />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Farm Selector (Mobile) */}
          <div className="md:hidden">
            <FarmSelectorCompact
              selectedFarmId={selectedFarmId}
              onSelectFarm={setSelectedFarmId}
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--color-critical)]" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
