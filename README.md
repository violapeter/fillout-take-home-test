<p align="center">
  <a href="https://violapeter-take-home.vercel.app/">
    <picture>
      <img src="https://github.com/user-attachments/assets/71efda0c-9bde-4891-9ebc-07d5be8401f8" alt="Fillout plus Peter Viola" width="280" />
    </picture>
  </a>
</p>

<p align="center">Take Home Test solution</p>

### Welcome to the repo. 

This is a simple UI component for creating, manipulating, reordering pages.
A few words about the structure:

```
.
├── dev-app                  # The Next.js instance      
│   ├── page-editor          # This is the point of the test, the editor UI component
│   └── PageEditorDemo.tsx   # A demo component with a preset state 
├── fillout-ui-components    # Mimic that we have common UI components     
├── package.json             # We do not hold dependencies here, this is just the root
└── ...
```

### Scripts 

Local dev environment:

    $ npm run dev

"Production" build:

    $ npm run build

### Used vendors and technologies

- React, TypeScript, Next.js (duh...)
- [Emotion.js][emotion] for styling
- [Radix UI][radix] for headless UI components
- [Framer motion][motion] lib for the reordering

[emotion]: https://emotion.sh/docs/introduction
[radix]: https://radix-ui.com/
[motion]: https://motion.dev/