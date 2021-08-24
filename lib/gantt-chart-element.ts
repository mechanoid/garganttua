import { load, TaskList } from './task-list.js'
// import { TaskGroupElement } from './task-group-element.js'
import { TaskListElement } from './task-list-element.js'
// import { TaskGroup } from './task-group.js'

export class GanttChartElement extends HTMLElement {
  tasks: TaskList
  taskList?: TaskListElement

  constructor () {
    super()
    this.tasks = []
  }

  async connectedCallback (): Promise<void> {
    this.provideConfigAsCSSProps()

    if (this.src) {
      this.tasks = await load(this.src)

      if (this.tasks.length > 0) {
        this.taskList = TaskListElement.build(this.tasks)
        this.appendChild(this.taskList)
      }
    }
  }

  provideConfigAsCSSProps (): void {
    this.style.setProperty('--day-count', this.days)
    this.style.setProperty('--group-children-visibility', this.groups === 'collapsed' ? 'hidden' : 'visible')
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
