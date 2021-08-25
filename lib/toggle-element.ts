/* global HTMLLIElement, HTMLButtonElement */

export class ToggleElement extends HTMLButtonElement {
  activeText?: string
  inactiveText?: string

  connectedCallback (): void {
    this.innerText = this.activeText || ''
  }

  activate (): void {
    this.innerText = this.activeText || ''
  }

  deactivate (): void {
    this.innerText = this.inactiveText || ''
  }

  static build (activeLabel: string, inactiveLabel: string): ToggleElement {
    const is = 'garganttua-group-toggle'
    const button:ToggleElement = document.createElement('button', { is }) as ToggleElement
    button.setAttribute('is', is)

    button.activeText = activeLabel
    button.inactiveText = inactiveLabel

    return button
  }
}
