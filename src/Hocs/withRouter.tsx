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
 * @export
 * @param {React.ComponentType<P & IWithRouterProps>} Child
 * @return {*}  {React.ComponentType<P & IWithRouterProps>}
 */
export default function withRouter<P = unknown>(
  Child: React.ComponentType<P>
): React.ComponentType<any> {
  return function withRouterWrapper(props: P): React.JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigateTo = (route: To, options?: NavigateOptions) =>
      navigate(route, options)

    return (
      <Child
        {...props}
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
