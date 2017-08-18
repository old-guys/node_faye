== Faye Push Server Project

- https://github.com/faye/faye
- https://faye.jcoglan.com
- http://faye.jcoglan.com/browser.html


== Getting started, clone source code and run

        git clone ssh://gitlab@gitlab.ikcrm.com:40022/ikcrm_common/node_faye.git
        yarn install (或者： npm install)
        node faye.js
        curl localhost:9991/faye/client.js


== Deploy

        sudo curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
        sudo yum -y install nodejs
        # sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
        # sudo yum --enablerepo=remi,remi-test install nodejs npm
        http://nginx.org/en/linux_packages.html
        sudo yum info nginx
        sudo rpm -Uhv 'http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm'


== Start Node Faye Services In Production Server

        gem install god
        god load /dyne/apps/node_faye_production/current/config/app.god

== Note

        正式环境Faye已用的Redis DB：0、1、2、3、4、5

== Test Faye Connection

curl http://localhost:9991/faye -d 'message={[channel]("/messages/new",) [data]("hello")}'

        var client = new Faye.Client('http://localhost:9991/faye');
        client.subscribe('/messages', function(message) {
          alert('Got a message: ' + message.text);
        });
