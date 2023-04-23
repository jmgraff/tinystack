from python:alpine

arg HOST
arg PROTO

env NEXT_PUBLIC_HOST=$HOST
env NEXT_PUBLIC_PROTO=$PROTO
env NEXT_TELEMETRY_DISABLED=1

env HOST=$HOST
env PROTO=$PROTO

run apk add --update npm traefik

copy ./requirements.txt .
run pip install -r requirements.txt && rm requirements.txt

copy ./src /opt/container

workdir /opt/container

run cd web && npm install && npm run build

entrypoint ["sh", "entrypoint.sh"]
