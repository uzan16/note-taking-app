#!/usr/bin/env bash

set -ex

# Migrate the DB
echo "DB migration starting..."
alembic upgrade head

# Start the FastAPI server
echo "Starting the API..."
uvicorn main:app --host 0.0.0.0
