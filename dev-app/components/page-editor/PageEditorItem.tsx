'use client'
import styled from '@emotion/styled'
import { DropdownMenu, Icon } from '@fillout/ui-components'
import type { IconType } from '@fillout/ui-components'
import React from 'react'
import { PageEditorRenameField } from '@/components/page-editor/PageEditorRenameField'

export enum PageType {
  Default = 'Default',
  Info = 'Info',
  Ending = 'Ending',
}

interface PageEditorItemProps {
  id: string
  name: string
  active?: boolean
  type?: PageType
  dragging?: boolean
  isNewlyAdded?: boolean
  onSelect?(): void
  onDelete?(id: string): void
  onDuplicate?(id: string): void
  onSetAsFirst?(id: string): void
  onCopy?(id: string): void
  pagesParentRef?: React.RefObject<HTMLDivElement>
}

const Styled = {
  Icon: styled(Icon, {
    shouldForwardProp: (prop) => prop !== 'active',
  })<{ active?: boolean }>`
    color: ${({ active }) =>
      active ? 'var(--color-warning)' : 'var(--color-gray-200)'};
  `,
  Wrapper: styled.div<{ active?: boolean; dragging?: boolean }>`
    background: ${({ active, dragging }) =>
      dragging ? 'white' : active ? 'white' : 'rgba(157, 164, 178, .15)'};
    box-shadow: ${({ active, dragging }) =>
      active || dragging ? 'var(--base-shadow)' : 'none'};
    color: ${({ active }) =>
      active ? 'var(--color-foreground)' : 'var(--color-gray-300)'};
    border-radius: 8px;
    display: flex;
    padding: 6px 10px;
    gap: 5px;
    align-items: center;
    position: relative;
    white-space: nowrap;
    transition: transform 0.1s ease;
    transform: ${({ dragging }) => dragging && 'scale(1.05)'};
    cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'hand')};

    &:hover {
      background: ${({ dragging }) =>
        dragging ? 'white' : 'rgba(157, 164, 178, 0.35)'};
    }

    &:focus {
      outline: 0;
      box-shadow: var(--focus-ring);
    }
  `,
  DropdownContent: styled(DropdownMenu.Content)`
    width: 240px;
  `,
  MenuOpener: styled.button<{ active?: boolean }>`
    all: unset;
    display: flex;
    transition:
      width 0.2s ease,
      visibility 0.2s ease,
      opacity 0.2s ease;
    width: ${({ active }) => (active ? '16px' : '0')};
    opacity: ${({ active }) => (active ? '1' : '0')};
    visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
    padding: 4px;
    border-radius: 100%;

    &:focus {
      box-shadow: var(--focus-ring);
    }
  `,
  TriggerLayer: styled(DropdownMenu.Trigger)`
    all: unset;
    position: absolute;
    inset: 0;
    background: transparent;
    pointer-events: none;
  `,
}

export const PageEditorItem = ({
  id,
  onSelect,
  onDelete,
  onDuplicate,
  onSetAsFirst,
  onCopy,
  name,
  active,
  dragging,
  isNewlyAdded,
  type = PageType.Default,
}: PageEditorItemProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [rename, setRename] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  // Automatically enter rename mode when a page is newly added and active
  React.useEffect(() => {
    if (isNewlyAdded && active) {
      setRename(true)
    }
  }, [isNewlyAdded, active])

  const iconMap: Record<PageType, IconType> = {
    [PageType.Info]: 'Info',
    [PageType.Default]: 'Document',
    [PageType.Ending]: 'Checkmark',
  }

  function handleClick() {
    onSelect?.()
  }

  function handleSelectRename() {
    setRename(true)
  }

  function handleDelete() {
    onDelete?.(id)
  }

  function handleDuplicate() {
    onDuplicate?.(id)
  }

  function handleSetAsFirst() {
    onSetAsFirst?.(id)
  }

  function handleCopy() {
    onCopy?.(id)
  }

  function handleOpenMenu(event: React.MouseEvent) {
    event.preventDefault()
    setMenuOpen(true)
  }

  return (
    <Styled.Wrapper
      dragging={dragging}
      active={active}
      tabIndex={0}
      onClick={handleClick}
      ref={wrapperRef}
      onContextMenu={handleOpenMenu}
    >
      <Styled.Icon size={20} icon={iconMap[type]} active={active} />
      <PageEditorRenameField
        rename={rename}
        onRename={setRename}
        name={name}
        id={id}
        active={active}
      />
      <Styled.MenuOpener active={active} onMouseDown={handleOpenMenu}>
        <Icon icon="DotGrid" />
      </Styled.MenuOpener>
      <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Styled.TriggerLayer>&nbsp;</Styled.TriggerLayer>
        <Styled.DropdownContent
          side="top"
          align="start"
          sideOffset={9}
          heading="Settings"
          referenceRef={wrapperRef}
        >
          <DropdownMenu.Item
            icon="Flag"
            isHighlight
            onSelect={handleSetAsFirst}
          >
            Set as first page
          </DropdownMenu.Item>
          <DropdownMenu.Item icon="Edit" onSelect={handleSelectRename}>
            Rename
          </DropdownMenu.Item>
          <DropdownMenu.Item icon="Copy" onSelect={handleCopy}>
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item icon="Duplicate" onSelect={handleDuplicate}>
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon="Trash" isDanger onSelect={handleDelete}>
            Delete
          </DropdownMenu.Item>
        </Styled.DropdownContent>
      </DropdownMenu.Root>
    </Styled.Wrapper>
  )
}
