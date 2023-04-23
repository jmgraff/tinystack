-include .env

IS_CONTAINER=$(shell if test -f /.dockerenv; then echo 1; else echo 0; fi)
PY_FILES=$(shell find ./container/src/api -type f -name "*.py")
JS_FILES=$(shell find ./container/src/web \( -name "node_modules" -prune -o -name ".next" -prune \) -o -type f -name "*.js" -print)

ifneq (1,$(IS_CONTAINER))

build:
	@docker compose build

up:
	@docker compose up -d
	@docker compose logs -f

dev:
	@docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up
	@docker compose logs -f

down:
	@docker compose down

clean:
	@sudo rm -rf data

build-shell:
	@docker build -t $(PROJECT_NAME)-shell shell

format: build-shell
	@scripts/shell make format

shell: export DOCKER_ARGS=-it
shell:
	@scripts/shell bash

else

format:
	@npx prettier --write $(JS_FILES)
	@black $(PY_FILES)

endif

.PHONY: build up dev down clean format build-shell shell
