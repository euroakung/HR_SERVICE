export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
}

const data: IMenuItem[] = [{
  id: 'dashboards',
  icon: 'simple-icon-home',
  label: 'menu.dashboards',
  to: '/app/dashboards',
  subs: [{
    icon: 'simple-icon-home',
    label: 'menu.dashboards',
    to: '/app/dashboards/default'
  },
  {
    icon: 'simple-icon-pie-chart',
    label: 'menu.analytics',
    to: '/app/dashboards/analytics'
  },
  {
    icon: 'simple-icon-basket-loaded',
    label: 'menu.ecommerce',
    to: '/app/dashboards/ecommerce'
  },
  {
    icon: 'simple-icon-doc',
    label: 'menu.content',
    to: '/app/dashboards/content'
  }
  ]
},



// {
//   id: 'applications',
//   icon: 'iconsminds-air-balloon-1',
//   label: 'menu.applications',
//   to: '/app/applications',
//   subs: [{
//     icon: 'simple-icon-check',
//     label: 'menu.todo',
//     to: '/app/applications/todo'
//   },
//   {
//     icon: 'simple-icon-calculator',
//     label: 'menu.survey',
//     to: '/app/applications/survey'
//   },
//   // {
//   //   icon: 'simple-icon-calculator',
//   //   label: 'menu.survey-detail',
//   //   to: '/app/applications/survey-detail'
//   // },
//   {
//     icon: 'simple-icon-bubbles',
//     label: 'menu.chat',
//     to: '/app/applications/chat'
//   }
//   ]
// },
{
  id: 'profile',
  icon: 'iconsminds-profile',
  label: 'menu.profile',
  to: '/app/pages',
  subs: [{
    icon: 'iconsminds-profile',
    label: 'menu.profile',
    to: '/app/pages/profile/social' 
     
  },{
  icon: 'iconsminds-students',
  label: 'menu.person-education',
  to: '/app/pages/profile/social' 
},
{
  icon: 'iconsminds-family-sign',
  label: 'menu.person-family',
  to: '/app/pages/profile/portfolio' 
},
{
  icon: 'iconsminds-calendar-4',
  label: 'menu.person-leave',
  to: '/app/pages/profile/portfolio' 
},
{
  icon: 'iconsminds-notepad',
  label: 'menu.person-training',
  to: '/app/pages/profile/portfolio' 
} ,{
  icon: 'iconsminds-financial',
  label: 'menu.person-benefit',
  to: '/app/pages/profile/portfolio' 
}
,{
  icon: 'simple-icon-badge',
  label: 'menu.person-insignia',
  to: '/app/pages/profile/portfolio',
  
}
,{
  icon: 'iconsminds-file-clipboard-file---text',
  label: 'menu.person-position',
  to: '/app/pages/profile/portfolio',
  
}
,{
  icon: 'iconsminds-coins',
  label: 'menu.person-salary',
  to: '/app/pages/profile/portfolio',
  
}  ,{
  icon: 'simple-icon-docs',
  label: 'menu.person-document',
  to: '/app/pages/profile/portfolio',
   
}
  ]
},

 
{
   id: 'applications',
   icon: 'iconsminds-optimization',
    label: 'menu.applications',
  to: '/app/pages',
  subs: [{
    id: 'pages-profile',
    label: 'menu.app-leave',
    to: '/app/ui/forms/components',
    subs: [
      {
        icon: 'iconsminds-stethoscope',
        label: 'menu.app-sick',
        to: '/app/ui/forms/components',
      },
      {
        icon: 'simple-icon-plane',
        label: 'menu.app-vacation',
        to: '/app/applications/survey'
      },
       {
         icon: 'iconsminds-chinese-temple',
         label: 'menu.app-ordain',
         to: '/app/applications/todo'
       },
      {
        icon: 'iconsminds-family-sign',
        label: 'menu.app-helping-wife',
        to: '/app/applications/todo'
      }
    ]
  },
    
  ]
}, 
{
  id: 'manual',
  icon: 'iconsminds-library',
  label: 'menu.manual',
 // to: 'http://app.personnel.up.ac.th/SalaryUP/',
 to: '/app/pages/miscellaneous/search',
  newWindow: true
}, 
{
  icon: 'simple-icon-question',
      label: 'menu.faq',
      to: '/app/pages/miscellaneous/faq'
}
];
export default data;
