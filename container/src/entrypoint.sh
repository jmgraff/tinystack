# start reverse proxy
traefik --configFile=./traefik.yaml &

# run django migrations
api/manage.py migrate --noinput

# start the api
python ./api/main.py &

# start the frontend web server
cd web
if [ "$DEV" == 1 ]; then
    npm run dev &
else
    npm run start &
fi

# sleep forever
sleep infinity
