FROM oven/bun:latest as base

# build the app
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun i
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN bunx prisma generate
RUN bun --bun run build

RUN chmod +x ./run.sh
# run the app
USER bun
EXPOSE 3000
ENTRYPOINT ["./run.sh"]