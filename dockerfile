FROM public.ecr.aws/docker/library/node:18.16-alpine3.18 as development
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
