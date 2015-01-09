#!/bin/bash
set -e
eslint .
webpack
DEBUG=* node server.js
