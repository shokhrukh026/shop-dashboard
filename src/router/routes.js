const routes = [
  {
    path: '/',
    component: () => import('pages/Login-1.vue'),
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {path: '', component: () => import('pages/Dashboard.vue'), beforeEnter: AuthGuard},
      {path: '/', component: () => import('pages/Dashboard2.vue'), meta: {authRequired: true}},
      {path: '/branches', name: 'branches', component: () => import('pages/Branches.vue'), meta: {authRequired: true}},
      {path: '/medicines', component: () => import('pages/Products.vue'), meta: {authRequired: true}},
      {path: '/med-info', component: () => import('pages/Med-info.vue'), meta: {authRequired: true}},
      {path: '/branch-info', component: () => import('pages/Branch-info.vue'), meta: {authRequired: true}},
      {path: '/branch-update/:id', name: 'branch-update', component: () => import('pages/Branch-update.vue'), props: true, meta: {authRequired: true}},
      {path: '/add-product', component: () => import('pages/Add-product.vue'), meta: {authRequired: true}},
      {path: '/edit-product/:id', name: 'edit-product', component: () => import('pages/Edit-product.vue'), props:true, meta: {authRequired: true}},
      {path: '/shopping-cart', component: () => import('pages/Cart.vue'), meta: {authRequired: true}},
      

      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes







// function AuthGuard(from, to, next){
//   if(store.getters.getUser){
//     next()
//   }
//   else
//     next('/')
// }


    
