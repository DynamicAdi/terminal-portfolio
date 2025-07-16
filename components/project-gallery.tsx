"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Github,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Code2,
  Zap,
  Gamepad2,
  Brain,
  Server,
  Wrench,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  image: string
  githubUrl: string
  liveUrl?: string
  features: string[]
  status: "completed" | "in-progress" | "planning"
  year: string
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI/ML":
      return <Brain className="w-4 h-4" />
    case "Game Development":
      return <Gamepad2 className="w-4 h-4" />
    case "Backend/Infrastructure":
      return <Server className="w-4 h-4" />
    case "System/Tools":
      return <Wrench className="w-4 h-4" />
    case "Education/Research":
      return <Code2 className="w-4 h-4" />
    default:
      return <Zap className="w-4 h-4" />
  }
}

const getStatusIcon = (status: Project["status"]) => {
  switch (status) {
    case "completed":
      return "✅"
    case "in-progress":
      return "🚧"
    case "planning":
      return "📋"
    default:
      return "❓"
  }
}

const projects: Project[] = [
  {
    id: "ai-code-assistant",
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and suggestion system using transformer models",
    longDescription:
      "A comprehensive AI-powered development tool that provides intelligent code suggestions, bug detection, and automated refactoring. Built with Python, FastAPI, and state-of-the-art transformer models, it integrates seamlessly with popular IDEs and supports multiple programming languages.",
    technologies: ["Python", "FastAPI", "Transformers", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
    category: "AI/ML",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/ai-code-assistant",
    liveUrl: "https://ai-assistant-demo.vercel.app",
    features: [
      "Multi-language code completion",
      "Real-time bug detection",
      "Automated code refactoring",
      "IDE integration plugins",
      "Custom model training pipeline",
    ],
    status: "completed",
    year: "2024",
  },
  {
    id: "neogame-engine",
    title: "NeoGame Engine",
    description: "Cross-platform 3D game engine written in Rust with WebAssembly support",
    longDescription:
      "A modern, high-performance game engine built from the ground up in Rust. Features advanced rendering capabilities with Vulkan and WebGL backends, comprehensive physics simulation, and a powerful entity-component-system architecture. Designed for both native and web deployment.",
    technologies: ["Rust", "WebAssembly", "Vulkan", "WebGL", "WGPU", "Bevy ECS"],
    category: "Game Development",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/neogame-engine",
    features: [
      "Cross-platform rendering (Vulkan/WebGL)",
      "Advanced physics simulation",
      "Entity-Component-System architecture",
      "WebAssembly compilation",
      "Visual scripting system",
    ],
    status: "in-progress",
    year: "2024",
  },
  {
    id: "cloudsync-fs",
    title: "CloudSync Distributed File System",
    description: "High-performance distributed file system with real-time synchronization",
    longDescription:
      "A scalable distributed file system designed for modern cloud environments. Implements advanced conflict resolution algorithms, supports real-time synchronization across multiple nodes, and provides enterprise-grade security features. Built with Go microservices architecture.",
    technologies: ["Go", "gRPC", "etcd", "MinIO", "Kubernetes", "Prometheus"],
    category: "Backend/Infrastructure",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/cloudsync-fs",
    liveUrl: "https://cloudsync-demo.com",
    features: [
      "Real-time file synchronization",
      "Conflict resolution algorithms",
      "End-to-end encryption",
      "Horizontal scaling",
      "REST and gRPC APIs",
    ],
    status: "completed",
    year: "2023",
  },
  {
    id: "mlops-pipeline",
    title: "MLOps Automation Pipeline",
    description: "Complete MLOps solution for automated model training and deployment",
    longDescription:
      "An end-to-end MLOps platform that automates the entire machine learning lifecycle. From data ingestion and model training to deployment and monitoring, this system reduces deployment time by 80% and ensures consistent model performance in production environments.",
    technologies: ["Python", "MLflow", "Kubeflow", "Docker", "Kubernetes", "Apache Airflow", "TensorFlow"],
    category: "AI/ML",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/mlops-pipeline",
    features: [
      "Automated model training",
      "A/B testing framework",
      "Model versioning and rollback",
      "Performance monitoring",
      "Auto-scaling inference",
    ],
    status: "completed",
    year: "2023",
  },
  {
    id: "archrice-suite",
    title: "ArchRice Customization Suite",
    description: "Comprehensive Linux customization and theming toolkit",
    longDescription:
      "A popular open-source project providing automated setup scripts and themes for Arch Linux. Features modular configuration system, extensive theme collection, and community-driven customizations. Has gained significant traction in the Linux community with 1000+ GitHub stars.",
    technologies: ["Bash", "Python", "i3wm", "Polybar", "Rofi", "Alacritty"],
    category: "System/Tools",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/archrice-suite",
    features: [
      "Automated Arch Linux setup",
      "50+ custom themes",
      "Modular configuration system",
      "Community theme sharing",
      "Backup and restore functionality",
    ],
    status: "completed",
    year: "2022",
  },
  {
    id: "quantum-simulator",
    title: "Quantum Computing Simulator",
    description: "Educational quantum computing simulator with visual interface",
    longDescription:
      "An interactive quantum computing simulator designed for education and research. Features a visual circuit builder, real-time quantum state visualization, and implementations of popular quantum algorithms. Built to make quantum computing concepts accessible to students and developers.",
    technologies: ["Python", "NumPy", "Qiskit", "React", "D3.js", "WebGL"],
    category: "Education/Research",
    image: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com/yourusername/quantum-simulator",
    liveUrl: "https://quantum-sim.vercel.app",
    features: [
      "Visual quantum circuit builder",
      "Real-time state visualization",
      "Quantum algorithm library",
      "Educational tutorials",
      "Export to Qiskit format",
    ],
    status: "in-progress",
    year: "2024",
  },
]

interface ProjectGalleryProps {
  onClose: () => void
}

export default function ProjectGallery({ onClose }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-yellow-500"
      case "planning":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3) // Assuming 3 images per project
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null)
        } else {
          onClose()
        }
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [selectedProject, onClose])

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Project Gallery
            </h1>
            <p className="text-gray-400 mt-1">Interactive showcase of my technical projects</p>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/20 bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              className={`${
                filter === category
                  ? "bg-purple-500 text-white"
                  : "border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
              } capitalize`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="bg-black/60 border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className={`${getStatusColor(project.status)} text-white text-xs flex items-center space-x-1`}>
                    <span>{getStatusIcon(project.status)}</span>
                    <span>{project.status}</span>
                  </Badge>
                  <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{project.year}</span>
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-purple-400 group-hover:text-purple-300 transition-colors flex items-center space-x-2">
                  {getCategoryIcon(project.category)}
                  <span>{project.title}</span>
                </CardTitle>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-purple-500/50 text-purple-300">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="bg-black/80 border border-purple-500/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400 mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-300">{selectedProject.longDescription}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Gallery */}
                <div className="relative mb-6">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <Button
                      onClick={prevImage}
                      variant="outline"
                      size="sm"
                      className="bg-black/50 border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextImage}
                      variant="outline"
                      size="sm"
                      className="bg-black/50 border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-purple-500/50 text-purple-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button
                      onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
