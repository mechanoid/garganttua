import { GanttChartElement } from './gantt-chart-element.js'
import { TimelineItemElement } from './timeline-item-element.js'

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
