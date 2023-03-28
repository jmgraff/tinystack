from python:alpine

arg REACT_APP_API_HOST
arg REACT_APP_PROTO

env REACT_APP_API_HOST=$REACT_APP_API_HOST
env REACT_APP_PROTO=$REACT_APP_PROTO

run apk add --update npm

copy ./requirements.txt .
run pip install -r requirements.txt && rm requirements.txt

copy ./src /opt/container

workdir /opt/container

run cd web && npm install && npm run build

entrypoint ["sh", "entrypoint.sh"]
