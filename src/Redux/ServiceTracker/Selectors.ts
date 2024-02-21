import { createSelector } from '@reduxjs/toolkit'

import { TAppSore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'serviceTracker'

// const select = (state: TAppSore) => state[SLICE_NAME]

export const getServiceSelector = (state: TAppSore, serviceKey: string) => {
  return createSelector(
    (state: TAppSore) => state[SLICE_NAME][serviceKey],
    serviceKeyValue => serviceKeyValue
  )(state)
}

export const isServiceLoading = (state: TAppSore, serviceKeys: string[]) => {
  const loading = serviceKeys.reduce((boolean, serviceKey) => {
    return boolean || getServiceSelector(state, serviceKey) === 'LOADING'
  }, false)

  return loading
}
