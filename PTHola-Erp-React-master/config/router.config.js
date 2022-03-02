export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // Member
      { path: '/', redirect: '/data-list' },
      {
        path:'/data-list',
        name:'datalist',
        icon:'dashboard',
        component:'./Data/DataCenter'
      },
      {
        path:'/member',
        name:'member',
        icon:'table',
        routes:[
          {
            path:'/member/member-list',
            name:'memberlist',
            component:'./Member/MemberList/MemberList',
          },
          {
            path:'/member/potential',
            name:'potential',
            component:'./Member/Potential/Potential'
          },
          {
            path:'/member/member-list/detail',
            component:'./Member/MemberList/MemberDetail',
            routes:[
              {
                path: '/member/member-list/detail',
                redirect: '/member/member-list/detail/sign',
              },
              {
                path:'/member/member-list/detail/leave',
                component:'./Member/MemberList/LeaveList',
              },
              {
                path:'/member/member-list/detail/consume',
                component:'./Member/MemberList/ConsumeList',
              },
              {
                path:'/member/member-list/detail/sign',
                component:'./Member/MemberList/SignList',
              },
              {
                path:'/member/member-list/detail/elimination',
                component:'./Member/MemberList/EliminationList',
              },
              {
                path:'/member/member-list/detail/private',
                component:'./Member/MemberList/PrivateList',
              },
              {
                path:'/member/member-list/detail/recharge',
                component:'./Member/MemberList/RechargeList',
              },
            ]
          },
        ]
      },
      {
        path:'/member-sign',
        name:'memberSignIn',
        icon:'usergroup-add',
        component:'./MemberSignIn/MemberSignIn',
        routes:[
          {
            path: '/member-sign',
            redirect: '/member-sign/today',
          },
          {
            path:'/member-sign/today',
            component:"./MemberSignIn/TodayMemberSign"
          },
          {
            path:'/member-sign/record',
            component:'./MemberSignIn/MemberSignRecord'
          },
        ]
      },
      {
        path:'/eliminate-list',
        name:'eliminatelist',
        icon:'profile',
        component:'./Eliminate/EliminateList'
      },
      {
        path:'/order-list',
        name:'orderlist',
        icon:'form',
        component:'./Order/OrderList'
      },
      {
        path:'/employee-list',
        name:'employee',
        icon:'table',
        component:'./Employee/EmployeeList'
      },
      {
        path:'/setting',
        name:'setting',
        icon:'setting',
        routes:[
          {
            path:'/setting/venue_setting',
            name:'venue',
            component:'./Setting/VenueSetting/Setting',
            routes:[
              {
                path: '/setting/venue_setting',
                redirect: '/setting/venue_setting/base',
              },
              {
                path:'/setting/venue_setting/base',
                component:'./Setting/VenueSetting/Base'
              }
            ]
          },
          {
            path:'/setting/private_setting',
            name:'private',
            component:'./Setting/PrivateSetting/Setting'
          },
          {
            path:'/setting/bracelet_setting',
            name:'bracelet',
            component:'./Setting/BraceletSetting/Setting',
            routes:[
              {
                path: '/setting/bracelet_setting',
                redirect: '/setting/bracelet_setting/bracelet_list',
              },
              {
                path:'/setting/bracelet_setting/bracelet_list',
                component:'./Setting/BraceletSetting/BraceletList'
              },
              {
                path:'/setting/bracelet_setting/use_record',
                component:'./Setting/BraceletSetting/UseRecord'
              }
            ]
          }
        ]
      },
      {
        component: '404',
      },
    ],
  },
];
