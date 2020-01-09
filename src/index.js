import RouteSyncer from './route-syncer'
import {processEscapeStr2Value as ps2v, processValue2EscapeStr as pv2s} from 'js-type-escape'

const routeSyncer = new RouteSyncer()

/**
 * @public
 * @function createRouteSyncMixin
 * @description A series of mixins is automatically generated for the url synchronization function
 * @param options {{}} A map of $route.query keys to vm's property path
 * @param [options.KeyOfOptions] {string} Key of options is the value key on url query string,
 * and its also the key in vm.$route
 * @param [options.ValueOfOptions] {string} Value of options is a path to find the actual value in vm
 * @returns {{}} A series of mixins
 */
export function createRouteSyncMixin(options) {
  const opts = routeSyncer.registerSyncKeys(options)
  const keys = Object.keys(opts)
  const watch = routeSyncer.createSyncerWatchers(keys, opts)
  return {
    [routeSyncer.syncLockKey]: true,
    created() {
      const vm = this
      routeSyncer.checkInitialSyncData(vm, opts)
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm[routeSyncer.syncLockKey] = false
        routeSyncer.syncUrl2Data(vm, to, opts)
        routeSyncer.twoFramesCallback(() => {
          routeSyncer.syncData2Url(vm, to, opts)
        })
      })
    },
    beforeRouteUpdate(to, from, next) {
      routeSyncer.syncUrl2Data(this, to, opts)
      next()
    },
    destroyed() {
      routeSyncer.dropSyncKeys(keys)
    },
    watch
  }
}

/**
 * @public
 * @function processEscapeStr2Value
 * @see https://www.npmjs.com/package/js-type-escape#processescapestr2value
 * @description process escape string to value with its data type
 * @param str {string}
 * @returns {string|any|undefined|number}
 */
export const processEscapeStr2Value = ps2v

/**
 * @public
 * @function processValue2EscapeStr
 * @see https://www.npmjs.com/package/js-type-escape#processvalue2escapestr
 * @description process value to escape string
 * @param val {any}
 * @returns {string}
 */
export const processValue2EscapeStr = pv2s
