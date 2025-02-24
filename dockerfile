FROM public.ecr.aws/docker/library/node:18.16-alpine3.18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build  # 🔹 Adiciona a etapa de build

EXPOSE 3000

CMD ["node", "dist/main.js"]  # 🔹 Certifica que o NestJS está rodando corretamente
