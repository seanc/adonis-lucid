'use strict'

/**
 * adonis-lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Command = require('./Command')

class Run extends Command {

  /**
   * signature to be used by ace
   *
   * @return {String}
   *
   * @public
   */
  get signature () {
    return '{--force?} {--files?}'
  }

  /**
   * command description to be used by ace
   *
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Run all pending migrations'
  }

  /**
   * this method will run all pending migrations
   *
   * @param  {Object} options
   * @param  {Object} flags
   *
   * @public
   */
  * handle (options, flags) {
    this.checkEnv(flags.force)

    const selectedFiles = flags.files ? flags.files.split(',') : null
    const migrationsFiles = this.loadFiles(this.helpers.migrationsPath(), selectedFiles)

    const response = yield this.migrations.up(migrationsFiles)

    const successMessage = 'Database migrated successfully.'
    const infoMessage = 'Nothing to migrate.'
    this.log(response.status, successMessage, infoMessage)
  }
}

module.exports = Run