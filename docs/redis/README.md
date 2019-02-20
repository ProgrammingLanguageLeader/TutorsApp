# Redis installation

## Installation
```bash
sudo apt-get install redis
```

## Service autostart enabling
```bash
sudo systemctl enable redis
```

## Check if Redis is working
```bash
redis-cli ping
```
If everything is fine it will print 'PONG'

## Manual run of redis-server
If you don't want to enable autostart of the redis service, you can run it manually when you need:
```bash
sudo systemctl start redis
```
