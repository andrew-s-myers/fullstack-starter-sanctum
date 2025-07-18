dev:
	docker compose up -d back-end front-end-web

test-phpunit:
	docker compose exec back-end php artisan test

test-vitest:
	docker compose run --rm --service-ports vitest

reset-db:
	docker compose exec back-end php artisan migrate:fresh --seed

key:
	docker compose exec back-end php artisan key:generate

setup:
	cp back-end/.env.example back-end/.env
	touch back-end/database/database.sqlite
	sed -i 's/^APP_NAME=.*/APP_NAME=project-name/' back-end/.env
	sed -i 's|^APP_URL=.*|APP_URL=http://localhost:8000|' back-end/.env
	sed -i 's|^# DB_DATABASE=.*|DB_DATABASE=/var/www/html/database/database.sqlite|' back-end/.env
	docker compose exec back-end composer install --no-scripts
	make key
	make reset-db
