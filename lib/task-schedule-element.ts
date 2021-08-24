import { parseISO, differenceInDays, formatISO } from 'date-fns'
import { GanttChartElement } from './gantt-chart-element.js'
import { Task } from './task-list.js'

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

  if (dateDifference < 0) {
    return rangeLength
  } else if (dateDifference > rangeLength) {
    return 0
  }

  return dateDifference
}

export class TaskScheduleElement extends HTMLElement {
  ganttChart?: GanttChartElement
  task?:Task
  private _startDate?: string | Date
  private _endDate?: string | Date

  connectedCallback (): void {
    this.ganttChart = this.closest('garganttua-gantt-chart') as GanttChartElement

    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps (): void {
    if (this.start !== null && this.end !== null) {
      this.style.setProperty('--schedule-start', (this.start + 2).toString())
      this.style.setProperty('--schedule-end', (this.end + 2).toString())
    }
  }

  get start (): number {
    if (this.startDate) {
      if (this.ganttChart?.start && this.ganttChart?.end) {
        return dateToGridStartCol(this.startDate as Date, this.ganttChart.start, this.ganttChart.columnCount)
      }

      throw new Error('no start/end for gantt-chart defined')
    }

    throw new Error('no start date defined for task')
  }

  get end (): number {
    if (this.endDate) {
      if (this.ganttChart?.start && this.ganttChart?.end) {
        return dateToGridEndCol(this.endDate as Date, this.ganttChart.end, this.ganttChart.columnCount)
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
    if (!this._endDate && this.hasAttribute('end')) {
      this._endDate = parseISO(this.getAttribute('end') as string)
    }

    return this._endDate as Date
  }

  set endDate (unparsed: string | Date) {
    this._endDate = (unparsed instanceof Date) ? unparsed : parseISO(unparsed)
    this.setAttribute('end', formatISO(this._endDate, { representation: 'date' }))
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
