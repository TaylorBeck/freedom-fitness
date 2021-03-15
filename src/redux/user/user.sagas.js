import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signUpSuccess,
  signUpFailure,
  emailSignInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

function* getSnapshotFromUserAuth(userAuth) {
  try {
    // Attempt to create new user ref or return existing user ref
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    // Dispatch a signInSuccess action
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ payload: { displayName, email, password }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield call(createUserProfileDocument, user, { displayName });
    yield put(signUpSuccess(email, password));
  } catch(error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInOnSignUpSuccess({ payload: { email, password }}) {
  try {
    yield put(emailSignInStart(email, password));
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInOnSignUpSuccess);
}

export function* signInWithGoogle() {
  try {
    // user should exist on the response object from firebase auth
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return; // userAuth is null
    yield getSnapshotFromUserAuth(userAuth);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart)
  ]);
}
