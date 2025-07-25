"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Space_Mono } from "next/font/google"
import { Github, ExternalLink, Shield, Code, Zap, Terminal, Lock, Cpu } from 'lucide-react';
import { fullProjectList, Project } from '@/components/templates/fullProjectList';

export const dmMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
})


const ProjectCard = ({
  image = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
  title = "Advanced Network Scanner",
  description = "A sophisticated network vulnerability scanner built with Python and Nmap integration. Features real-time threat detection, automated reporting, and custom rule sets for enterprise environments.",
  tags = ["Python", "Cybersecurity", "Networking", "API"],
  builtOn = ["React", "Node.js", "MongoDB", "Docker"],
  complexity = "Advanced",
  githubUrl = "https://github.com/example/project",
  viewProjectUrl = "https://project-demo.com"
}) => {
  const getComplexityColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return 'text-white border-green-500/30 bg-green-500';
      case 'intermediate': return 'text-white border-yellow-400/30 bg-yellow-400';
      case 'advanced': return 'text-white border-red-400/30 bg-red-400';
      default: return 'text-white border-red-800/30 bg-red-800';
    }
  };

  const getComplexityIcon = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return <Shield className="w-3 h-3" />;
      case 'intermediate': return <Code className="w-3 h-3" />;
      case 'advanced': return <Cpu className="w-3 h-3" />;
      default: return <Terminal className="w-3 h-3" />;
    }
  };

  return (
    <div className="group relative bg-gray-900/90 border-2 border-green-500/50 rounded-lg transition-allduration-500 backdrop-blur-sm  hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] hover:border-green-400/80">
      {/* Cyber grid background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
              <div className={`absolute -top-3 right-3 px-2 py-1 rounded-full border text-xs ${dmMono.className} flex items-center gap-1 backdrop-blur-sm shadow-lg ${getComplexityColor(complexity)}`}>
          {getComplexityIcon(complexity)}
          {complexity}
        </div>

      {/* Animated neon pulse effect */}
      {/* <div className="absolute inset-0 rounded-lg bg-green-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div> */}
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image section with overlay */}
      {/* <div className="relative h- overflow-hidden">
        {/* <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
      </div> */}

      {/* Content section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-200 flex items-center gap-2">
          {/* <Arr className="w-5 h-5 text-green-400" /> */}
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-mono bg-gray-800/60 text-green-300 border border-green-500/30 rounded backdrop-blur-sm hover:border-green-400/60 hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Built on section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Built On:
          </h4>
          <div className="flex flex-wrap gap-2">
            {builtOn.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-800/80 text-green-400 border border-green-500/20 rounded font-mono hover:border-green-400/40 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            onClick={() => window.open(githubUrl, '_blank')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/40 hover:border-gray-500/60 text-white rounded transition-all duration-200 group/btn backdrop-blur-sm"
          >
            <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
            <span className="text-sm font-medium">GitHub</span>
          </button>
          
          <button 
            onClick={() => window.open(viewProjectUrl, '_blank')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-500/30 border border-green-500/40 hover:border-green-400/60 text-green-400 hover:text-green-300 rounded transition-all duration-200 group/btn backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
            <span className="text-sm font-medium">View Project</span>
          </button>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};


function page() {
    const router = useRouter()
  return (
    <div className='min-h-screen w-screen bg-neutral-950 flex justify-start items-center flex-col'>
        <div className="w-5/6 py-16">
        <div className="flex justify-between w-full mb-8">
            <h1 className={`text-3xl text-green-500 ${dmMono.className}`}>./ Project Gallery</h1>
            <button onClick={() => router.push("/")} className={`px-6 py-1 pb-1.5  border border-transparent rounded-full text-green-500 cursor-pointer hover:border-green-500 hover:text-gray-300 transition-all duration-500 ${dmMono.className}`}> {"<-"} Back to Terminal</button>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {fullProjectList.map((project: Project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        </div>
    </div>
  )
}

export default page