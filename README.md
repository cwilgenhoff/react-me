# React-Me

This react app is a proof of concept of several technologies.

## Installation

Install all dependencies.

```
$ npm install
```

## Development

Builds the application and starts its express web-server.

```
$ gulp
```

## Build

Builds a minified version of the application in the public folder.

```
$ gulp build --type production
```

## Test

Runs a suite of unit tests.

```
$ npm test
```

## Requirements

React-me solves one requirement and it's as follows:

> "As a user, I want to see a list detailing magazines and/or books publications so I can later decide which one to buy."

### Details

The list of publications will show the publication name, a summary and a cover image.

## Technical Requirements

Develop a simple interface using the following stack, with automation in mind, that connects to a CouchDB database.

* [React](https://facebook.github.io/react/)
* [Reflux](https://github.com/reflux/refluxjs)
* [NodeJS](https://nodejs.org/en/)
* [Express 4](http://expressjs.com/)
* [PouchDB](http://pouchdb.com/)
* [WebPack](https://webpack.github.io/)

## Folder Structure

```
.
├── public                                          # Output folder for Bundle.
├── src                                             # Source code of the entire application.
│   ├── client                                      # Front End Application.
│   │   ├── app                                     # Backend End Application.
│   │   │   ├── actions                             # Reflux Actions.
│   │   │   ├── components                          # React Components.
│   │   │   ├── helpers                             # Utilities.
│   │   │   ├── pages                               # React Components (pages).
│   │   │   ├── stores                              # Reflux Stores.
│   │   │   ├── app.js                              # React App Runner.
│   │   │   └── routes.js                           # React Router Setup.
│   │   ├── assets                                  # Static Assets (css, images).
│   │   ├── tests                                   # Front End Test Suite .
│   │   └── index.html                              # Entry point for React App.
│   └── server                                      # Backend End Application.
│       ├── config                                  # Backend End Environment Configuration.
│       ├── dataLayers                              # Data Layers for Connection to DBs.
│       ├── models                                  # Data Models for Abstracting Data Layers.
│       ├── routes                                  # Exposed REST API Endpoints.
│       ├── tests                                   # Backend End Test Suite.
│       ├── app.js                                  # Backend End Environment Configuration.
│       └── index.js                                # Backend End Entry Point.
├── gulpfile.js                                     # Gulp File for Task Automation.
├── package.json                                    # List of 3rd Party Libraries and Utilities.
├── README.md                                       # This file.
└── webpack.config.js                               # Webpack Configuration.

```

## Environment Configuration

React-me server can run in any desired port and can connect to any CouchDB database. For that, it provides a configuration file placed inside `src/server/config/<env>.js`

```
    config.appPort = 7200;                          # Set PORT for Express to use.

    config.dataLayer = {                            # Create custom Data Layers and Configurations.
        use: 'pouchdb',                             # Set Default Data Layer to use.
        pouchdb: {
            dbName: 'test-collection-dev',          # Set Name of the Local DB Replicate.
            remote: {
                dbName: 'test-collection',          # Set Name of the Remote DB.
                protocol: 'http',                   # Set Protocol of the Remote DB Connection.
                url: 'localhost:5984',              # Set URL of the Remote DB Connection.
                username: '',                       # Set username of the Remote DB Connection.
                password: ''                        # Set username of the Remote DB Connection.
            },
            options: {
                live: true                          # Place PouchDB replication options.
            }
        }
    };

    config.cors = {                                 # Place Express CORS Configuration.

    };
```

* **Important**: `<env>` matches to what was set for NODE_ENV global variable.

## Design Guidelines

React-me tries to follows these design guidelines:

* Simple and Extensible Folder Structure
* Favor Readability
* Favor Modularity
* Favor Testability
* Provide Documentation

## Design Process

Given the requirement mentioned above we can identify one mayor component, a **list of publications**, this list also suggests another one, a **publication** by itself.

Next question should be, what makes a **publication**? Well, a *publication* is simply a **title**, a **summary** and a **cover image**.

Also we'll need a page to show that list of publications, so another component arises.

This list of **publications** must be gathered from a CouchDB database. So, our UI needs a **backend**, it will connect to our DB and will return with the list of **publications**. Although, CouchDB provides a REST API and can act as a backend we should stick with this design due the database can be changed and we would loose that possibility if we do this.

Steeping out, we realize we can solve this problem using the usual MVC pattern, we can have a view that talks to our controller and it will connect to our models to get our data. But, in the React world a new architectural approach has arise and it's called Flux; although MVC goes pretty smooth for small applications, as our application grows and gets complex the scalability and issues gets complex as well. Flux attempts to solve this problem proving a simple and single directional data flow. Thus, as this is a proof of concept we'll follow that approach to get a deeper feeling about it.

Flux proposes the following:

```
╔═════════╗       ╔════════╗       ╔═════════════════╗
║ Actions ║──────>║ Stores ║──────>║ View Components ║
╚═════════╝       ╚════════╝       ╚═════════════════╝
     ^                                      │
     └──────────────────────────────────────┘

``` 

>The pattern is composed of actions and data stores, where actions initiate new data to pass through data stores before coming back to the view components again. If a view component has an event that needs to make a change in the application's data stores, they need to do so by signaling to the stores through the actions available.

Therefore, in our application the main **action** for users is to get publications, this action requests to our **publication** store for data and that data is passed to our **list of publication** component, this component internally loops through the list creating **publication** components. Finally, every **publication** component will know how to render by itself. In our case, it's just a combination of styled `divs`.