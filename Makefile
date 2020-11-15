build: 
	@npx gulp build

test: 
	@npx cypress run

run: run-server
	@npx gulp

run-client:
	@npx gulp

run-server:
	@docker-compose up -d --build

destroy:
	@docker-compose down --rmi local --volumes
