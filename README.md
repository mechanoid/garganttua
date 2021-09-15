# Garganttua

         /  _____/_____ _______  _________    _____/  |__/  |_ __ _______
        /   \  ___\__  \\_  __ \/ ___\__  \  /    \   __\   __\  |  \__  \
        \    \_\  \/ __ \|  | \/ /_/  > __ \|   |  \  |  |  | |  |  // __ \_
         \______  (____  /__|  \___  (____  /___|  /__|  |__| |____/(____  /
                \/     \/     /_____/     \/     \/                      \/

A simplified Gantt-Chart representation tool for the browser, leveraging the power of CSS-grid \o/

## Usage

In the demo directory you find some examples on how to use this library. The recommended way is
to use the library to load a JSON file from the server, containing all tasks to display in the Gantt-chart.

```
<script src="../dist/iife/garganttua.js" type="module" async></script>
<garganttua-gantt-chart src="./data.json" start="2020-12-01" end="2021-03-15" groups="collapsable"></garganttua-gantt-chart>
```

### Element Config

The `garganttua-gantt-chart` custom element has some attributes you have to provide as configuration:

* `src` - **Required.** See "JSON data reference" for the format.
* `start` - **Required.** this reflects the start of the window for the Gantt chart. Tasks will be arranged related to the start and end date of the chart
* `end` - **Required.** this reflects the end of the window for the Gantt chart. Tasks will be arranged related to the start and end date of the chart
* `groups` - add "collapsable" as `groups` attribute if you want to have the sub groups hidden initially. Toggle Buttons to toggle the visibility are attached automatically.


### JSON data reference

The type definitions can be found in `lib/task-list.ts`. But the data structure of the provided JSON data is very easy:
(An extensive example can be seen in demo/data.json)

tasks.json
```
[
  {
    type: "task", // simple task
    description: "some string", // some short task description
    start?: "2021-01-01", // date formatted as ISO date string: yyyy-mm-dd
    end?: "2021-01-15", // date formatted as ISO date string: yyyy-mm-dd
    content?: "SGVsbG8gV29ybGQh" // b64 encoded HTML or text,
    state?: string, // adds state classes to the task schedules, so they can be styled
    link?: string // adds a link to the task description
  },
  ...
  {
    type: "group"
    description: "some string"
    tasks: [ ... ] // a group has some tasks or also new groups
  }
]
```

#### Properties

##### `type`


## Development

```
npm i
npm start
open http://localhost:8080/demo
```
