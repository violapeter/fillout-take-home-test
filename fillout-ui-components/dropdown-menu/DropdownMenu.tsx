import React from 'react'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import styled from '@emotion/styled'
import { Icon, IconType } from '../icon/Icon'

const Styled = {
  Content: styled(RadixDropdownMenu.Content)`
    box-shadow: var(--base-shadow);
    background: white;
    border-radius: 8px;
  `,
  Heading: styled.div`
    background: white;
    font-family: var(--font-brand), sans-serif;
    box-shadow: inset 0 0 0 0.5px #e1e1e1;
    color: #1a1a1a;
    padding: 12px;
    border-radius: 8px 8px 0 0;
  `,
  Items: styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px;
  `,
  Item: styled(RadixDropdownMenu.Item, {
    shouldForwardProp: (prop) => prop !== 'isDanger',
  })<{ isDanger?: boolean }>`
    color: ${({ isDanger }) =>
      isDanger ? 'var(--color-danger)' : 'var(--color-foreground)'};
    cursor: default;
    display: flex;
    align-items: center;
    border-radius: 8px;
    gap: 6px;
    outline: none;
    padding: 8px 12px;

    & > * {
      color: ${({ isDanger }) => isDanger && 'var(--color-danger);'};
    }

    &:hover,
    &:focus {
      background: rgba(157, 164, 178, 0.15);
    }
  `,
  ItemIcon: styled(Icon, {
    shouldForwardProp: (prop) => prop !== 'isHighlight',
  })<{ isHighlight?: boolean }>`
    color: ${({ isHighlight }) =>
      isHighlight ? 'var(--color-accent)' : 'var(--color-gray-100)'};
  `,
  ItemLabel: styled.span`
    font-family: var(--font-default), sans-serif;
    font-weight: 500;
    font-size: 14px;
  `,
  Separator: styled(RadixDropdownMenu.Separator)`
    width: calc(100% - 24px);
    height: 1px;
    box-shadow: 0 0.5px 0 0 var(--color-border);
    margin: 4px 12px;
  `,
}

interface ModifiedItemProps {
  icon?: IconType
  isHighlight?: boolean
  isDanger?: boolean
}

const ModifiedItem = ({
  children,
  icon,
  isHighlight,
  ...rest
}: React.PropsWithChildren<
  ModifiedItemProps & RadixDropdownMenu.DropdownMenuItemProps
>) => (
  <Styled.Item {...rest}>
    {icon && <Styled.ItemIcon icon={icon} isHighlight={isHighlight} />}
    <Styled.ItemLabel>{children}</Styled.ItemLabel>
  </Styled.Item>
)

interface ModifiedContentProps {
  heading?: string
  referenceRef?: React.RefObject<HTMLElement | null>
}

const ModifiedContent = ({
  children,
  heading,
  referenceRef,
  ...rest
}: React.PropsWithChildren<
  ModifiedContentProps & RadixDropdownMenu.DropdownMenuContentProps
>) => {
  const inner = (
    <>
      {heading && <Styled.Heading>{heading}</Styled.Heading>}
      <Styled.Items>{children}</Styled.Items>
    </>
  )

  return (
    <RadixDropdownMenu.Portal>
      {referenceRef ? (
        <Styled.Content asChild {...rest}>
          <div data-mine>{inner}</div>
        </Styled.Content>
      ) : (
        <Styled.Content {...rest}>{inner}</Styled.Content>
      )}
    </RadixDropdownMenu.Portal>
  )
}

const DropdownMenu = {
  ...RadixDropdownMenu,
  Content: ModifiedContent,
  Item: ModifiedItem,
  Separator: Styled.Separator,
}

export { DropdownMenu }
