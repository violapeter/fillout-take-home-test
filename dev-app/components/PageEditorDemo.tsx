'use client'
import { Page, PageEditor } from '@/components/page-editor/PageEditor'
import React from 'react'
import { PageType } from '@/components/page-editor/PageEditorItem'
import { Toast } from '@fillout/ui-components'
import { DemoLayout } from '@/components/demo-components/DemoLayout'

export const PageEditorDemo = () => {
  const DEFAULT_NAME = 'New Page'

  const defaultPages = [
    {
      id: 'my-page',
      name: 'My page',
    },
    {
      id: 'my-other-page',
      name: 'My other page',
    },
    {
      id: 'ending-page',
      name: 'Ending',
      type: PageType.Ending,
    },
  ]
  const [message, setMessage] = React.useState<string | null>(null)
  const [pages, setPages] = React.useState(defaultPages)
  const [activePage, setActivePage] = React.useState(pages[0].id)
  const [newlyAddedPage, setNewlyAddedPage] = React.useState<string | null>(
    null,
  )

  function handleDeletePage(id: string) {
    setPages((prev) => prev.filter((page) => page.id !== id))
  }

  function createPage(page: Page, index?: number) {
    setPages((prev) => {
      if (!index) {
        return [...prev, page]
      }

      const newPages = [...prev]
      newPages.splice(index, 0, page)
      return newPages
    })
    setActivePage(page.id)
    setNewlyAddedPage(page.id)
  }

  function handleDuplicatePage(id: string) {
    const newId = crypto.randomUUID()
    const pageToDuplicate = pages.find((page) => page.id === id)

    if (!pageToDuplicate) return

    createPage({
      ...pageToDuplicate,
      id: newId,
      name: `${pageToDuplicate.name} (copy)`,
    })
  }

  function handleAddPage() {
    createPage({
      id: crypto.randomUUID(),
      name: DEFAULT_NAME,
    })
  }

  function handleAddBetween(index: number) {
    createPage(
      {
        id: crypto.randomUUID(),
        name: DEFAULT_NAME,
      },
      index,
    )
  }

  function handleSetAsFirst(id: string) {
    const pageToMove = pages.find((page) => page.id === id)
    popupMessage(`"${pageToMove?.name || 'Page'}" set as first`)
  }

  function handleCopy(id: string) {
    const pageToCopy = pages.find((page) => page.id === id)
    popupMessage(`"${pageToCopy?.name || 'Page'}" copied to clipboard`)
  }

  function popupMessage(text: string) {
    setMessage(text)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setMessage(null)
    }
  }

  React.useEffect(() => {
    if (newlyAddedPage) {
      const timer = setTimeout(() => {
        setNewlyAddedPage(null)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [newlyAddedPage])

  return (
    <DemoLayout activeId={activePage}>
      <Toast.Provider swipeDirection="up">
        {message !== null && (
          <Toast.Root open onOpenChange={handleOpenChange} message={message} />
        )}
        <Toast.Viewport />
      </Toast.Provider>
      <PageEditor
        pages={pages}
        activePage={activePage}
        newlyAddedPage={newlyAddedPage}
        onChangeActive={setActivePage}
        onAddPage={handleAddPage}
        onPageReorder={setPages}
        onDeletePage={handleDeletePage}
        onDuplicatePage={handleDuplicatePage}
        onAddBetween={handleAddBetween}
        onSetAsFirst={handleSetAsFirst}
        onCopy={handleCopy}
      />
    </DemoLayout>
  )
}
