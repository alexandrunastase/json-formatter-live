build: 
	@npx gulp build

test: run
	@npx cypress run

dev: run-server
	@npx gulp

run: build run-server

run-client:
	@npx gulp

run-server:
	@docker-compose up -d --build

destroy:
	@docker-compose down --rmi local --volumes

clean:
	@rm -rf public/index.html public/dist/* node_modules/

install:
	@npm install