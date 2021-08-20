/* global customElements, HTMLElement, HTMLLIElement, HTMLButtonElement */

class GanttChart extends HTMLElement {
  connectedCallback () {
    this.provideConfigAsCSSProps()
  }

  provideConfigAsCSSProps () {
    this.style.setProperty('--day-count', this.days)
    this.style.setProperty('--group-children-visibility', this.groups === 'collapsed' ? 'hidden' : 'visible')
  }

  get days () {
    const days = this.getAttribute('days')
    if (!days) {
      throw new Error('you did not specify any "days". We do not now how long the desired schedule should be')
    }
    return days
  }

  get groups () {
    const groups = this.getAttribute('groups')
    return ['collapsed', 'expanded'].includes(groups) ? groups : 'expanded'
  }

  get src () {
    return this.getAttribute('src')
  }
}

class TaskSchedule extends HTMLElement {
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

class Toggle extends HTMLButtonElement {
  get active () {
    return this.activeLabel
  }

  get inactive () {
    return this.inactiveLabel
  }

  set active (label) {
    this.activeLabel = label
  }

  set inactive (label) {
    this.inactiveLabel = label
  }

  activate () {
    this.innerText = this.active
  }

  deactivate () {
    this.innerText = this.inactive
  }

  static build (activeLabel, inactiveLabel) {
    const button = document.createElement('button', { is: 'garganttua-group-toggle' })
    button.active = activeLabel
    button.inactive = inactiveLabel
    button.innerText = activeLabel
    // the button is properly created, but we let's add the `is` attribute, so that we can find the button in the dom.
    button.setAttribute('is', 'garganttua-group-toggle')
    return button
  }
}

class TaskGroup extends HTMLLIElement {
  connectedCallback () {
    this.groupGrid = this.querySelector(':scope > garganttua-gantt-grid')
    this.subList = this.querySelector(':scope > [is=garganttua-task-list]')
    this.nestedTaskGroups = Array.from(this.querySelectorAll('[is=garganttua-task-group]'))

    if (this.subList) {
      this.attachToggles()
    }
  }

  attachToggles () {
    const groupGridDescription = this.groupGrid.querySelector('p')
    this.groupChildrenToggle = Toggle.build('show', 'hide')

    this.groupChildrenToggle.addEventListener('click', e => {
      e.preventDefault()
      const currentVisibility = this.subList.style.getPropertyValue('visibility')

      if (currentVisibility === 'visible') {
        this.nestedTaskGroups.forEach(group => group.resetCollapsedState())

        this.subList.style.setProperty('visibility', 'hidden')
        this.groupChildrenToggle.activate()
      } else {
        this.subList.style.setProperty('visibility', 'visible')
        this.groupChildrenToggle.deactivate()
      }
    })

    groupGridDescription.after(this.groupChildrenToggle)
  }

  resetCollapsedState () {
    this.groupChildrenToggle.activate() // reset to active label
    this.subList.style.removeProperty('visibility')
  }
}

customElements.define('garganttua-gantt-chart', GanttChart)
customElements.define('garganttua-gantt-task-schedule', TaskSchedule)
customElements.define('garganttua-task-group', TaskGroup, { extends: 'li' })
customElements.define('garganttua-group-toggle', Toggle, { extends: 'button' })
