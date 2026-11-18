export type Vec3 = [number, number, number];

export type ElementKind = 'box' | 'tree' | 'gltf';

export type ModelType = 'procedural' | 'gltf';

export type ModelThumbnail = 'villa' | 'townhouse' | 'pavilion' | 'upload' | string;

export type ToolMode = 'orbit' | 'select' | 'measure' | 'move';

export type SectionAxis = 'x' | 'y' | 'z';

export type CameraPreset = 'iso' | 'top' | 'front' | 'side';

export type ThemeMode = 'dark' | 'light';

export type MobilePanel = 'models' | 'layers' | 'tools' | 'properties' | null;

export interface BimElement {
  id: string;
  name: string;
  kind: ElementKind;
  position: Vec3;
  size: Vec3;
  color: string;
  visible: boolean;
  rotation: Vec3;
  metalness?: number;
  roughness?: number;
  glass?: boolean;
  url?: string;
}

export interface BimLayer {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
  explodeOffset: Vec3;
  elements: BimElement[];
}

export interface BimModel {
  id: string;
  name: string;
  description: string;
  type: ModelType;
  thumbnail: ModelThumbnail;
  url?: string;
  layers: BimLayer[];
}

export interface Measurement {
  id: string;
  points: [Vec3, Vec3];
  distance: number;
}

export interface PanelState {
  left: boolean;
  right: boolean;
  mobile: MobilePanel;
}

export interface ElementLookup {
  model: BimModel;
  layer: BimLayer;
  element: BimElement;
}

export type ElementDraft = Omit<Partial<BimElement>, 'id' | 'visible' | 'rotation'> & {
  name: string;
  kind: ElementKind;
  position: Vec3;
  size: Vec3;
  color: string;
  visible?: boolean;
  rotation?: Vec3;
};
