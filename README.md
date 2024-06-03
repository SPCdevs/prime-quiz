# PrimeQuiz

PrimeQuiz is a social media app that allows creators to post trivia questions along with mcq answers and users can play them in the browse area. This site is made for people to loose their addictions in useless entertainment apps, and get into a good habit completing trivia.

## Technologies Used

- Bun (JavaScript runtime)
- React (JavaScript library)
- Next JS (React Framework)
- PostgreSQL (Database management system)
- Prisma ORM (Object relation matching for PostgreSQL)
- Docker
- Typescript
- Next UI + Tailwind (Front-end UI library)

## Running Docker

To self host PrimeQuiz run the docker-compose file with `--build` flag. Example usage:

```bash
cd /path/to/dir
docker-compose up --build
```

After that, browse to `http://localhost:3000` to access the site. (Note that this requires port 3000 to be free or change it in the `docker-compose` file)

The docker compose script contains all the components required for running the app such as `postgres`.
The `docker-compose` script also contains pg admin for the purpose of monitoring the database. However it is not required for the function of the app so it can be easily be disabled by commenting it out.

There is a `run.sh` script in the project that is used by the `Dockerfile` (as the entrypoint). DO NOT run the `run.sh` on your local computer as it is only designed to be used within the docker image itself.

## Features

- Create trivia and share it with others!
- Browse trivia by creator assigned tags!
- Compete and brag about `points` earned with your friends!
- Set a bio and tell more about yourself
- Review and learn mistakes through the history tab.
