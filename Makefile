# Change these
export DEFAULT_USERNAME=root
export DEFAULT_PASSWORD=root
export PROJECT_NAME=tinystack
export HOST=localhost

# Do not change
.ONESHELL:
export SHELL:=/bin/bash
export SHELLOPTS:=$(if $(SHELLOPTS),$(SHELLOPTS):)pipefail:errexit

export CYPRESS_DEFAULT_USERNAME=$(DEFAULT_USERNAME)
export CYPRESS_DEFAULT_PASSWORD=$(DEFAULT_PASSWORD)

IS_CONTAINER=$(shell if test -f /.dockerenv; then echo 1; else echo 0; fi)
PY_FILES=$(shell find ./container/src/api -type f -name "*.py")
JS_FILES=$(shell find ./container/src/web \( -name "node_modules" -prune -o -name ".next" -prune \) -o -type f -name "*.js" -print)

build:
	@skaffold build
deploy:
	@skaffold run
dev:
	@skaffold dev
migration:
	@python3 container/src/api/manage.py makemigration
ssh:
	@kubectl exec -it deploy/$(PROJECT_NAME) -- sh

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
else
build-shell:
	@docker build -t $(PROJECT_NAME)-shell shell
shell: export DOCKER_ARGS=-it
shell:
	@scripts/shell bash
endif

.PHONY: cypress down build up dev down clean format build-shell shell
