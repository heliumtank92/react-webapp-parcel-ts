import { createSelector } from '@reduxjs/toolkit'

export const SLICE_NAME = 'serviceTracker'

const select = (state: any) => state[SLICE_NAME]

export const getServiceSelector = (state: any, serviceKey: string) => {
  return createSelector(
    (state: any) => state[SLICE_NAME][serviceKey],
    serviceKeyValue => serviceKeyValue
  )(state)
}

export const isServiceLoading = (state: any, serviceKeys: string[]) => {
  const loading = serviceKeys.reduce((boolean, serviceKey) => {
    return boolean || getServiceSelector(state, serviceKey) === 'LOADING'
  }, false)

  return loading
}
