import { auth } from './firebase';

//Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

//Send E-Mail verification
export const doSendEmailVerification = () =>
  auth.currentUser.sendEmailVerification()

//Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//Sign Out
export const doSignOut = () =>
  auth.signOut();

//Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

//Passwoed Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password); 

