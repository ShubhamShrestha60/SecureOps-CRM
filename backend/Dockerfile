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
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl opcache \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy application code
COPY . .

# Install dependencies and optimize autoloader for production
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
COPY ./docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Copy from build stage
COPY --from=build /var/www /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Production optimization: cache configuration and routes
# Note: This requires environment variables to be set correctly at build time or dummy values
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 9000

CMD ["php-fpm"]
