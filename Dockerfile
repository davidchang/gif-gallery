# run the Mongo Docker container
# docker run --name gif-gallery-db -d mongo

# run this server/app, consuming that Mongo Docker
# docker run -it --rm -p 3000:3000 -v `pwd`:/home/gif-gallery --link gif-gallery-db:db davidchang/gif-gallery

FROM dockerfile/nginx

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN sudo apt-get install -y nodejs

WORKDIR /home/gif-gallery

# Install Mean.JS packages
ADD package.json /home/gif-gallery/package.json
RUN npm install

# Make everything available for start
ADD . /home/gif-gallery

RUN npm install -g strongloop

# Port 3000 for server
EXPOSE 3000
CMD ["slc", "run"]