# vue-route-sync-mixin

![Travis (.com)](https://img.shields.io/travis/com/teeeemoji/vue-route-sync-mixin)
![Codecov](https://img.shields.io/codecov/c/github/teeeemoji/vue-route-sync-mixin?token=8b1462035af64c20adae6bb75dd2cda6)
![npm](https://img.shields.io/npm/v/vue-route-sync-mixin)
![npm](https://img.shields.io/npm/dy/vue-route-sync-mixin)
![npm bundle size](https://img.shields.io/bundlephobia/min/vue-route-sync-mixin?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/teeeemoji/vue-route-sync-mixin)
![NPM](https://img.shields.io/npm/l/vue-route-sync-mixin)

## What is vue-route-sync-mixin

Vue-route-sync-mixin is a Vue implementation of [DeepLinking][deeplinking] solution. It uses a simple way to implementing **"two-way binding"** between _url query_ and _vm data_.

It's awesome that we can synchronize the page state to the url in real time, so we can share the page state by sharing the URL, like share the search results on _page 4_ of the search keyword _teeeemoji_.

## Features

-   :tada: The implementation of url and data two-way binding, this is really exciting
-   :sparkles: Non-invasive to legacy project logic and components
-   :chart_with_upwards_trend: Simple configuration, faster to use
-   :rocket: Only depends on the vue-router
-   :fire: More features is waiting for you to discover...

## Installation

```console
$ npm install vue-route-sync-mixin
```

## Usage

### Single File Component Example:

```diff
<script>
+ import {createRouteSyncMixin} from 'vue-route-sync-mixin'

export default {
  // initial url would be http://xxx/#/?ps=1__10&pn=1__1
+ mixins: [createRouteSyncMixin({ps: 'pagination.pageSize',pn: 'pagination.pageNum'})],
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageNum: 1
      }
    }
  }
}
</script>
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### createRouteSyncMixin

[src/index.js:16-44](https://github.com/teeeemoji/vue-route-sync-mixin/blob/46c0fd0eebbc5bb7e97b38780a598ce63b6572d9/src/index.js#L16-L44 "Source code on GitHub")

A series of mixins is automatically generated for the url synchronization function

#### Parameters

-   `options`  {{}} A map of $route.query keys to vm's property path
    -   `options.KeyOfOptions`  {string} Key of options is the value key on url query string,
        and its also the key in vm.$route
    -   `options.ValueOfOptions`  {string} Value of options is a path to find the actual value in vm

Returns **{}** A series of mixins

### processEscapeStr2Value

[src/index.js:54-54](https://github.com/teeeemoji/vue-route-sync-mixin/blob/46c0fd0eebbc5bb7e97b38780a598ce63b6572d9/src/index.js#L54-L54 "Source code on GitHub")

-   **See: <https://www.npmjs.com/package/js-type-escape#processescapestr2value>**

process escape string to value with its data type

#### Parameters

-   `str`  {string}

Returns **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | any | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** 

### processValue2EscapeStr

[src/index.js:64-64](https://github.com/teeeemoji/vue-route-sync-mixin/blob/46c0fd0eebbc5bb7e97b38780a598ce63b6572d9/src/index.js#L64-L64 "Source code on GitHub")

-   **See: <https://www.npmjs.com/package/js-type-escape#processvalue2escapestr>**

process value to escape string

#### Parameters

-   `val`  {any}

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## TODO
-   write demo

## License

This project is licensed under the [MIT license](LICENSE).

[deeplinking]: https://en.wikipedia.org/wiki/Deep_linking
