import { add, format, isFirstDayOfMonth, getDate } from 'date-fns'

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
