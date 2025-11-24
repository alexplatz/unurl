# Unurl
A simple url shortener, mainly for my own knowledge

## Development
To run the application:
- Clone in the repo
- Ensure you have node and podman installed
- Run `npm i`
- Run `npm run mongo:build` and `npm run mongo`
- Run `npm run dev`
- Then send requests to the api at `http://localhost:3333`

## API
POST `/` `{ "origUrl": "http://myurl.lol", "urlId": "newurl" }` -> returns the created shortened url

GET `/` -> returns the health of the api

GET `${posted_urlId}` -> returns the `origUrl`

## Tech Stack
- UI layer:          None
- Logic layer:       Node/Express, Podman
- Persistence layer: Mongodb

