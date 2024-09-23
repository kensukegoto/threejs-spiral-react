import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import islandScene from "../assets/cat_01.png";

const Object = ({ radian, dy}) => {

  const [geometry, setGeometry] = useState(null);
  const [materials, setMaterials] = useState(null);


  useEffect(() => {

    const loader = new THREE.TextureLoader();
    const texture = loader.load(islandScene);
    texture.colorSpace = THREE.SRGBColorSpace;
  
    const cylinderGeometry = new THREE.CylinderGeometry(50, 50, .1, 32);
  
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff})
    ]

    setGeometry(cylinderGeometry);
    setMaterials(materials);

  }, [])

  if(!geometry || !materials) return;

  return (
    <mesh 
      geometry={geometry} 
      material={materials} 
      castShadow
      position={[
        200 * Math.cos(radian) * -1,
        dy,
        200 * Math.sin(radian)
      ]}
      rotation={[
        0,
        radian - Math.PI * 2,
        Math.PI / 2
      ]}
    >
    </mesh>
  )
}

export default Object
