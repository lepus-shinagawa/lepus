DOCKER_IMAGE_VERSION := 1.0.3

up:
	sudo docker compose up -d

app:
	sudo docker compose exec app bash

docker-image-build:
	sudo docker image build -t shinji19/astar-dev:${DOCKER_IMAGE_VERSION} docker/app

docker-image-push:
	sudo docker login
	sudo docker push shinji19/astar-dev:${DOCKER_IMAGE_VERSION}

#
# For app container
# 

localnode:
	swanky-node --dev --tmp --rpc-external --ws-external
