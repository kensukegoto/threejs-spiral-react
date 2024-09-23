import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import Scene from './components/Scene'


function App() {

  const directionalLightRef = useRef()
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (directionalLightRef.current) {
      setIsReady(true)
    }
  })

  return (
    <>
      <section style={{ width: '100vw', height: '100vh' }}>
        <Canvas 
          camera={{ 
            near: .1, 
            far: 10000, 
            fov: 45, 
            position: [0 ,200 ,800]
          }}
          shadows
        >
          <color args={['ivory']} attach="background" />
          <Scene />


        </Canvas>
      </section>
    </>
  )
}

export default App
