import { api } from '@/lib/axios'
import { WeekDays } from '@/utils/week-days'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title) {
      return toast.error('Preencha o campo com algum comprometimento', {
        style: {
          borderRadius: '10px',
          background: '#3f3f46',
          color: '#fff',
        },
      })
    } else if (weekDays.length === 0) {
      return toast.error('Escolha pelo menos um dia da semana', {
        style: {
          borderRadius: '10px',
          background: '#3f3f46',
          color: '#fff',
        },
      })
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])

    toast.success('Hábito criado com sucesso!', {
      style: {
        borderRadius: '10px',
        background: '#3f3f46',
        color: '#fff',
      },
    })
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day != weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, alimentação saúdavel, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-check-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {WeekDays.map((day) => {
          return (
            <Checkbox.Root
              key={day.value}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(day.value)}
              onCheckedChange={() => handleToggleWeekDay(day.value)}
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-700 group-data-[state=checked]:bg-check-500 group-data-[state=checked]:border-check-600 transition-colors
group-focus:ring-2 group-focus:ring-check-500 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className=" text-white leading-tight">{day.title}</span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 pr-[2.6rem]  flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
