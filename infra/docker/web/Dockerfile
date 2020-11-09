FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y tzdata apt-utils vim curl git unzip
RUN apt-get install -y nginx-extras

ADD etc/nginx/nginx.conf /etc/nginx/
ADD etc/nginx/sites-available/symfony.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/symfony.conf /etc/nginx/sites-enabled/symfony.conf
RUN rm /etc/nginx/sites-enabled/default

WORKDIR /home/app

EXPOSE 80

CMD ["nginx"]
