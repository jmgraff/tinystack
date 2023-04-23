-include .env

.ONESHELL:
export SHELL:=/bin/bash
export SHELLOPTS:=$(if $(SHELLOPTS),$(SHELLOPTS):)pipefail:errexit

export CYPRESS_DEFAULT_USERNAME=$(DEFAULT_USERNAME)
export CYPRESS_DEFAULT_PASSWORD=$(DEFAULT_PASSWORD)

IS_CONTAINER=$(shell if test -f /.dockerenv; then echo 1; else echo 0; fi)
PY_FILES=$(shell find ./container/src/api -type f -name "*.py")
JS_FILES=$(shell find ./container/src/web \( -name "node_modules" -prune -o -name ".next" -prune \) -o -type f -name "*.js" -print)

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
shell: export DOCKER_ARGS=-it
shell:
	@scripts/shell bash

ifeq (1,$(IS_CONTAINER))

format:
	@npx prettier --write $(JS_FILES)
	@black $(PY_FILES)
check-format-py:
	@black --check $(PY_FILES)
check-format-js:
	@npx prettier --check $(JS_FILES)
cypress-impl:
	@cypress run
cypress: down
	function tearDown {
		@$(MAKE) down
	}
	@trap tearDown EXIT
	@docker compose up -d
	@$(MAKE) -k cypress-impl

endif

.PHONY: cypress down build up dev down clean format build-shell shell
