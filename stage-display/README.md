# Stage Display

**A node.js App wrapped into Electron to Display informations on a stage display.**

The data will be sent over REST into the Stage Display App. This enables this GUI to be used by different presentation softwares.

![Image](../stage-display/screenshot.png?raw=true)

The main Files are:

- `index.html` - A web page to render.
- `main.js` - Starts the app and creates a browser window to render HTML.
- `package.json` - Points to the app's main file and lists its details and dependencies.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
# Go into the repository
cd stage-display
# Install dependencies and run the app
npm install && npm start
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).
