// var http = require('http'),
//     faye = require('faye'),
//     fayeRedis = require('faye-redis'),
//     process = require('process'),
//     port = process.env.PORT || 9990;

// var server = http.createServer(),
//     bayeux = new faye.NodeAdapter({
//       mount:    '/faye',
//       timeout:  45,
//       engine:   {
//         type:   fayeRedis,
//         host:   "44b2ea9c69af417d.redis.rds.aliyuncs.com",
//         password: 'Ikcrm123',
//         port:   6379
//       }
//     });
// console.log(port)
// bayeux.attach(server);
// server.listen(port);


var http = require('http'),
    fs = require('fs'),
    faye = require('faye'),
    fayeRedis = require('faye-redis'),
    process = require('process'),
    port = process.env.PORT || 9901,
    yaml = require('js-yaml'),
    redisFilePath = "config/redis.yml",
    engineConf = {};


if ( fs.existsSync(redisFilePath) ) {
  var engineConf = yaml.safeLoad(fs.readFileSync(redisFilePath)) || {};
  if ( engineConf.host ) {
    engineConf.type = fayeRedis;
  }
}

if ( !fs.existsSync("tmp") ) fs.mkdirSync("tmp");
if ( !fs.existsSync("tmp/pids") ) fs.mkdirSync("tmp/pids");

fs.writeFileSync('tmp/pids/faye.' + port + '.pid', process.pid);

var server = http.createServer(),
    bayeux = new faye.NodeAdapter({
      mount:    '/faye',
      timeout:  45,
      engine:   engineConf
    });

bayeux.attach(server);
server.listen(port);
