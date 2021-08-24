/* global HTMLLIElement, HTMLButtonElement */

export class ToggleElement extends HTMLButtonElement {
  activeLabel: string
  inactiveLabel: string

  constructor () {
    super()
    this.activeLabel = ''
    this.inactiveLabel = ''
  }

  get active (): string {
    return this.activeLabel
  }

  set active (label: string) {
    this.activeLabel = label
  }

  get inactive (): string {
    return this.inactiveLabel
  }

  set inactive (label: string) {
    this.inactiveLabel = label
  }

  activate (): void {
    this.innerText = this.active
  }

  deactivate (): void {
    this.innerText = this.inactive
  }

  static build (activeLabel: string, inactiveLabel: string): ToggleElement {
    const is = 'garganttua-group-toggle'
    const button:ToggleElement = document.createElement('button', { is }) as ToggleElement
    button.active = activeLabel
    button.inactive = inactiveLabel
    button.innerText = activeLabel
    // the button is properly created, but we let's add the `is` attribute, so that we can find the button in the dom.
    button.setAttribute('is', is)
    return button
  }
}
