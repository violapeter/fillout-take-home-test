# @fillout/ui-components

A workspace to hold the separated code of the common components.

I implemented these:
  - `Button`
  - `DropdownMenu`
  - `TextField`
  - `Toast`

### Usage

1. import the CSS in your layout:

        import '@fillout/ui-components/theme/style.css'
2. done. You can use the components now:

```tsx
import { DropdownMenu } from "@fillout/ui-components"

export const MyComponent = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        Open Menu
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          This repo is awesome.
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          This repo is just breathtaking.
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```

