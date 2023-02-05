DOCKER_IMAGE_VERSION := 1.0.3

up:
	docker compose up -d

app:
	docker compose exec app bash

down:
	docker compose exec app bash

docker-image-build:
	docker image build -t shinji19/astar-dev:${DOCKER_IMAGE_VERSION} docker/app

docker-image-push:
	docker push shinji19/astar-dev:${DOCKER_IMAGE_VERSION}

#
# For app container
# 

localnode:
	swanky-node --dev --tmp --rpc-external --ws-external
