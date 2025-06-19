'use client'
import React from 'react'
import styled from '@emotion/styled'
import {
  PageEditorItem,
  PageType,
} from '@/components/page-editor/PageEditorItem'
import { Button, Icon } from '@fillout/ui-components'
import { Reorder } from 'motion/react'

export interface Page {
  id: string
  name: string
  active?: boolean
  type?: PageType
}

interface PageEditorProps {
  activePage?: string
  newlyAddedPage?: string | null
  pages: Page[]
  onChangeActive?(id: string): void
  onAddPage?(): void
  onPageReorder(pages: Page[]): void
  onDeletePage?(id: string): void
  onDuplicatePage?(id: string): void
  onAddBetween?(index: number): void
  onSetAsFirst?(id: string): void
  onCopy?(id: string): void
}

const Styled = {
  Wrapper: styled.div`
    display: flex;
    max-width: calc(100vw - 40px);
    overflow: auto;
    padding: 10px 0;
    margin: 0 20px;
  `,
  ReorderWrap: styled(Reorder.Item)`
    display: flex;
    gap: 8px;
  `,
  Between: styled.div<{ dragging?: boolean; inactive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    position: relative;
    transition: width 0.2s ease;
    opacity: ${({ dragging }) => (dragging ? 0 : 1)};

    &::before {
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed var(--color-gray-50);
      position: absolute;
      top: 50%;
      z-index: -1;
    }

    &:hover {
      width: ${({ inactive }) => (inactive ? '20px' : '56px')};

      & > button {
        opacity: 1;
        visibility: visible;
      }
    }
  `,
  AddButton: styled.button`
    background: white;
    border: 0;
    padding: 0;
    margin: 0;
    box-shadow: inset 0 0 0 0.5px var(--color-border);
    border-radius: 100%;
    width: 16px;
    height: 16px;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  `,
}

export const PageEditor = ({
  pages,
  activePage = pages[0].id,
  newlyAddedPage,
  onChangeActive,
  onAddPage,
  onPageReorder,
  onDeletePage,
  onDuplicatePage,
  onAddBetween,
  onSetAsFirst,
  onCopy,
}: PageEditorProps) => {
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const endingPages = React.useMemo(
    () => pages.filter(({ type }) => type === PageType.Ending),
    [pages],
  )
  const orderablePages = React.useMemo(
    () => pages.filter(({ type }) => type !== PageType.Ending),
    [pages],
  )

  const handleReorder = React.useCallback(
    (pages: Page[]) => {
      onPageReorder?.(pages.concat(endingPages))
    },
    [endingPages, onPageReorder],
  )

  return (
    <Styled.Wrapper>
      <Reorder.Group
        axis="x"
        values={pages}
        onReorder={handleReorder}
        as="div"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {orderablePages.map((page, index) => (
          <React.Fragment key={page.id}>
            <Styled.ReorderWrap
              key={page.id}
              value={page}
              as="div"
              onDragStart={() => setDraggingId(page.id)}
              onDragEnd={() => setDraggingId(null)}
              drag={page?.type === PageType.Ending ? false : 'x'}
            >
              <PageEditorItem
                {...page}
                active={activePage === page.id}
                dragging={draggingId === page.id}
                isNewlyAdded={newlyAddedPage === page.id}
                onSelect={() => onChangeActive?.(page.id)}
                onDelete={onDeletePage}
                onDuplicate={onDuplicatePage}
                onSetAsFirst={onSetAsFirst}
                onCopy={onCopy}
              />
            </Styled.ReorderWrap>
            <Styled.Between dragging={draggingId !== null}>
              {pages.length - 1 !== index && (
                <Styled.AddButton onClick={() => onAddBetween?.(index + 1)}>
                  <Icon icon="Plus" size={8} />
                </Styled.AddButton>
              )}
            </Styled.Between>
          </React.Fragment>
        ))}
      </Reorder.Group>
      {endingPages.map((page) => (
        <PageEditorItem
          {...page}
          active={activePage === page.id}
          isNewlyAdded={newlyAddedPage === page.id}
          key={page.id}
          id={page.id}
          name={page.name}
          onSelect={() => onChangeActive?.(page.id)}
          onDelete={onDeletePage}
          onDuplicate={onDuplicatePage}
          onSetAsFirst={onSetAsFirst}
          onCopy={onCopy}
        />
      ))}
      <Styled.Between inactive />
      <Button icon="Plus" variant="primary" onClick={onAddPage}>
        Add page
      </Button>
    </Styled.Wrapper>
  )
}
