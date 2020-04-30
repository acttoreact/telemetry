FROM node:12-alpine
WORKDIR /usr/src/app
LABEL Description="A2R API Watcher"
# Production packages install
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
# Copy the source code and build the solution
COPY . ./src
RUN cd ./src;npm install --silent;npm run build
# Copy de compiled version
RUN cp -r ./src/dist ./dist
# Remove the sources
RUN rm -rf ./src
# Enviroment por production
ENV NODE_ENV production
# Start command
CMD npm start