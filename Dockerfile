FROM ubuntu:20.04 AS deps

ENV DEBIAN_FRONTEND=noninteractive

# Install node
RUN apt-get update && apt-get install curl -y
RUN cd ~ \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt -y install nodejs

# Fix npm persmission install globally
RUN mkdir ~/.npm-global \
    && npm -g config set prefix '${HOME}/.npm-global' \
    && npm -g config set user root

ENV PATH="${HOME}/.npm-global/bin:${PATH}"
ENV NPM_CONFIG_PREFIX="${HOME}/.npm-global"

RUN . ~/.profile

RUN npm install -g yarn

# Install deps for canvas
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

WORKDIR /app
COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]