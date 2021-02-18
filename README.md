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

To see how the app will look in production, run `npm run react-build`. This is neccesary before pushing to the demo and production sites. To see the built site, run `serve -s build` and navigate to the port that the terminal indicates the build script is running on.

# Staging and production sites

There are two Heroku sites set up, a staging site (https://point-7-staging.herokuapp.com/) and a production site (https://www.point7percent.org/). 

To push to either of these first install the Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli. Create a 'staging' and 'production' remote branch by running:

`heroku git:remote -a https://git.heroku.com/point-7-staging.git -r staging`
`heroku git:remote -a https://git.heroku.com/production-aid-app.git -r production`

You can now push to staging and production.

## Pushing to staging:

 - Run `npm run react-build` to update the build files.
 - Run `git push staging master` if you are pushing from 'master' branch, or `git push staging +HEAD:master` if you are on any other branches.

## Pushing to production:

 - Run `npm run react-build` to update the build files.
 - Run `git push production master` if you are pushing from 'master' branch, or `git push production +HEAD:master` if you are on any other branches.
