FROM node:12.16-alpine

WORKDIR /app/
ADD app.js .
ADD id_rsa_priv.pem .
ADD id_rsa_pub.pem .
ADD package.json .
RUN yarn install --production=true
ADD src ./src
CMD [ "yarn", "serve" ]
EXPOSE 3000