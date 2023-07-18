import React from 'react'
import { SupportedColorScheme, useColorScheme } from '@am92/react-design-system'

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IWithColorSchemeProps
 */
export interface IWithColorSchemeProps {
  themeMode: SupportedColorScheme
  setThemeMode: (mode: SupportedColorScheme) => void
}

/**
 * HOC to provide current mode & toggle mode feature
 *
 * @export
 * @param {React.ComponentType<any>} Child
 * @return {*}  {React.ComponentType<any>}
 */

export default function withColorScheme(
  Child: React.ComponentType<any>
): React.ComponentType<any> {
  return (props: any): React.JSX.Element => {
    const { mode, setMode } = useColorScheme()

    return <Child {...props} themeMode={mode} setThemeMode={setMode} />
  }
}
