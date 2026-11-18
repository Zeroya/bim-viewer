import { v4 as uuidv4 } from 'uuid';

const el = (partial) => ({
  id: uuidv4(),
  visible: true,
  rotation: [0, 0, 0],
  ...partial,
});

const layer = (name, color, explodeOffset, elements) => ({
  id: uuidv4(),
  name,
  color,
  visible: true,
  opacity: 1,
  explodeOffset,
  elements,
});

/** Modern villa — two floors, flat roof, terrace */
export function createModernVilla() {
  return {
    id: uuidv4(),
    name: 'Modern Villa',
    description: 'Two-story villa with terrace and panoramic glazing',
    type: 'procedural',
    thumbnail: 'villa',
    layers: [
      layer('Foundation', '#5c6670', [0, -0.8, 0], [
        el({
          name: 'Foundation slab',
          kind: 'box',
          position: [0, -0.25, 0],
          size: [14, 0.5, 10],
          color: '#6b737c',
        }),
      ]),
      layer('Walls L1', '#e8e4dc', [0, 0, 0], [
        el({ name: 'Wall N', kind: 'box', position: [0, 1.5, -4.75], size: [14, 3, 0.3], color: '#f0ebe3' }),
        el({ name: 'Wall S L', kind: 'box', position: [-4.5, 1.5, 4.75], size: [5, 3, 0.3], color: '#f0ebe3' }),
        el({ name: 'Wall S R', kind: 'box', position: [4.5, 1.5, 4.75], size: [5, 3, 0.3], color: '#f0ebe3' }),
        el({ name: 'Wall W', kind: 'box', position: [-6.85, 1.5, 0], size: [0.3, 3, 9.5], color: '#ebe6de' }),
        el({ name: 'Wall E', kind: 'box', position: [6.85, 1.5, 0], size: [0.3, 3, 9.5], color: '#ebe6de' }),
        el({ name: 'Partition', kind: 'box', position: [0, 1.5, 0], size: [0.2, 3, 6], color: '#ddd8d0' }),
      ]),
      layer('Windows L1', '#7ec8e3', [0, 0.2, 0], [
        el({ name: 'Panorama S', kind: 'box', position: [0, 1.6, 4.82], size: [3.6, 2.2, 0.06], color: '#8fd3ec', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window W', kind: 'box', position: [-6.92, 1.7, -1.5], size: [0.06, 1.6, 2], color: '#8fd3ec', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window E', kind: 'box', position: [6.92, 1.7, 1.2], size: [0.06, 1.6, 2.4], color: '#8fd3ec', metalness: 0.15, roughness: 0.2, glass: true }),
      ]),
      layer('Doors', '#8b5a2b', [0, 0.1, 0], [
        el({ name: 'Entrance door', kind: 'box', position: [-5.2, 1.1, 4.82], size: [1.1, 2.2, 0.08], color: '#6e4220' }),
        el({ name: 'Terrace door', kind: 'box', position: [5.2, 1.1, 4.82], size: [1.2, 2.2, 0.06], color: '#c4a574' }),
      ]),
      layer('Slabs', '#cfc8bc', [0, 0.6, 0], [
        el({ name: 'Floor L2', kind: 'box', position: [0, 3.15, 0], size: [14.2, 0.3, 10.2], color: '#d4cdc0' }),
        el({ name: 'Terrace', kind: 'box', position: [0, 3.1, 6.2], size: [8, 0.2, 3], color: '#b8b0a4' }),
      ]),
      layer('Walls L2', '#e8e4dc', [0, 1.2, 0], [
        el({ name: 'Wall N L2', kind: 'box', position: [0, 4.7, -4.75], size: [12, 2.8, 0.3], color: '#f2eee6' }),
        el({ name: 'Wall S L2', kind: 'box', position: [0, 4.7, 4.75], size: [12, 2.8, 0.3], color: '#f2eee6' }),
        el({ name: 'Wall W L2', kind: 'box', position: [-5.85, 4.7, 0], size: [0.3, 2.8, 9.5], color: '#ede8e0' }),
        el({ name: 'Wall E L2', kind: 'box', position: [5.85, 4.7, 0], size: [0.3, 2.8, 9.5], color: '#ede8e0' }),
      ]),
      layer('Windows L2', '#7ec8e3', [0, 1.4, 0], [
        el({ name: 'Window S L2a', kind: 'box', position: [-2, 4.8, 4.82], size: [2.4, 1.8, 0.06], color: '#9ad9ef', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window S L2b', kind: 'box', position: [2.5, 4.8, 4.82], size: [2.4, 1.8, 0.06], color: '#9ad9ef', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window N L2', kind: 'box', position: [0, 4.9, -4.82], size: [4, 1.6, 0.06], color: '#9ad9ef', metalness: 0.15, roughness: 0.2, glass: true }),
      ]),
      layer('Roof', '#2f343a', [0, 2.2, 0], [
        el({ name: 'Flat roof', kind: 'box', position: [0, 6.2, 0], size: [12.4, 0.25, 9.8], color: '#3a4048' }),
        el({ name: 'Parapet', kind: 'box', position: [0, 6.45, 0], size: [12.6, 0.35, 10], color: '#4a5058' }),
        el({ name: 'Canopy', kind: 'box', position: [0, 3.4, 5.6], size: [8.4, 0.12, 2.2], color: '#2c3138' }),
      ]),
      layer('Furniture', '#a67c52', [0, 0.4, 0], [
        el({ name: 'Sofa', kind: 'box', position: [-3, 0.45, -2], size: [2.4, 0.7, 1], color: '#7a5c45' }),
        el({ name: 'Table', kind: 'box', position: [3, 0.4, -1], size: [1.6, 0.08, 0.9], color: '#c4a882' }),
        el({ name: 'Bed', kind: 'box', position: [-2, 3.55, -2], size: [2, 0.4, 1.6], color: '#d8cfc4' }),
      ]),
      layer('Landscape', '#4a7c59', [0, -0.4, 0], [
        el({ name: 'Lawn', kind: 'box', position: [0, -0.02, 0], size: [22, 0.04, 18], color: '#5a8f68' }),
        el({ name: 'Path', kind: 'box', position: [0, 0.02, 7.5], size: [2.2, 0.05, 4], color: '#9a958c' }),
        el({ name: 'Tree 1', kind: 'tree', position: [-9, 0, -6], size: [1, 3, 1], color: '#3d6b4f' }),
        el({ name: 'Tree 2', kind: 'tree', position: [9, 0, 5], size: [1.2, 3.5, 1.2], color: '#3d6b4f' }),
      ]),
    ],
  };
}

/** Urban townhouse — narrow footprint, pitched roof */
export function createTownhouse() {
  return {
    id: uuidv4(),
    name: 'Urban Townhouse',
    description: 'City townhouse with brick facade and attic',
    type: 'procedural',
    thumbnail: 'townhouse',
    layers: [
      layer('Foundation', '#5c6670', [0, -0.8, 0], [
        el({ name: 'Plinth', kind: 'box', position: [0, -0.2, 0], size: [8, 0.4, 12], color: '#5a6068' }),
      ]),
      layer('Walls', '#b85c38', [0, 0, 0], [
        el({ name: 'Facade', kind: 'box', position: [0, 2.2, 5.85], size: [8, 4.4, 0.35], color: '#c45e3a' }),
        el({ name: 'Rear wall', kind: 'box', position: [0, 2.2, -5.85], size: [8, 4.4, 0.35], color: '#b85535' }),
        el({ name: 'Wall L', kind: 'box', position: [-3.85, 2.2, 0], size: [0.35, 4.4, 11.7], color: '#d4cfc6' }),
        el({ name: 'Wall R', kind: 'box', position: [3.85, 2.2, 0], size: [0.35, 4.4, 11.7], color: '#d4cfc6' }),
        el({ name: 'Floor slab', kind: 'box', position: [0, 2.2, 0], size: [7.5, 0.25, 11.3], color: '#c8c2b8' }),
      ]),
      layer('Windows', '#7ec8e3', [0, 0.2, 0], [
        el({ name: 'Window L1 L', kind: 'box', position: [-2, 1.5, 5.94], size: [1.4, 1.6, 0.06], color: '#8ed0ea', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window L1 R', kind: 'box', position: [2, 1.5, 5.94], size: [1.4, 1.6, 0.06], color: '#8ed0ea', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window L2 L', kind: 'box', position: [-2, 3.6, 5.94], size: [1.4, 1.4, 0.06], color: '#8ed0ea', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Window L2 R', kind: 'box', position: [2, 3.6, 5.94], size: [1.4, 1.4, 0.06], color: '#8ed0ea', metalness: 0.15, roughness: 0.2, glass: true }),
        el({ name: 'Attic window', kind: 'box', position: [0, 5.6, 3], size: [1.2, 1, 0.06], color: '#8ed0ea', rotation: [-0.45, 0, 0], metalness: 0.15, roughness: 0.2, glass: true }),
      ]),
      layer('Doors', '#3d2914', [0, 0.1, 0], [
        el({ name: 'Entrance', kind: 'box', position: [0, 1.1, 5.94], size: [1.2, 2.2, 0.1], color: '#2a1c0e' }),
        el({ name: 'Back door', kind: 'box', position: [1.5, 1.1, -5.94], size: [1, 2.1, 0.08], color: '#4a3420' }),
      ]),
      layer('Roof', '#4a3f35', [0, 2, 0], [
        el({ name: 'Slope L', kind: 'box', position: [-2, 5.8, 0], size: [4.5, 0.2, 12.4], color: '#5a4a3c', rotation: [0, 0, 0.55] }),
        el({ name: 'Slope R', kind: 'box', position: [2, 5.8, 0], size: [4.5, 0.2, 12.4], color: '#5a4a3c', rotation: [0, 0, -0.55] }),
        el({ name: 'Ridge', kind: 'box', position: [0, 6.9, 0], size: [0.3, 0.25, 12.5], color: '#3a3028' }),
      ]),
      layer('Balcony', '#8a8580', [0, 1, 0], [
        el({ name: 'Balcony slab', kind: 'box', position: [0, 2.35, 6.6], size: [3.2, 0.15, 1.4], color: '#9a9590' }),
        el({ name: 'Railing', kind: 'box', position: [0, 2.9, 7.2], size: [3.2, 0.9, 0.08], color: '#6a6560' }),
      ]),
      layer('Interior', '#a67c52', [0, 0.3, 0], [
        el({ name: 'Kitchen block', kind: 'box', position: [-2.5, 0.6, -3], size: [2.5, 1, 0.6], color: '#e8e0d4' }),
        el({ name: 'Stairs', kind: 'box', position: [2.5, 1.1, 1], size: [1.2, 2, 2.5], color: '#c4b5a0' }),
        el({ name: 'Sofa', kind: 'box', position: [-1.5, 0.4, 2], size: [2, 0.65, 0.9], color: '#5c6b7a' }),
      ]),
      layer('Site', '#4a7c59', [0, -0.4, 0], [
        el({ name: 'Yard', kind: 'box', position: [0, -0.02, 0], size: [14, 0.04, 20], color: '#628f70' }),
        el({ name: 'Fence L', kind: 'box', position: [-6.5, 0.6, 0], size: [0.1, 1.2, 18], color: '#6a5a4a' }),
        el({ name: 'Fence R', kind: 'box', position: [6.5, 0.6, 0], size: [0.1, 1.2, 18], color: '#6a5a4a' }),
        el({ name: 'Bush', kind: 'tree', position: [-5, 0, 7], size: [0.8, 1.5, 0.8], color: '#3a6b48' }),
      ]),
    ],
  };
}

/** Glass pavilion with pool */
export function createGlassPavilion() {
  return {
    id: uuidv4(),
    name: 'Glass Pavilion',
    description: 'Glass pavilion with pool and flat roof',
    type: 'procedural',
    thumbnail: 'pavilion',
    layers: [
      layer('Base', '#8a8680', [0, -0.6, 0], [
        el({ name: 'Platform', kind: 'box', position: [0, -0.15, 0], size: [16, 0.3, 12], color: '#9a9690' }),
      ]),
      layer('Frame', '#2c3036', [0, 0, 0], [
        el({ name: 'Column 1', kind: 'box', position: [-6, 1.5, -4], size: [0.25, 3, 0.25], color: '#1e2228' }),
        el({ name: 'Column 2', kind: 'box', position: [6, 1.5, -4], size: [0.25, 3, 0.25], color: '#1e2228' }),
        el({ name: 'Column 3', kind: 'box', position: [-6, 1.5, 4], size: [0.25, 3, 0.25], color: '#1e2228' }),
        el({ name: 'Column 4', kind: 'box', position: [6, 1.5, 4], size: [0.25, 3, 0.25], color: '#1e2228' }),
        el({ name: 'Beam', kind: 'box', position: [0, 3.1, 0], size: [12.5, 0.2, 8.5], color: '#2a2e34' }),
      ]),
      layer('Glass', '#7ec8e3', [0, 0.3, 0], [
        el({ name: 'Facade N', kind: 'box', position: [0, 1.5, -4.14], size: [11.8, 2.9, 0.05], color: '#a8dff5', metalness: 0.2, roughness: 0.15, glass: true }),
        el({ name: 'Facade S', kind: 'box', position: [0, 1.5, 4.14], size: [11.8, 2.9, 0.05], color: '#a8dff5', metalness: 0.2, roughness: 0.15, glass: true }),
        el({ name: 'Facade W', kind: 'box', position: [-6.14, 1.5, 0], size: [0.05, 2.9, 8], color: '#a8dff5', metalness: 0.2, roughness: 0.15, glass: true }),
        el({ name: 'Facade E', kind: 'box', position: [6.14, 1.5, 0], size: [0.05, 2.9, 8], color: '#a8dff5', metalness: 0.2, roughness: 0.15, glass: true }),
      ]),
      layer('Roof', '#1a1e24', [0, 1.5, 0], [
        el({ name: 'Roof deck', kind: 'box', position: [0, 3.35, 0], size: [13, 0.18, 9], color: '#12161c' }),
        el({ name: 'Skylight', kind: 'box', position: [0, 3.42, 0], size: [4, 0.08, 3], color: '#7ec8e3', metalness: 0.25, roughness: 0.15, glass: true }),
      ]),
      layer('Pool', '#2a7ab0', [0, -0.2, 0], [
        el({ name: 'Basin', kind: 'box', position: [0, -0.4, 8], size: [8, 0.8, 4], color: '#1a6a9a' }),
        el({ name: 'Water', kind: 'box', position: [0, -0.02, 8], size: [7.6, 0.08, 3.6], color: '#3aa0d0', metalness: 0.35, roughness: 0.12, glass: true }),
      ]),
      layer('Furniture', '#d4c4a8', [0, 0.2, 0], [
        el({ name: 'Table', kind: 'box', position: [0, 0.4, 0], size: [2, 0.08, 1], color: '#e8dcc8' }),
        el({ name: 'Lounger 1', kind: 'box', position: [-2.5, 0.2, 6], size: [0.7, 0.3, 2], color: '#f5f0e8' }),
        el({ name: 'Lounger 2', kind: 'box', position: [2.5, 0.2, 6], size: [0.7, 0.3, 2], color: '#f5f0e8' }),
      ]),
      layer('Landscape', '#4a7c59', [0, -0.5, 0], [
        el({ name: 'Ground', kind: 'box', position: [0, -0.35, 2], size: [24, 0.05, 22], color: '#5a8a68' }),
        el({ name: 'Palm 1', kind: 'tree', position: [-9, 0, 8], size: [1, 4, 1], color: '#2d5a3a' }),
        el({ name: 'Palm 2', kind: 'tree', position: [9, 0, 8], size: [1, 4, 1], color: '#2d5a3a' }),
      ]),
    ],
  };
}

export const PRESET_MODELS = [createModernVilla(), createTownhouse(), createGlassPavilion()];

export function cloneModel(model) {
  return {
    ...model,
    id: uuidv4(),
    layers: model.layers.map((layerItem) => ({
      ...layerItem,
      id: uuidv4(),
      elements: layerItem.elements.map((element) => ({
        ...element,
        id: uuidv4(),
        position: [...element.position],
        size: [...element.size],
        rotation: element.rotation ? [...element.rotation] : [0, 0, 0],
      })),
    })),
  };
}

export function createModelFromUpload(name, fileUrl, meta = {}) {
  return {
    id: uuidv4(),
    name,
    description: meta.description || 'Uploaded 3D model',
    type: 'gltf',
    url: fileUrl,
    thumbnail: 'upload',
    layers: [
      layer('Model', '#8ab4f8', [0, 0, 0], [
        el({
          name,
          kind: 'gltf',
          position: [0, 0, 0],
          size: [1, 1, 1],
          color: '#8ab4f8',
          url: fileUrl,
        }),
      ]),
    ],
  };
}
