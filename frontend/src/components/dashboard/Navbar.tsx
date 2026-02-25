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
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl border-b border-[rgba(45,27,14,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(45,27,14,0.03)]">
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
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#D4725C] shadow-[0_2px_8px_rgba(198,93,59,0.25)]">
            <Sprout className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold text-[var(--color-soil)] tracking-tight">Demeter</h1>
            <p className="text-[11px] font-medium text-[var(--color-bark)] tracking-wide uppercase">AI Farm Co-Pilot</p>
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
