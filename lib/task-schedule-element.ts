import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'
import formatISO from 'date-fns/formatISO'

import { GanttChartElement } from './gantt-chart-element.js'
import { Task, stateValidation } from './task-list.js'
import { TaskScheduleContentElement } from './task-schedule-content-element.js'

const dateToGridStartCol = (date: Date, startDate: Date, rangeLength: number):number => {
  const dateDifference = differenceInDays(date, startDate)
  if (dateDifference < 0) {
    return 0
  } else if (dateDifference > rangeLength) {
    return rangeLength
  }

  return dateDifference
}

const dateToGridEndCol = (date: Date, endDate: Date, rangeLength: number):number => {
  const dateDifference = differenceInDays(endDate, date)

  if (dateDifference <= 0) { // date is later then largest date in grid, so we show it until the end
    return rangeLength
  } else if (dateDifference < rangeLength) { // date is dateDifference away from the grid end
    return rangeLength - dateDifference
  }

  // date is earlier then earliest date in grid, so we show it from col 0
  return 0
}

export class TaskScheduleElement extends HTMLElement {
  ganttChart?: GanttChartElement
  task?:Task
  private _startDate?: string | Date
  private _endDate?: string | Date
  private _start?: number
  private _end?: number
  private _state?: string
  content?: TaskScheduleContentElement

  connectedCallback (): void {
    this.ganttChart = this.closest('garganttua-gantt-chart') as GanttChartElement

    if (this.hasAttribute('state')) {
      this.state = this.getAttribute('state') as string
    }

    if (this.task?.content) {
      this.content = TaskScheduleContentElement.build(this.task)
      this.classList.add('has-content')
      this.appendChild(this.content)
    }

    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps (): void {
    if (this.start !== null && this.end !== null) {
      this.style.setProperty('--schedule-start', (this.start + 2).toString())
      this.style.setProperty('--schedule-end', (this.end).toString())
    }

    if (this.state) {
      this.style.setProperty('background-color', `var(--task-state-${this.state}-bg, var(--task-schedule-base-bg-col))`)
      this.style.setProperty('color', `var(--task-state-${this.state}-ft, inherit)`)
    }
  }

  get start (): number {
    if (this._start || this._start === 0) {
      return this._start
    } else if (this.startDate) {
      if (this.ganttChart?.start && this.ganttChart?.end) {
        this._start = dateToGridStartCol(this.startDate as Date, this.ganttChart.start, this.ganttChart.columnCount)
        return this._start
      }

      throw new Error('no start/end for gantt-chart defined')
    }

    throw new Error('no start date defined for task')
  }

  get end (): number {
    if (this._end || this._end === 0) {
      return this._end
    } else if (this.endDate) {
      if (this.ganttChart?.start && this.ganttChart?.end) {
        this._end = dateToGridEndCol(this.endDate as Date, this.ganttChart.end, this.ganttChart.columnCount)
        return this._end
      }

      throw new Error('no start/end for gantt-chart defined')
    }

    throw new Error('no start date defined for task')
  }

  get startDate (): string | Date {
    if (!this._startDate && this.hasAttribute('start')) {
      this._startDate = parseISO(this.getAttribute('start') as string)
    }

    return this._startDate as Date
  }

  set startDate (unparsed: string | Date) {
    this._startDate = (unparsed instanceof Date) ? unparsed : parseISO(unparsed)
    this.setAttribute('start', formatISO(this._startDate, { representation: 'date' }))
  }

  get endDate (): string | Date {
    if (this._endDate) {
      return this._endDate
    } else if (this.hasAttribute('end')) {
      this._endDate = parseISO(this.getAttribute('end') as string)
    } else {
      throw new Error('schedule has no end-date')
    }

    return this._endDate
  }

  set endDate (unparsed: string | Date) {
    this._endDate = (unparsed instanceof Date) ? unparsed : parseISO(unparsed)
    this.setAttribute('end', formatISO(this._endDate, { representation: 'date' }))
  }

  get state (): string {
    return this._state || ''
  }

  set state (state: string) {
    if (state) {
      const parsed = stateValidation.parse(state) as string

      if (parsed) {
        this._state = parsed
        this.setAttribute('state', this._state)
        this.classList.add(`state-${this._state}`)
      }
    }
  }

  static build (task: Task): TaskScheduleElement {
    const element = document.createElement('garganttua-task-schedule') as TaskScheduleElement
    element.task = task
    if (task.start) {
      element.startDate = task.start
    }

    if (task.end) {
      element.endDate = task.end
    }

    return element
  }
}
