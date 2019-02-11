import { put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON } from './people'
import { generateId } from './utils'

describe('People', () => {
  it('should add a person', () => {
    const person = {
      email: 'roman@test.com',
      firstName: 'Roman',
      lastName: 'Yakobchuk'
    }
    const action = {
      type: ADD_PERSON_REQUEST,
      payload: person
    }

    const gen = addPersonSaga(action)

    expect(gen.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(gen.next(id).value).toEqual(
      put({
        type: ADD_PERSON,
        payload: { person: { ...person, id } }
      })
    )

    expect(gen.next().value).toEqual(put(reset('person')))
    expect(gen.next().done).toBe(true)
  })
})
