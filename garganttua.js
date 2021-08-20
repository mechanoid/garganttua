/* global customElements, HTMLElement, HTMLLIElement, HTMLButtonElement */

import { GanttChart } from './lib/gantt-chart.ts'
import { TaskSchedule } from './lib/task-schedule.ts'
import { TaskGroup } from './lib/task-group.ts'
import { Toggle } from './lib/toggle.ts'

customElements.define('garganttua-gantt-chart', GanttChart)
customElements.define('garganttua-gantt-task-schedule', TaskSchedule)
customElements.define('garganttua-task-group', TaskGroup, { extends: 'li' })
customElements.define('garganttua-group-toggle', Toggle, { extends: 'button' })
