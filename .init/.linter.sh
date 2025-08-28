#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-online-647805-647814/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

