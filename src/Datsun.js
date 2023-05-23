import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export function Model({ color, ...props }) {
  const ref = useRef()
  const head = useRef()
  const eye1 = useRef()
  const eye2 = useRef()

  const { nodes, materials } = useGLTF('/EVE.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = (2 + Math.sin(t / 1)) / 1
    ref.current.rotation.y = (4.5 + Math.sin(t / 1.5)) / 5
  })
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
    easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 0.3 : -1), 0], 0.4, delta)
    eye1.current.scale.set(1.82, 0.032, 1.82 * t)
    eye2.current.scale.set(1.82, 0.032, 1.82 * t)
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={head}>
        <mesh castShadow receiveShadow geometry={nodes.Head.geometry} material={materials['EVE.002']} position={[0.52, -3.2, -0.5]} rotation={[Math.PI / 2, 0, 0]} scale={1.38} />
        <mesh castShadow receiveShadow geometry={nodes.Frame.geometry} material={materials.Material} position={[-0.09, 8.38, -0.49]} scale={[2.87, 2.21, 2.87]} material-transmission={1.1} material-roughness={0.13} />
        <mesh castShadow receiveShadow geometry={nodes.Left_eye.geometry} material={materials.Eyes} position={[-0.09, 8.2, 1.25]} scale={[1.82, 0.03, 1.82]} ref={eye1} rotation={[Math.PI / 2, 0, 0]} material-emissiveIntensity={10} toneMapped={false} />
        <mesh castShadow receiveShadow geometry={nodes.Right_eye.geometry} material={materials.Eyes} position={[-0.09, 8.2, 1.25]} rotation={[Math.PI / 2, 0, 0]} ref={eye2} material-emissiveIntensity={10} toneMapped={false} />
      </group>

      <mesh castShadow receiveShadow geometry={nodes.body.geometry} material={materials['EVE.002']} position={[-0.09, 4.73, -0.5]} scale={2.01} material-roughness={0.5} />
      <mesh castShadow receiveShadow geometry={nodes.Right.geometry} material={materials['EVE.002']} position={[-0.09, 3.64, -0.5]} scale={[0.12, 1.2, 1.2]} />
      <mesh castShadow receiveShadow geometry={nodes.Left.geometry} material={materials['EVE.002']} position={[-0.11, 3.64, -0.5]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.12, 1.2, 1.2]} />
    </group>
  )
}

useGLTF.preload('/EVE.glb')
