// import loginWithRefreshTokenService from './User/Services/loginWithRefreshToken.Service'

// const loginWithRefreshTokenServiceDispatcher = loginWithRefreshTokenService()

// export default function serviceActionCreatorWithTokenRotation (actions, service) {
//   return (data) => {
//     return async (dispatch, getState) => {
//       if (actions.loading && typeof actions.loading === 'function') {
//         dispatch(actions.loading())
//       }

//       try {
//         const response = await service(data)
//         if (actions.success && typeof actions.success === 'function') {
//           dispatch(actions.success(response))
//         }
//         return response
//       } catch (serviceError) {
//         if (serviceError.errorCode === 'User::TOKEN_EXPIRED') {
//           await retryWithTokenRotation(actions, service, data, dispatch, getState)
//         } else {
//           if (actions.error && typeof actions.error === 'function') {
//             dispatch(actions.error({ ...serviceError }))
//           }
//           return serviceError
//         }
//       }
//     }
//   }
// }

// async function retryWithTokenRotation (actions, service, data, dispatch, getState) {
//   const tokenRotationResponse = await loginWithRefreshTokenServiceDispatcher(dispatch, getState)

//   if (tokenRotationResponse._isCustomError) {
//     return tokenRotationResponse
//   }

//   try {
//     const response = await service(data)
//     if (actions.success && typeof actions.success === 'function') {
//       dispatch(actions.success(response))
//     }
//     return response
//   } catch (error) {
//     if (actions.error && typeof actions.error === 'function') {
//       dispatch(actions.error({ ...error }))
//     }
//     return error
//   }
// }
