FROM oven/bun:alpine

WORKDIR /app

COPY package.json .

RUN bun i

COPY . .

CMD ["bun", "dev"]
