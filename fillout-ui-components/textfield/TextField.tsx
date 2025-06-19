import styled from '@emotion/styled'
import React from 'react'

const Styled = {
  Input: styled.input`
    font-family: var(--font-default), sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.015em;
    line-height: 24px;
    padding: 0 3px;
    border-radius: 6px;
    border: 0;
    box-shadow: 0 0 0 0.5px var(--color-border);
  `,
}

interface TextFieldProps {
  ref?: React.RefObject<HTMLInputElement | null>
}

export const TextField = (
  props: TextFieldProps & Omit<React.AllHTMLAttributes<HTMLInputElement>, 'as'>,
) => {
  return <Styled.Input type="text" {...props} />
}
