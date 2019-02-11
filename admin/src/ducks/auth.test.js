import { put, call, take } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUpSaga,
  signUp,
  SIGN_UP_SUCCESS,
  signIn,
  signInSaga,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_LIMIT_PERMISSIONS,
  SIGN_IN_REQUEST
} from './auth'

const user = {
  email: 'roman@test.com',
  password: 'qwertyQWERTY'
}

const { email, password } = user

describe('Auth Duck', () => {
  it('should Sign Up', () => {
    const action = signUp(email, password)
    const signUpSagaTest = signUpSaga(action)

    expect(signUpSagaTest.next().value).toEqual(
      call(api.signUp, email, password)
    )

    expect(signUpSagaTest.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    expect(signUpSagaTest.next().done).toEqual(true)
  })

  it('should Sign In', () => {
    const signInSagaTest = signInSaga()

    expect(signInSagaTest.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(signInSagaTest.next({ payload: user }).value).toEqual(
      call(api.signIn, email, password)
    )

    expect(signInSagaTest.next(user).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )
  })

  it('should error Sign In', () => {
    const action = signIn(email, password)
    const error = new Error('You can not sign in, try later')
    const signInSagaTest = signInSaga(action)

    for (let i = 0; i <= 3; i++) {
      expect(signInSagaTest.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(signInSagaTest.next({ payload: user }).value).toEqual(
        call(api.signIn, email, password)
      )

      expect(signInSagaTest.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    }

    expect(signInSagaTest.next().value).toEqual(
      put({
        type: SIGN_IN_LIMIT_PERMISSIONS
      })
    )
  })
})
