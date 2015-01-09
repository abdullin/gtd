# Sample GTD app with Facebook Flux and React.JS


This is a sample TODO app demonstrating use of Facebook Flux and
React.JS.

It was initially introduced at a talk for an outstanding DDDBE
community (Domain-Driven Design Belgium). You can
[watch the whole video](http://youtu.be/QSiTtFWuhZE) and
[read more about the talk](http://abdullin.com/talks/2015-01-06-dddbe-facebook-flux-reactjs/).

## Differences from Facebook Flux

This sample uses Flux version by awesome Yahoo teams -
[Fluxible](https://github.com/yahoo/fluxible-app). This version is a
bit different from the original Flux, as told by awesome Facebook
folks.

The reasons for choosing Yahoo Flux:

1. Methodology is closer to CQRS/ES community with event-driven design
experience. It is easier to understand and reason about.

2. Yahoo Fluxible allows building isomorphic applications.


Other differences that will show up in the code:

1. `actions` are called `events`
2. `action creators` - `event creators`


## Running the Sample

To run the sample:

1. Install _Node.JS_.
2. Install _webpack_ globally (it bundles scripts for the client):

        > npm install webpack -g

3. Browse to `web` folder and execute:

        > ./run

4. Open your browser at `http://localhost:3000`

## Updates and News

You can follow my [blog on Software Design](http://abdullin.com) for
any materials and updates on this project.
