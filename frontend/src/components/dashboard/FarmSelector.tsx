'use client';

/**
 * FarmSelector Component
 * Dropdown for selecting the active farm in the dashboard
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Sprout, Check, Plus } from 'lucide-react';
import { useFarms } from '@/lib/api';
import type { Farm, GrowthStage } from '@/lib/api';

interface FarmSelectorProps {
  selectedFarmId: string;
  onSelectFarm: (farmId: string) => void;
  className?: string;
}

const growthStageLabels: Record<GrowthStage, string> = {
  GERMINATION: 'Germination',
  SEEDLING: 'Seedling',
  VEGETATIVE: 'Vegetative',
  FLOWERING: 'Flowering',
  GRAIN_FILL: 'Grain Fill',
  MATURITY: 'Maturity',
};

function FarmHealthBadge({ health }: { health: number }) {
  const getColor = () => {
    if (health >= 80) return 'bg-[var(--color-healthy)] text-white';
    if (health >= 60) return 'bg-[var(--color-moderate)] text-white';
    if (health >= 40) return 'bg-[var(--color-low)] text-white';
    return 'bg-[var(--color-critical)] text-white';
  };

  return (
    <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getColor()}`}>
      {health}%
    </span>
  );
}

export function FarmSelector({ selectedFarmId, onSelectFarm, className = '' }: FarmSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: farms, isLoading } = useFarms();

  const selectedFarm = farms?.find(f => f.id === selectedFarmId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (isLoading) {
    return (
      <div className={`h-10 w-48 bg-[var(--color-dust)] animate-pulse rounded-lg ${className}`} />
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg
          bg-white border border-[var(--color-border)]
          hover:border-[var(--color-terracotta-400)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-300)]
          transition-all duration-200
          min-w-[200px]
          ${isOpen ? 'ring-2 ring-[var(--color-terracotta-300)] border-[var(--color-terracotta-400)]' : ''}
        `}
      >
        {/* Farm Icon */}
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-savanna)] flex items-center justify-center flex-shrink-0">
          <Sprout className="w-4 h-4 text-white" />
        </div>

        {/* Farm Info */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-[var(--color-soil)] truncate">
            {selectedFarm?.name || 'Select Farm'}
          </p>
          {selectedFarm && (
            <p className="text-xs text-[var(--color-bark)] truncate">
              {selectedFarm.cropType} · {growthStageLabels[selectedFarm.growthStage]}
            </p>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown 
          className={`w-4 h-4 text-[var(--color-bark)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-[var(--color-border)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--bg-card)]">
            <p className="text-xs font-medium text-[var(--color-bark)] uppercase tracking-wider">
              Your Farms
            </p>
          </div>

          {/* Farm List */}
          <div className="max-h-80 overflow-y-auto">
            {farms?.map(farm => (
              <button
                key={farm.id}
                onClick={() => {
                  onSelectFarm(farm.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-start gap-3 px-4 py-3
                  hover:bg-[var(--color-dust)] transition-colors
                  ${selectedFarmId === farm.id ? 'bg-[var(--color-terracotta-50)]' : ''}
                `}
              >
                {/* Farm Icon */}
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${selectedFarmId === farm.id 
                    ? 'bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-savanna)]' 
                    : 'bg-[var(--color-dust)]'}
                `}>
                  <Sprout className={`w-5 h-5 ${selectedFarmId === farm.id ? 'text-white' : 'text-[var(--color-bark)]'}`} />
                </div>

                {/* Farm Details */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-soil)] truncate">
                      {farm.name}
                    </p>
                    <FarmHealthBadge health={farm.healthPercentage} />
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[var(--color-bark)]">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{farm.location.region}, {farm.location.country}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-[var(--color-bark)]">
                      {farm.cropType}
                    </span>
                    <span className="text-xs text-[var(--color-bark)]">·</span>
                    <span className="text-xs text-[var(--color-bark)]">
                      {farm.areaHectares} ha
                    </span>
                    <span className="text-xs text-[var(--color-bark)]">·</span>
                    <span className="text-xs text-[var(--color-terracotta-600)] font-medium">
                      {growthStageLabels[farm.growthStage]}
                    </span>
                  </div>
                </div>

                {/* Selected Check */}
                {selectedFarmId === farm.id && (
                  <Check className="w-5 h-5 text-[var(--color-terracotta)] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Footer - Add Farm */}
          <div className="border-t border-[var(--color-border)]">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-50)] transition-colors"
              onClick={() => {
                setIsOpen(false);
                // Would navigate to add farm page
              }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add New Farm</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Compact Version for Mobile
// ============================================================================

export function FarmSelectorCompact({ selectedFarmId, onSelectFarm, className = '' }: FarmSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: farms, isLoading } = useFarms();

  const selectedFarm = farms?.find(f => f.id === selectedFarmId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className={`h-8 w-8 bg-[var(--color-dust)] animate-pulse rounded-lg ${className}`} />;
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 rounded-lg
          bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-savanna)]
          flex items-center justify-center
          hover:opacity-90 transition-opacity
          focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-300)]
        `}
        title={selectedFarm?.name || 'Select Farm'}
      >
        <Sprout className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[var(--color-border)] overflow-hidden z-50">
          <div className="max-h-64 overflow-y-auto">
            {farms?.map(farm => (
              <button
                key={farm.id}
                onClick={() => {
                  onSelectFarm(farm.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-2 px-3 py-2.5
                  hover:bg-[var(--color-dust)] transition-colors text-left
                  ${selectedFarmId === farm.id ? 'bg-[var(--color-terracotta-50)]' : ''}
                `}
              >
                <span className="flex-1 text-sm font-medium text-[var(--color-soil)] truncate">
                  {farm.name}
                </span>
                <FarmHealthBadge health={farm.healthPercentage} />
                {selectedFarmId === farm.id && (
                  <Check className="w-4 h-4 text-[var(--color-terracotta)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
