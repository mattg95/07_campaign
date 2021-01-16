# Project structure

- NodeJS backend. Express server in `server.js`
- ReactJS frontend in `./react-app`

# Setup

- Run `npm i` (installs server's node modules)
- Run `npm run install-react` (installs react's node modules)
- For development, run `npm run dev`. The express server will be avalialble at localhost:5000. The React app will start at localhost:3000.

## Webhooks and Ngrok

The React features an embeded Typeform. You will need to expose your localhost to Typeform via webhooks to get the resposnes from the embeded Typeform to generate an email. I reccomend downloading ngrok from `https://ngrok.com/download` and create an account. Then, navigate to the folder where ngrok is and run:

`ngrok http 3000 -host-header="localhost:3000"`

Your terminal should present you with two urls in the form:

`http://[random url].ngrok.io -> http://localhost:3000`
`https://[random url].ngrok.io -> http://localhost:3000`

- Copy the https ngrok url to your clipboard.

- Login to Typeform (ask Matt for login details) and navigate to 'uk foreign aid' workspace, then 'connect', then webhooks.

- Add a webhook. Set the URL equal to the ngrok url from your clipboard, then add `/hook` to the end. Your webhook URL should look like:

`https://[random url].ngrok.io/hook`

-Click 'send test request'. With the app running in your localhost, Typeform should recieve a response status of 200. Your webhook is now setup. Completing the survey should generate a email in your local version of the app.

# Tests

The back-end features tests made using Mocha and Chai. To run the tests, run `npm run test`

# Build

To see how the app will look in production, run `npm run build`. This is neccesary before pushing to the heroku hosted demo site. To see the built site, run `serve -s build` and navigate to the port that the terminal indicates the build script is running on

# Demo

- The demo site can be found at `https://uk-foreign-aid-campaign.herokuapp.com/` . To push to heroku, run `git push heroku master`. Heroku only tracks the master branch. If you are pushing from a non-master branch, run `git push heroku +HEAD:master`
