module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      repositoryUrl: 'https://github.com/old-guys/node_faye.gitt',
      shared: {
        overwrite: true,
        dirs: [
          {
            path: 'log',
            overwrite: true,
            chmod: '-R 777',
          }
        ],
        files: [
          {
            path: 'config/redis.yml',
            overwrite: false
          },
          {
            path: 'pm2.config.js',
            overwrite: false
          }
        ],
      }
    },
    qa: {
      deployTo: '/data/node/apps/node_faye_qa',
      servers: 'node@xxxxx:40022',
      branch: 'develop',
    },
    production: {
      deployTo: '/data/node/apps/node_faye_production',
      servers: 'node@xxxxx:40022',
      branch: 'master'
    },
  });

  shipit.task('restart', async () => {
    let cmd = `
      cd ${shipit.releasePath} && npm run prd
    `;

    shipit.remote(cmd);
  })

  shipit.on('published', function () { // 监听published事件，触发后就执行do_something任务。
    shipit.start('restart');
  });
}