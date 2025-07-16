"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D } from "@react-three/drei"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type * as THREE from "three"

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-4, 2, 0]}>
          PORTFOLIO
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Float>

      <FloatingCube position={[-3, -1, 2]} color="#8b5cf6" />
      <FloatingCube position={[3, 1, -2]} color="#06b6d4" />
      <FloatingCube position={[0, -2, 1]} color="#10b981" />
      <FloatingCube position={[2, 2, 3]} color="#f59e0b" />

      <Environment preset="night" />
    </>
  )
}

export default function GuiPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("home")

  const skills = [
    { name: "UI/UX Design", icon: "🎨", description: "Modern, responsive interfaces" },
    { name: "DevOps", icon: "⚙️", description: "CI/CD, Docker, Kubernetes" },
    { name: "AI/ML", icon: "🤖", description: "Machine Learning & AI solutions" },
    { name: "3D Modeling", icon: "🎭", description: "Blender, Three.js, WebGL" },
    { name: "Game Dev", icon: "🎮", description: "Unity, Unreal, Web games" },
    { name: "OS Development", icon: "💻", description: "Linux, Arch, System programming" },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Arch Portfolio
            </h1>
          </div>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
          >
            Back to Terminal
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Full Stack Developer
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Passionate Arch Linux user exploring the depths of technology - from UI/UX to DevOps, AI/ML to 3D
                modeling, games to operating systems. Building the future, one commit at a time.
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/20 transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">{skill.name}</h3>
                    <p className="text-gray-400">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Projects", value: "50+" },
                { label: "Technologies", value: "25+" },
                { label: "Experience", value: "5+ Years" },
                { label: "Coffee Cups", value: "∞" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2 animate-pulse">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center backdrop-blur-sm bg-black/20">
          <p className="text-gray-400">Built with ❤️ on Arch Linux | Powered by Next.js & Three.js</p>
        </footer>
      </div>

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
