import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: 'employee',
    meta: {
      title: 'Quản lý nhân viên',
      icon: 'guide',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/administrator/employee/index'),
        name: 'list_employee',
        meta: { title: 'Danh sách nhân viên' }
      }
      // {
      //   path: 'reciever',
      //   component: () => import('@/views/transaction/reciever'),
      //   name: 'ListReciever',
      //   meta: { title: 'Danh sách người nhận' }
      // }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/account',
    meta: { title: 'Quản lý tài khoản', icon: 'dashboard', affix: true, roles: ['customer'] },
    children: [
      {
        path: '',
        component: () => import('@/views/account/index'),
        name: 'AccountIndex',
        meta: {
          title: 'Thông tin tài khoản',
          roles: ['customer'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'transaction_history',
        component: () => import('@/views/account/history'),
        name: 'History',
        meta: {
          title: 'Lịch sử giao dịch',
          roles: ['customer'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/transaction',
    component: Layout,
    alwaysShow: true,
    name: 'Transaction',
    meta: {
      title: 'Giao dịch',
      icon: 'guide',
      roles: ['customer']
    },
    children: [
      {
        path: 'transfer',
        component: () => import('@/views/transaction/transfer'),
        name: 'Transfer',
        meta: { title: 'Chuyển tiền' }
      },
      {
        path: 'reciever',
        component: () => import('@/views/transaction/reciever'),
        name: 'ListReciever',
        meta: { title: 'Danh sách người nhận' }
      }
    ]
  },
  {
    path: '/debt',
    component: Layout,
    meta: {
      title: 'Quản lý nhắc nợ',
      icon: 'guide',
      roles: ['customer']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/debt-reminder/index'),
        name: 'List Debt'
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reset-password',
    component: () => import('@/views/reset-password/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
