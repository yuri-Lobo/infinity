// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//#region  [Production]

// export const environment = {

//   production: false,
//   apiUrl: "http://localhost:63741/api",
//   treinamentoUrl: "http://localhost:63751/api",
//   tenantUrl: "https://tenant-prod-api.azurewebsites.net/api",
//   authority: 'https://toctecidentityserver.azurewebsites.net/',
//   client_id: 'toctec.webapp.devtocbimlocal',
//   redirect_uri: 'http://localhost:4200/auth-callback',
//   post_logout_redirect_uri: 'http://localhost:4200/',
//   response_type: 'id_token token',
//   scope: 'openid profile email toctec.api.tocbim toctec.api.tenant toctec.api.toctreina',
//   filterProtocolClaims: true,
//   loadUserInfo: true,
//   automaticSilentRenew: true,
//   produtoId: "FEE5BE22-B893-4A67-B2C4-43EC44F9AFD7",
//   silent_redirect_uri: "http://localhost:4200/silent-refresh.html",

// };

//#endregion

export const environment = {
  // apiKey: "AIzaSyB1wfqZBWGF72Gb3GTdiuaCIayb9cUgm3k",
  // authDomain: "infinity-ceeb4.firebaseapp.com",
  // projectId: "infinity-ceeb4",
  // storageBucket: "infinity-ceeb4.appspot.com",
  // messagingSenderId: "452027261236",
  // appId: "1:452027261236:web:a539ab97ba45f2dbf14561",
  // measurementId: "G-G8BLQRXF8F",
  apiUrl: "http://localhost:8080",
  //authority: "https://toctecis4-dev.azurewebsites.net/",
};

// export const environment = {
//   production: false,
//   firebaseConfig: {
//     apiKey: "AIzaSyB1wfqZBWGF72Gb3GTdiuaCIayb9cUgm3k",
//     authDomain: "infinity-ceeb4.firebaseapp.com",
//     projectId: "infinity-ceeb4",
//     storageBucket: "infinity-ceeb4.appspot.com",
//     messagingSenderId: "452027261236",
//     appId: "1:452027261236:web:a539ab97ba45f2dbf14561",
//     measurementId: "G-G8BLQRXF8F"
//   }
// };

//upar fotos no firebase da google
// const firebaseConfig = {
//   apiKey: "AIzaSyB1wfqZBWGF72Gb3GTdiuaCIayb9cUgm3k",
//   authDomain: "infinity-ceeb4.firebaseapp.com",
//   projectId: "infinity-ceeb4",
//   storageBucket: "infinity-ceeb4.appspot.com",
//   messagingSenderId: "452027261236",
//   appId: "1:452027261236:web:a539ab97ba45f2dbf14561",
//   measurementId: "G-G8BLQRXF8F"
// };
// const app = initializeApp(environment);
// const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
