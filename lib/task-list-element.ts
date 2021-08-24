import { TaskElement } from './task-element.js'
import { TaskGroupElement } from './task-group-element.js'
import { TaskList, TaskGroup, Task } from './task-list.js'

const buildTaskListItem = () => {
  const is = 'garganttua-task-list-item'
  const element:HTMLLIElement = document.createElement('li', { is })
  element.setAttribute('is', is)
  return element
}

export class TaskListElement extends HTMLUListElement {
  tasks: TaskList

  constructor () {
    super()
    this.tasks = []
  }

  connectedCallback ():void {
    if (this.tasks) {
      this.tasks.forEach(task => {
        if (task.type === 'task') {
          const listElement = buildTaskListItem()
          const taskElement = TaskElement.build(task as Task)
          listElement.appendChild(taskElement)
          this.appendChild(listElement)
        } else if (task.type === 'group') {
          const groupElement = TaskGroupElement.build(task as TaskGroup)
          this.appendChild(groupElement)
        } else {
          console.warn('unknown task type:', task.type)
        }
      })
    }
  }

  isVisibile ():boolean {
    return this.style.getPropertyValue('visibility') === 'visible'
  }

  hide ():void {
    this.style.setProperty('visibility', 'hidden')
  }

  show ():void {
    this.style.setProperty('visibility', 'visible')
  }

  resetVisibility ():void {
    this.style.removeProperty('visibility')
  }

  static build (tasks:TaskList = []): TaskListElement {
    const is = 'garganttua-task-list'
    const element:TaskListElement = document.createElement('ul', { is }) as TaskListElement
    element.tasks = tasks
    element.setAttribute('is', is)
    return element
  }
}
