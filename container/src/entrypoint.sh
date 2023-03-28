python ./api/main.py &
cd web && if [ "$DEV" == 1 ]; then npm start & else npx serve -s build & fi
sleep infinity
