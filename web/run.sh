#!/bin/bash
set -e
webpack
DEBUG=* node server.js
