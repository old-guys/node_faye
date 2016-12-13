# config valid only for current version of Capistrano
lock "3.7.0"

set :port, 40022
set :application, 'node_faye'
set :repo_url, 'ssh://gitlab@gitlab.ikcrm.com:40022/ikcrm_common/node_faye.git'

set :rvm_type, :user

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/dyne/apps/node_faye_production"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, "config/redis.yml", "config/app.god"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/sockets", "node_modules"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  desc 'install nodejs dependencies'
  task :npm_install do
    on roles(:app) do
      within(release_path) { execute :npm, "install" }
    end
  end

  after :publishing, :npm_install
  after :publishing, :restart
end
