############################################################
# Dockerfile to Users-sc
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu

# Update the default application repository sources list
RUN apt-get update

#Needed for last node version
RUN apt-get install -y wget

# Install node and npm
RUN wget -qO- https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

#Copy info service code
COPY ./src/ /home/users-sc/

#Install npm dependecies for infor service
RUN cd /home/users-sc && npm install

#Expose manager port
EXPOSE 8080

ENTRYPOINT node /home/users-sc/index.js & /bin/bash
