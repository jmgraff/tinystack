FROM python:alpine

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --update npm

COPY ./requirements.txt .
RUN pip install -r requirements.txt && rm requirements.txt

COPY ./src /opt/container

WORKDIR /opt/container

RUN cd web && npm install && npm run build

ENTRYPOINT ["sh", "entrypoint.sh"]
