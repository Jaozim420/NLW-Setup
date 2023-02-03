import * as Popover from '@radix-ui/react-popover'

import clsx from 'clsx'
import { ProgressBar } from './ProgressBar'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { HabitList } from './HabitList'
import { useState } from 'react'

interface HabitDayProps {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function HabitDay({
  amount = 0,
  defaultCompleted = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).locale('pt-br').format('dddd')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 bg-check-900 border border-background rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-check-500 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-check-500 border-background': completedPercentage >= 90,
            'bg-check-600 border-background':
              completedPercentage >= 50 && completedPercentage < 90,
            'bg-check-700 border-background':
              completedPercentage >= 25 && completedPercentage < 50,
            'bg-check-800 border-background':
              completedPercentage >= 1 && completedPercentage < 25,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] max-h-[350px] p-6 rounded-2xl bg-zinc-900 flex flex-col overflow-auto">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
