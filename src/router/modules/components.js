/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Chuyen tien',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Chuyen khoan noi bo',
      meta: { title: 'Chuyen khoan noi bo' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'Chuyen khoan lien ngan hang',
      meta: { title: 'Chuyen khoan ngoai' }
    }
  ]
}

export default componentsRouter
