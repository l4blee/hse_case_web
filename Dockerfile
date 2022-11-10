FROM python:3.9.6-slim-bullseye AS python

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_DEFAULT_TIMEOUT=100

RUN apt update -y && apt upgrade -y
RUN apt install gcc -y

WORKDIR /nosok/

COPY requirments.txt /nosok/
RUN pip install -r requirments.txt

COPY backend/ /nosok/backend
COPY frontend/dist/ /nosok/frontend/dist

CMD python backend/asgi.py