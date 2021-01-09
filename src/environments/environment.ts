// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gatewayEndpoint: 'http://localhost:8088',

  firebase : {
  apiKey: 'AIzaSyByjZvkP3NYohpZrOtOELr_c_ND38W6Tso',
  authDomain: "laboratoire-c478e.firebaseapp.com",
  projectId: "laboratoire-c478e",
  storageBucket: "laboratoire-c478e.appspot.com",
  messagingSenderId: "978285037724",
  appId: "1:978285037724:web:27f13a09037ac114490559",
  measurementId: "G-BRVSYK4K4H"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
