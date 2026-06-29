import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  shortcutId?: string
  className?: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { value, onChange, placeholder = 'Search...', shortcutId, className = '' },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
      if (!shortcutId) return

      function handleKeyDown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [shortcutId])

    return (
      <div className={`relative min-w-0 flex-1 ${className}`}>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-muted ease-premium peer-focus-within:text-brand-teal" strokeWidth={1.75} />
        <input
          ref={inputRef}
          id={shortcutId}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input focus-ring peer"
        />
        <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 items-center rounded-md border border-neutral-border/70 bg-neutral-bg px-1.5 py-0.5 text-[10px] font-medium leading-none text-neutral-muted md:inline-flex">
          ⌘K
        </kbd>
      </div>
    )
  },
)
