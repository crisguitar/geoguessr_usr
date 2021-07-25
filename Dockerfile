FROM node:16
WORKDIR /app

RUN apt-get update

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb

COPY package.json /app/package.json

RUN npm install

COPY index.js /app/index.js

CMD ["node", "index.js"]
