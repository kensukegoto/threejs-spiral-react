import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import Object from './Object';

const Spiral = () => {

  const groupRef = useRef(null);
  const [ step, setStep] = useState(null);

  const { gl } = useThree();

  // const [ pR, setPR ] = useState(0);
  // const [ pY, setPY ] = useState(0);
  let pR = 0;
  let pY = 0;

  const [cards, setCards] = useState([]);

  const wheel = e => {

    const v = 5;
    const ry = e.deltaY > 0 ? -1 * v * step.r : v * step.r;
    const dy = e.deltaY > 0 ? -1 * v * step.y : v * step.y;

    pR += ry;
    pY += dy;

  }

  useEffect(() => {

    const cards = [...Array(10)].map((_, idx) => {
      const radian =  (Math.PI * 2 / 10) * idx  + Math.PI / 2;
      const dy = idx * (200 / 10 );
      return { r: radian, y: dy }
    });

    setCards(cards)

  }, [])
  

  useEffect(() => {

    if(!cards.length) return;

    const s = cards[0];
    const e = cards[cards.length - 1];

    const scrolY = window.innerHeight * 2;

    setStep({ r: (e.r - s.r) / scrolY, y: (e.y - s.y) / scrolY });
  

  }, [cards])
  

  useEffect(() => {

    if(!step) return;

    const canvas = gl.domElement;

    canvas.addEventListener('wheel', wheel);
  
    return () => {
      canvas.removeEventListener('wheel',wheel);
    }
  }, [gl, wheel, step]);


  useFrame(() => {

    if(!groupRef.current) return;

    groupRef.current.position.y += (pY - groupRef.current.position.y) * .1;
    groupRef.current.rotation.y += (pR - groupRef.current.rotation.y) * .1;

  })

  if(!cards.length) return null;

  return (
    <group ref={groupRef}>
      {cards.map((e,i) => (
        <Object key={i} radian={e.r} dy={e.y} />
      ))}
    </group>
  )
}

export default Spiral
