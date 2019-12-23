//environment.js
var environments = {
    staging: {
      FIREBASE_API_KEY: 'AIzaSyCnjmHlrh4AI0ArX8v7RZ4LKiukbv34XG4',
      FIREBASE_AUTH_DOMAIN: 'era-gvision.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://era-gvision.firebaseio.com',
      FIREBASE_PROJECT_ID: 'era-gvision',
      FIREBASE_STORAGE_BUCKET: 'era-gvision.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '512987191628',
      GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyCxfg826gWH4WRJVMRaxgiKbBb6QeWab_U'
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  
  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return 'staging';
    } else if (releaseChannel === 'staging') {
      return 'staging';
    } else {
      return 'staging';
    }
  }
  function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  
  export default Environment;