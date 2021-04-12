FROM nginx

MAINTAINER Harlan <isharlan.hu@gmail.com>

COPY dist/ /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
