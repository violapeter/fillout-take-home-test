import styled from '@emotion/styled'
import { Icon, IconType } from '../icon/Icon'
import React from 'react'

type ButtonVariant = 'primary' | 'inactive'

interface ButtonProps {
  icon?: IconType
  variant?: ButtonVariant
}

const Styled = {
  Button: styled.button<{ active?: boolean }>`
    background: ${({ active }) =>
      active ? 'white' : 'rgba(157, 164, 178, .15)'};
    box-shadow: ${({ active }) => (active ? 'var(--base-shadow)' : 'none')};
    border-radius: 8px;
    border: 0;
    margin: 0;
    display: flex;
    padding: 6px 10px;
    gap: 8px;
    align-items: center;
    cursor: default;

    &:hover {
      background: rgba(157, 164, 178, 0.35);
    }

    &:focus {
      outline: 0;
      box-shadow: var(--focus-ring);
    }
  `,
  Icon: styled(Icon)``,
  Label: styled.span`
    font-family: var(--font-default), sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.015em;
    line-height: 20px;
  `,
}

export const Button = ({
  children,
  icon,
  variant = 'primary',
  ...rest
}: React.PropsWithChildren<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
>) => {
  return (
    <Styled.Button active={variant === 'primary'} {...rest}>
      {icon && <Styled.Icon icon={icon} />}
      <Styled.Label>{children}</Styled.Label>
    </Styled.Button>
  )
}
