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
import EmptyComp from './test-material/empty.vue'

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
        ps: '1__1000',
        pn: '1__2000',
        n: '2__ztcccc',
        c: '3__%7B"start"%3A"1223456","end"%3A"6543221"%7D',
        d: '3__%5B10,20,30,"four"%5D',
        u: '1__100',
        s: '5__true',
        a: '123123'
      }
    })
    comp = wrapper.vm.$refs.comp
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
