# Project structure

- NodeJS backend. Express server in `/server.js`
- ReactJS frontend in `/react-app`
- A Typeform questionnaire in `/react-app/src/TypeForm.jsx` which is embeded into the website UX. Typeform has an admin panel (ask Matt for login details) which is neccessary to access for project setup and any editing of the questionaire. Tyepform also acts as our database, as it stores survey responses.
- An API which we query in `api-functions.js` with a users's postcode to retrieve their MP. (members-api.parliament.uk/api)

When a user fills in the survey, their data first goes to Typeform, which keeps a copy of their responses. Typeform then triggers a webhook, which is linked to the back-end of the project. An email is generated for the users and sent to the front end via websockets (socket.io).

# Setup

- Run `npm i` (installs server's node modules)
- Run `npm run install-react` (installs react's node modules)
- For development, run `npm run dev`. The express server will be avalialble at localhost:5000. The React app will start at localhost:3000.

## Webhooks and Ngrok

The React features an embeded Typeform. You will need to expose your localhost to Typeform via webhooks to get the resposnes from the embeded Typeform to generate an email. Download Ngrok from `https://ngrok.com/download` and create an account. Then, navigate to the folder where Ngrok is located and run:

`ngrok http 3000 -host-header="localhost:3000"`

Your terminal should present you with two urls in the form:

`http://[random url].ngrok.io -> http://localhost:3000`
`https://[random url].ngrok.io -> http://localhost:3000`

- Copy the https ngrok url to your clipboard.

- Login to Typeform and navigate to 'uk foreign aid' workspace, then 'connect', then webhooks.

- Add a webhook. Set the URL equal to the ngrok url from your clipboard, then add `/hook` to the end. Your webhook URL should look like:

`https://[random url].ngrok.io/hook`

-Click 'send test request'. If it is working, you should see a 200 OK status response in Typeform's webhook interface and also in the terminal in which you are running Ngrok from.

Ngrok generates a random URL each time it is started. To get a stable URL name, you must buy a subscription to Ngrok ~$7/month.

# Tests

The back-end features tests made using Mocha, Chai, and Puppeteer.
 - To run all the tests, run `npm run test`. 
 - To run tests specifically on the random email generator, run `npm run test-email`. 
 - To run tests specifically on members-api.parliament.uk/api, run `npm run test-postcode`.

# Build

(Optional) React skips some features and warning when running `npm run dev` that will be present in the production build. To see how the app will look in production, run `npm run react-build`. To see the built site, run `serve -s build` and navigate to the port that the terminal indicates the build script is running on.

# Heroku pipeline

We have a Heroku pipeline set up, with a staging site (https://point-7-staging.herokuapp.com/) and a production site (https://www.point7percent.org/). Whe  you make a pull request, two checks will be run

- Github, checking there are no merge conflicts
- Heroku, checking the site can be built if the branch is merges. All tests in the ./tests folder will also be run. (This check takes around 5 minutes).

Please check with Matt if you have not merged a pull reuqest before, or if either of these checks are failing. Once the branch is merged into master, an updated build will automatically be run in the staging site. Heroku will send a notification to slack when the build is done. To see site statuses, log into the Heroku dashboard (ask Matt for login details). The Heorku dashboard also has the 'promote to production' button, which moves the staging site to production.
