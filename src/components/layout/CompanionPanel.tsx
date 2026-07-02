import { MessageCircle, X } from 'lucide-react'
import { USER_NAME } from '../../data/constants'
import { useLayout } from '../../context/LayoutContext'

export function CompanionButton() {
  const { toggleCompanion } = useLayout()

  return (
    <button
      type="button"
      onClick={toggleCompanion}
      aria-label="Ask your AI companion"
      className="group focus-ring btn-premium fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-teal px-5 py-3 text-body font-medium text-white shadow-sm hover:bg-brand-teal/90 max-md:bottom-20 max-md:right-4"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
      <span className="max-sm:hidden">Ask your Companion</span>
    </button>
  )
}

export function CompanionPanel() {
  const { companionOpen, setCompanionOpen } = useLayout()

  if (!companionOpen) return null

  const firstName = USER_NAME.split(' ')[0]

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ease-out"
        onClick={() => setCompanionOpen(false)}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-lg"
        aria-labelledby="companion-panel-title"
      >
        <header className="flex items-center justify-between border-b border-neutral-border px-5 py-4">
          <div>
            <h2 id="companion-panel-title" className="text-card-title font-semibold text-neutral-text">
              AI Companion
            </h2>
            <p className="text-caption text-neutral-muted">Meeting intelligence assistant</p>
          </div>
          <button
            type="button"
            onClick={() => setCompanionOpen(false)}
            className="focus-ring rounded-lg p-2 text-neutral-muted ease-premium hover:bg-neutral-bg"
            aria-label="Close companion"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-brand-teal/20 bg-brand-tealLight p-4">
            <p className="text-body text-neutral-text">
              Good morning, {firstName}! I&apos;m your AvaadaMeet companion. I can help you
              prepare for meetings, summarize action items, and draft follow-up emails.
            </p>
          </div>
        </div>

        <footer className="border-t border-neutral-border p-4">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-bg px-4 py-3">
            <input
              type="text"
              placeholder="Ask about your meetings..."
              disabled
              aria-label="Companion message input"
              className="flex-1 bg-transparent text-body text-neutral-muted outline-none"
            />
          </div>
        </footer>
      </aside>
    </>
  )
}
