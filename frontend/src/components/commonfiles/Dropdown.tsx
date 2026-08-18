import { useState, useRef, useEffect, useId, useCallback, useMemo, type KeyboardEvent } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  leftIcon?: React.ReactNode
  size?: 'sm' | 'md'
  className?: string
  id?: string
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  leftIcon,
  size = 'md',
  className = '',
  id,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const uid = useId()
  const listId = `${uid}-list`
  
  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  )
  const isSm = size === 'sm'

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handler, { capture: true, passive: true })
    }
    return () => document.removeEventListener('mousedown', handler, { capture: true })
  }, [open])

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFocusedIndex(options.findIndex((o) => o.value === value))
    } else {
      setFocusedIndex(-1)
    }
  }, [open, options, value])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault()
          setOpen(true)
        }
        return
      }
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          setOpen(false)
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex((i) => Math.min(i + 1, options.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex((i) => Math.max(i - 1, 0))
          break
        case 'Home':
          e.preventDefault()
          setFocusedIndex(0)
          break
        case 'End':
          e.preventDefault()
          setFocusedIndex(options.length - 1)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange(options[focusedIndex].value)
            setOpen(false)
          }
          break
        case 'Tab':
          setOpen(false)
          break
      }
    },
    [open, options, focusedIndex, onChange]
  )

  const activeDescendant = open && focusedIndex >= 0 ? `${listId}-option-${focusedIndex}` : undefined

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-activedescendant={activeDescendant}
        aria-label={placeholder}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-2 bg-[#ffffff] border rounded-[6px] cursor-pointer outline-none transition-all duration-200 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 focus-visible:border-[#3B82F6] motion-reduce:transition-none ${
          open ? 'border-[#6a5fc1] ring-2 ring-[#6a5fc1]/15' : 'border-[#cfcfdb] hover:border-[#79628c]'
        } ${
          isSm ? 'px-2.5 py-[6px] text-[14px]' : 'px-3 py-[8px] text-[16px]'
        } font-medium text-[#1f1633]`}
      >
        {leftIcon && (
          <span aria-hidden="true" className="text-[#79628c] shrink-0 transition-colors duration-200">
            {leftIcon}
          </span>
        )}
        <span className="flex-1 text-left truncate min-w-0">
          {selected ? (
            selected.label
          ) : (
            <span className="text-[#79628c] font-normal">{placeholder}</span>
          )}
        </span>
        <ExpandMoreIcon
          aria-hidden="true"
          sx={{ fontSize: isSm ? 16 : 20 }}
          className={`text-[#79628c] shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={placeholder}
          className="absolute z-50 mt-1.5 w-full min-w-[120px] bg-[#ffffff] border border-[#cfcfdb] rounded-[8px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-y-auto max-h-72 py-1.5 origin-top animate-in fade-in zoom-in-95 duration-200 ease-out focus:outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#cfcfdb] [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value
            const isFocused = focusedIndex === i
            
            return (
              <li
                key={opt.value}
                id={`${listId}-option-${i}`}
                role="option"
                aria-selected={isSelected ? 'true' : 'false'}
                onMouseDown={(e) => e.preventDefault()} 
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                onMouseEnter={() => setFocusedIndex(i)}
                className={`px-3 py-2 text-[15px] cursor-pointer transition-colors duration-150 select-none motion-reduce:transition-none ${
                  isSelected
                    ? 'bg-[#422082] text-white font-medium'
                    : 'text-[#1f1633]'
                } ${isFocused && !isSelected ? 'bg-[#f0f0f0]' : ''}`}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}