import { Action } from 'redux'

import { INITIAL_STATE, T_SERVICE_TRACKER_REDUCER } from './TYPES'

export default function ServiceTrackerReducer(
  state: T_SERVICE_TRACKER_REDUCER = INITIAL_STATE,
  action: Action<string>
): T_SERVICE_TRACKER_REDUCER {
  const { type } = action
  const typeParts = type.split('/')
  const endingPart = typeParts.pop()

  switch (endingPart) {
    case 'LOADING': {
      const key = typeParts.join('/')
      return { ...state, [key]: 'LOADING' }
    }
    case 'SUCCESS': {
      const key = typeParts.join('/')
      return { ...state, [key]: 'SUCCESS' }
    }
    case 'ERROR': {
      const key = typeParts.join('/')
      return { ...state, [key]: 'ERROR' }
    }
    default: {
      return state
    }
  }
}
