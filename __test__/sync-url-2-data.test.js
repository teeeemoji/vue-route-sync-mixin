/**
 * Summary.
 *  main test file.
 *
 * Description
 *  This is the main test file
 *
 * @file   This main test file for class vue-route-sync-mixin.
 * @author teeeemoji.
 * @since 2020-1-5
 */
import {createLocalVue, mount} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Comp from './test-material/component.vue'
import App from './test-material/app.vue'
import {processValue2EscapeStr} from '../index'

describe('initial data from url', function () {
  jest.setTimeout(500)
  let wrapper = null
  let comp = null

  beforeAll(() => {
    const localVue = createLocalVue()
    const routes = [{path: '/', component: Comp}]
    const router = new VueRouter({
      routes
    })
    localVue.use(VueRouter)
    wrapper = mount(App, {
      localVue,
      router,
      attachToDocument: true
    })
    wrapper.vm.$router.push({
      query: {
        ps: processValue2EscapeStr(1000),
        pn: processValue2EscapeStr(2000),
        n: processValue2EscapeStr('ztcccc'),
        c: processValue2EscapeStr({
          start: '1067385600000',
          end: '322790400000'
        }),
        d: processValue2EscapeStr([10, 20, 30, 'four']),
        u: processValue2EscapeStr(100),
        s: processValue2EscapeStr(true),
        a: processValue2EscapeStr('123123')
      }
    })
    comp = wrapper.vm.$refs.comp
    return
  })

  afterAll(() => {
    wrapper.destroy()
    wrapper = null
  })

  it('initial undefined data', function () {
    expect(comp.pagination.pageNum).toMatchSnapshot()
    expect(comp.pagination.pageSize).toMatchSnapshot()
    expect(comp.name).toMatchSnapshot()
    expect(comp.smoke).toMatchSnapshot()
    expect(comp.departments).toMatchSnapshot()
    expect(comp.createDate).toMatchSnapshot()
  })
})
