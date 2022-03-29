FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY yarn.lock /app
RUN yarn install --silent
VOLUME /app/_data/results
VOLUME /app/_site
CMD ["yarn", "build-production"]