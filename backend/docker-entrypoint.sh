#!/bin/bash
set -e

cd /var/www/html

# Otomatis buat .env dari .env.example jika belum ada
if [ ! -f .env ] && [ -f .env.example ]; then
    echo "[backend] Copying .env.example to .env..."
    cp .env.example .env
fi

# Pastikan APP_KEY valid (32 bytes) tersedia di .env
if [ -f .env ]; then
    sed -i 's/c3VwZXJzZWNyZXRrZXlmaW5hbmNpYWxoZWFsdGg=/yd9JUmij\/+EO+QvIPzBN1rJRcaA1vlDRldEV4n7j6GY=/g' .env 2>/dev/null || true
    if ! grep -q "^APP_KEY=base64:yd9JUmij" .env; then
        sed -i 's/^APP_KEY=.*/APP_KEY=base64:yd9JUmij\/+EO+QvIPzBN1rJRcaA1vlDRldEV4n7j6GY=/g' .env 2>/dev/null || true
    fi
    if ! grep -q "^APP_KEY=" .env; then
        echo "APP_KEY=base64:yd9JUmij/+EO+QvIPzBN1rJRcaA1vlDRldEV4n7j6GY=" >> .env
    fi
fi

# Pastikan direktori storage dan cache selalu siap dan memiliki izin tulis
mkdir -p storage/framework/cache/data \
         storage/framework/sessions \
         storage/framework/views \
         storage/logs \
         bootstrap/cache
chmod -R 777 storage bootstrap/cache 2>/dev/null || true

# Jika vendor/autoload.php tidak ada, jalankan composer install
if [ ! -f vendor/autoload.php ]; then
    echo "[backend] vendor/autoload.php tidak ditemukan, menginstal dependensi..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Eksekusi perintah container
exec "$@"
