FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN apt-get update && apt-get install -y vim curl git unzip wget

RUN apt-get install -y gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install -y nodejs

RUN npm install -g yarn

WORKDIR /home/app
