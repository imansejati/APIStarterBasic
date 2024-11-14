FROM node:lts-alpine3.11
WORKDIR /src
COPY ./src/package.json ./
RUN npm install
COPY ./src .
EXPOSE 3000

# run for dev
CMD ["npm", "run", "dev"]

# run for production
# CMD ["npm", "start"]

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         fi






