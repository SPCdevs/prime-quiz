FROM oven/bun:latest as base

# build the app
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun i
COPY . .

RUN bunx prisma generate
RUN bun run build --no-lint

RUN chmod +x ./run.sh
RUN chown -R bun:bun /app
# run the app
USER bun
EXPOSE 3000
ENTRYPOINT ["./run.sh"]