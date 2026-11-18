import { Line, Html } from '@react-three/drei';
import { useBimStore } from '../../store/bimStore';

export default function MeasureOverlay() {
  const { measurePoints, measurements } = useBimStore();

  return (
    <group>
      {measurePoints.map((p, i) => (
        <mesh key={`pt-${i}`} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff6b4a" />
        </mesh>
      ))}

      {measurePoints.length === 2 && (
        <Line points={measurePoints} color="#ff6b4a" lineWidth={2} dashed dashSize={0.2} gapSize={0.1} />
      )}

      {measurements.map((m) => {
        const mid = [
          (m.points[0][0] + m.points[1][0]) / 2,
          (m.points[0][1] + m.points[1][1]) / 2 + 0.3,
          (m.points[0][2] + m.points[1][2]) / 2,
        ];
        return (
          <group key={m.id}>
            <Line points={m.points} color="#5b9fd4" lineWidth={2} />
            {m.points.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshBasicMaterial color="#5b9fd4" />
              </mesh>
            ))}
            <Html position={mid} center style={{ pointerEvents: 'none' }}>
              <div className="measure-label">{m.distance.toFixed(2)} m</div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
