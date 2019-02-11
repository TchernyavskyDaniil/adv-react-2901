import { select, put, call } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUpSaga,
  signUp,
  SIGN_UP_SUCCESS,
  signIn,
  signInSaga,
  SIGN_IN_SUCCESS
} from './auth'

describe('Auth Duck', () => {
  it('should Sign Up', () => {
    const user = {
      email: 'roman@test.com',
      password: 'qwertyQWERTY'
    }
    const { email, password } = user
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
    const user = {
      email: 'roman@test.com',
      password: 'qwertyQWERTY'
    }
    const { email, password } = user
    const action = signIn(email, password)
    const signInSagaTest = signInSaga(action)

    expect(signInSagaTest.next().value).toEqual(
      call(api.signIn, email, password)
    )

    expect(signInSagaTest.next(user).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )

    expect(signInSagaTest.next().done).toEqual(true)
  })
})
