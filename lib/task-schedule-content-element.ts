import { Task } from "./task-list.js";

// innerHTML does not execute script tags, but still allows people to bind
// JS to event-attributes. We validate the content below for such attributes and
// reject if any such string is included (also in the text).
// We do explicitly no sanitization as this is doomed to fail.
// There might be ways around that too, but unless people also inject JS code
// in other places this is a good start.
const JS_EVENT_ATTRIBUTES = Object.keys(window).filter((k) => !k.indexOf("on"));

export class TaskScheduleContentElement extends HTMLElement {
  task?: Task;

  connectedCallback(): void {
    if (this.task?.content) {
      const decoded = decodeURIComponent(
        escape(window.atob(this.task.content)),
      );

      if (JS_EVENT_ATTRIBUTES.some((attr) => decoded.includes(attr))) {
        throw new Error(
          `found malicious content in task: ${this.task?.description}`,
        );
      }

      this.innerHTML = decoded;
    }
  }

  static build(task: Task): TaskScheduleContentElement {
    const element = document.createElement(
      "garganttua-task-schedule-content",
    ) as TaskScheduleContentElement;
    element.task = task;
    return element;
  }
}
