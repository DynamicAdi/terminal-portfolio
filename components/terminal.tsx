"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import ProjectGallery from "./project-gallery";
import { Volume2, VolumeX, Palette } from "lucide-react";
import commands from "./commands";

interface TerminalProps {
  onGuiStart: () => void;
}

interface Command {
  input: string;
  output: string[];
  timestamp: string;
  prompt: string; // <-- Add this line
}

export default function Terminal({ onGuiStart }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [showProjectGallery, setShowProjectGallery] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [savedInput, setSavedInput] = useState("");

  // Sound effects system
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIndex === null) {
        setSavedInput(input);
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1].input);
      } else if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setInput(history[historyIndex - 1].input);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;

      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setInput(history[historyIndex + 1].input);
      } else {
        setHistoryIndex(null);
        setInput(savedInput);
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const possibleMatches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );

      if (possibleMatches.length === 1) {
        setInput(possibleMatches[0]);
      } else if (possibleMatches.length > 1) {
        const timestamp = new Date().toLocaleTimeString();
        const output = ["Possible commands:", ...possibleMatches];

        const newCommand: Command = {
          input,
          output,
          timestamp,
          prompt: `[DevAdarsh@arch ${currentDirectory}]$ `, // <-- Snapshot the prompt here
        };

        setHistory((prev) => [...prev, newCommand]);
      } else {
        playSound("error");
      }
    }
  };

  // Theme system
  const themes = {
    matrix: {
      name: "Matrix",
      bg: "bg-black",
      text: "text-green-400",
      prompt: "text-green-500",
      accent: "text-lime-400",
      border: "border-green-500",
      gradient: "from-green-400 to-lime-500",
    },
    cyberpunk: {
      name: "Cyberpunk",
      bg: "bg-gray-900",
      text: "text-cyan-400",
      prompt: "text-pink-500",
      accent: "text-purple-400",
      border: "border-cyan-500",
      gradient: "from-cyan-400 to-purple-500",
    },
    retro: {
      name: "Retro",
      bg: "bg-amber-900",
      text: "text-amber-200",
      prompt: "text-orange-400",
      accent: "text-yellow-300",
      border: "border-amber-500",
      gradient: "from-amber-400 to-orange-500",
    },
    hacker: {
      name: "Hacker",
      bg: "bg-black",
      text: "text-red-400",
      prompt: "text-red-500",
      accent: "text-orange-400",
      border: "border-red-500",
      gradient: "from-red-400 to-orange-500",
    },
    ocean: {
      name: "Ocean",
      bg: "bg-slate-900",
      text: "text-blue-300",
      prompt: "text-teal-400",
      accent: "text-cyan-300",
      border: "border-blue-500",
      gradient: "from-blue-400 to-teal-500",
    },
    forest: {
      name: "Forest",
      bg: "bg-green-900",
      text: "text-green-300",
      prompt: "text-emerald-400",
      accent: "text-lime-300",
      border: "border-green-500",
      gradient: "from-green-400 to-emerald-500",
    },
  };

  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof themes>("cyberpunk");
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(false);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(
    (
      type:
        | "type"
        | "enter"
        | "error"
        | "success"
        | "boot"
        | "notification"
        | "theme"
        | "ambient"
    ) => {
      if (!soundEnabled) return;

      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Enhanced sound effects for different actions
        switch (type) {
          case "type":
            oscillator.frequency.setValueAtTime(
              800 + Math.random() * 200,
              ctx.currentTime
            );
            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.1
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.1);
            break;
          case "enter":
            oscillator.frequency.setValueAtTime(600, ctx.currentTime);
            oscillator.frequency.setValueAtTime(400, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.2
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
            break;
          case "error":
            oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(100, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.4
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.4);
            break;
          case "success":
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.3
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.3);
            break;
          case "boot":
            oscillator.frequency.setValueAtTime(400, ctx.currentTime);
            oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.5);
            oscillator.frequency.setValueAtTime(800, ctx.currentTime + 1);
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 1.5
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.5);
            break;
          case "notification":
            oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
            oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.2
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
            break;
          case "theme":
            oscillator.frequency.setValueAtTime(600, ctx.currentTime);
            oscillator.frequency.setValueAtTime(900, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.6
            );
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.6);
            break;
        }
      } catch (error) {
        console.log("Audio not supported");
      }
    },
    [soundEnabled]
  );

  const toggleAmbientSound = useCallback(() => {
    setAmbientSoundEnabled(!ambientSoundEnabled);

    if (!ambientSoundEnabled) {
      // Create ambient sound
      if (!ambientAudioRef.current) {
        try {
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
              (window as any).webkitAudioContext)();
          }

          const ctx = audioContextRef.current;
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);

          oscillator.frequency.setValueAtTime(60, ctx.currentTime);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.02, ctx.currentTime);

          oscillator.start();

          // Store reference to stop later
          ambientAudioRef.current = { oscillator, gainNode } as any;
        } catch (error) {
          console.log("Ambient audio not supported");
        }
      }
    } else {
      // Stop ambient sound
      if (ambientAudioRef.current) {
        try {
          (ambientAudioRef.current as any).oscillator.stop();
          ambientAudioRef.current = null;
        } catch (error) {
          console.log("Error stopping ambient audio");
        }
      }
    }
  }, [ambientSoundEnabled]);

  const changeTheme = (themeName: keyof typeof themes) => {
    setCurrentTheme(themeName);
    playSound("theme");
  };

  const welcomeMessage = `
                              ####+++++++                 
                        +#+#############+###+           
                      ++######################+#        
                     #+###########################      
                     ###############################    
                    ################################    
                    ################################    
                     ######++++++++++##############     
                     ####+#+++####+----++#########      
                   ++###+-++#######+++###########       
                  #+++++.-+-+######++###########        
                  ++#++-..+---+++#--+##########         
                  -+++#-----++##+-..-#++++++##          
                   -++#---++##++++-+++#---++###         
                      +--++##########+#++++###          
                     ++++++#############++##+           
                      ##++++++++++#####++##--           
                      +##+++++#####+++#+##              
                     .-+#####+++++++++###               
                     --++##############                 
                    .-++++++########+                   
               ###-..-+++++++#+##+++                    
              +##+-.--++++++++##++++                    
        -+#########+-+++++++++++++++                    
  --++###############+++++++###++++##                   
+++###+++###############+++++#+++######+                
#########################+++##############+             
##########################++++#############++++         
#########################++--+###############++#++-     
#########################----++#####################+   
#########################+--++########################  
##########################---########################## 
###########################-############################

Welcome to Portfolio Terminal!
Adarsh Pandit | Versatile | Entrepreneur

- CEO: A Versatile Studio.
- CO-FOUNDER & CTO: Voltsec.io, Safewings, The RD Group Of Industries.

Type 'help' to see available commands or 'sudo gui start' for GUI mode.
`;


  useEffect(() => {
    // Show welcome message on load
    const welcomeCommand: Command = {
      input: "",
      output: welcomeMessage.split("\n"),
      timestamp: new Date().toLocaleTimeString(),
      prompt: "~",
    };
    setHistory([welcomeCommand]);
    playSound("boot");
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const dict = ["projects", "skills", "experience", "contact"];

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();

    let output: string[] = [];

    if (trimmedCmd === "sudo gui start") {
      playSound("success");
      output = [
        "[sudo] password for user: ********",
        "Authentication successful.",
        "Starting GUI mode...",
        "Loading 3D interface...",
        "Redirecting to GUI...",
      ];

      const newCommand: Command = {
        input: cmd,
        output,
        timestamp,
        prompt: `[DevAdarsh@arch ${currentDirectory}]$ `, // <-- Snapshot the prompt here
      };

      setHistory((prev) => [...prev, newCommand]);

      setTimeout(() => {
        onGuiStart();
      }, 2000);
      return;
    }

    if (trimmedCmd === "clear") {
      playSound("success");
      setHistory([]);
      return;
    }

    if (trimmedCmd === "sound toggle") {
      setSoundEnabled(!soundEnabled);
      playSound("success");
      output = [`Sound effects ${!soundEnabled ? "enabled" : "disabled"}`];
    } else if (trimmedCmd === "projects gallery") {
      playSound("success");
      setShowProjectGallery(true);
      output = [
        "Opening project gallery...",
        "Loading interactive project showcase...",
      ];
    } else if (trimmedCmd === "exit") {
      playSound("success");
      window.close();
      output = ["Goodbye! Thanks for visiting my portfolio."];
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      playSound("success");
      output = commands[trimmedCmd as keyof typeof commands];
    } else if (trimmedCmd === "") {
      output = [];
    } else if (trimmedCmd.startsWith("theme ")) {
      const themeName = trimmedCmd.split(" ")[1] as keyof typeof themes;
      if (themes[themeName]) {
        changeTheme(themeName);
        output = [
          `Theme changed to: ${themes[themeName].name}`,
          "🎨 Terminal appearance updated!",
        ];
      } else {
        playSound("error");
        output = [
          `Theme '${themeName}' not found.`,
          "Type 'themes' to see available options.",
        ];
      }
    } else if (trimmedCmd === "ambient toggle") {
      toggleAmbientSound();
      output = [
        `Ambient sounds ${!ambientSoundEnabled ? "enabled" : "disabled"}`,
        "🌊 Background audio updated",
      ];
    } else if (trimmedCmd === "cd") {
      output = [`${currentDirectory}`];
    } else if (trimmedCmd.startsWith("cd ")) {
      const cd = trimmedCmd.split(" ")[1] as string;
      if (dict.includes(cd)) {
        setCurrentDirectory(cd);
        output = [`~/${cd}`];
      } else if (cd === ".." || cd === "~") {
        setCurrentDirectory("~");
        output = ["~"];
      } else {
        playSound("error");
        output = [
          `Directory not found: ${cd}`,
          `Available directories: ${dict.join(", ")}`,
        ];
      }
    } else {
      playSound("error");
      output = [
        `Command not found: ${cmd}`,
        `Type 'help' for available commands.`,
      ];
    }

    if (trimmedCmd === "ls") {
      switch (currentDirectory) {
        case "~":
          output = commands.ls;
          break;
        case "projects":
          output = [`.. projects.sh`];
          break;
        case "education":
          output = [`.. education.sh`];
          break;
        case "experience":
          output = [`.. experience.sh`];
          break;
        case "skills":
          output = [`.. skills.sh`];
          break;
        case "contact":
          output = [`.. contact.sh`];
          break;
        default:
          break;
      }
    }
    const newCommand: Command = {
      input: cmd,
      output,
      timestamp,
      prompt: `[DevAdarsh@arch ${currentDirectory}]$ `,
    };

    setHistory((prev) => [...prev, newCommand]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      playSound("enter");
      handleCommand(input);
      setInput("");
    }
  };

  const getPrompt = () => {
    return `[DevAdarsh@arch ${currentDirectory}]$ `;
  };

  const theme = themes[currentTheme];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="h-screen p-4 font-mono text-sm overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-[99%] mx-auto">
        {/* Terminal Header */}
        <div
          className={`flex items-center justify-between p-2 bg-gray-900 rounded-t-lg border ${theme.border} border-b-gray-600`}
        >
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-xs flex items-center space-x-3">
            <span>DevAdarsh@arch-linux: ~</span>
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSound("notification");
              }}
              className={`${theme.accent} hover:opacity-80 transition-colors flex items-center space-x-1`}
              title="Toggle sound effects"
            >
              {soundEnabled ? (
                <Volume2 className="w-3 h-3" />
              ) : (
                <VolumeX className="w-3 h-3" />
              )}
            </button>
            <button
              onClick={toggleAmbientSound}
              className={`${
                ambientSoundEnabled ? theme.accent : "text-gray-500"
              } hover:opacity-80 transition-colors`}
              title="Toggle ambient sounds"
            >
              🌊
            </button>
            <button
              onClick={() =>
                setCurrentTheme(
                  currentTheme === "matrix" ? "cyberpunk" : "matrix"
                )
              }
              className={`${theme.accent} hover:opacity-80 transition-colors`}
              title="Cycle themes"
            >
              <Palette className="w-3 h-3" />
            </button>
          </div>
          <div className="text-gray-400 text-xs">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Terminal Content */}
        <div
          className={`${theme.bg}/90 p-4 rounded-b-lg border-x border-b ${theme.border} h-[92vh] overflow-y-auto`}
        >
          {/* Command History */}
          {history.map((command, index) => (
            <div key={index} className="mb-2">
              {command.input && (
                <div className="flex items-center text-green-400">
                  <span className={`${theme.text}`}>{command.prompt}</span>
                  <span className="ml-1">{command.input}</span>
                </div>
              )}
              {command.output.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`${
                    line.startsWith("Command not found")
                      ? "text-red-400"
                      : line.includes("Authentication successful") ||
                        line.includes("Starting GUI")
                      ? "text-green-400"
                      : line.includes("sudo")
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } whitespace-pre-wrap`}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          <div ref={bottomRef} />

          {/* Current Input */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className={`${theme.prompt} font-semibold`}>
              {getPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length > input.length) {
                  playSound("type");
                }
                setHistoryIndex(null);
              }}
              onKeyDown={(e) => handleKeyDown(e)}
              className={`flex-1 ml-1 bg-transparent ${theme.text} outline-none caret-current font-semibold`}
              autoComplete="off"
              spellCheck="false"
            />
            <span className={`animate-pulse ${theme.text}`}>█</span>
          </form>
        </div>

        {/* Project Gallery Modal */}
        {showProjectGallery && (
          <ProjectGallery onClose={() => setShowProjectGallery(false)} />
        )}
      </div>
    </div>
  );
}
