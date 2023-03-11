FROM --platform=linux/amd64 node:16
WORKDIR /app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY package.json pnpm-* ./
RUN pnpm fetch
ADD . .
RUN pnpm install -r --offline
WORKDIR /app/frontend
RUN pnpm build
WORKDIR /app/backend
EXPOSE 3000
CMD ["pnpm", "serve"]