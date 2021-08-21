import { GanttChart } from './lib/gantt-chart.js'
import { TaskSchedule } from './lib/task-schedule.js'
import { TaskGroup } from './lib/task-group.js'
import { Toggle } from './lib/toggle.js'

customElements.define('garganttua-gantt-chart', GanttChart)
customElements.define('garganttua-gantt-task-schedule', TaskSchedule)
customElements.define('garganttua-task-group', TaskGroup, { extends: 'li' })
customElements.define('garganttua-group-toggle', Toggle, { extends: 'button' })
