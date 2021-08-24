import { add, format, isFirstDayOfMonth, getDate } from 'date-fns'
import { GanttChartElement } from './gantt-chart-element.js'

export class TimelineItemElement extends HTMLLIElement {
  isWeekLabel: boolean
  isDayLabel: boolean
  dayOfSchedule?: number
  chartStart?: Date
  date?: Date

  constructor () {
    super()
    this.isWeekLabel = false
    this.isDayLabel = false
  }

  connectedCallback (): void {
    if (this.chartStart && (this.dayOfSchedule || this.dayOfSchedule === 0)) {
      this.date = add(this.chartStart, { days: this.dayOfSchedule })

      if (isFirstDayOfMonth(this.date)) {
        this.isWeekLabel = true
        this.innerText = format(this.date, 'MMMM yy')
      } else if (getDate(this.date) % 15 === 0) {
        this.isDayLabel = true
        this.innerText = format(this.date, 'dd')
      }

      this.provideConfigAsCSSProps()
    }
  }

  provideConfigAsCSSProps (): void {
    if (this.dayOfSchedule || this.dayOfSchedule === 0) {
      this.style.setProperty('--day-of-schedule', (this.dayOfSchedule + 2).toString())

      if (this.isWeekLabel) {
        this.style.setProperty('--label-span', '10')
      }

      if (this.isDayLabel) {
        this.style.setProperty('--label-row', '2')
      }
    }
  }

  static build (chartStart: Date, day: number): TimelineItemElement {
    const is = 'garganttua-timeline-item'
    const element = document.createElement('li', { is }) as TimelineItemElement
    element.chartStart = chartStart
    element.dayOfSchedule = day
    return element
  }
}

export class TimelineElement extends HTMLUListElement {
  ganttChart?: GanttChartElement

  connectedCallback (): void {
    if (!this.ganttChart) {
      throw new Error('no gantt chart root element found. Element is not thought to be added manually.')
    }

    for (let day = 0; day < this.ganttChart.columnCount; day++) {
      const listItem = TimelineItemElement.build(this.ganttChart.start as Date, day)
      this.appendChild(listItem)
    }
  }

  static build (ganttChart: GanttChartElement): TimelineElement {
    const is = 'garganttua-timeline'
    const element = document.createElement('ul', { is }) as TimelineElement
    element.setAttribute('is', is)
    element.ganttChart = ganttChart

    return element
  }
}
