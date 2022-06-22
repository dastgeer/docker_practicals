#use existing image as base image
FROM alpine

#download required dependencies to run the my software or programme
RUN apk add --update redis
#tell the image what to do when the image is being used to create and start the container
CMD ["redis-server"]