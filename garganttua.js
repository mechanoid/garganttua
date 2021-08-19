/* global customElements, HTMLElement */

class GarganttuaGanttChart extends HTMLElement {
  connectedCallback () {
    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps () {
    this.style.setProperty('--day-count', this.days)
  }

  get days () {
    const days = this.getAttribute('days')
    if (!days) {
      throw new Error('you did not specify any "days". We do not now how long the desired schedule should be')
    }
    return days
  }
}

class GarganttuaTaskSchedule extends HTMLElement {
  connectedCallback () {
    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps () {
    if (this.start && this.end) {
      this.style.setProperty('--schedule-start', this.start)
      this.style.setProperty('--schedule-end', this.end)
    }
  }

  get start () {
    return this.getAttribute('start')
  }

  get end () {
    return this.getAttribute('end')
  }
}

customElements.define('garganttua-gantt-chart', GarganttuaGanttChart)
customElements.define('garganttua-gantt-task-schedule', GarganttuaTaskSchedule)
