import { Toggle } from './toggle';
export class TaskGroup extends HTMLLIElement {
    connectedCallback() {
        this.groupGrid = this.querySelector(':scope > garganttua-gantt-grid');
        this.subList = this.querySelector(':scope > [is=garganttua-task-list]');
        this.nestedTaskGroups = Array.from(this.querySelectorAll('[is=garganttua-task-group]'));
        if (!!this.groupGrid && !!this.subList) {
            this.attachToggles();
        }
    }
    attachToggles() {
        const groupGridDescription = this.groupGrid?.querySelector('p');
        this.groupChildrenToggle = Toggle.build('show', 'hide');
        this.groupChildrenToggle.addEventListener('click', e => {
            e.preventDefault();
            const listVisibility = this.subList?.style.getPropertyValue('visibility');
            if (listVisibility === 'visible') {
                this.nestedTaskGroups?.forEach((group) => { group.resetCollapsedState(); });
                this.subList?.style.setProperty('visibility', 'hidden');
                this.groupChildrenToggle?.activate();
            }
            else {
                this.subList?.style.setProperty('visibility', 'visible');
                this.groupChildrenToggle?.deactivate();
            }
        });
        if (groupGridDescription) {
            groupGridDescription.after(this.groupChildrenToggle);
        }
        else {
            this.groupGrid?.appendChild(this.groupChildrenToggle);
        }
    }
    resetCollapsedState() {
        this.groupChildrenToggle?.activate(); // reset to active label
        this.subList?.style.removeProperty('visibility');
    }
}
