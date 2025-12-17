# CARTO-maps

## Install and run

Pretty straightforward:

```
$ yarn install
$ yarn dev
```

Run tests with:

```
$ yarn tests
```

Linting:

```
$ yarn lint
```

App is deployed on Netlify at: https://carto-maps.netlify.app/

:warning: **NOTE** the `.env` to run the app locally will be provided through email. You can also request it from me directly at dangz.dev@gmail.com or [@dangzo](https://github.com/dangzo) on Github.

### General feedback

I had a lot of fun developing with Carto and Deck.GL, tried focusing on code quality and cleanliness. In total, I needed around 4 days of work to complete everything.

Main blockers was to understand how to link all the libraries and concepts together, as there are many ways to achieve the same result (_i.e. `fetchMap` and other Carto helpers_). On the second day I struggled a bit to understand how to fill colors based on column values.

Overall, this assignment gave me the opportunity to learn a lot about Carto and Deck.GL.

### Documentation

I used different sources to understand how to approach this assignment:

- Carto Builder itself, using my own account
- [Carto docs](https://docs.carto.com/)
- whole [Deck\.Gl docs](https://deck.gl/docs)
- GitHub examples on different repos, mostly at [CartoDB](https://github.com/CartoDB)
- https://storybook-react.carto.com
- ...and [MUI docs](https://v5.mui.com/material-ui/), of course

### Tech stack

I used **yarn** as package manager and **vite**.

For testing, **testing-library/react** and **vitest** as test runner.

Components and styling is done with **MUI v5** to speed up UI development, with **Emotion** as backup where needed (_very few components_).

I didn't need any extra library apart from Carto/Deck.GL and anything related.

I used **redux-toolkit** to centralize tasks like the interaction between all form controls with the map and layers.

**TypeScript** everywhere, of course.

### Folders structure

Should have used a pretty clean folders structure, especially for the size of this repository.

Components are all in `src/components`, apart from layout components. In a bigger project I would use `src/components` only for the ones of our components library (i.e. own Select, own Card, etc.) and have a `src/features` folder for a feature-based approach.

This of course depends pretty much by what the team is used to.

### Tests

I mainly written unit tests, testing components, hooks and store logic.
`MainLayout.tsx` and `ControlsDrawer.tsx` have some basic integration tests.

### Agentic Tools

I used **GitHub Copilot**, most of the times with Agent in auto, and only a few times on Claude 4.5.

The approach I usually use, including this time, is mixing writing code myself with the use of AI tools.

- delegate repetitive tasks
  > _i.e. write a test suite for a component_
- generate templates
  > _...from where I then keep adding and refining_
- fix broken tests
  > _I admit this if for laziness, and I often times recognized I'm faster than AI on fixing tests._
- send the AI on investigation = reduce cognitive load
  > _Tasks like "generate a drawer using MUI", for someone like me who isn't_

In every case, I always double check the generated code, and 99% of the time I refine it at a later stage.

I logged almost all prompts in [prompts.md](./prompts.md).
