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

describe('initial data from url', function () {
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
    comp = wrapper.vm.$refs.comp
    Object.assign(comp, {
      pagination: {
        pageSize: 1000,
        pageNum: 1000
      },
      name: 'ztabcd',
      smoke: true,
      departments: [1, 2, 3, 'four'],
      createDate: {
        start: '1234567',
        end: '12345678'
      },
      und: [1, 2, 3, 4, 5, 6, 7]
    })
  })

  afterAll(() => {
    wrapper.destroy()
    wrapper = null
    comp = null
  })

  it('check if url is correct', function (done) {
    setTimeout(() => {
      expect(comp.$route.query).toMatchSnapshot()
      done()
    }, 500)
  })
})
