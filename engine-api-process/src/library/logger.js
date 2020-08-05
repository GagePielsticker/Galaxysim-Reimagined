const chalk = require('chalk')

const log = {
  success: String => {
    const { date, time } = log._getTime()
    console.log(`[${date} ${time}] [${chalk.green.bold('Success')}] ${String}`)
  },

  error: String => {
    const { date, time } = log._getTime()
    console.log(`[${date} ${time}] [${chalk.red.bold('Error')}] ${String}`)
  },

  status: String => {
    const { date, time } = log._getTime()
    console.log(`[${date} ${time}] [${chalk.yellow.bold('Status')}] ${String}`)
  },

  _getTime: () => {
    const today = new Date()
    const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return { date, time }
  }
}

module.exports = log
