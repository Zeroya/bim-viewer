import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { PRESET_MODELS, cloneModel } from '../data/presetModels';
import type {
  BimModel,
  BimLayer,
  CameraPreset,
  ElementLookup,
  Measurement,
  MobilePanel,
  PanelState,
  SectionAxis,
  ThemeMode,
  ToolMode,
  Vec3,
} from '../types/bim';

interface BimState {
  models: BimModel[];
  activeModelIds: string[];
  selectedElementId: string | null;
  hoveredElementId: string | null;
  tool: ToolMode;
  measurePoints: Vec3[];
  measurements: Measurement[];
  sectionEnabled: boolean;
  sectionAxis: SectionAxis;
  sectionValue: number;
  explodeFactor: number;
  showGrid: boolean;
  showEdges: boolean;
  wireframe: boolean;
  isolateMode: boolean;
  cameraPreset: CameraPreset | null;
  fitRequestId: number;
  screenshotRequestId: number;
  panels: PanelState;
  themeMode: ThemeMode;

  setTool: (tool: ToolMode) => void;
  setActiveModels: (ids: string[]) => void;
  toggleActiveModel: (id: string) => void;
  selectElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;
  toggleLayer: (modelId: string, layerId: string) => void;
  setLayerOpacity: (modelId: string, layerId: string, opacity: number) => void;
  setAllLayersVisible: (modelId: string, visible: boolean) => void;
  hideElement: (elementId: string) => void;
  showElement: (elementId: string) => void;
  deleteElement: (elementId: string) => void;
  moveElement: (elementId: string, position: Vec3) => void;
  addMeasurePoint: (point: Vec3) => void;
  clearMeasurements: () => void;
  removeMeasurement: (id: string) => void;
  setSectionEnabled: (sectionEnabled: boolean) => void;
  setSectionAxis: (sectionAxis: SectionAxis) => void;
  setSectionValue: (sectionValue: number) => void;
  setExplodeFactor: (explodeFactor: number) => void;
  setShowGrid: (showGrid: boolean) => void;
  setShowEdges: (showEdges: boolean) => void;
  setWireframe: (wireframe: boolean) => void;
  setIsolateMode: (isolateMode: boolean) => void;
  setCameraPreset: (cameraPreset: CameraPreset | null) => void;
  requestFitView: () => void;
  requestScreenshot: () => void;
  isolateSelection: () => void;
  showAllElements: () => void;
  togglePanel: (key: 'left' | 'right') => void;
  setMobilePanel: (mobile: MobilePanel) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  addUploadedModel: (model: BimModel) => void;
  removeModel: (modelId: string) => void;
  mergeActiveModels: () => void;
  duplicateActiveModel: () => void;
  resetView: () => void;
  findElement: (elementId: string) => ElementLookup | null;
}

const createInitialState = () => {
  const models = PRESET_MODELS.map((m) => cloneModel(m));
  return {
    models,
    activeModelIds: [models[0].id],
    selectedElementId: null as string | null,
    hoveredElementId: null as string | null,
    tool: 'orbit' as ToolMode,
    measurePoints: [] as Vec3[],
    measurements: [] as Measurement[],
    sectionEnabled: false,
    sectionAxis: 'y' as SectionAxis,
    sectionValue: 0.5,
    explodeFactor: 0,
    showGrid: true,
    showEdges: false,
    wireframe: false,
    isolateMode: false,
    cameraPreset: null as CameraPreset | null,
    fitRequestId: 0,
    screenshotRequestId: 0,
    panels: {
      left: true,
      right: true,
      mobile: null as MobilePanel,
    },
    themeMode: 'dark' as ThemeMode,
  };
};

export const useBimStore = create<BimState>((set, get) => ({
  ...createInitialState(),

  setTool: (tool) =>
    set({
      tool,
      measurePoints: tool === 'measure' ? [] : get().measurePoints,
      selectedElementId: tool === 'orbit' ? null : get().selectedElementId,
    }),

  setActiveModels: (ids) => set({ activeModelIds: ids, selectedElementId: null }),

  toggleActiveModel: (id) => {
    const { activeModelIds } = get();
    const next = activeModelIds.includes(id)
      ? activeModelIds.filter((x) => x !== id)
      : [...activeModelIds, id];
    set({ activeModelIds: next.length ? next : activeModelIds, selectedElementId: null });
  },

  selectElement: (id) => set({ selectedElementId: id, tool: id ? 'select' : get().tool }),

  setHoveredElement: (id) => set({ hoveredElementId: id }),

  toggleLayer: (modelId, layerId) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id !== modelId
          ? model
          : {
              ...model,
              layers: model.layers.map((layer) =>
                layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
              ),
            }
      ),
    })),

  setLayerOpacity: (modelId, layerId, opacity) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id !== modelId
          ? model
          : {
              ...model,
              layers: model.layers.map((layer) =>
                layer.id === layerId ? { ...layer, opacity } : layer
              ),
            }
      ),
    })),

  setAllLayersVisible: (modelId, visible) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id !== modelId
          ? model
          : {
              ...model,
              layers: model.layers.map((layer) => ({ ...layer, visible })),
            }
      ),
    })),

  hideElement: (elementId) =>
    set((state) => ({
      models: state.models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          elements: layer.elements.map((el) =>
            el.id === elementId ? { ...el, visible: false } : el
          ),
        })),
      })),
      selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
    })),

  showElement: (elementId) =>
    set((state) => ({
      models: state.models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          elements: layer.elements.map((el) =>
            el.id === elementId ? { ...el, visible: true } : el
          ),
        })),
      })),
    })),

  deleteElement: (elementId) =>
    set((state) => ({
      models: state.models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          elements: layer.elements.filter((el) => el.id !== elementId),
        })),
      })),
      selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
    })),

  moveElement: (elementId, position) =>
    set((state) => ({
      models: state.models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          elements: layer.elements.map((el) =>
            el.id === elementId ? { ...el, position: [...position] as Vec3 } : el
          ),
        })),
      })),
    })),

  addMeasurePoint: (point) => {
    const { measurePoints, measurements } = get();
    const next = [...measurePoints, point];
    if (next.length === 2) {
      const dx = next[1][0] - next[0][0];
      const dy = next[1][1] - next[0][1];
      const dz = next[1][2] - next[0][2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      set({
        measurePoints: [],
        measurements: [
          ...measurements,
          {
            id: uuidv4(),
            points: [next[0], next[1]],
            distance,
          },
        ],
      });
    } else {
      set({ measurePoints: next });
    }
  },

  clearMeasurements: () => set({ measurements: [], measurePoints: [] }),

  removeMeasurement: (id) =>
    set((state) => ({
      measurements: state.measurements.filter((m) => m.id !== id),
    })),

  setSectionEnabled: (sectionEnabled) => set({ sectionEnabled }),
  setSectionAxis: (sectionAxis) => set({ sectionAxis }),
  setSectionValue: (sectionValue) => set({ sectionValue }),
  setExplodeFactor: (explodeFactor) => set({ explodeFactor }),
  setShowGrid: (showGrid) => set({ showGrid }),
  setShowEdges: (showEdges) => set({ showEdges }),
  setWireframe: (wireframe) => set({ wireframe }),
  setIsolateMode: (isolateMode) => set({ isolateMode }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  requestFitView: () => set((s) => ({ fitRequestId: s.fitRequestId + 1, cameraPreset: 'iso' })),
  requestScreenshot: () => set((s) => ({ screenshotRequestId: s.screenshotRequestId + 1 })),

  isolateSelection: () => {
    const { selectedElementId, models } = get();
    if (!selectedElementId) return;
    set({
      isolateMode: true,
      models: models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          elements: layer.elements.map((el) => ({
            ...el,
            visible: el.id === selectedElementId,
          })),
        })),
      })),
    });
  },

  showAllElements: () =>
    set((state) => ({
      isolateMode: false,
      models: state.models.map((model) => ({
        ...model,
        layers: model.layers.map((layer) => ({
          ...layer,
          visible: true,
          elements: layer.elements.map((el) => ({ ...el, visible: true })),
        })),
      })),
    })),

  togglePanel: (key) =>
    set((state) => ({
      panels: { ...state.panels, [key]: !state.panels[key] },
    })),

  setMobilePanel: (mobile) =>
    set((state) => ({
      panels: { ...state.panels, mobile },
    })),

  setThemeMode: (themeMode) => set({ themeMode }),

  addUploadedModel: (model) =>
    set((state) => ({
      models: [...state.models, model],
      activeModelIds: [...state.activeModelIds, model.id],
    })),

  removeModel: (modelId) =>
    set((state) => {
      const models = state.models.filter((m) => m.id !== modelId);
      let activeModelIds = state.activeModelIds.filter((id) => id !== modelId);
      if (!activeModelIds.length && models.length) {
        activeModelIds = [models[0].id];
      }
      return { models, activeModelIds, selectedElementId: null };
    }),

  mergeActiveModels: () => {
    const { models, activeModelIds } = get();
    if (activeModelIds.length < 2) return;

    const active = models.filter((m) => activeModelIds.includes(m.id));
    const offsetStep = 12;
    const mergedLayers: BimLayer[] = [];

    active.forEach((model, index) => {
      const ox = index * offsetStep;
      model.layers.forEach((layer) => {
        const existing = mergedLayers.find((l) => l.name === layer.name);
        const shifted = layer.elements.map((el) => ({
          ...el,
          id: uuidv4(),
          position: [el.position[0] + ox, el.position[1], el.position[2]] as Vec3,
        }));
        if (existing) {
          existing.elements = [...existing.elements, ...shifted];
        } else {
          mergedLayers.push({
            id: uuidv4(),
            name: layer.name,
            color: layer.color,
            visible: true,
            opacity: 1,
            explodeOffset: layer.explodeOffset,
            elements: shifted,
          });
        }
      });
    });

    const merged: BimModel = {
      id: uuidv4(),
      name: `Merged · ${active.map((m) => m.name).join(' + ')}`,
      description: 'Merged model',
      type: 'procedural',
      thumbnail: active[0].thumbnail,
      layers: mergedLayers,
    };

    set((state) => ({
      models: [...state.models, merged],
      activeModelIds: [merged.id],
      selectedElementId: null,
    }));
  },

  duplicateActiveModel: () => {
    const { models, activeModelIds } = get();
    const source = models.find((m) => m.id === activeModelIds[0]);
    if (!source) return;
    const copy = cloneModel({
      ...source,
      name: `${source.name} (copy)`,
    });
    set((state) => ({
      models: [...state.models, copy],
      activeModelIds: [copy.id],
    }));
  },

  resetView: () =>
    set({
      selectedElementId: null,
      measurePoints: [],
      measurements: [],
      sectionEnabled: false,
      sectionValue: 0.5,
      explodeFactor: 0,
      wireframe: false,
      isolateMode: false,
      tool: 'orbit',
      cameraPreset: 'iso',
    }),

  findElement: (elementId) => {
    const { models } = get();
    for (const model of models) {
      for (const layer of model.layers) {
        const el = layer.elements.find((e) => e.id === elementId);
        if (el) return { model, layer, element: el };
      }
    }
    return null;
  },
}));
