import { forwardRef } from 'react'
import { Search } from 'lucide-react'
import { workspaceIcon } from '../../design-system/workspace'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { value, onChange, placeholder = 'Search...', className = '' },
    forwardedRef,
  ) {
    return (
      <div className={`search-input-shell ${className}`}>
        <span className="search-input-icon" aria-hidden>
          <Search className={workspaceIcon.md} strokeWidth={workspaceIcon.stroke} />
        </span>
        <input
          ref={forwardedRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input-field"
        />
      </div>
    )
  },
)
