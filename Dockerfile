FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY yarn.lock /app
RUN yarn install --silent

EXPOSE 8080

# Inicializa a aplicação
CMD ["yarn", "start"]