'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { getColorById } from '@/data/materials'
import * as THREE from 'three'

export default function ThreeDPreview() {
  const { selectedProduct, customizations } = useCustomizer()

  if (!selectedProduct) return null

  const getPartColor = (partId: string): string => {
    const customization = customizations[partId]
    if (!customization) return '#E5E7EB'
    const color = getColorById(customization.colorId)
    return color?.hexCode || '#E5E7EB'
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* ライティング */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />

        {/* 3Dモデル */}
        {selectedProduct.id === 'hoodie' && (
          <HoodieModel
            neckColor={getPartColor('neck')}
            bodyColor={getPartColor('body')}
            sleeveColor={getPartColor('sleeve')}
            hemColor={getPartColor('hem')}
            pocketColor={getPartColor('pocket')}
          />
        )}
        {selectedProduct.id === 'tshirt' && (
          <TShirtModel
            neckColor={getPartColor('neck')}
            bodyColor={getPartColor('body')}
            sleeveColor={getPartColor('sleeve')}
          />
        )}
        {selectedProduct.id === 'jacket' && (
          <JacketModel
            neckColor={getPartColor('neck')}
            bodyColor={getPartColor('body')}
            sleeveColor={getPartColor('sleeve')}
            hemColor={getPartColor('hem')}
          />
        )}
        {selectedProduct.id === 'coat' && (
          <CoatModel
            neckColor={getPartColor('neck')}
            bodyColor={getPartColor('body')}
            sleeveColor={getPartColor('sleeve')}
            hemColor={getPartColor('hem')}
          />
        )}
        {selectedProduct.id === 'vest' && (
          <VestModel
            neckColor={getPartColor('neck')}
            bodyColor={getPartColor('body')}
            hemColor={getPartColor('hem')}
          />
        )}

        {/* 床 */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  )
}

// パーカーの3Dモデル
function HoodieModel({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
  pocketColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
  pocketColor: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} castShadow>
      {/* ネック（フード） */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={neckColor} />
      </mesh>

      {/* ボディ */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 2, 32]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* 左袖 */}
      <mesh position={[-0.9, 0.5, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.25, 0.22, 1.2, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 右袖 */}
      <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.25, 0.22, 1.2, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 裾 */}
      <mesh position={[0, -1, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.15, 32]} />
        <meshStandardMaterial color={hemColor} />
      </mesh>

      {/* ポケット */}
      <mesh position={[0, 0.1, 0.81]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.1]} />
        <meshStandardMaterial color={pocketColor} />
      </mesh>
    </group>
  )
}

// Tシャツの3Dモデル
function TShirtModel({
  neckColor,
  bodyColor,
  sleeveColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} castShadow>
      {/* ネック */}
      <mesh position={[0, 1, 0]} castShadow>
        <torusGeometry args={[0.25, 0.08, 16, 32]} />
        <meshStandardMaterial color={neckColor} />
      </mesh>

      {/* ボディ */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.8, 1.8, 32]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* 左袖 */}
      <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.6, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 右袖 */}
      <mesh position={[0.8, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.6, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>
    </group>
  )
}

// ジャケットの3Dモデル
function JacketModel({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} castShadow>
      {/* 襟 */}
      <mesh position={[0, 1.1, 0.3]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.1]} />
        <meshStandardMaterial color={neckColor} />
      </mesh>

      {/* ボディ */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.85, 2, 32]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* 左袖 */}
      <mesh position={[-0.85, 0.5, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.24, 0.21, 1.3, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 右袖 */}
      <mesh position={[0.85, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.24, 0.21, 1.3, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 裾 */}
      <mesh position={[0, -1, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.12, 32]} />
        <meshStandardMaterial color={hemColor} />
      </mesh>
    </group>
  )
}

// コートの3Dモデル
function CoatModel({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} castShadow>
      {/* 襟 */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.25, 0.3]} />
        <meshStandardMaterial color={neckColor} />
      </mesh>

      {/* ボディ */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.95, 2.3, 32]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* 左袖 */}
      <mesh position={[-0.9, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.26, 0.23, 1.5, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 右袖 */}
      <mesh position={[0.9, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.26, 0.23, 1.5, 16]} />
        <meshStandardMaterial color={sleeveColor} />
      </mesh>

      {/* 裾 */}
      <mesh position={[0, -1.35, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.95, 0.15, 32]} />
        <meshStandardMaterial color={hemColor} />
      </mesh>
    </group>
  )
}

// ベストの3Dモデル
function VestModel({
  neckColor,
  bodyColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  hemColor: string
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} castShadow>
      {/* ネック */}
      <mesh position={[0, 1, 0]} castShadow>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color={neckColor} />
      </mesh>

      {/* ボディ */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.85, 1.8, 32]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* 裾 */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.12, 32]} />
        <meshStandardMaterial color={hemColor} />
      </mesh>
    </group>
  )
}
