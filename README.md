# LinesClient

A front end client built in react.js for Programmable Web Project course at University of Oulu. It was put together on an extremely strict schedule with basically no plan so it's not my best work.

## To run this app you first need to run the api locally

The instructions for that can be found in the README of the api here: https://github.com/samharju/PWP

As long as you have npm installed running this app should be as simple as navigating to the root directory and running 

`npm install`
and
`npm run dev`

On windows you need to change the line

`"dev": "REACT_APP_API_URL=http://127.0.0.1:8000/api/ npm start",`

to `set "REACT_APP_API_URL=http://127.0.0.1:8000/api/" && npm start` if you're running on CMD or to
`($env:REACT_APP_API_URL="http://127.0.0.1:8000/api/") -and (npm start)` if using powershell.

before executing `npm run dev`


After which the application should pop up in your browser.
