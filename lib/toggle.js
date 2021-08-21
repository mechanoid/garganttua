/* global HTMLLIElement, HTMLButtonElement */
export class Toggle extends HTMLButtonElement {
    constructor() {
        super();
        this.activeLabel = '';
        this.inactiveLabel = '';
    }
    get active() {
        return this.activeLabel;
    }
    set active(label) {
        this.activeLabel = label;
    }
    get inactive() {
        return this.inactiveLabel;
    }
    set inactive(label) {
        this.inactiveLabel = label;
    }
    activate() {
        this.innerText = this.active;
    }
    deactivate() {
        this.innerText = this.inactive;
    }
    static build(activeLabel, inactiveLabel) {
        const button = document.createElement('button', { is: 'garganttua-group-toggle' });
        button.active = activeLabel;
        button.inactive = inactiveLabel;
        button.innerText = activeLabel;
        // the button is properly created, but we let's add the `is` attribute, so that we can find the button in the dom.
        button.setAttribute('is', 'garganttua-group-toggle');
        return button;
    }
}
