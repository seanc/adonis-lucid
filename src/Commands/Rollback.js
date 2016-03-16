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

class Rollback extends Command {

  /**
   * signature to be used by ace
   *
   * @return {String}
   *
   * @public
   */
  get signature () {
    return '{--force?} {--batch?}'
  }

  /**
   * command description to be used by ace
   *
   * @return {String}
   *
   * @public
   */
  get description () {
    return 'Rollback migrations to a given or last batch'
  }

  /**
   * this method will rollback all the migrations to last
   * or a given batch.
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

    const response = yield this.migrations.down(migrationsFiles, flags.batch)

    const successMessage = flags.batch ? `Rolled back to ${flags.batch} batch.` : 'Rolled back to previous batch.'
    const infoMessage = 'Already at the latest batch.'
    this.log(response.status, successMessage, infoMessage)
  }
}

module.exports = Rollback