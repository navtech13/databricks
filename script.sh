#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_PULL_REQUEST_ID: $VERCEL_GIT_PULL_REQUEST_ID"

# Build if stage, main or PRs
# Ignore deployments on pushes without PRs
if [[ "$VERCEL_GIT_COMMIT_REF" == "dev-web" || "$VERCEL_GIT_COMMIT_REF" == "stage" || "$VERCEL_GIT_COMMIT_REF" == "main" || ! -z "$VERCEL_GIT_PULL_REQUEST_ID" ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
