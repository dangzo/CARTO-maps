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

### What to improve next

Some of the improvements I can think of are:

- better errors handling, perhaps through a snackbar/alert system or error boundaries, as right now the app just logs using `console.error`
- feature wise, perhaps:
  - adding/editing layers dynamically, as the drawer right now is already quite busy
  - include more palettes
  - store user controls selection on `localStorage`
  - some more interesting widgets perhaps?
- adding e2e tests, and perhaps more extensive integration tests
