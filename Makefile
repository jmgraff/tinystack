-include .env

IS_CONTAINER=$(shell if test -f /.dockerenv; then echo 1; else echo 0; fi)
PY_FILES=$(shell find ./container/src/api -type f -name "*.py")
JS_FILES=$(shell find ./container/src/web/src -type f -name "*.js")

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
else
format:
	@npx prettier --write $(JS_FILES)
	@black $(PY_FILES)
endif

.PHONY: build up dev down clean format build-shell shell
