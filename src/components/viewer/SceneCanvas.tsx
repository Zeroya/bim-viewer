import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Grid,
  TransformControls,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { useBimStore } from '../../store/bimStore';
import type { Vec3 } from '../../types/bim';
import BuildingElement from './BuildingElement';
import MeasureOverlay from './MeasureOverlay';
import SectionPlane from './SectionPlane';

function CameraRig() {
  const { camera } = useThree();
  const cameraPreset = useBimStore((s) => s.cameraPreset);
  const setCameraPreset = useBimStore((s) => s.setCameraPreset);

  useEffect(() => {
    if (!cameraPreset) return;
    const presets: Record<string, [number, number, number]> = {
      iso: [18, 14, 18],
      top: [0, 28, 0.01],
      front: [0, 6, 22],
      side: [22, 6, 0],
    };
    const target = presets[cameraPreset] || presets.iso;
    camera.position.set(target[0], target[1], target[2]);
    camera.lookAt(0, 2, 0);
    camera.updateProjectionMatrix();
    setCameraPreset(null);
  }, [cameraPreset, camera, setCameraPreset]);

  return null;
}

function ClippingSetup() {
  const { gl } = useThree();
  const sectionEnabled = useBimStore((s) => s.sectionEnabled);
  const sectionAxis = useBimStore((s) => s.sectionAxis);
  const sectionValue = useBimStore((s) => s.sectionValue);
  const planeRef = useRef(new THREE.Plane());

  useEffect(() => {
    gl.localClippingEnabled = sectionEnabled;
    if (!sectionEnabled) gl.clippingPlanes = [];
  }, [gl, sectionEnabled]);

  useFrame(() => {
    if (!sectionEnabled) return;
    const min = -8;
    const max = 10;
    const constant = -(min + (max - min) * sectionValue);
    const normal =
      sectionAxis === 'x'
        ? planeRef.current.normal.set(-1, 0, 0)
        : sectionAxis === 'z'
          ? planeRef.current.normal.set(0, 0, -1)
          : planeRef.current.normal.set(0, -1, 0);
    planeRef.current.constant = constant;
    if (gl.clippingPlanes[0] !== planeRef.current) {
      gl.clippingPlanes = [planeRef.current];
    }
    void normal;
  });

  return null;
}

function ScreenshotCapture() {
  const { gl, scene, camera } = useThree();
  const screenshotRequestId = useBimStore((s) => s.screenshotRequestId);
  const lastId = useRef(0);

  useEffect(() => {
    if (!screenshotRequestId || screenshotRequestId === lastId.current) return;
    lastId.current = screenshotRequestId;
    gl.render(scene, camera);
    const url = gl.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `bim-viewer-${Date.now()}.png`;
    link.href = url;
    link.click();
  }, [screenshotRequestId, gl, scene, camera]);

  return null;
}

function ActiveModels() {
  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);
  const explodeFactor = useBimStore((s) => s.explodeFactor);

  const active = useMemo(
    () => models.filter((m) => activeModelIds.includes(m.id)),
    [models, activeModelIds]
  );

  return (
    <group>
      {active.map((model, modelIndex) => {
        const modelOffset: Vec3 =
          active.length > 1
            ? [modelIndex * 16 - ((active.length - 1) * 16) / 2, 0, 0]
            : [0, 0, 0];
        return (
          <group key={model.id} name={model.name}>
            {model.layers.map((layer) => {
              const explode = layer.explodeOffset.map((v) => v * explodeFactor) as Vec3;
              return layer.elements.map((element) => (
                <BuildingElement
                  key={element.id}
                  element={element}
                  layer={layer}
                  modelOffset={modelOffset}
                  explode={explode}
                />
              ));
            })}
          </group>
        );
      })}
    </group>
  );
}

function ElementTransform() {
  const selectedElementId = useBimStore((s) => s.selectedElementId);
  const tool = useBimStore((s) => s.tool);
  const findElement = useBimStore((s) => s.findElement);
  const moveElement = useBimStore((s) => s.moveElement);
  const models = useBimStore((s) => s.models);
  const activeModelIds = useBimStore((s) => s.activeModelIds);
  const explodeFactor = useBimStore((s) => s.explodeFactor);
  const meshRef = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);

  const found = selectedElementId ? findElement(selectedElementId) : null;
  const active = models.filter((m) => activeModelIds.includes(m.id));
  const modelIndex = found ? active.findIndex((m) => m.id === found.model.id) : -1;
  const modelOffset: Vec3 =
    active.length > 1 && modelIndex >= 0
      ? [modelIndex * 16 - ((active.length - 1) * 16) / 2, 0, 0]
      : [0, 0, 0];

  if (!found || !selectedElementId || tool !== 'move' || !found.element.visible || !found.layer.visible) {
    return null;
  }

  const explode = found.layer.explodeOffset.map((v) => v * explodeFactor) as Vec3;
  const position: Vec3 = [
    found.element.position[0] + modelOffset[0] + explode[0],
    found.element.position[1] + modelOffset[1] + explode[1],
    found.element.position[2] + modelOffset[2] + explode[2],
  ];

  const commitMove = () => {
    if (!meshRef.current) return;
    const p = meshRef.current.position;
    moveElement(selectedElementId, [
      p.x - modelOffset[0] - explode[0],
      p.y - modelOffset[1] - explode[1],
      p.z - modelOffset[2] - explode[2],
    ]);
  };

  return (
    <TransformControls
      mode="translate"
      showX
      showY
      showZ
      size={0.85}
      onMouseDown={() => {
        dragging.current = true;
      }}
      onMouseUp={() => {
        dragging.current = false;
        commitMove();
      }}
      onObjectChange={() => {
        if (!dragging.current) return;
        commitMove();
      }}
    >
      <mesh ref={meshRef} position={position} visible={false}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
      </mesh>
    </TransformControls>
  );
}

function SceneContent() {
  const showGrid = useBimStore((s) => s.showGrid);
  const tool = useBimStore((s) => s.tool);
  const selectElement = useBimStore((s) => s.selectElement);
  const themeMode = useBimStore((s) => s.themeMode);

  return (
    <>
      <PerspectiveCamera makeDefault position={[18, 14, 18]} fov={42} near={0.2} far={400} />
      <CameraRig />
      <ClippingSetup />
      <ScreenshotCapture />
      <color attach="background" args={[themeMode === 'dark' ? '#10141a' : '#dce3ec']} />
      <fog attach="fog" args={[themeMode === 'dark' ? '#10141a' : '#dce3ec', 55, 110]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[18, 28, 12]}
        intensity={1.15}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
        shadow-camera-far={70}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <hemisphereLight args={['#d7e4f2', '#5a6550', 0.4]} />

      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <ActiveModels />
        <ElementTransform />
        <MeasureOverlay />
        <SectionPlane />
      </Suspense>

      {showGrid && (
        <Grid
          infiniteGrid
          fadeDistance={70}
          fadeStrength={1.8}
          sectionColor={themeMode === 'dark' ? '#3a4550' : '#8a96a4'}
          cellColor={themeMode === 'dark' ? '#1e262e' : '#b8c2cc'}
          sectionSize={5}
          cellSize={1}
          position={[0, -0.01, 0]}
        />
      )}

      <ContactShadows position={[0, 0, 0]} opacity={0.28} scale={50} blur={2.2} far={16} frames={1} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.05}
        enabled={tool !== 'move'}
        onStart={() => {
          if (tool === 'select') selectElement(null);
        }}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
        onPointerDown={() => {
          if (tool === 'select' || tool === 'move') selectElement(null);
        }}
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>
    </>
  );
}

export default function SceneCanvas() {
  return (
    <div className="scene-canvas">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          localClippingEnabled: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        onPointerMissed={() => {
          const currentTool = useBimStore.getState().tool;
          if (currentTool === 'select' || currentTool === 'orbit') {
            useBimStore.getState().selectElement(null);
          }
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
