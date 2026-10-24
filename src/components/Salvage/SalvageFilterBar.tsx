import React from 'react';

export type SalvageFilterCategory = 'all' | 'ui-components' | 'schemas-db' | 'api-integrations' | 'design-tokens' | 'research-docs';

interface SalvageFilterBarProps {
  selectedCategory: SalvageFilterCategory;
  onSelectCategory: (cat: SalvageFilterCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<SalvageFilterCategory, number>;
  className?: string;
}

const CATEGORY_TABS: Array<{ id: SalvageFilterCategory; label: string; icon: string }> = [
  { id: 'all', label: 'All Modules', icon: 'grid_view' },
  { id: 'ui-components', label: 'UI Components', icon: 'palette' },
  { id: 'schemas-db', label: 'Schemas & DB', icon: 'database' },
  { id: 'api-integrations', label: 'API Integrations', icon: 'hub' },
  { id: 'design-tokens', label: 'Design Tokens', icon: 'format_paint' },
];

export const SalvageFilterBar: React.FC<SalvageFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter harvested modules by name, tech stack, or parent project..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface-container/70 border border-outline-variant/60 focus:border-primary focus:outline-none text-xs font-mono placeholder:text-on-surface-variant/60 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          const count = counts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-md font-semibold scale-[1.02]'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-outline-variant/60'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
