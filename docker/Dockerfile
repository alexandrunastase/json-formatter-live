FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html

COPY build /var/www/html