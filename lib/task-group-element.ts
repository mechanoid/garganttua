import { ToggleElement } from './toggle-element.js'
import { Task, TaskGroup } from './task-list.js'
import { TaskListElement } from './task-list-element.js'
import { TaskElement } from './task-element.js'

export class TaskGroupElement extends HTMLLIElement {
  task?: HTMLElement
  subList: TaskListElement | null
  nestedTaskGroups?: HTMLElement[]
  groupChildrenToggle?: ToggleElement

  constructor () {
    super()
    this.subList = null
  }

  connectedCallback (): void {
    this.task = this.querySelector(':scope > garganttua-task') as HTMLElement
    this.subList = this.querySelector(':scope > [is=garganttua-task-list]')
    this.nestedTaskGroups = Array.from(this.querySelectorAll('[is=garganttua-task-group]'))

    if (!!this.task && !!this.subList) {
      this.attachToggles()
    }
  }

  attachToggles (): void {
    const taskDescription = this.task?.querySelector('p')
    this.groupChildrenToggle = ToggleElement.build('show', 'hide')

    this.groupChildrenToggle.addEventListener('click', e => {
      e.preventDefault()

      if (this.subList) {
        if (this.subList.isVisibile()) {
          this.nestedTaskGroups?.forEach((group) => { (group as TaskGroupElement).resetcollapsableState() })

          this.subList.hide()
          this.groupChildrenToggle?.activate()
        } else {
          this.subList.show()
          this.groupChildrenToggle?.deactivate()
        }
      }
    })

    if (taskDescription) {
      taskDescription.after(this.groupChildrenToggle)
    } else {
      this.task?.appendChild(this.groupChildrenToggle)
    }
  }

  resetcollapsableState (): void {
    this.groupChildrenToggle?.activate() // reset to active label
    this.subList?.style.removeProperty('visibility')
  }

  static build (group: TaskGroup): TaskGroupElement {
    const is = 'garganttua-task-group'
    const element:TaskGroupElement = document.createElement('li', { is }) as TaskGroupElement

    const groupTaskOverview = TaskElement.build({ type: 'task', description: group.description } as Task)
    element.appendChild(groupTaskOverview)

    const taskList = TaskListElement.build(group.tasks)
    element.appendChild(taskList)

    element.setAttribute('is', is)
    return element
  }
}
