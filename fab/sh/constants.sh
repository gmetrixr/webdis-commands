#!/bin/sh
export PARENT_PROJECT=gmetri
export REPO_FOLDER=`git rev-parse --show-toplevel`

#export REPO_NAME=$(basename $REPO_FOLDER)
#The above strategy doesn't work for gocd as the folder name changes

export REPO_NAME=help
export SHORT_REF=`git rev-parse --short HEAD`
