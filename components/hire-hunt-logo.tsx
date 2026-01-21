"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function HireHuntLogo() {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center bg-[#050510] overflow-hidden perspective-1000">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-float-slow"></div>
            </div>

            {/* Particle Field (CSS only implementation for performance) */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-float-particle"
                        style={{
                            width: Math.random() * 3 + "px",
                            height: Math.random() * 3 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            animationDuration: Math.random() * 10 + 10 + "s",
                            animationDelay: Math.random() * 5 + "s",
                        }}
                    ></div>
                ))}
            </div>

            {/* 3D Text Container */}
            <div className="relative z-10 transform-style-3d animate-rotate-slow group cursor-default">
                {/* Main Text Layers for Depth */}
                <div className="relative font-display font-black text-9xl tracking-tighter">
                    {/* Back Shadow Layer */}
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-purple-900 blur-sm translate-z-[-20px] scale-95 opacity-50">
                        Hire Hunt
                    </span>

                    {/* Middle Glow Layer */}
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 blur-[2px] translate-z-[-10px] opacity-80 animate-glow">
                        Hire Hunt
                    </span>

                    {/* Front Face */}
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        Hire Hunt
                    </span>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-clip-text text-transparent pointer-events-none">
                        Hire Hunt
                    </div>
                </div>

                {/* Metallic Edges/Border Illusion */}
                <div className="absolute -inset-10 border border-white/5 rounded-full blur-xl skew-y-12 opacity-30 animate-spin-slow pointer-events-none"></div>
            </div>

            {/* Reflection */}
            <div className="absolute bottom-20 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#050510] z-20"></div>
            <div className="absolute bottom-[20%] opacity-20 transform scale-y-[-1] blur-sm pointer-events-none">
                <span className="font-display font-black text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-800">
                    Hire Hunt
                </span>
            </div>
        </div>
    )
}
