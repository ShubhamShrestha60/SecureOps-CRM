# Multi-stage Dockerfile for Laravel Backend
FROM php:8.3-fpm-alpine as build

# Install system dependencies
# hadolint ignore=DL3018
RUN apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    libzip-dev \
    unzip \
    git \
    oniguruma-dev \
    postgresql-dev \
    linux-headers

# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy application code
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Final Stage
FROM php:8.3-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies
# hadolint ignore=DL3018
RUN apk add --no-cache \
    libpng \
    libjpeg-turbo \
    freetype \
    zip \
    libzip \
    libpq \
    oniguruma

# Copy PHP extensions and configuration from build stage
COPY --from=build /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# Copy from build stage
COPY --from=build /var/www /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Generate APP_KEY if not provided and serve
EXPOSE 8000

CMD ["sh", "-c", "php artisan key:generate --force && php artisan serve --host=0.0.0.0 --port=8000"]
