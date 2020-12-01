# deploy
> deploy via shipit

## local setup

```shell
yarn add -D shipit-cli
yarn add -D shipit-deploy
yarn add -D shipit-shared
yarn add -D shipit-npm
```

## pm2 config

[Ecosystem File](https://pm2.keymetrics.io/docs/usage/application-declaration/)

## server setup

```shell
sudo curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
sudo yum -y install nodejs
http://nginx.org/en/linux_packages.html
sudo yum install nginx

npm install pm2 -g

tail -f -n 500 /home/node/.pm2/pm2.log

pm2 start pm2.config.js
pm2 stop pm2.config.js
pm2 info node_faye_qa
pm2 delete pm2.config.js

# newrelic
cp ./node_modules/newrelic/newrelic.js ./
vim newrelic.js
  app_name: ['faye.xxxx.com'],
  license_key: 'xxxxxxxxx',
```

## deploy

```shell
npx shipit qa deploy
npx shipit qa npm:init npm:install
npx shipit qa npm:run --cmd "update"
```

## 已知问题

[Capistrano like deployments](https://pm2.keymetrics.io/docs/tutorials/capistrano-like-deployments)