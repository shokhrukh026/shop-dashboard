const routes = [
  {
    path: '/',
    component: () => import('pages/Login-1.vue'),
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/', component: () => import('pages/Dashboard2.vue'), meta: {authRequired: true}},
      {path: '/branches', name: 'branches', component: () => import('pages/Branches.vue'), meta: {authRequired: true}},
      {path: '/products', component: () => import('pages/Products.vue'), meta: {authRequired: true}},
      {path: '/history', component: () => import('pages/History.vue'), meta: {authRequired: true}},
      {path: '/history-info/:id', name: 'history-info', component: () => import('pages/History-info.vue'), props: true, meta: {authRequired: true}},
      {path: '/return', component: () => import('pages/Return.vue'), meta: {authRequired: true}},
      {path: '/categories', component: () => import('pages/Categories.vue'), meta: {authRequired: true}},
      {path: '/product-info/:id', name: 'product-info', component: () => import('pages/Product-Info.vue'), props:true, meta: {authRequired: true}},
      {path: '/branch-info/:id', name: 'branch-info', component: () => import('pages/Branch-info.vue'), props: true, meta: {authRequired: true}},
      {path: '/branch-info-detail/:branch_id/:business_medicine_id', name: 'branch-info-detail', component: () => import('pages/Branch-info-detail.vue'), props: true, meta: {authRequired: true}},
      {path: '/branch-update/:id', name: 'branch-update', component: () => import('pages/Branch-update.vue'), props: true, meta: {authRequired: true}},
      {path: '/add-product', component: () => import('pages/popUps/Add-Product.vue'), meta: {authRequired: true}},
      {path: '/add-category', component: () => import('pages/popUps/AddCategory.vue'), meta: {authRequired: true}},
      {path: '/add-info-product/:id', name: 'add-info-product', component: () => import('pages/Add-info-product.vue'), props: true, meta: {authRequired: true}},
      {path: '/edit-product/:id', name: 'edit-product', component: () => import('pages/Edit-product.vue'), props:true, meta: {authRequired: true}},
      {path: '/shopping-cart', component: () => import('pages/ShoppingCart.vue'), meta: {authRequired: true}},

    ]
  },
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
