import { appName } from '../config'
import firebase from 'firebase/app'
import { Record, List } from 'immutable'
import api from '../services/api'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`
export const EVENTS_SUCCESS = `${prefix}/EVENTS_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  events: null,
  loaded: false
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  console.log(payload)

  switch (type) {
    case EVENTS_REQUEST:
      return state.set('loaded', false)
    case EVENTS_SUCCESS:
      return state.set('loaded', true).set('events', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
const eventsDefault = createSelector(
  stateSelector,
  (state) => state.events
)
export const eventsSelector = createSelector(
  eventsDefault,
  (events) => events.valueSeq().toArray()
)
export const eventsLoadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)

/**
 * Action Creators
 * */

export function fetchEvents() {
  return {
    type: EVENTS_REQUEST
  }
}

/**
 * Sagas
 * */

export const fetchEventsSaga = function*() {
  const events = yield call(api.loadEvents)

  yield put({
    type: EVENTS_SUCCESS,
    payload: { events }
  })
}

export function* saga() {
  yield all([takeEvery(EVENTS_REQUEST, fetchEventsSaga)])
}
