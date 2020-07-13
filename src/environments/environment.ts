import { Approver } from 'src/app/models/approver';

export const environment = {
  production: true,
  root: '/app',
  //apiUrl: 'https://api.coloredstrategies.com',
  apiUrl: 'https://localhost:44346',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  /*
  Color Options:
  'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss', 'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot', 'light.redruby', 'light.purplemonster'
  'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss', 'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot', 'dark.redruby', 'dark.purplemonster'
  */
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: true,
  firebase: {
    apiKey: 'AIzaSyCqoNLB_jTw4nncO12qR-eDH9gAeWiZVaw',
    authDomain: 'vien-angular-login.firebaseapp.com',
    databaseURL: 'https://vien-angular-login.firebaseio.com',
    projectId: 'vien-angular-login',
    storageBucket: 'vien-angular-login.appspot.com',
    messagingSenderId: '16217062888',
    appId: '1:16217062888:web:6b08232ca0c9662fedb85d',
    measurementId: 'G-8ETT79WRRN'
  },
  approverList: {
    leader: '8,9,10,15',
    director: '4,5,6,7,16,17,18,19',
    approve: '4,5,6,7,16,17,18,19'

  } 
};
