'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, PerspectiveCamera } from '@react-three/drei';

interface FarmSceneProps {
  children?: React.ReactNode;
  className?: string;
}

export function FarmScene({ children, className }: FarmSceneProps) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={<LoadingFallback />}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <hemisphereLight
            color="#87CEEB"
            groundColor="#8B4513"
            intensity={0.3}
          />

          {/* Environment */}
          <Sky
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0.6}
            azimuth={0.25}
          />
          <fog attach="fog" args={['#E8DFD0', 30, 80]} />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={40}
            target={[0, 0, 0]}
          />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#C65D3B" />
    </mesh>
  );
}
