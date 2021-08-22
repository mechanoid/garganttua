// import { TaskGroup } from './task-group.js'
interface Task {
  description: string
}

interface TaskGroup {
  description: string
  tasks: Array<Task|TaskGroup>
}

export type TaskList = Array<Task|TaskGroup>

export class GanttChartElement extends HTMLElement {
  private _tasks: TaskList

  constructor () {
    super()
    this._tasks = []
  }

  async connectedCallback (): Promise<void> {
    this.provideConfigAsCSSProps()

    this.tasks = await this.loadTasks()

    console.log(this.tasks)
  }

  provideConfigAsCSSProps (): void {
    this.style.setProperty('--day-count', this.days)
    this.style.setProperty('--group-children-visibility', this.groups === 'collapsed' ? 'hidden' : 'visible')
  }

  async loadTasks (): Promise<TaskList> {
    if (this.hasSrc()) {
      const result = await fetch(this.src as string)

      if (!result.ok) {
        throw new Error(`GarganttuaCantLoadTasks: (${result.status}) ${result.statusText}`)
      }

      const tasks = result.json()

      return tasks as Promise<TaskList>
    } else {
      return []
    }
  }

  get tasks (): TaskList {
    return this._tasks
  }

  set tasks (tasks: TaskList) {
    this._tasks = tasks
  }

  get days (): string {
    const days = this.getAttribute('days')
    if (!days) {
      throw new Error('you did not specify any "days". We do not now how long the desired schedule should be')
    }
    return days
  }

  get groups (): string {
    const groups = this.getAttribute('groups') || ''
    return ['collapsed', 'expanded'].includes(groups) ? groups : 'expanded'
  }

  hasSrc (): boolean {
    return this.hasAttribute('src')
  }

  get src (): string | null {
    return this.getAttribute('src')
  }
}
