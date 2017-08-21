# Project Name

> Find concerts near user and generate a "preview" playlist.

## Center for Kids Who Can't Code Good and Wanna Learn to Build Apps Good Too

  - Tyler Carson
  - Karun Pavithran
  - Ting Wang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Open localhost:1337 to access the app upon installation of directories. You can change date to see other concerts, which then save to the database for faster access.

## Confusing things we had to do:
> 1. We passed a callback down from the index.jsx to Concert Entry to handle hovers, which triggers a state change in the index. That gets passed down as props to the Map and then to the Marker which triggers the change in style for the render.
> 2. Opening page from the root address ‘http://localhost:1337’ will direct the user through the Spotify Implicit Grant Authorization flow. This will direct the user to a login page for their Spotify credentials, and upon successful login, direct the user back via /spotify/callback and a subsequent redirect the home page. The token will be stored as a hash fragment and used for all subsequent Spotify Web API calls for the token’s allotted. We were not able to build in automatic token refresh server side, navigate back to the homepage manually in order to refresh the token client side. Switching to the Authorization Code flow would allow for programmatic refresh. Register your own implementation of the app here to apply for client credentials and supply your own callback location.
> 3. Currently an async bug in the Songkick router. Patched with a setTimeout, but probably a better way of doing it. Future improvements would include add a Spotify API call for each event to save genre in the database, which would allow filtering music events by genre. Potential to delete expired events from database, and update if new events have been added for a particular date since last fetch to the API.


## Things you can improve on:
> 1. We currently have a hard-coded map center that our SongKick API is searching around. If you can figure out how to search by location through the Google Maps API and parse that lat/lng to the SongKick API call you're good to go, baby.
> 2. You can add functionality to log in and store your favorite events in another component.
> 3. You can implement OAuth to share events you're going to with Spotify/Facebook friends.
> 4. We wanted to filter by genre (accessible from the Spotify response) and by distance (lat/lng of the event accessible from the SongKick resposne). Now that's your job.


## Requirements

- Node 6.4.x
- Redis 2.6.x
- Postgresql 9.1.x
- Sequelize
- Axios 0.16.x
- React 15.6.x
- Webpack 3.4.x
- ReactDOM 15.6.x
- Nodemon 1.11.0
- JQuery 3.1.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1JaED9wKnWgJs4NfgddPCDYzuq1ZmzEWUe5YJnrG30gs/edit)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
