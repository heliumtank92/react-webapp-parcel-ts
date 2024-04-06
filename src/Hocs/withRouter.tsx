import React from 'react'
import {
  Location,
  NavigateFunction,
  NavigateOptions,
  Params,
  SetURLSearchParams,
  To,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'
import { Subtract } from 'utility-types'

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IWithRouterProps
 */
export interface IWithRouterProps {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  navigate: NavigateFunction
  location: Location
  params: Readonly<Params<string>>
  navigateTo: (route: To, options?: NavigateOptions) => void
}

/**
 * HOC to provide routing features
 *
 * @template P
 * @param Child
 * @returns
 */
export default function withRouter<P extends IWithRouterProps>(
  Child: React.ComponentType<P>
) {
  return function withRouterWrapper(
    props: Subtract<P, IWithRouterProps>
  ): React.JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigateTo = (route: To, options?: NavigateOptions) =>
      navigate(route, options)

    return (
      <Child
        {...(props as P)}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        navigate={navigate}
        location={location}
        params={params}
        navigateTo={navigateTo}
      />
    )
  }
}
