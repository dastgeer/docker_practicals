#base image to build the our custom image
FROM  node:14-alpine

#instruct image that any operation should be happene from this work directory becaus erhits will maintain all file in single place and that will be 
#current execution context. if this folder wont exist it will create for us.
WORKDIR /usr/app

#copy data from current directoty of local filesystem to root or cuurent directory of container.
#this copy is written with package json because if there is any changes  any how it will copy and run npm install other wise it wont run npm install
#in second  line 17 copy will be just copy codebase changes whihc doesnt matter with dependecy.
#so it will save unneccasay execution npm install. whihc might take time in real time.
COPY ./package.json ./
 
# add the cmd to add dependencies and configuration to base image using RUN cmd
RUN npm install 

#copy whole codebase as it is from current directoty of local filesystem to root or cuurent directory of container. and no operation further
COPY ./ ./

#this is CMD cmd giev to our build image while creating and run container to run the programme task into conatiner from custom image.
# below cmd sould be in string and comma seprate in each word.
CMD ["npm","start"]