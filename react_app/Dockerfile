#install & get proper node base image
FROM node:16-alpine as builder

# our workdir in image
WORKDIR '/app'

#copy file to
COPY package.json .

RUN npm install 

#copy everything from porject to conatiner root
COPY . .

#run this to build and crrate the production ready build to copy in to other stage ,here we are not going to use CMD to run npm run startcmd because in production
#prd everything will serve by nginx as static file.
RUN npm run build

#it will take the new image as nginx and add copy of provious image code snapshot 
FROM nginx 
# we will instruct here copy previous works in to current image conatiner.this is the path in nginx where we have to copy /usr/share/nginx/html the folder
COPY --from=builder /app/build /usr/share/nginx/html

# nginx is running on 80 port by default and it will redirect to html files.
#so while calling we have to use port mapping from external to internal and internal we have webserver only which is nginx 80



