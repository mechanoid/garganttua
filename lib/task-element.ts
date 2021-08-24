import { Task } from './task-list.js'

const buildTaskDescription = (text: string): HTMLParagraphElement => {
  const is = 'garganttua-task-description'
  const element:HTMLParagraphElement = document.createElement('p', { is })
  element.innerText = text
  element.setAttribute('is', is)
  return element
}

export class TaskElement extends HTMLElement {
  static build (task: Task): TaskElement {
    const element:TaskElement = document.createElement('garganttua-task') as TaskElement
    const description = buildTaskDescription(task.description)
    element.appendChild(description)
    if (task.start && task.end) {
      // TODO: provide schedule, based on start/end dates converted to grid-cols
    }
    return element
  }
}