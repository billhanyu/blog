# Blog

[![Build Status](https://travis-ci.org/billhanyu/blog.svg?branch=master)](https://travis-ci.org/billhanyu/blog)
[![Coverage Status](https://coveralls.io/repos/github/billhanyu/blog/badge.svg?branch=master)](https://coveralls.io/github/billhanyu/blog?branch=master)

Blog built with React+Express+MongoDB.

Frontend:
- React Router
- React Redux
- Material UI (~~v0.20~~v1.0.0 Don't ask about migration. I don't want to talk about it.)

Backend:
- Express
- MongoDB

Deployed with Docker

## Run

- `npm install --all`

### Dev

1. `npm run server` to start the backend API server
2. `npm start` to start the frontend

Frontend hot reloading is enabled!

### Prod

1. install Docker and docker-compose
2. `docker-compose build`
3. `docker-compose up -d`

## Features

- [x] posts CRUD
- [x] comments CRUD
- [ ] like/unlike (API done, no frontend yet)
- [x] attachments for posts (uploading images to server)

  limit maximum width or height with query params in image links.
  
  Example:
  
  `![](http://blog.com/image.png?width={maxWidth}&height={maxHeight})`

## Articles Referenced

- [User Auth Using MongoDB and MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)

## Thanks

To [the anime fan](https://github.com/Lucytheanimefan) for:

- Testing
- Feature suggestions (post attachments)
- Being 10/10
