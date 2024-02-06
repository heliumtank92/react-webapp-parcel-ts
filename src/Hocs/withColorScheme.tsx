import React from 'react'
import { SupportedColorScheme, useColorScheme } from '@am92/react-design-system'

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IWithColorSchemeProps
 */
export interface IWithColorSchemeProps {
  themeMode?: SupportedColorScheme
  setThemeMode?: (mode: SupportedColorScheme) => void
}

/**
 * HOC to provide current mode & toggle mode feature
 *
 * @export
 * @param {React.ComponentType<P & IWithColorSchemeProps>} Child
 * @return {*}  {React.ComponentType<any>}
 */

export default function withColorScheme<P = unknown>(
  Child: React.ComponentType<P & IWithColorSchemeProps>
): React.ComponentType<P & IWithColorSchemeProps> {
  return function withColorSchemeWrapper(props: P) {
    const { colorScheme, setColorScheme } = useColorScheme()

    return (
      <Child {...props} themeMode={colorScheme} setThemeMode={setColorScheme} />
    )
  }
}
