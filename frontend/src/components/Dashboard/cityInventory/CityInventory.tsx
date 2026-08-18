import { useState, useRef, useEffect, useCallback } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import BusinessIcon from '@mui/icons-material/Business'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CloseIcon from '@mui/icons-material/Close'

import { PROPERTIES, FILTERS, type FilterConfig } from './data'

interface FilterDropdownProps {
  filter: FilterConfig
  selected: string[]
  onToggle: (value: string) => void
  onClear: () => void
  onClose: () => void
}

function FilterDropdown({ filter, selected, onToggle, onClear, onClose }: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        const btn = (e.target as HTMLElement).closest('[data-filter-btn]')
        if (!btn) onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-100 overflow-hidden animate-[filterSlideIn_200ms_ease-out]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-[11px] font-bold text-[var(--color-text-primary)]">{filter.label}</span>
        <div className="flex items-center gap-1.5">
          {selected.length > 0 && (
            <button
              onClick={onClear}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded text-[var(--color-brand-magenta)] hover:bg-[var(--color-brand-magenta)]/5 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-0.5 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-100 transition-all"
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="py-1 max-h-52 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
        {filter.options.map((option) => {
          const isChecked = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-all duration-150 ${
                isChecked
                  ? 'bg-[var(--color-brand-purple)]/5'
                  : 'hover:bg-gray-50'
              }`}
            >
              {isChecked ? (
                <CheckBoxIcon
                  sx={{ fontSize: 18 }}
                  className="shrink-0"
                  style={{ color: filter.color }}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  sx={{ fontSize: 18 }}
                  className="text-gray-300 shrink-0"
                />
              )}
              <span className={`text-[11px] font-medium ${
                isChecked ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
              }`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      {selected.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[var(--color-text-secondary)] font-medium">
              {selected.length} selected
            </span>
            <button
              onClick={onClose}
              className="text-[10px] font-bold px-3 py-1 rounded-md text-white transition-all duration-200 active:scale-95 shadow-sm"
              style={{ backgroundColor: filter.color }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CityInventory() {
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [selections, setSelections] = useState<Record<string, string[]>>({
    propertyType: [],
    bhk: [],
    budget: [],
    area: [],
  })

  const handleToggle = useCallback((filterKey: string, value: string) => {
    setSelections(prev => {
      const current = prev[filterKey] ?? []
      return {
        ...prev,
        [filterKey]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      }
    })
  }, [])

  const handleClear = useCallback((filterKey: string) => {
    setSelections(prev => ({ ...prev, [filterKey]: [] }))
  }, [])

  const totalSelections = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#F3F4F6] overflow-hidden">
      {/* Keyframe animation for dropdown */}
      <style>{`
        @keyframes filterSlideIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Header: Filters */}
      <div className="sticky top-0 bg-[#F3F4F6]/95 backdrop-blur-md z-60 shrink-0">
        <div className="bg-white px-2.5 py-2 flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
          {FILTERS.map((filter) => {
            const isOpen = openFilter === filter.key
            const selectedCount = selections[filter.key]?.length ?? 0
            const hasSelections = selectedCount > 0
            return (
              <div key={filter.key} className="relative shrink-0 z-70">
                <button
                  data-filter-btn
                  onClick={() => setOpenFilter(isOpen ? null : filter.key)}
                  className={`group shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[11px] md:text-xs font-semibold transition-all duration-300 ease-out active:scale-95 border ${
                    isOpen || hasSelections
                      ? 'bg-[var(--color-brand-purple)] text-white border-[var(--color-brand-purple)] shadow-[0_4px_12px_rgba(107,33,168,0.35)]'
                      : 'hover:shadow-sm hover:-translate-y-[1px]'
                  }`}
                  style={!(isOpen || hasSelections) ? {
                    backgroundColor: `${filter.color}15`,
                    color: filter.color,
                    borderColor: `${filter.color}40`,
                  } : undefined}
                >
                  {filter.label}
                  {hasSelections && (
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[9px] font-bold">
                      {selectedCount}
                    </span>
                  )}
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 14 }}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <FilterDropdown
                    filter={filter}
                    selected={selections[filter.key] ?? []}
                    onToggle={(value) => handleToggle(filter.key, value)}
                    onClear={() => handleClear(filter.key)}
                    onClose={() => setOpenFilter(null)}
                  />
                )}
              </div>
            )
          })}

          <div className="w-px h-4 bg-[#E5E7EB] shrink-0 mx-0.5" aria-hidden="true" />

          <button className="group shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-[8px] border border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)] hover:bg-gray-50 transition-all duration-300 ease-out active:scale-95 hover:shadow-sm hover:-translate-y-[1px] font-semibold text-[11px] md:text-xs ml-auto">
            <FilterListIcon
              sx={{ fontSize: 14 }}
              className="text-[var(--color-brand-purple)] transition-transform duration-300 ease-out group-hover:rotate-90"
            />
            More Filters
            {totalSelections > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--color-brand-purple)] text-white flex items-center justify-center text-[9px] font-bold">
                {totalSelections}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col min-h-0">
        {/* Map Placeholder Area */}
        <div className="flex-1 relative bg-[#e8ecee] overflow-hidden flex items-center justify-center">
          {/* Fake Map Grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.25 }} />
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-white/20" />
          
          {/* Map Controls */}
          <div className="absolute right-2.5 top-2.5 flex flex-col gap-1.5 z-10">
            <button className="w-8 h-8 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-brand-purple)] hover:scale-110 active:scale-95 transition-all duration-200 border border-gray-100/50">
              <MyLocationIcon sx={{ fontSize: 16 }} />
            </button>
            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden border border-gray-100/50">
              <button className="w-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/5 border-b border-gray-100 transition-all duration-200">
                <AddIcon sx={{ fontSize: 16 }} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/5 transition-all duration-200">
                <RemoveIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>

          {/* Fake Map Markers */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100/80 p-1 flex items-center gap-1.5 hover:shadow-[0_4px_14px_rgba(107,33,168,0.15)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 rounded-[4px] bg-[var(--color-brand-purple)] text-white flex items-center justify-center shadow-sm">
                <BusinessIcon sx={{ fontSize: 11 }} />
              </div>
              <div className="pr-1.5">
                <div className="text-[10px] font-bold text-[var(--color-text-primary)] leading-tight">₹ 1.25 Cr</div>
                <div className="text-[7px] text-[var(--color-text-secondary)] font-medium">3 BHK</div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100/80 p-1 flex items-center gap-1.5 hover:shadow-[0_4px_14px_rgba(107,33,168,0.15)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 rounded-[4px] bg-[var(--color-brand-purple)] text-white flex items-center justify-center shadow-sm">
                <BusinessIcon sx={{ fontSize: 11 }} />
              </div>
              <div className="pr-1.5">
                <div className="text-[10px] font-bold text-[var(--color-text-primary)] leading-tight">₹ 2.40 Cr</div>
                <div className="text-[7px] text-[var(--color-text-secondary)] font-medium">4 BHK</div>
              </div>
            </div>
          </div>

          {/* Location Pin */}
          <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border-[1.5px] border-white shadow-[0_0_0_3px_rgba(59,130,246,0.2)] animate-pulse" />
          </div>
        </div>

        {/* List Sheet Container */}
        <div className="bg-white rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-20 flex flex-col h-[60%] min-h-[280px]">
          <div className="w-full flex justify-center py-1.5 shrink-0 cursor-grab active:cursor-grabbing">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          
          <div className="px-3 pb-2 flex justify-between items-center shrink-0 border-b border-[var(--color-border-default)]">
            <span className="font-bold text-[var(--color-text-primary)] text-[11px]">
              128 Properties Found
            </span>
            <button className="flex items-center text-[9px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
              Sort by: <span className="text-[var(--color-brand-purple)] font-bold ml-1 mr-0.5">Relevance</span>
              <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pt-2 pb-3 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {PROPERTIES.map((property) => (
              <div 
                key={property.id}
                className="flex items-start gap-2.5 p-2 bg-white border border-[var(--color-border-default)] rounded-xl hover:border-[var(--color-brand-magenta)]/30 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.05)]"
              >
                {/* Image */}
                <div className="relative w-[90px] h-[68px] sm:w-[105px] sm:h-[75px] rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100/50">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  {property.isFeatured && (
                    <div className="absolute top-1 left-1 bg-[var(--color-brand-purple)]/90 backdrop-blur-sm text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded shadow-sm tracking-wide">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[68px] sm:h-[75px] py-0.5">
                  <div>
                    <div className="flex justify-between items-start gap-1.5">
                      <div className="min-w-0">
                        <h3 className="font-bold text-[var(--color-text-primary)] text-[10px] leading-tight truncate">
                          {property.name}
                        </h3>
                        <div className="flex items-center text-[var(--color-text-secondary)] text-[8px] mt-0.5">
                          <LocationOnOutlinedIcon sx={{ fontSize: 10 }} className="mr-0.5 shrink-0 text-[var(--color-brand-magenta)]" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-extrabold text-[var(--color-text-primary)] text-[11px] leading-tight">
                          {property.price}
                        </div>
                        <div className="text-[7px] text-[var(--color-text-secondary)] font-medium mt-0.5">
                          {property.pricePerSqft}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-[8px] text-[var(--color-text-secondary)] mt-1 font-medium">
                      <span className="text-[var(--color-text-primary)]">{property.type}</span>
                      <span className="mx-1 text-gray-300">•</span>
                      <span>{property.area}</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between w-full">
                    <div className={`flex items-center text-[7px] font-bold gap-1 mt-0.5 px-1.5 py-0.5 rounded-[4px] border ${
                      property.statusColor === 'brand'
                        ? 'bg-[var(--color-brand-purple)]/5 border-[var(--color-brand-purple)]/15'
                        : 'bg-amber-50 border-amber-200/50'
                    }`}>
                      <span className={property.statusColor === 'brand' ? 'text-[var(--color-brand-purple)]' : 'text-amber-600'}>
                        {property.status}
                      </span>
                      <span className={property.statusColor === 'brand' ? 'text-[var(--color-brand-purple)]/30' : 'text-amber-600/30'}>•</span>
                      <span className={property.statusColor === 'brand' ? 'text-[var(--color-brand-purple)]' : 'text-amber-600'}>
                        {property.statusDetail}
                      </span>
                    </div>
                    <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand-magenta)] transition-all duration-200 p-0.5 -mr-0.5 rounded-full hover:bg-[var(--color-brand-magenta)]/5 active:scale-90">
                      <BookmarkBorderIcon sx={{ fontSize: 12 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
