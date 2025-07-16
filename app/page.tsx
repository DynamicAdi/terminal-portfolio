"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Terminal from "@/components/terminal"
import Loader from "@/components/loader"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        // Play a silent sound to initialize
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log("Audio initialization failed")
      }
    }

    document.addEventListener("click", initAudio, { once: true })
    document.addEventListener("keydown", initAudio, { once: true })

    return () => {
      document.removeEventListener("click", initAudio)
      document.removeEventListener("keydown", initAudio)
    }
  }, [])

  const handleGuiStart = () => {
    router.push("/gui")
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen w-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 opacity-50" /> */}
      <div className="relative z-10">
        <Terminal onGuiStart={handleGuiStart} />
      </div>

      {/* Matrix-like background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  )
}
