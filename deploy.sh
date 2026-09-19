#!/usr/bin/env bash
set -euo pipefail

# Build and run the Docker image locally
docker build -t birthday-site:latest .
docker run --rm -p 8000:80 birthday-site:latest
