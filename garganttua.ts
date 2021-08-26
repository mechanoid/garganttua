import { GanttChartElement } from './lib/gantt-chart-element.js'
import { TaskScheduleElement } from './lib/task-schedule-element.js'
import { TaskListElement } from './lib/task-list-element.js'
import { TaskGroupElement } from './lib/task-group-element.js'
import { ToggleElement } from './lib/toggle-element.js'
import { TimelineElement } from './lib/timeline-element.js'
import { TimelineItemElement } from './lib/timeline-item-element.js'
import { TaskScheduleContentElement } from './lib/task-schedule-content-element.js'
import { TaskElement } from './lib/task-element.js'

customElements.define('garganttua-gantt-chart', GanttChartElement)
customElements.define('garganttua-task', TaskElement)
customElements.define('garganttua-task-schedule', TaskScheduleElement)
customElements.define('garganttua-task-schedule-content', TaskScheduleContentElement)
customElements.define('garganttua-task-list', TaskListElement, { extends: 'ul' })
customElements.define('garganttua-task-group', TaskGroupElement, { extends: 'li' })
customElements.define('garganttua-group-toggle', ToggleElement, { extends: 'button' })
customElements.define('garganttua-timeline', TimelineElement, { extends: 'ul' })

customElements.define('garganttua-timeline-item', TimelineItemElement, { extends: 'li' })
