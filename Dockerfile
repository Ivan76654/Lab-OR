FROM postgres:15-alpine

LABEL maintainer="Ivan Lovric"
LABEL version="1.0"

ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB ORLab

COPY dump.sql /docker-entrypoint-initdb.d/
