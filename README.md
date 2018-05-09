# Blog

[![Build Status](https://travis-ci.org/billhanyu/blog.svg?branch=master)](https://travis-ci.org/billhanyu/blog)
[![Coverage Status](https://coveralls.io/repos/github/billhanyu/blog/badge.svg?branch=master)](https://coveralls.io/github/billhanyu/blog?branch=master)

Blog built with React+Express+MongoDB.

Frontend:
- React Router
- React Redux
- Material UI

Backend:
- Express
- MongoDB

## Run

- `npm install --all`

### Dev

1. `npm run server` to start the backend API server
2. `npm start` to start the frontend

Frontend hot reloading is enabled!

### Prod

1. `npm run build-server` to build backend to `/build`
2. `npm run build` to build frontend to `/dist`
3. Use whatever process management tool to start `build/server.js`
4. Fill in the production server url with port number `:1717` in `/src/config.js`
5. Use nginx to serve `/dist`
6. nginx config (only the important part):

```
http {
  server {
    listen 80;
    root /home/vcm/blog/dist;
    location / {
      try_files $uri /index.html;
    }
  }
}
```

## Articles Referenced

- [User Auth Using MongoDB and MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)