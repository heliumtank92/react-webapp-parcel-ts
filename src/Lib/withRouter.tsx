import React from 'react'
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'

export default function withRouter(
  Child: React.ElementType<any>
): React.ElementType<any> {
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
