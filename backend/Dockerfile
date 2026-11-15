FROM php:8.4-cli

WORKDIR /var/www/html

# Install package sistem dan library pendukung PHP (Debian)
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    git \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    libonig-dev \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath gd zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer 2.8 Binary
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# Copy composer manifest terlebih dahulu untuk docker build caching
COPY composer.json composer.lock ./

# Install dependencies ke dalam image
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copy seluruh source code backend
COPY . .

# Generate optimized autoloader setelah seluruh kode ter-copy
RUN composer dump-autoload --optimize

# Pastikan folder storage dan cache tersedia serta memiliki izin tulis penuh
RUN mkdir -p storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/views \
             storage/logs \
             bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Setup entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
