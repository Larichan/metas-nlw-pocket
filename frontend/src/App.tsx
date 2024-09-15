import { CreateGoalDialog } from './components/CreateGoalDialog'
import { Dialog } from './components/Dialog'

import { useQuery } from '@tanstack/react-query'
import { EmptyGoalsPage } from './components/EmptyGoalsPage'
import { SummaryPage } from './components/SummaryPage'
import { getSummary } from './http/GetSummary'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { data } = useQuery({
    queryFn: getSummary,
    queryKey: ['summary'],
    staleTime: 1000 * 60
  })

  return (
    <Dialog>
      { data && data.total > 0 ? <SummaryPage /> : <EmptyGoalsPage /> }
      
      <CreateGoalDialog />
      <ToastContainer position='top-center' autoClose={5000} theme='colored' stacked />
    </Dialog>
  )
}
