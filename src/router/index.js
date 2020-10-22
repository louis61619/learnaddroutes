import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

//2.創建router
const routes =[
  {
    path: '',
    redirect: '/home'
  },
  // {
  //   path: '/home',
  //   component: () => import('@/components/Home')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

const createRouter = () => new VueRouter({
  mode: 'hash',
  routes
});

export function reset() {
  router.matcher = createRouter().matcher;
}

export default router