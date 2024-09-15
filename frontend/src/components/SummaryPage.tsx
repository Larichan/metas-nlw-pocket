import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-BR';
import { CheckCircle2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import logoCheck from '../assets/check.png';
import { createGoalCompletion } from "../http/CreateGoalCompletion";
import { deleteGoalCompletion } from "../http/DeleteGoalCompletion";
import { getPendingGoals } from "../http/GetPendingGoals";
import { getSummary } from "../http/GetSummary";
import { Button } from "./Button";
import { DialogTrigger } from "./Dialog";
import { OutlineButton } from "./OutlineButton";
import { Progress, ProgressIndicator } from "./ProgressBar";
import { Separator } from "./Separator";

dayjs.locale(ptBR)

export function SummaryPage() {


  const summary = useQuery({
    queryFn: getSummary,
    queryKey: ['summary'],
    staleTime: 1000 * 60
  })

  const pendingGoals = useQuery({
    queryFn: getPendingGoals,
    queryKey: ['pendingGoals'],
    staleTime: 1000 * 60
  })

  if(!summary.data || !pendingGoals.data) {
    return null
  }

  const startOfWeek = dayjs().startOf('week').format('D MMM')
  const endOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = (summary.data.completed / summary.data.total * 100).toPrecision(3)

  async function handleCompleteGoal(goalId: string) {
    try {
      await createGoalCompletion(goalId)
      summary.refetch()
      pendingGoals.refetch()
      toast.success('Meta realizada!')
    } catch (error) {
      toast.error('Algo deu errado: ' + error)
    }
  }

  async function handleDeleteGoal(goalCompletionId: string) {
    try {
      await deleteGoalCompletion(goalCompletionId)
      summary.refetch()
      pendingGoals.refetch()
      toast.success('Realização da meta cancelada')
    } catch (error) {
      toast.error('Algo deu errado: ' + error)
    }
  }

  return (
      <div className='py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className='size-6' src={logoCheck} alt='logo'/>
          <span className='text-lg font-semibold capitalize'>{startOfWeek} - {endOfWeek}</span>
        </div>
        <DialogTrigger asChild>
          <Button size='sm'>
            <Plus className='size-3'/>
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      
      <div className='flex flex-col gap-3'>
        <Progress value={summary.data.completed} max={summary.data?.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className='flex items-center justify-between text-xs text-zinc-400'>
          <span>Você completou <span className='text-zinc-100'>{summary.data.completed}</span> de <span className='text-zinc-100'>{summary.data.total}</span> metas esta semana.</span>
          <span>{completedPercentage}%</span>
        </div>
      </div>
      <Separator />
      
      <div className='flex gap-3 flex-wrap'>
        {
          pendingGoals.data.pendingGoals.map(goal => {
            return (
                <OutlineButton onClick={() => handleCompleteGoal(goal.id)} key={goal.id} className="group" disabled={goal.completionCount >= goal.desiredWeeklyFrequency}>
                  <Plus className='text-zinc-400 size-4 group-hover:text-pink-700'/>
                  {goal.title}
                </OutlineButton>
            )
          })
        }
      </div>

      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-medium'>Sua semana</h2>
          {
            Object.entries(summary.data.goalsPerDay).map(([date, goals]) => {
              const completionDate = dayjs(date)
              return (
                <div key={date} className='flex flex-col gap-4'>
                  <h3 className='font-medium'>
                    <span className="capitalize">
                      {completionDate.format('dddd')}{' '}
                    </span>
                    <span className='text-zinc-400 text-xs'>
                      ({completionDate.get('D')} de <span className="capitalize">{completionDate.format('MMMM')}</span>)
                    </span>
                  </h3>
                  <ul className='flex flex-col gap-3'>
                    {goals.map(goal => {
                      const completedHour = dayjs(goal.completedAt).format('HH[h]:mm[min]')
                      return (
                        <li key={goal.id} className='flex items-center gap-2'>
                          <CheckCircle2 className='size-4 text-pink-500' />
                          <span className='text-sm text-zinc-400'>Você completou "<span className='text-zinc-300'>{goal.title}</span>" às <span className='text-zinc-300'>{completedHour}</span></span>
                          <span onClick={() => handleDeleteGoal(goal.id)} className='text-sm text-zinc-500 underline hover:cursor-pointer'>Desfazer</span>
                        </li>    
                      )
                    })}
                  </ul>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}