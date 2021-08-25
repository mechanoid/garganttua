import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

import { load, TaskList } from './task-list.js'
// import { TaskGroupElement } from './task-group-element.js'
import { TaskListElement } from './task-list-element.js'
import { TimelineElement } from './timeline-element.js'
// import { TaskGroup } from './task-group.js'

const buildLoaderElement = () => {
  const element = document.createElement('div')
  element.classList.add('loader')
  return element
}

export class GanttChartElement extends HTMLElement {
  tasks: TaskList
  taskList?: TaskListElement
  timeline?: TimelineElement
  private _start?: Date
  private _end?: Date
  loader: HTMLDivElement

  constructor () {
    super()
    this.tasks = []
    this.loader = buildLoaderElement()
  }

  async connectedCallback (): Promise<void> {
    this.provideConfigAsCSSProps()

    this.timeline = TimelineElement.build(this)
    this.prepend(this.timeline)

    if (this.src) {
      this.appendChild(this.loader)
      this.tasks = await load(this.src)
      this.loader.remove()

      if (this.tasks.length > 0) {
        this.taskList = TaskListElement.build(this.tasks)
        this.appendChild(this.taskList)
      }
    }
  }

  provideConfigAsCSSProps (): void {
    this.style.setProperty('--grid-columns', this.columnCount.toString())
    this.style.setProperty('--group-children-visibility', this.collapsable ? 'hidden' : 'visible')
    this.style.setProperty('--group-children-display', this.collapsable ? 'none' : 'block')
  }

  get start (): Date | null {
    const start = this.dateFromAttribute('start')
    return start ? startOfMonth(start) : null // let's use full month for the general chart view (maybe worth a config param)
  }

  get end (): Date | null {
    const end = this.dateFromAttribute('end')
    return end ? endOfMonth(end) : null // let's use full month for the general chart view (maybe worth a config param)
  }

  get columnCount () : number { // alias for daysFromDates related to grid columns
    return this.daysFromDates + 2
  }

  get daysFromDates (): number {
    if (!!this.start && !!this.end) {
      return differenceInDays(this.end, this.start)
    }

    throw new Error('no start/end date provided. Cannot accumulate days from dates.')
  }

  get groups (): string {
    const groups = this.getAttribute('groups') || ''
    return ['collapsable', 'expanded'].includes(groups) ? groups : 'expanded'
  }

  get collapsable (): boolean {
    return this.groups === 'collapsable'
  }

  hasSrc (): boolean {
    return this.hasAttribute('src')
  }

  get src (): string | null {
    return this.getAttribute('src')
  }

  dateFromAttribute (attr: string): Date | null {
    const unparsed = this.getAttribute(attr)

    if (unparsed) {
      return parseISO(unparsed)
    }

    return null
  }
}
