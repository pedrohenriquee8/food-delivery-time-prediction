FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY apps ./apps
COPY packages ./packages
COPY artifacts/models ./artifacts/models

ENV PYTHONPATH=/app:/app/packages/ml/src
