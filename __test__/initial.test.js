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
  beforeAll(() => {
    const localVue = createLocalVue()
    const routes = [{path: '/', component: EmptyComp}, {path: '/comp', component: Comp}]
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
      path: '/comp',
      query: {
        ps: '1__100',
        pn: '1__200',
        n: '2__ztc',
        c: '3__%7B"start"%3A"123456","end"%3A"654321"%7D',
        d: '3__%5B1,2,3,"four"%5D',
        u: '4__',
        s: '5__true'
      }
    })
  })

  afterAll(() => {
    wrapper.destroy()
    wrapper = null
  })

  it('initial undefined data', function () {
    const comp = wrapper.vm.$refs.comp
    expect(comp.und).toMatchSnapshot()
  })

  it('initial number data', function () {
    const comp = wrapper.vm.$refs.comp
    expect(comp.pagination.pageNum).toMatchSnapshot()
    expect(comp.pagination.pageSize).toMatchSnapshot()
  })

  it('initial string data', function () {
    const comp = wrapper.vm.$refs.comp
    expect(comp.name).toMatchSnapshot()
  })

  it('initial boolean data', function () {
    const comp = wrapper.vm.$refs.comp
    expect(comp.smoke).toMatchSnapshot()
  })

  it('initial array and object data', function () {
    const comp = wrapper.vm.$refs.comp
    expect(comp.createDate).toMatchSnapshot()
    expect(comp.departments).toMatchSnapshot()
  })
})
