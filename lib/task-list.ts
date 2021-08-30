import { z } from 'zod'

export interface Task {
  type: string
  description: string
  start?: string
  end?: string,
  content?: string,
  state?: string
}

export interface TaskGroup {
  type: string
  description: string
  tasks: Array<Task|TaskGroup>
}

export type TaskList = Array<Task|TaskGroup>

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/
const dateFormatErrorMessage = 'the task date needs to be in the format of YYYY-mm-dd.'

const stateFormat = /^[a-z-_]+$/
const stateFormatErrorMessage = 'the state format can contain characters from a-z, dashes or underscores.'

export const stateValidation = z.string().regex(stateFormat, stateFormatErrorMessage).optional()

const Task: z.ZodSchema<Task> = z.object({
  type: z.literal('task'),
  description: z.string(),
  start: z.string().regex(dateFormat, dateFormatErrorMessage).optional(),
  end: z.string().regex(dateFormat, dateFormatErrorMessage).optional(),
  content: z.string().optional(),
  state: stateValidation
})

const TaskGroup: z.ZodSchema<TaskGroup> = z.lazy(() =>
  z.object({
    type: z.literal('group'),
    description: z.string(),
    tasks: z.array(Task.or(TaskGroup))
  })
)

const TaskList: z.ZodSchema<TaskList> = z.array(Task.or(TaskGroup))

const parse = async (input: Record<string, unknown>): Promise<TaskList> => TaskList.parseAsync(input)

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
