# Sample GTD app with Facebook Flux and React.JS


This is a sample TODO app demonstrating use of Facebook Flux and
React.JS.

It was initially introduced at a talk for an outstanding DDDBE
community (Domain-Driven Design Belgium). You can
[watch the whole video](http://youtu.be/QSiTtFWuhZE) and
[read more about the talk](http://abdullin.com/talks/2015-01-06-dddbe-facebook-flux-reactjs/).

## Design

To be more precise, this is an example isomorphic [Flux](http://facebook.github.io/react/docs/flux-overview.html) web application using [fluxible-app](https://github.com/yahoo/fluxible-app), [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr), and [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).

> Version of Flux used here is a bit different from the original Flux,
> as explained in the original Facebook Flux.

The reasons for choosing Yahoo Fluxible:

1. Methodology is closer to CQRS/ES community with event-driven design
experience. It is easier to understand and reason about.

2. Yahoo Fluxible allows building isomorphic applications.

Differences from Yahoo Fluxible that could show up in this code:

1. `actions` are called `events`
2. `action creators` - `event creators`

![Design](https://raw.githubusercontent.com/abdullin/gtd/master/misc/flux-in-cqrs-terms.jpg)

## Running the Sample

To run the sample:

1. Install _Node.JS_.
2. Install _webpack_ globally (it bundles scripts for the client):

        > npm install webpack -g

3. Browse to `web` folder and execute:

        > ./run.sh

4. Open your browser at `http://localhost:3000`

## Updates and News

You can follow my [blog on Software Design](http://abdullin.com) for
any materials and updates on this project.
