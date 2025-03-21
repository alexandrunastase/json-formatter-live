.PHONY: build
build:
	npm run build

.PHONY: run
run: build
	docker compose up -d

.PHONY: run
stop:
	docker compose down

create-cert:
	 cd ./certs && mkcert jsonformatter.localhost

install-cert:
	 mkcert -install ./certs/jsonformatter.localhost

uninstall-cert:
	 mkcert -uninstall ./certs/jsonformatter.localhost
