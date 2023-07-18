import React from 'react'
import { SupportedColorScheme, useColorScheme } from '@am92/react-design-system'

export interface IWithColorSchemeProps {
  themeMode: SupportedColorScheme
  setThemeMode: (mode: SupportedColorScheme) => void
}

export default function withColorScheme(
  Child: React.ComponentType<any>
): React.ComponentType<any> {
  return (props: any): React.JSX.Element => {
    const { mode, setMode } = useColorScheme()

    return <Child {...props} themeMode={mode} setThemeMode={setMode} />
  }
}
