from cypress/included:latest

workdir /opt/container

run apt-get update && apt-get install -y \
        python3 \
        python3-pip \
        bash \
    && pip install black \
    && npm install -g prettier

entrypoint []
