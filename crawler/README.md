# 대법원 경매 크롤러

## Command

```
npm i
# 부동산 헤더 정보 가져오기
node courtauction-searchBudongsan.js
# 동산 헤더 정보 가져오기
node courtauction-searchBudongsan.js
# 물건정보 가져오기
node courtauction-detailSrch.js
# 사건정보 가져오기
node courtauction-detailCaseSrch.js
```


## Command

```
npm i
# header 정보 가져오기
node courtauction.js
# 물건정보 가져오기
node courtauction-detailSrch.js
# 사건정보 가져오기
node courtauction-detailCaseSrch.js
```

## Test

```
aws lambda upload => receive result
```

## Automation

```
sudo apt update
sudo apt install -y npm
sudo apt install -y libatk-bridge2.0 libatk1.0-0 libcups2  libxdamage-dev libgbm 
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## Build

```
sudo docker build --tag auction-crawler . 
sudo docker rm ac && sudo docker run --name ac auction-crawler
sudo docker run --name ac -v ~/:~/data  auction-crawler
sudo docker run -it --name ac /bin/bash auction-crawler 
sudo docker run --name ac -v ~/data:/home/ubuntu/result auction-crawler
sudo docker start ac
sudo docker exec -it ac /bin/bash
sudo docker rm ac && sudo docker run -it --user root --name ac auction-crawler ~/dockercmd.sh
```

## Dist

```
# build with wsl
echo "export DOCKER_HOST=localhost:2375" >> ~/.bash_profile
sudo docker login
sudo docker build -t rollrat/ca:0.1 .
# sudo docker tag ca:0.1 rollrat/ca:0.1
sudo docker push rollrat/ca:0.1

# pull
sudo apt install docker.io
sudo docker pull rollrat/ca:0.1
sudo docker run --name ca rollrat/ca:0.1
# sudo docker run --name ca -v ~/:/home/ubuntu/result rollrat/ca:0.1

sudo docker start ca
sudo docker exec -it ca /bin/bash

sudo docker cp ca:/home/ubuntu/result.json ~/
sudo docker cp ca:/home/ubuntu/result-params.json ~/

sudo docker container ls
sudo docker rm ca
sudo docker rmi rollrat/ca:0.1
```