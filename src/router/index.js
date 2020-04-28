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
    redirect: '/employee',
    alwaysShow: true,
    name: 'employee',
    meta: {
      title: 'Quản lý nhân viên',
      icon: 'guide',
      roles: ['admin']
    },
    children: [
      {
        path: '/employee',
        component: () => import('@/views/administrator/employee/info'),
        name: 'list_employee',
        meta: { title: 'Danh sách nhân viên' }
      },
      {
        path: '/employee/account',
        component: () => import('@/views/administrator/employee/account'),
        name: 'list_account_employee',
        meta: { title: 'Danh sách tài khoản' }
      }
    ]
  },
  {
    path: '/cross-checking',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'Đối soát',
      icon: 'excel',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/administrator/cross-checking/index'),
        name: 'cross-checking',
        meta: { title: 'Danh sách giao dịch' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/create-account-customer',
    alwaysShow: false,
    name: 'createAccount',
    meta: {
      // component: () => import('@/views/employee/createAccount'),
      // path: '/reate-account-customer',
      title: 'Tạo tài khoản',
      icon: 'dashboard',
      roles: ['employee']
    },
    children: [
      {
        path: '/create-account-customer',
        component: () => import('@/views/employee/create-account'),
        name: 'create',
        meta: { title: 'Tạo tài khoản' }
      }
    ]
  },
  {
    path: '/recharge-account',
    component: Layout,
    alwaysShow: false,
    name: 'rechargeAccount',
    meta: {
      // component: () => import('@/views/employee/createAccount'),
      // path: '/reate-account-customer',
      title: 'Nạp tiền',
      icon: 'guide',
      roles: ['employee']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/employee/recharge-account'),
        name: 'create',
        meta: { title: 'Nạp tiền' }
      }
    ]
  },
  {
    path: '/transaction-history',
    component: Layout,
    alwaysShow: false,
    name: 'history',
    meta: {
      // component: () => import('@/views/employee/createAccount'),
      // path: '/reate-account-customer',
      title: 'Lịch sử giao dịch',
      icon: 'excel',
      roles: ['employee']
    },
    children: [
      {
        path: '/transaction-history',
        component: () => import('@/views/employee/transaction-history'),
        name: 'history',
        meta: { title: 'Lịch sử giao dịch' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/bank-account',
    meta: { title: 'Quản lý tài khoản', icon: 'dashboard', affix: true, roles: ['customer'] },
    children: [
      {
        path: 'bank-account',
        component: () => import('@/views/customer/bank-account'),
        name: 'AccountIndex',
        meta: {
          title: 'Thông tin tài khoản',
          roles: ['customer'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'transaction-history',
        component: () => import('@/views/customer/history'),
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
        component: () => import('@/views/customer/transaction'),
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
    alwaysShow: true,
    redirect: 'index',
    name: 'debt',
    meta: {
      title: 'Quản lý nhắc nợ',
      icon: 'guide',
      roles: ['customer']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/debt-reminder/index'),
        name: 'List Debt',
        meta: {
          title: 'Danh sách nhắc nợ'
        }
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
