# News Hub Frontend

## Description
This project demonstrate a simple NEWS hub feature which was given as a SSE technical test at Codification using [News API](https://newsapi.org/). (Backend only). 

This project is a simple application of [News API](https://newsapi.org/) for searching and retrieving live articles from all over the web. The News hub project allows users to search articles through diffrent filter criterias and import necessary articles. Users can later retrieve the imported articles via "Favourites" tab and display a detailed view of the article.

Main features implemented are;

- Article discovery and analysis using [Everything](https://newsapi.org/docs/endpoints/everything) endpoint.
- Retrieve live top and breaking headlines using [Top-Headlines](https://newsapi.org/docs/endpoints/top-headlines) endpoint.
- Retrieve publishers available on the API using [Sources](https://newsapi.org/docs/endpoints/sources) endpoint.
- Retrieve articles according to the filter criterias
- Import favourite articles
- Display a detailed view of a imported article

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Technologies and Services
Technologies
- [JavaScript](https://www.w3schools.com/js/default.asp) - A programming language of the Web.
- [ReactJS](https://reactjs.org/) - Free and open-source front-end JavaScript library for building user interfaces based on UI components. 
- [HTML](https://www.w3schools.com/html/default.asp) - A markup language for describing web documents.
- [CSS](https://www.w3schools.com/css/default.asp) -
- [SCSS]() - contains all the features of CSS and contains more features that are not present in CSS which makes it a good choice for developers to use it.
- [DaisyUI](https://daisyui.com/) - 
daisyUI is a customizable Tailwind CSS component library that prevents verbose markup in frontend applications.
Services
- [News API](https://newsapi.org/) - News API is a simple HTTP REST API for searching and retrieving live articles from all over the web.

## Requirements 
- Reaction version 17.0.2
- Node version 16.13.2
- NPM version 8.1.2
- Mongo version 5.0.6

## Pre-Requisites and setup
- An API key from [News API](https://newsapi.org/account).
- Install [Node.js](https://nodejs.org/) to your local workstation.
- Use [NPM](https://www.npmjs.com/) to manage dependencies.
- Use [Environment Variables]() to manage configuration inside your application. Edit the `.env.stage.dev` file accordingly.
- News Hub frontend can be found from [here](https://github.com/devni-heraliyawala/news-hub-frontend).
- News API backend can be found from [here](https://github.com/devni-heraliyawala/news-hub-backend).
- Default port of `3000` is used for the backend.
- Default port of `3001` is used for the frontend.
- NodeJS backend should be updated, configured and run successfully to start the frontend properly.

## Installation
1. Clone the repo and install the dependencies.
```bash
$ git clone https://github.com/devni-heraliyawala/news-hub-frontend.git
$ cd news-hub-frontend

```
2. Install the dependencies
```bash
$ npm install
```



## Running the app

```bash
# development
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test

