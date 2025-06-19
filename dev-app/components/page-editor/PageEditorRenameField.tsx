import React from 'react'
import styled from '@emotion/styled'
import { TextField } from '@fillout/ui-components'

interface PageEditorRenameFieldProps {
  name?: string
  id?: string
  active?: boolean
  rename: boolean
  onRename(rename: boolean): void
}

const Styled = {
  RenameLayout: styled.div`
    height: 24px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.015em;
  `,
  RenameButton: styled.button<{ editing?: boolean }>`
    all: unset;
    font: inherit;
    padding: 3px 3px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-width: 40px;
    opacity: ${({ editing }) => (editing ? 0 : 1)};
    visibility: ${({ editing }) => (editing ? 'hidden' : 'visible')};
  `,
  RenameTextField: styled(TextField)`
    display: flex;
    font: inherit;
    gap: 8px;
    padding: 3px 3px;
    border-radius: 4px;
    cursor: text;
    width: 100%;
    outline: 0;
    text-align: left;
    position: absolute;

    &:focus {
      box-shadow: var(--focus-ring);
    }
  `,
}

export const PageEditorRenameField = ({
  id,
  name,
  active,
  rename,
  onRename,
}: PageEditorRenameFieldProps) => {
  const renameFieldRef = React.useRef<HTMLInputElement>(null)
  const [internalName, setInternalName] = React.useState(name)
  const previousName = React.useRef(name)

  React.useEffect(() => {
    setTimeout(() => {
      focusRenameField()
    }, 80)
  }, [rename])

  function focusRenameField() {
    if (renameFieldRef.current) {
      renameFieldRef.current.focus()
      renameFieldRef.current.select()
    }
  }

  function handleClickRename() {
    if (!active) {
      return
    }

    onRename(true)
    requestAnimationFrame(() => {
      focusRenameField()
    })
  }

  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value
    setInternalName(value)
  }

  function handleTextFieldBlur() {
    onRename(false)
  }

  function handleTextFieldKeydown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onRename(false)
    }

    if (event.key === 'Escape') {
      setInternalName(previousName.current)
      onRename(false)
    }
  }

  return (
    <Styled.RenameLayout>
      {rename && (
        <Styled.RenameTextField
          id={id}
          ref={renameFieldRef}
          value={internalName}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          onKeyDown={handleTextFieldKeydown}
        />
      )}
      <Styled.RenameButton editing={rename} onClick={handleClickRename}>
        {internalName}&nbsp;
      </Styled.RenameButton>
    </Styled.RenameLayout>
  )
}
