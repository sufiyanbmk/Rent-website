/* eslint-disable */
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPhoneNumber,RecaptchaVerifier} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDSMoSdJTKIRz_A32ECqiAqQCVHzAy_SOc",
  authDomain: "rent-website-26553.firebaseapp.com",
  projectId: "rent-website-26553",
  storageBucket: "rent-website-26553.appspot.com",
  messagingSenderId: "1076584044688",
  appId: "1:1076584044688:web:428d73da7301e0ebb82015",
  measurementId: "G-3KR4QM39DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export function recaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
          size: 'invisible',
          callback: () => {},
      },
      auth
  )
}

export function onSigninssubmit(countryCode, phonenumber) {
  const phoneNumber = countryCode+phonenumber
  const appVerifier = window.recaptchaVerifier
  return new Promise((resolve, reject) => {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
              window.confirmationResult = confirmationResult
              resolve()
          })
          .catch((err) => {
              reject(err)
          })
  })
}
const provider = new GoogleAuthProvider();
export {auth,provider};