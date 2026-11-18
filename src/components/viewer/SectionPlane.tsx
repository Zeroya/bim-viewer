import * as THREE from 'three';
import { useBimStore } from '../../store/bimStore';

interface SectionPlaneProps {
  bounds?: { min: number; max: number };
}

export default function SectionPlane({ bounds = { min: -8, max: 10 } }: SectionPlaneProps) {
  const sectionEnabled = useBimStore((s) => s.sectionEnabled);
  const sectionAxis = useBimStore((s) => s.sectionAxis);
  const sectionValue = useBimStore((s) => s.sectionValue);

  if (!sectionEnabled) return null;

  const constant = bounds.min + (bounds.max - bounds.min) * sectionValue;
  const size = 40;

  const pos =
    sectionAxis === 'x'
      ? [constant, 3, 0]
      : sectionAxis === 'z'
        ? [0, 3, constant]
        : [0, constant, 0];

  const rot =
    sectionAxis === 'x'
      ? [0, 0, Math.PI / 2]
      : sectionAxis === 'z'
        ? [Math.PI / 2, 0, 0]
        : [0, 0, 0];

  return (
    <mesh
      position={pos as [number, number, number]}
      rotation={rot as [number, number, number]}
    >
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        color="#5b9fd4"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
