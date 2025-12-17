#### prompt 1

Create a simple layout with a drawer on the right side and a main content on the left. No need to create drawer and content components. Use material-ui components and utilities.

#### prompt 2

Implement a Drawer container component using MUI. I'd like it to be a wrapper to plug in inside `MainLayout.tsx`.

I'd like it to have "_Controls_" as title, and have two different, vertical sections: "_Layer 1_" and "_Layer 2_".

Each section should have forms to tweak some hypotethical styles for the following:

- Fill color
- Outline size and color
- Radius
- Fill color based on a param value, such as: revenue (_retail_stores_) or population (_sociodemographics_).

#### prompt 3 (chain)

1. Setup a redux store in order to control all forms specified in `LayerControls.tsx`

2. I'd like to have all reducers be parametric on the layer to update (either 0 or 1)

#### prompt 4

I'd like to avoid recreating new vector layers each time the state change but to update each property individually.

#### prompt 5

Write tests for this store slice

#### prompt 6

I'd like to use the schema property of `retailStoresData` and `socioDemographicsData` (once both promises are resolved) and store it in the redux store.

#### prompt 7 (chain)

1. I'd like to display a "Fill color" input, the one already in my code, when `layerStyle.fillBy` is `solid_color`, and display a palette input otherwise. Let's include different palettes: 4-5 would suffice.

_(Here I was investigating how to create palettes, what was the best strategy and if there was something built-in in MUI)_

2. I'd like the "Color palette" Select to actually display different palettes (use colors). Is there any official component from MUI? Can we otherwise create one?

_(Here I thought on generating my own color palettes. The following day I discovered carto-colors project, and after all the domains logic was implemented, I used those color ranges to generate them)_

3. Could you rewrite the yellow, orange, red and green palettes to actually display the correct range of colors (according to the palette name), from lighter to darker (left to right)?

4. Generate tests for `PaletteSelector.tsx`

#### prompt 8

Let's simplify `useCartoMap.ts`, extracting some of the code into a separate hook.

#### prompt 9 (chain)

1. Let's create a reusable hook called `useCartoDomain`. Given an attribute and a data source, it should fetch the attribute domain using SQL query and be able to work with both "continuous" and "bins" modes.

2. _(...some others, didn't log everything unfortunately...)_

3. Could you adapt this hook to also use "categories" mode?

_(... various prompts, most of them rolled back until I noticed I was trying to query a tileset, which is not a table.)_

4. Pass either "continous" or "categories" as mode to useQueryDomain, according to the field type.

5. This hook has an issue: "mode" changes and triggers the hook to return, but this happens before fetchDomainData gets to complete.

6. Race condition is partially solved: I'd still like to change mode AFTER fetchDomainData completes (after setDomain is called)

#### prompt 10 (chain)

_(Here I've run through different prompts to fix broken tests)_

#### prompt 11 (chain)

1. I need to retrieve the domain array used in `tilesetFillColor()` -> `colorBins()` from tileset metadata.

2. The final "domain" array needs to be a uni-dimensional array. Let's generate it using `max`, `min` and `avg` instead of quantiles.

#### prompt 12 (chain)

Create a widget using MUI elements.

I'd like it to have a "card style", white background, and positioned on top-right of the map (add like 8px vertcal and horizontal spacing).

The widget should display:

- Total retail stores in the data source (formula widget)
- An histogram displaying total revenue by store type (category widget)

Please use `retailStoresDataSource`, passed from `CartoMap.tsx`, for calculations: use `retailStoresDataSource.widgetSource.getFormula` and `retailStoresDataSource.widgetSource.categoryWidget`
