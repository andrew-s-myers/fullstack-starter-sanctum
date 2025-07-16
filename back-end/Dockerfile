FROM php:8.2-fpm

WORKDIR /var/www/html
COPY . .

RUN apt update && apt install -y unzip libzip-dev libsqlite3-dev \
	&& docker-php-ext-install pdo pdo_sqlite zip

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

CMD ["php-fpm"]
# CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
