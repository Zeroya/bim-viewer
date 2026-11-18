# BIM Viewer

A React BIM-style 3D viewer for inspecting building models in the browser. Switch between house models, toggle layers, measure distances, move or hide elements, cut sections, upload GLB/GLTF files, and merge scenes.

<img width="2559" height="1177" alt="image" src="https://github.com/user-attachments/assets/37007b92-e99b-40dd-afd3-5c32c42a6d30" />

## Features

- **Preset models:** Modern Villa, Urban Townhouse, Glass Pavilion
- **Layers:** show/hide, opacity, explode view
- **Tools:** orbit, select, measure, move (gizmo), section cut
- **Top command bar:** edges, wireframe, isolate selection, camera presets, merge/duplicate, screenshot, reset
- **Upload:** drop `.glb` / `.gltf` models onto the scene
- **Merge / duplicate** active models
- **Responsive UI:** compact side panels on desktop, bottom sheet on mobile
- **MUI + SCSS** theming (dark / light)

<img width="2559" height="1179" alt="image" src="https://github.com/user-attachments/assets/643baa3a-1eb3-412f-bb19-4ee098dc6c3e" />

## Screenshots

<img width="2559" height="1186" alt="image" src="https://github.com/user-attachments/assets/9dadab96-9ca6-41d0-909d-a3b2f110f08b" />


## Quick start

```bash
cd bim-viewer
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
```

## Stack

- React 19
- MUI
- React Three Fiber / Three.js / Drei
- Zustand
- SCSS

## Project layout

```
src/
  components/
    layout/     # shell, top bar, bottom toolbar
    panels/     # models, layers, tools, properties, upload
    viewer/     # canvas, elements, measure, section
  data/         # preset procedural house models
  store/        # zustand BIM state
  styles/       # SCSS theme
  theme/        # MUI theme
```

## Top toolbar actions

| Control | Action |
| --- | --- |
| Orbit / Select / Measure / Move | Active interaction mode |
| Section | Enable clipping plane |
| Edges / Wireframe | Display modes |
| Isolate | Hide everything except selection |
| Fit / Top / Front / Side | Camera presets |
| Merge / Duplicate | Model operations |
| Screenshot | Download PNG of the viewport |
| Reset | Clear measures, section, explode, camera |

## License

MIT
