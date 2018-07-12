jquery-node
========

Intention of this module is to bring a browser-ish environment to NodeJS so that unit testing can be made easier.

On Node
1. Creates a document using jsdom and make it available globally. To get window object use document.defaultView.
2. Initializes jquery using jsdom and exports it.

On browser
Returns jquery if AMD is being used.
