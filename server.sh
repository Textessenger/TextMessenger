#!/bin/sh

node --stack-trace-limit=1000 --allow-natives-syntax --max_old_space_size=2048 server.js
