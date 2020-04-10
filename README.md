# Ticketing App
[View Here](https://limitless-plateau-12479.herokuapp.com)

## What is this?

This is a prototype event ticketing app (think AXS or EventBrite). It's built using the following technologies:

Frontend:
* [React](https://reactjs.org) via [create-react-app](https://github.com/facebook/create-react-app)
* [Redux Toolkit](https://redux-toolkit.js.org/) - For store/state management app wide
* [Apollo React Integrations](https://www.apollographql.com/docs/react/get-started/) - `apollo-boost` and `apollo/react-hooks` are used to communicate with the `graphql` backend
* [React Router](https://github.com/ReactTraining/react-router) - To manage page routing
* [Universal Cookie](https://www.npmjs.com/package/universal-cookie) - to save cart status in-browser
* [Stripe](https://stripe.com/docs/stripe-js/react) To handle payments

Backend:
* [Hasura](https://hasura.io/) - For super fast `graphql` and `postgresql` setup and admin
* [Heroku](https://heroku.com) to quickly serve the Hasura backend

## Motivation

I am building this as way to refresh/update my knowlege on the technologies involved, namely `React` and `graphql` as well as Redux.
