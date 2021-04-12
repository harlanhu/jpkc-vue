FROM nginx

MAINTAINER Harlan <isharlan.hu@gmail.com>

COPY dist/ /usr/share/nginx/html/

EXPOSE 80
