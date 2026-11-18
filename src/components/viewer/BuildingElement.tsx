import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Edges, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useBimStore } from '../../store/bimStore';
import type { BimElement, BimLayer, Vec3 } from '../../types/bim';

function GltfMesh({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} />;
}

function TreeMesh({
  size,
  color,
  selected,
  showEdges,
  wireframe,
}: {
  size: Vec3;
  color: string;
  selected: boolean;
  showEdges: boolean;
  wireframe: boolean;
}) {
  const trunkH = size[1] * 0.35;
  const crownR = Math.max(size[0], size[2]) * 0.9;
  return (
    <group>
      <mesh position={[0, trunkH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, trunkH, 10]} />
        <meshStandardMaterial color="#5a4030" wireframe={wireframe} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>
      <mesh position={[0, trunkH + crownR * 0.7, 0]} castShadow>
        <sphereGeometry args={[crownR, 14, 14]} />
        <meshStandardMaterial
          color={selected ? '#ffb347' : color}
          emissive={selected ? '#442200' : '#000000'}
          emissiveIntensity={selected ? 0.25 : 0}
          wireframe={wireframe}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
        {showEdges && !wireframe && <Edges threshold={25} color="#1a241c" />}
      </mesh>
    </group>
  );
}

interface BuildingElementProps {
  element: BimElement;
  layer: BimLayer;
  modelOffset?: Vec3;
  explode?: Vec3;
}

export default function BuildingElement({
  element,
  layer,
  modelOffset = [0, 0, 0],
  explode = [0, 0, 0],
}: BuildingElementProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const selected = useBimStore((s) => s.selectedElementId === element.id);
  const hovered = useBimStore((s) => s.hoveredElementId === element.id);
  const showEdges = useBimStore((s) => s.showEdges);
  const wireframe = useBimStore((s) => s.wireframe);
  const tool = useBimStore((s) => s.tool);
  const selectElement = useBimStore((s) => s.selectElement);
  const setHoveredElement = useBimStore((s) => s.setHoveredElement);
  const addMeasurePoint = useBimStore((s) => s.addMeasurePoint);

  if (!element.visible || !layer.visible) return null;

  const opacity = layer.opacity ?? 1;
  const isGlass = Boolean(element.glass);
  const transparent = opacity < 0.99 || isGlass;
  const color = selected ? '#ffb347' : hovered ? '#b7d7ef' : element.color || layer.color;

  const position: Vec3 = [
    element.position[0] + modelOffset[0] + explode[0],
    element.position[1] + modelOffset[1] + explode[1],
    element.position[2] + modelOffset[2] + explode[2],
  ];
  const rotation: Vec3 = element.rotation || [0, 0, 0];

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (tool === 'measure') {
      addMeasurePoint([e.point.x, e.point.y, e.point.z]);
      return;
    }
    if (tool === 'orbit') return;
    selectElement(element.id);
  };

  const hoverHandlers = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (tool === 'orbit') return;
      setHoveredElement(element.id);
    },
    onPointerOut: () => setHoveredElement(null),
  };

  if (element.kind === 'gltf' && element.url) {
    return (
      <group
        position={position}
        rotation={rotation}
        onPointerDown={handlePointerDown}
        {...hoverHandlers}
      >
        <GltfMesh url={element.url} />
      </group>
    );
  }

  if (element.kind === 'tree') {
    return (
      <group position={position} onPointerDown={handlePointerDown} {...hoverHandlers}>
        <TreeMesh
          size={element.size}
          color={color}
          selected={selected}
          showEdges={showEdges}
          wireframe={wireframe}
        />
      </group>
    );
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow={!isGlass}
      receiveShadow={!isGlass}
      renderOrder={isGlass ? 2 : 0}
      onPointerDown={handlePointerDown}
      {...hoverHandlers}
      userData={{ elementId: element.id, layerId: layer.id }}
    >
      <boxGeometry args={element.size} />
      <meshStandardMaterial
        color={color}
        transparent={transparent}
        opacity={isGlass ? Math.min(opacity, 0.42) : opacity}
        metalness={element.metalness || 0.04}
        roughness={element.roughness ?? 0.72}
        emissive={selected ? '#5a3200' : '#000000'}
        emissiveIntensity={selected ? 0.3 : 0}
        depthWrite={!isGlass}
        wireframe={wireframe}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
      {showEdges && !wireframe && !isGlass && (
        <Edges threshold={18} color={selected ? '#ffcc66' : '#2a313a'} />
      )}
    </mesh>
  );
}
