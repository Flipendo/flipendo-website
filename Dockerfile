FROM node:0.10
MAINTAINER Julien Fouilhe

# Install compass
RUN apt-get update -y
RUN apt-get install -y ruby-full rubygems-integration lighttpd && gem update --system && gem install sass -v 3.2.19 && gem install compass

# Install dependencies
RUN npm install -g bower grunt-cli

# Install modules
ADD package.json /install/package.json
RUN cd /install && npm install
# Install libraries
ADD .bowerrc /install/.bowerrc
ADD bower.json /install/bower.json
RUN cd /install && bower --allow-root install

RUN mkdir -p /flipendo-website && cp -a /install/node_modules /flipendo-website/ && cp -a /install/bower_components /flipendo-website/

COPY . /flipendo-website
WORKDIR /flipendo-website
RUN grunt build

EXPOSE 3000
CMD ["lighttpd", "-D", "-f", "lighttpd.conf"]
