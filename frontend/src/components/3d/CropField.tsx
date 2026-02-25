'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CropFieldProps {
  rows?: number;
  plantsPerRow?: number;
  spacing?: number;
  growthStage?: number; // 0-1, affects plant height
  stressMap?: number[]; // Array of stress values 0-1 for each plant
  centerOffset?: [number, number];
}

// Colors based on design system
const COLORS = {
  healthy: new THREE.Color('#4A7C59'),     // Deep Leaf
  moderate: new THREE.Color('#7A9E7E'),    // Low risk - lighter green
  stressed: new THREE.Color('#D4A853'),    // Savanna Gold
  severe: new THREE.Color('#D97B3D'),      // Severe orange
  critical: new THREE.Color('#B8352B'),    // Critical red
  stalk: new THREE.Color('#8B7355'),       // Bark color for stalks
  tassel: new THREE.Color('#D4A853'),      // Gold for tassels
};

function getColorForStress(stress: number): THREE.Color {
  if (stress < 0.2) return COLORS.healthy;
  if (stress < 0.4) return COLORS.moderate;
  if (stress < 0.6) return COLORS.stressed;
  if (stress < 0.8) return COLORS.severe;
  return COLORS.critical;
}

export function CropField({
  rows = 8,
  plantsPerRow = 10,
  spacing = 0.8,
  growthStage = 0.8,
  stressMap,
  centerOffset = [0, 0],
}: CropFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate plant positions
  const plantData = useMemo(() => {
    const plants: Array<{
      position: [number, number, number];
      rotation: number;
      scale: number;
      stress: number;
    }> = [];
    
    const totalWidth = (plantsPerRow - 1) * spacing;
    const totalDepth = (rows - 1) * spacing;
    const offsetX = -totalWidth / 2 + centerOffset[0];
    const offsetZ = -totalDepth / 2 + centerOffset[1];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < plantsPerRow; col++) {
        const index = row * plantsPerRow + col;
        const jitter = 0.1; // Small random offset for natural look
        
        plants.push({
          position: [
            offsetX + col * spacing + (Math.random() - 0.5) * jitter,
            0,
            offsetZ + row * spacing + (Math.random() - 0.5) * jitter,
          ],
          rotation: Math.random() * Math.PI * 2,
          scale: 0.8 + Math.random() * 0.4, // Variation in size
          stress: stressMap?.[index] ?? Math.random() * 0.3, // Default low stress
        });
      }
    }
    
    return plants;
  }, [rows, plantsPerRow, spacing, stressMap, centerOffset]);

  // Gentle sway animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.02;
    }
  });

  const plantHeight = 1.5 + growthStage * 1.5; // 1.5 to 3 meters based on growth

  return (
    <group ref={groupRef}>
      {plantData.map((plant, i) => (
        <MaizePlant
          key={i}
          position={plant.position}
          rotation={plant.rotation}
          scale={plant.scale}
          height={plantHeight}
          stress={plant.stress}
          growthStage={growthStage}
        />
      ))}
    </group>
  );
}

interface MaizePlantProps {
  position: [number, number, number];
  rotation: number;
  scale: number;
  height: number;
  stress: number;
  growthStage: number;
}

function MaizePlant({ position, rotation, scale, height, stress, growthStage }: MaizePlantProps) {
  const leafColor = getColorForStress(stress);
  const finalHeight = height * scale;
  const leafSize = 0.8 + growthStage * 0.4;
  
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Stalk */}
      <mesh position={[0, finalHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, finalHeight, 6]} />
        <meshStandardMaterial color={COLORS.stalk} roughness={0.7} />
      </mesh>
      
      {/* Leaves - arranged in alternating pattern */}
      {growthStage > 0.2 && (
        <>
          <Leaf 
            position={[0, finalHeight * 0.3, 0]} 
            rotation={[0, 0, 0.3]} 
            size={leafSize * 0.6}
            color={leafColor}
          />
          <Leaf 
            position={[0, finalHeight * 0.45, 0]} 
            rotation={[0, Math.PI, -0.3]} 
            size={leafSize * 0.8}
            color={leafColor}
          />
          <Leaf 
            position={[0, finalHeight * 0.6, 0]} 
            rotation={[0, Math.PI * 0.5, 0.25]} 
            size={leafSize * 0.9}
            color={leafColor}
          />
          <Leaf 
            position={[0, finalHeight * 0.75, 0]} 
            rotation={[0, Math.PI * 1.5, -0.25]} 
            size={leafSize}
            color={leafColor}
          />
        </>
      )}
      
      {/* Tassel (at full growth) */}
      {growthStage > 0.7 && (
        <mesh position={[0, finalHeight + 0.15, 0]} castShadow>
          <coneGeometry args={[0.08, 0.3, 6]} />
          <meshStandardMaterial color={COLORS.tassel} roughness={0.6} />
        </mesh>
      )}
      
      {/* Ear of corn (at mid-to-late growth) */}
      {growthStage > 0.5 && (
        <group position={[0.08, finalHeight * 0.55, 0]} rotation={[0, 0, 0.4]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
            <meshStandardMaterial color="#E8DFD0" roughness={0.5} />
          </mesh>
          {/* Husk */}
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.03, 0.1, 6]} />
            <meshStandardMaterial color={leafColor} roughness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
}

interface LeafProps {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  color: THREE.Color;
}

function Leaf({ position, rotation, size, color }: LeafProps) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[size * 0.6, 0.02, size * 0.15]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
