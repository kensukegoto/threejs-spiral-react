import { useState, useEffect, useRef } from 'react'
import { DoubleSide } from 'three'
import { useThree } from '@react-three/fiber'
import Spiral from './Spiral';

const shadowSize = 400;

function Scene() {

  const { camera } = useThree();

  const directionalLightRef = useRef()
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {

    camera.lookAt(0 ,10 ,0);
    
    if (directionalLightRef.current) {
      setIsReady(true)
    }

  },[]);

  console.log(isReady);

  return (
    <>
      <ambientLight intensity={4} />
      <directionalLight 
        position={[0, 100, 100]} 
        intensity={1} 
        castShadow
        shadow-camera-top={shadowSize}
        shadow-camera-right={shadowSize}
        shadow-camera-bottom={-1 * shadowSize}
        shadow-camera-left={-1 * shadowSize}
        shadow-camera-far={1000}
        ref={directionalLightRef}
      />

      {isReady && (
        <directionalLightHelper args={[directionalLightRef.current, 5, 0xff0000]} />
      )}

      {/* 床 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
        <planeGeometry args={[800, 800]} />
        <meshStandardMaterial color="#cccccc"/>
      </mesh>

      <mesh position={[0, 2.5, 0]} castShadow >
        <boxGeometry args={[5, 5, 5, 10]}  />
        <meshStandardMaterial color="#00ff00" />
      </mesh>

      <Spiral />

      <axesHelper args={[100]}/>

    </>
  )
}

export default Scene
