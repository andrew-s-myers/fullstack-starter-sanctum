FROM php:8.2-fpm

WORKDIR /var/www/html
COPY . .

RUN apt update && apt install -y unzip libzip-dev sqlite3 \
    && docker-php-ext-install pdo pdo_sqlite zip

RUN curl -sS https://getcomposer.org/installer | php && php composer.phar install

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
