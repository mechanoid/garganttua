import { Task } from './task-list.js'

export class TaskScheduleContentElement extends HTMLElement {
  task?: Task

  connectedCallback (): void {
    if (this.task?.content) {
      console.log(atob(this.task.content))

      this.innerHTML = atob(this.task.content).toString()
    }
  }

  static build (task: Task): TaskScheduleContentElement {
    const element = document.createElement('garganttua-task-schedule-content') as TaskScheduleContentElement
    element.task = task
    return element
  }
}
