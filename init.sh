sudo docker build -t ursc:0.01 . &&
sudo docker run --detach --env-file ./config.conf --name ursc --link mongodb:mongodb -p 8083:8083/tcp --rm -ti ursc:0.01 /bin/bash
