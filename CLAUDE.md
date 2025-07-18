# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. This project follows a systematic Domain/Behavioral Driven Development → Test Driven Development approach as outlined in ATTACK.md.

## Project Overview

This is a fullstack monorepo with Laravel backend, React frontend, and Docker containerization. The project uses Laravel Sanctum for API authentication and includes comprehensive tooling for development and testing.

## Development Commands

### Setup & Installation
```bash
# Initial setup (run once)
make setup

# Start development environment (all services)
make dev
# OR: docker compose up -d

# Reset database with fresh migrations and seeds
make reset-db

# Generate new application key
make key
```

### Docker Commands
```bash
# Start all services
docker compose up -d

# Start specific services
docker compose up -d back-end front-end-web

# View logs
docker compose logs -f
docker compose logs back-end front-end-web

# Stop services
docker compose down

# Rebuild containers
docker compose build
docker compose up -d --build
```

### Testing
```bash
# Run Laravel/PHP tests
make test-phpunit
# OR: docker compose exec back-end php artisan test

# Run React/TypeScript tests with Vitest
make test-vitest
# OR: docker compose run --rm --service-ports vitest

# Run individual test files
docker compose exec back-end php artisan test --filter=ExampleTest
cd front-end-web && npm run test Button.test.tsx
```

### Frontend Development
```bash
# Build frontend
cd front-end-web && npm run build

# Lint frontend code
cd front-end-web && npm run lint

# Run frontend tests in watch mode
cd front-end-web && npm run test:watch
```

### Backend Development
```bash
# Run Laravel artisan commands
docker compose exec back-end php artisan <command>

# Install PHP dependencies
docker compose exec back-end composer install

# Run database migrations
docker compose exec back-end php artisan migrate

# Access Laravel Pint (code formatting)
docker compose exec back-end ./vendor/bin/pint
```

### ATTACK.md Workflow Commands (Future)
```bash
# Behavior-driven development commands (to be implemented)
make new-feature BEHAVIOR=behaviors/feature-name.yml
make generate-tests
make scaffold-code DOMAIN=domain_name
make validate-behaviors
make check-drift
make reconcile --prefer-yaml
make docs-api

# Schema migration commands
make migrate-schema FROM=1.0 TO=1.1
make migrate-schema FROM=1.0 TO=1.1 --dry-run
make migrate-schema ROLLBACK=1.0

# E2E testing (to be implemented)
make test-e2e
```

## Architecture

### Backend Structure
- **Framework**: Laravel 12 with PHP 8.3
- **Authentication**: Laravel Sanctum for API token-based auth
- **Database**: SQLite for development, configured for PostgreSQL/MySQL in production
- **Location**: `back-end/` directory
- **Key Files**:
  - `routes/api.php` - API routes with Sanctum middleware
  - `app/Http/Controllers/AuthController.php` - Authentication endpoints
  - `config/sanctum.php` - Sanctum configuration with stateful domains
  - `database/migrations/` - Database schema definitions

### Frontend Structure
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest with React Testing Library
- **Location**: `front-end-web/` directory
- **Key Files**:
  - `src/context/AuthContext.tsx` - Authentication state management with axios interceptors
  - `src/components/` - Reusable UI components
  - `vite.config.ts` - Vite configuration for development
  - `vitest.config.ts` - Test configuration with jsdom environment

### Docker Setup
- **Development**: Multi-container setup with back-end, front-end-web, and vitest services
- **Ports**: Backend on 8000, Frontend on 5173, Vitest UI on 51999
- **Volumes**: Source code mounted for live reloading
- **Services**: Redis and FastAPI microservices available but commented out

### Authentication Flow
- **Registration/Login**: JWT tokens via Laravel Sanctum
- **Storage**: Tokens stored in localStorage
- **API Requests**: Automatic token attachment via axios interceptors
- **Middleware**: Protected routes use `auth:sanctum` middleware
- **Frontend**: AuthContext provides user state and authentication methods

### Testing Strategy
- **Backend**: PHPUnit tests in `back-end/tests/` (Feature and Unit)
- **Frontend**: Vitest tests in `front-end-web/src/components/__tests__/`
- **E2E**: Playwright tests in `playwright/e2e/`
- **Test Data**: SQLite in-memory database for backend tests

## YAML Behavior Definition System

### Expected Input Format
Claude should expect and work with YAML behavior definition files following this structure:

```yaml
# behaviors/feature-name.yml
schema_version: "1.0"
domain: domain_name
feature: feature_name
description: Human-readable feature description

behaviors:
  - name: behavior_name
    scenario: Human-readable scenario description
    given:
      - actor: condition
    when:
      - actor: action
    then:
      - actor: expectation
    tags: [optional, array, of, tags]
    priority: high|medium|low

validation_rules:
  field_name: validation_constraint

api_endpoints:
  - "METHOD /api/path"

ui_components:
  - ComponentName:
      tailwind_template: template_name
      design_tokens: [token1, token2, token3]
```

### Claude's Role in ATTACK.md Workflow

**When Parsing YAML Behaviors**:
- Validate against schema version 1.0
- Check for required fields: domain, feature, description, behaviors
- Verify actor types: system, user, database, api, ui
- Ensure Given-When-Then structure completeness

**When Generating Code**:
- Convert YAML behaviors to PHPUnit tests (back-end/tests/)
- Convert YAML behaviors to Vitest tests (front-end-web/src/)
- Generate Laravel controller/model scaffolds from api_endpoints
- Generate React component scaffolds from ui_components with Tailwind CSS v4 integration
- Apply design tokens and responsive patterns automatically
- Include accessibility classes and ARIA attributes
- Maintain manual override zones in generated code

**When Reviewing ATTACK-Driven Output**:
- Verify generated tests match YAML behavior definitions
- Check that implementation satisfies Given-When-Then scenarios
- Validate API endpoints match behavior specifications
- Ensure UI components support defined user interactions
- Report any drift between YAML definitions and implementation

### Expected Output Structure

**Test Generation Output**:
```
generated/tests/
├── phpunit/
│   └── Feature/
│       └── {Domain}{Feature}Test.php
├── vitest/
│   └── components/
│       └── {ComponentName}.behavior.test.tsx
└── playwright/
    └── e2e/
        └── {feature-name}.spec.ts
```

**Code Scaffolding Output**:
```
generated/scaffolds/
├── controllers/
│   └── {Domain}Controller.php
├── models/
│   └── {Domain}.php
├── components/
│   ├── {ComponentName}.tsx        # With Tailwind classes
│   └── {ComponentName}.stories.tsx # Storybook stories
├── routes/
│   └── {domain}-routes.php
└── styles/
    └── {component-name}.tailwind.ts # Design token definitions
```

**Documentation Output**:
```
generated/docs/
├── api/
│   └── {domain}-api.md
├── behaviors/
│   └── {feature-name}-behavior.md
└── coverage/
    └── behavior-coverage-report.md
```

## Important Notes

- All development commands should be run through Docker containers
- The project uses SQLite for development but is configured for production databases
- Frontend uses Vite's fast HMR for development
- Authentication tokens are managed automatically by axios interceptors
- Two-factor authentication tables are already migrated but not implemented in controllers
- FastAPI microservice structure is prepared but not active
- **Follow ATTACK.md process**: Always start with behavior definition before implementation
- **Maintain lockfile integrity**: Update `.behavior-lock.json` when generating or modifying code
- **Preserve manual overrides**: Respect manual code zones during regeneration
- **Docker-first development**: All tools and commands operate within containers