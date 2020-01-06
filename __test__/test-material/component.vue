<template>
  <div>
    Component
  </div>
</template>
<script>
import {createRouteSyncMixin} from '../../index'

export default {
  mixins: [createRouteSyncMixin({
    ps: 'pagination.pageSize',
    pn: 'pagination.pageNum',
    n: 'name',
    d: 'departments',
    c: 'createDate',
    u: 'und',
    s: 'smoke'
  })],
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageNum: 1
      },
      name: '',
      smoke: false,
      departments: [],
      createDate: {
        start: '',
        end: ''
      },
      und: undefined
    }
  }
}
</script>
