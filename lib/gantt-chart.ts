export class GanttChart extends HTMLElement {
  connectedCallback (): void {
    this.provideConfigAsCSSProps()
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

  get src (): string | null {
    return this.getAttribute('src')
  }
}
