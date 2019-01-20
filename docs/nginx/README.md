# Nginx deployment

## Nginx installation
```bash
sudo apt-get install nginx
```

## Certbot installation
```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 
```

## Testing certbot automating renewal
```bash
sudo certbot renew --dry-run
```

## Creating a certificate using certbot
```bash
certbot certonly --webroot -w /var/lib/certbot -d tutors-app.ru -d www.tutors-app.ru
```

## Configuring nginx
Move the nginx configuration file _**nginx.conf**_ to a directory /etc/nginx/conf.d/ and rename it to default.conf
