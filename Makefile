.PHONY: run
run:
	@npm run dev

.PHONY: build
build: 
	@npm run build

.PHONY: format
format:
	@npm run format

.PHONY: lint
lint:
	npm run lint

.PHONY: preview
preview: clean install build
	@docker-compose up --build

.PHONY: run-prod
run-prod: clean install build
	@docker-compose up -d --build

.PHONY: clean
clean:
	@rm -rf build/* node_modules/

.PHONY: install
install:
	@npm install

.PHONY: test
test:
	@npx cypress run

.PHONY: clean-test
clean-test: run-prod test