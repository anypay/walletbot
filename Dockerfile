FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG infura_polygon_url
ARG infura_ethereum_url
ARG infura_avalanche_url
ARG covalent_api_key

ENV infura_polygon_url=$infura_polygon_url
ENV infura_ethereum_url=$infura_ethereum_url
ENV infura_avalanche_url=$infura_avalanche_url
ENV covalent_api_key=$covalent_api_key

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install 

RUN npm install -g seed-phrase

# Bundle app source
COPY . /usr/src/app

CMD npm start

