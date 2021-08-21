export class TaskSchedule extends HTMLElement {
    connectedCallback() {
        this.provideConfigAsCSSProps();
    }
    provideConfigAsCSSProps() {
        if (this.start && this.end) {
            this.style.setProperty('--schedule-start', this.start);
            this.style.setProperty('--schedule-end', this.end);
        }
    }
    get start() {
        return this.getAttribute('start');
    }
    get end() {
        return this.getAttribute('end');
    }
}
