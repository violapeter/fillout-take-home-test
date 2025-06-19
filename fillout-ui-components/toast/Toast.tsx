import React from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import styled from '@emotion/styled'
import { Icon } from '../icon/Icon'

const Styled = {
  Provider: styled(RadixToast.Provider)``,
  Viewport: styled(RadixToast.Viewport)`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    padding: 25px;
    gap: 10px;
    width: 390px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 2147483647;
    outline: none;
  `,
  Root: styled(RadixToast.Root)`
    background: white;
    border-radius: 8px;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    display: flex;
    align-items: center;
    position: relative;

    &[data-state='open'] {
      animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    &[data-state='closed'] {
      animation: slideOut 100ms ease-in;
    }
    &[data-swipe='cancel'] {
      transform: translateY(0);
      transition: transform 200ms ease-out;
    }
    &[data-swipe='end'] {
      animation: swipeOut 100ms ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes slideOut {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-100%);
      }
    }

    @keyframes swipeOut {
      to {
        transform: translateY(-100%);
      }
    }
  `,
  ContentWrapper: styled.div`
    align-items: center;
    display: flex;
    gap: 8px;
  `,
  InfoIcon: styled(Icon)`
    color: var(--color-accent);
  `,
  Description: styled(RadixToast.Description)`
    font-family: var(--font-default), sans-serif;
    font-size: 14px;
    color: var(--color-gray-100);
    line-height: 1.4;
    flex: 1;
  `,
  Close: styled(RadixToast.Close)`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--color-gray-100);

    &:hover {
      color: var(--color-foreground);
    }
  `,
}

interface ToastProps {
  message?: string
  duration?: number
  onOpenChange?: (open: boolean) => void
}

const ModifiedToast = ({
  message,
  duration = 5000,
  onOpenChange,
  ...rest
}: ToastProps & RadixToast.ToastProps) => (
  <Styled.Root duration={duration} onOpenChange={onOpenChange} {...rest}>
    <Styled.ContentWrapper>
      <Styled.InfoIcon icon="Info" />
      <Styled.Description>{message}</Styled.Description>
      <Styled.Close aria-label="Close">
        <Icon icon="Cross" />
      </Styled.Close>
    </Styled.ContentWrapper>
  </Styled.Root>
)

const Toast = {
  Provider: RadixToast.Provider,
  Viewport: Styled.Viewport,
  Root: ModifiedToast,
  Action: RadixToast.Action,
}

export { Toast }
