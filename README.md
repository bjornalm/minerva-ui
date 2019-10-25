This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started with Development

In the project directory, you can run the app in development mode. Make sure you have node.js and npm or yarn installed.

1. Install the packages with `npm install`

2. Start the proxy server needed for CORS with `npm run proxy`

3. Start the app in development mode with `npm start`

## Deploying and running a build.

If you deploy the app on the same machine that runs the API or if the API server supports CORS you don't need the proxy server.

1. Install the packages with `npm install`

2. Build the app using `npm run build`

### `When you have a webserver`

3. Copy the content of your `build` folder to the folder of your web server where you serve static HTML. Make sure your server can serve Singe Page Applications from that folder.

### `When you don't have a webserver`

3. We have included a small [HTTP-server](https://github.com/http-party/http-server) that can be used if needed. You can start it and point it to your build directory with the simple command `http-server ./build`. It will by default be available on http://127.0.0.1:8080 but can also be accessed using the IP your computer has on the network.

## Available Scripts

### `npm run proxy`

Starts a proxy server used by the client to solve CORS. The proxy is then running on http://localhost:8010/proxy
By default the proxy points to http://redmount.net:7681/post-handler
To change the proxy URL you can modify the "proxy" script in package.json.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
