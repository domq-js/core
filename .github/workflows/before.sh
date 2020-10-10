#!/bin/sh
GITBOOK_REPO_NAME="$VS_CHANGE_LOG_ACCOUNT_NAME/domq"

echo "
🔧  Fixing Gitbook Github Repositry Name

Existing Repo Name : $GITBOOK_GITHUB_REPO

New Repo Name : $GITBOOK_REPO_NAME
"

echo "GITBOOK_GITHUB_REPO=$GITBOOK_REPO_NAME" >> $GITHUB_ENV
