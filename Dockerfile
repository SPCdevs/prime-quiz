FROM oven/bun:latest as base

# build the app
WORKDIR /usr/src/app
COPY . .
RUN bun i
RUN bun run build --no-lint

# run the app
USER bun
EXPOSE 3020/tcp
ENTRYPOINT [ "bun", "--bun" ,"run", "start" ]