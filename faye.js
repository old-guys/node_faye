const http = require('http'),
  fs = require('fs'),
  faye = require('faye'),
  fayeRedis = require('faye-redis'),
  process = require('process'),
  port = process.env.PORT || 9901,
  yaml = require('js-yaml'),
  redisFilePath = "config/redis.yml";

let engineConf = {};

if ( fs.existsSync(redisFilePath) ) {
  engineConf = yaml.safeLoad(fs.readFileSync(redisFilePath)) || {};
  engineConf.type = fayeRedis;
}


if ( !fs.existsSync("tmp") ) fs.mkdirSync("tmp");
if ( !fs.existsSync("tmp/pids") ) fs.mkdirSync("tmp/pids");

fs.writeFileSync(`tmp/pids/faye.${port}.pid`, String(process.pid));

// REVIEW 开启详细日志到标准输出
// faye.logger = console;

let server = http.createServer();
let bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  3,
  engine:   engineConf
});

console.log(`started on localhost:${port}, PID: ${process.pid}`);

server.on('error', function (e) {
  // Handle your error here
  console.error(err.stack);
});

bayeux.attach(server);
server.listen(port);
