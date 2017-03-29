FROM node:latest
# must have FROM as its first instruction.

RUN apt-get -y update
RUN mkdir -p /usr/docker-app

WORKDIR /usr/docker-app

RUN npm install -g gulp
RUN npm install

# There can only be one CMD instruction in a Dockerfile
# Should be JSON-array
CMD ["npm", "start"]




# docker build -t galleria-image ./


# docker run -it --name galleria \
#    -v /home/user/WebstormProjects/galleria:/usr/docker-app \
#    -p 8833:8822 galleria-image \

