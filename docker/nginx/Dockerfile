FROM nginx:alpine

RUN apk update \
    && apk add --no-progress bash certbot openssl  \
    && rm /var/cache/apk/* \
    && echo "Preparing certbot webroot..." \
    && mkdir -p /var/lib/certbot \
    && echo "Done" \
    && echo "Generating initial self-signed certificate..." \
    && mkdir -p /etc/nginx/ssl/tutors-app.ru/ \
    && openssl req -x509 -nodes -newkey rsa:4096 \
           -keyout /etc/nginx/ssl/tutors-app.ru/privkey.pem \
           -out /etc/nginx/ssl/tutors-app.ru/fullchain.pem \
           -subj "/C=/ST=/L=/O=/CN=tutors-app.ru" \
    && ln -sf /etc/nginx/ssl/tutors-app.ru /etc/nginx/ssl/latest \
    && echo "Done"

COPY nginx-prod.conf /etc/nginx/conf.d/default.conf
COPY certbot.sh /etc/nginx/ssl/