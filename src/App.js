import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, SpotLight, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { useControls } from 'leva'
import { Model } from './Datsun'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function App() {
  return (
    <div className="container">
      <Canvas shadows camera={{ position: [0, 0, 0], fov: 35 }}>
        <Stage intensity={0.8} environment="night" camera={{ position: [0, -6, 0], fov: 50 }} shadows={{ type: 'contact', colorBlend: 1, opacity: 0.2 }} adjustCamera={1.6}>
          <Model />
        </Stage>
        <OrbitControls makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        <pointLight position={[20, -5, -20]} color="blue" intensity={2} />
        <pointLight position={[-90, -10, 30]} color="red" intensity={2} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
