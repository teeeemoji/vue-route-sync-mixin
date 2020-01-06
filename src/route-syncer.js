import {hasOwnProperty, safeGet, safeSet} from 'object-property-extensions'
import {processEscapeStr2Value, processValue2EscapeStr} from 'js-type-escape/dist/umd/index.umd'

export default class RouteSyncer {

  constructor() {
    /**
     * @private
     * @description Contains all registered keys for the entire Vue app, key => initial data type
     */

    this.registerKeys = {}
    /**
     * @description key of the sync lock flag
     */
    this.syncLockKey = Symbol('route syncing lock flag key name')
  }

  /**
   * @description Synchronize information from data to the url according to options
   * @param vm
   * @param inputRoute
   * @param options
   */
  syncUrl2Data(vm, inputRoute, options) {
    const route = inputRoute || vm.$route
    if (vm[this.syncLockKey] || this.isRouteEqualData(vm, route, options)) {
      return
    }
    vm[this.syncLockKey] = true
    const keys = Object.keys(options)
    const newVal = this.getSubFromRoute(route, keys)

    keys.forEach(key => {
      if (hasOwnProperty(newVal, key)) {
        safeSet(vm, options[key], newVal[key])
      }
    })

    this.twoFramesCallback(() => {
      vm[this.syncLockKey] = false
    })
  }

  /**
   * @description Synchronize information from url to data according to options
   * @param vm
   * @param inputRoute
   * @param options
   */
  syncData2Url(vm, inputRoute, options) {
    const route = inputRoute || vm.$route
    if (vm[this.syncLockKey] || this.isRouteEqualData(vm, route, options)) {
      return
    }
    vm[this.syncLockKey] = true
    const keys = Object.keys(options)
    const newVal = this.getSubFromData(vm, keys, options)
    vm.$router.push({
      query: {
        ...vm.$route.query,
        ...newVal
      }
    })

    this.twoFramesCallback(() => {
      vm[this.syncLockKey] = false
    })
  }

  initialSyncDataType(key, val) {
    this.registerKeys[key] = typeof val
  }

  /**
   *
   * @param options
   */
  registerSyncKeys(options) {
    const opts = {...options}
    const keys = Object.keys(opts)
    keys.forEach(key => {
      if (this.registerKeys[key]) {
        delete opts[key]
        this.throwRegisterKeyError(key)
      } else {
        this.registerKeys[key] = true
      }
    })
    return opts
  }

  /**
   * Check that the data in vm is initialized
   * @param vm
   * @param opts
   */
  checkInitialSyncData(vm, opts) {
    const keys = Object.keys(opts)
    keys.forEach(key => {
      if (!hasOwnProperty(vm, opts[key])) {
        this.throwInitialValueError(key, opts[key])
      } else {
        this.initialSyncDataType(key, safeGet(vm, opts[key]))
      }
    })
  }

  dropSyncKeys(keys) {
    keys.forEach(key => (delete this.registerKeys[key]))
  }

  /**
   * create watchers in vm
   * @param keys
   * @param options
   */
  createSyncerWatchers(keys, options) {
    const syncer = this
    const watch = {}
    keys.forEach(key => {
      const path = options[key]
      watch[path] = {
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            syncer.syncData2Url(this, this.$route, options)
          }
        },
        deep: true
      }
    })
    return watch
  }

  /**
   * A delayed method that prevents ring calls
   * @param cb {function}
   */
  twoFramesCallback(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cb()
      })
    })
  }

  /**
   * checkout string in url is matched data in vm
   * @param vm
   * @param route
   * @param options
   * @returns {boolean}
   */
  isRouteEqualData(vm, route, options) {
    const keys = Object.keys(options)
    return keys.every(key => (route.query[key] === processValue2EscapeStr(safeGet(vm, options[key]))))
  }

  getSubFromData(vm, keys, options) {
    const sub = {}
    keys.forEach(key => {
      console.log(vm, key, options)
      sub[key] = processValue2EscapeStr(safeGet(vm, options[key]))
    })
    return sub
  }

  getSubFromRoute(route, keys) {
    const sub = {}
    keys.forEach(key => {
      const str = safeGet(route.query, key)
      if (str) {
        sub[key] = processEscapeStr2Value(str)
      }
    })
    return sub
  }

  throwRegisterKeyError(key) {
    throw new Error(`[sync] 您的 key:${key} 已经注册过了`)
  }

  throwInitialValueError(key, path) {
    throw new Error(`[sync] 在 vm 中无法通过配置地路径 ${path} 找到数据, 请注意你的数据都初始化过?`)
  }
}
