import { Routes, Route } from 'react-router-dom'
import { LayoutProvider } from './context/LayoutContext'
import { MeetingsProvider } from './context/MeetingsContext'
import { AppLayout } from './components/layout/AppLayout'
import { Home } from './pages/Home'
import { Meetings } from './pages/Meetings'
import { ActionItems } from './pages/ActionItems'
import { CalendarPage } from './pages/Calendar'

export default function App() {
  return (
    <LayoutProvider>
      <MeetingsProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/action-items" element={<ActionItems />} />
          </Route>
        </Routes>
      </MeetingsProvider>
    </LayoutProvider>
  )
}
