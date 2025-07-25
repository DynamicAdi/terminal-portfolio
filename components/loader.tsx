"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const themes = {
    cyberpunk: {
      primary: "text-green-400",
      secondary: "text-blue-400",
      accent: "text-lime-400",
      gradient: "from-green-400 to-blue-500",
    },
  }

  type ThemeKey = keyof typeof themes
  const [currentTheme] = useState<ThemeKey>("cyberpunk")

  const theme = themes[currentTheme]

  const loadingTexts = [
    "Initializing Arch Linux environment...",
    "Loading kernel modules...",
    "Starting systemd services...",
    "Mounting filesystems...",
    "Configuring network interfaces...",
    "Loading user profile...",
    "Starting terminal session...",
    "Welcome to the matrix...",
  ]

  const playBootSound = useCallback(() => {
    if (!soundEnabled) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Boot sound sequence
      oscillator.frequency.setValueAtTime(400, ctx.currentTime)
      oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.5)
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 1)
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5)
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 1.5)
    } catch (error) {
      console.log("Audio not supported")
    }
  }, [soundEnabled])

  useEffect(() => {
    playBootSound()
  }, [playBootSound])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setCurrentText(loadingTexts[randomIndex])
    }, 400)

    return () => clearInterval(textInterval)
  }, [])

  return (
    <div
      className={`min-h-screen bg-black ${theme.primary} font-mono flex flex-col justify-center items-center relative overflow-hidden`}
    >
      {/* Background Matrix Effect */}
      {/* <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
          </div>
        ))}
      </div> */}

      <div className="z-10 text-center max-w-2xl px-4">
        {/* Arch Linux Logo ASCII */}
        <pre className="text-blue-400 text-xs md:text-sm mb-8 animate-pulse">
          {`
                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooo+++/
         ./ooosssso++osssssso+\`
        .oossssso-\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/
`}
        </pre>

        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-purple-400">Adarsh Pandit</h1>

        <div className="mb-8">
          <div className="text-sm mb-2">Loading System...</div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <div
              className={`bg-gradient-to-r ${theme.gradient} h-2 rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400">
            [{progress}%] {currentText}
          </div>
        </div>

        {/* Spinning loader */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>

        <div className="text-xs text-gray-500">Press any key to continue...</div>
      </div>
    </div>
  )
}
