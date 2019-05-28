const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require(`./webpack.config`)
const chalk = require('chalk').default
const compiler = webpack(config)
const clientCfg = require('./client.config.json')

const server = new webpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  hotOnly: true,
  inline: true,
  stats: {
    colors: true
  },
  quiet: false,
  open: true,
})

server.listen(clientCfg.port, clientCfg.host, () => {
  console.log(chalk.green(`Starting server on http://${clientCfg.host}:${clientCfg.port}`))
})