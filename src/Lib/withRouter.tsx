import React from 'react'
import {
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
 * @param {React.ComponentType<any>} Child
 * @return {*}  {React.ComponentType<any>}
 */
export default function withRouter(
  Child: React.ComponentType<any>
): React.ComponentType<any> {
  return (props: any): React.JSX.Element => {
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
