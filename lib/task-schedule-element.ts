export class TaskScheduleElement extends HTMLElement {
  connectedCallback (): void {
    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps (): void {
    if (this.start && this.end) {
      this.style.setProperty('--schedule-start', this.start)
      this.style.setProperty('--schedule-end', this.end)
    }
  }

  get start (): string | null {
    return this.getAttribute('start')
  }

  get end (): string | null {
    return this.getAttribute('end')
  }
}
