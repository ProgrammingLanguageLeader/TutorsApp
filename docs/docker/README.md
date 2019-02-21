# Docker usage
Use can use Docker and Docker Compose to deploy this project.

## Preparation

### SSL certificate
Default configuration of Nginx uses SSL, that's why you need an encryption certificate. You can use certbot to generate it (see *_docs/nginx_*) or create it manually using the following command:
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout docker/nginx/nginx.key -out docker/nginx/nginx.crt
```

If you already have this one, copy a pair of files (__*nginx.key*__ and __*nginx.crt*__) to the __*docker/nginx/*__ directory.

### Environment and settings
File __*docker/.env*__ has some settings for the PostgreSQL. Make sure, that you have the same settings in the __*backend/settings.ini*__ file. 

> [Important!] 
> When using Docker Compose application hosts won't be at the "localhost". 
> 
> The following variables will be different:
> ```ini
> POSTGRES_HOST=postgres
> REDIS_HOST=redis
> ```

## Deployment

### Whole project deployment
Starting:
```bash
docker-compose up -d
```
Stopping:
```bash
docker-compose down
```

### Specific container deployment
Redis container starting:
```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

### Command execution inside a container
An example of running shell inside the backend container:
```bash
docker exec -it backend /bin/sh
```
