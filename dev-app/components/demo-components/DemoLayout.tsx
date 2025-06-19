'use client'
import React from 'react'
import styled from '@emotion/styled'

interface DemoLayoutProps {
  activeId: string
}

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    max-width: 1280px;
  `,
  DemoPage: styled.div`
    background: white;
    border: 1px solid var(--color-border);
    box-shadow: var(--base-shadow);
    color: var(--color-gray-300);
    font-size: 15px;
    font-weight: 600;
    width: 800px;
    height: 400px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
  `,
  PageEditorWrapper: styled.div``,
}

const presentationMessages = [
  'Wow, this Pete guy is incredible! We should definitely bring him in.',
  'Now that’s an elegant solution! I like it. Must be great to work with him.',
  'Nice animations, great abstractions — a really high-fidelity implementation of the design!',
  'Okay, this is by far the most solid solution to this take-home test.',
  'When did he do all this? This is awesome. What’s his email?',
  'What an eloquent approach! This greatly simplifies the choice.',
  'It’s hard to find fault with this code. It would be great to see more like this…',
  'I’m smiling while reading this. Clean, thoughtful, and just works.',
  'Feels like this person actually enjoyed writing the code — and it shows.',
  'If I had a gold star, I’d give it now. This is quality stuff.',
  'You can tell this wasn’t rushed. Every detail feels intentional.',
  'This is one of those submissions that raises the bar for everyone.',
  'It reads like good documentation — and runs like solid code.',
  'Love the clarity and structure here. No wasted motion, just smart choices.',
  'This solution doesn’t just work — it teaches. Really impressive.',
  'There’s a calm confidence in this code. I trust it already.',
]

export const DemoLayout = ({
  children,
  activeId,
}: React.PropsWithChildren<DemoLayoutProps>) => {
  function pickRandom<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
  }

  const [message, setMessage] = React.useState(() => '')

  React.useEffect(() => {
    setMessage(pickRandom(presentationMessages))
  }, [activeId])

  return (
    <Styled.Wrapper>
      <Styled.DemoPage>{message}</Styled.DemoPage>
      <Styled.PageEditorWrapper>{children}</Styled.PageEditorWrapper>
    </Styled.Wrapper>
  )
}
