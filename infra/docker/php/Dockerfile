FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN apt-get update && apt-get install -y vim curl git unzip wget

# php 7.4 setup
RUN apt-get update && apt-get install -y php-cli php-xml php-curl php-mbstring php-gd php-zip php-gmp php-intl

ADD etc/php/7.4/cli/conf.d/ /etc/php/7.4/cli/conf.d/
RUN mkdir /run/php

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN curl https://get.sensiolabs.org/security-checker.phar -O
RUN mv security-checker.phar /usr/bin/security-checker
RUN chmod +x /usr/bin/security-checker

# php-fpm 7.4 setup
RUN apt-get update && apt-get install -y php-fpm

ADD etc/php/7.4/fpm/conf.d/ /etc/php/7.4/fpm/conf.d/
ADD etc/php/7.4/fpm/pool.d/www.conf /etc/php/7.4/fpm/pool.d/

CMD ["php-fpm7.4", "-F"]
