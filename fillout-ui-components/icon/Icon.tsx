import * as icons from './icons'
import styled from '@emotion/styled'

export type IconType = keyof typeof icons

interface IconProps {
  size?: number
  icon: IconType
}

export const Icon = ({ icon, size = 16, ...rest }: IconProps) => {
  const Component = icons[icon]

  const StyledIcon = styled(Component)`
    width: ${size}px;
    height: ${size}px;

    & > * {
      fill: currentColor;
    }
  `

  return <StyledIcon aria-hidden {...rest} />
}
