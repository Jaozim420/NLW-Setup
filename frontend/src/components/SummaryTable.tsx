import { api } from '@/lib/axios'
import { generateDatesYearBeginning } from '@/utils/generate-dates-year-beginning'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { WeekDays } from '../utils/week-days'
import { HabitDay } from './HabitDay'

const summaryDates = generateDatesYearBeginning()

const minimumSummaryDateSize = 18 * 7 //18 weeks
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data)
    })
  }, [])

  return (
    <div className="lg:w-full lg:flex lg:flex-row flex-col">
      <div className="grid lg:grid-rows-7 lg:grid-flow-row lg:gap-3 lg:grid-cols-none grid-cols-7 gap-x-3 grid-flow-col">
        {WeekDays.map((day) => {
          return (
            <div
              key={day.value}
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
            >
              {day.text}
            </div>
          )
        })}
      </div>

      <div className="lg:grid lg:grid-rows-7 lg:grid-flow-col lg:gap-3 grid grid-cols-7 gap-x-3 gap-y-2">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-check-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed border-background"
              />
            )
          })}
      </div>
    </div>
  )
}
