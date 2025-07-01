Index
- Purpose
- Tech stack
- How to use
- How to build from scratch


Purpose: base template full stack for quick starting projects

Tech stack:
- back-end: Laravel with Sanctum & JWT authentication
- front-end-web: Vite React Typescript+SWC
- front-end-mobile: expo?
- fastapi-ms: fastAPI pydantic AI agent with back-end coordination

How to use:
- git clone
- docker-compose up
- docker-compose build
- docker-compose run

## How to build from scratch: (via WSL2)
# Dependencies
- sudo apt update
- sudo apt install php8.3-xml (necessary for sanctum)

# Actions
- mkdir project-root && cd project-root

- composer create-project laravel/laravel back-end
- composer require laravel/sanctum

- npm create vite@latest front-end-web --template react-ts
- cd front-end-web
- npm install