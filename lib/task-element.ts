import { Task, stateValidation } from './task-list.js'
import { TaskScheduleElement } from './task-schedule-element.js'

const buildTaskDescription = (text: string): HTMLParagraphElement => {
  const is = 'garganttua-task-description'
  const element:HTMLParagraphElement = document.createElement('p', { is })
  element.innerText = text
  element.setAttribute('is', is)
  return element
}

export class TaskElement extends HTMLElement {
  task?: Task
  schedule?: TaskScheduleElement
  private _state?: string

  connectedCallback (): void {
    const schedule = this.querySelector('garganttua-task-schedule') as TaskScheduleElement

    if (schedule) {
      this.schedule = schedule
    }

    if (this.task?.state && this.schedule) {
      this.state = this.task.state
      this.schedule.state = this.state
    } else if (this.hasAttribute('state') && this.schedule) { // manual created task element
      this.state = this.getAttribute('state')
      if (this.state) {
        // Note: element is maybe not connected yet, so the setters might not be attached
        this.schedule.setAttribute('state', this.state)
      }
    }

    if (this.state && this.schedule) {
      console.log('setting state')

      this.schedule.state = this.state
    }
  }

  get state (): string | undefined {
    return this._state
  }

  set state (state: string | undefined | null) {
    if (state) {
      const parsed = stateValidation.parse(state)

      if (parsed) {
        this._state = parsed
        this.setAttribute('state', parsed)
      }
    }
  }

  static build (task: Task): TaskElement {
    const element = document.createElement('garganttua-task') as TaskElement
    const description = buildTaskDescription(task.description)
    element.appendChild(description)
    element.task = task

    if (task.start && task.end) {
      const schedule = TaskScheduleElement.build(task)
      element.schedule = schedule
      element.appendChild(schedule)
    }

    return element
  }
}
