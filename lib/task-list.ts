import { z } from 'zod'

export interface Task {
  type: string
  description: string
  start?: Date
  end?: Date
}

export interface TaskGroup {
  type: string
  description: string
  tasks: Array<Task|TaskGroup>
}

export type TaskList = Array<Task|TaskGroup>

const Task: z.ZodSchema<Task> = z.object({
  type: z.literal('task'),
  description: z.string(),
  start: z.date().optional(),
  end: z.date().optional()
})

const TaskGroup: z.ZodSchema<TaskGroup> = z.lazy(() =>
  z.object({
    type: z.literal('group'),
    description: z.string(),
    tasks: z.array(Task.or(TaskGroup))
  })
)

const TaskList: z.ZodSchema<TaskList> = z.array(Task.or(TaskGroup))

const parse = (input: Record<string, unknown>): TaskList => TaskList.parse(input)

export const load = async (src: string): Promise<TaskList> => {
  if (!src) {
    console.warn('no src for task list download provided')

    return []
  }

  const result = await fetch(src, { credentials: 'same-origin', redirect: 'follow', headers: { Accept: 'application/json' } })

  if (!result.ok) {
    throw new Error(`GarganttuaCantLoadTasks: (${result.status}) ${result.statusText}`)
  }

  const tasks = await result.json().then(parse)

  return tasks
}
