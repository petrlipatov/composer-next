### Updating container

On local machine:

1. Build latest image
   (build without cache bc optimized images could be break)
2. Tag latest image as latest
   `docker tag <IMAGE ID> peterlipatov/composer-v2-production:latest`
3. Push to registry
   `docker push peterlipatov/composer-v2-production:latest`

On production:

1. Stop running container
   `docker stop <CONTAINER ID>`
2. Remove unused containers and images
   `docker system prune -af`
3. Pull latest image
   `docker pull peterlipatov/composer-v2-production:latest`
4. Run latest image
   `docker compose up -d production`

### Launching app

Run app in development:
`docker compose up development`.

Run app in production:
`docker compose up production`.
`docker compose up -d production`

In both cases application will be available at http://localhost:3000.

### Building without cache

`docker compose build --no-cache production`
`docker compose build --no-cache development`
