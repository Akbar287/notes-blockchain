import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PenLine, FileText } from 'lucide-react';

export default function HeroSection() {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setAnimationStage(1), 2000),  // Pen appears
            setTimeout(() => setAnimationStage(2), 4000),  // Writing animation
            setTimeout(() => setAnimationStage(3), 7000),  // Note created
            setTimeout(() => setAnimationStage(4), 9000),  // Note moves to cube
            setTimeout(() => setAnimationStage(5), 11000), // Cube absorbs note
            setTimeout(() => setAnimationStage(6), 13000), // Zoom out starts
            setTimeout(() => setAnimationStage(7), 16000), // Blockchain network
            setTimeout(() => setAnimationStage(8), 19000), // Final hero content
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 dark:bg-purple-500 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 dark:bg-blue-500 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 dark:bg-pink-500 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <AnimatePresence mode="wait">
                    {/* Stage 0-7: Animation Sequence */}
                    {animationStage < 8 && (
                        <motion.div
                            key="animation"
                            className="flex flex-col items-center justify-center min-h-[60vh]"
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1 }}
                        >
                            {/* Stage 1-2: Pen Writing */}
                            {animationStage >= 1 && animationStage < 3 && (
                                <motion.div className="relative">
                                    {/* Paper/Note Background */}
                                    <motion.div
                                        className="w-64 h-80 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        {/* Writing Lines */}
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
                                                initial={{ width: 0 }}
                                                animate={animationStage >= 2 ? { width: `${60 + Math.random() * 40}%` } : {}}
                                                transition={{ delay: i * 0.3, duration: 0.6 }}
                                            />
                                        ))}
                                    </motion.div>

                                    {/* Pen - Positioned even higher for better alignment */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ x: -120, y: -120, rotate: -45 }}
                                        animate={
                                            animationStage >= 2
                                                ? {
                                                    x: [0, 150, 0, 150, 0],
                                                    y: [-120, -120, -20, -20, 20],
                                                    rotate: -45,
                                                }
                                                : { x: 0, y: -60, rotate: -45 }
                                        }
                                        transition={{ duration: 2.5 }}
                                    >
                                        <PenLine className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Stage 3-4: Book Cover Closing (rotating from behind) */}
                            {animationStage >= 3 && animationStage < 6 && (
                                <motion.div
                                    className="relative w-full flex items-center justify-center"
                                    style={{ perspective: '1200px' }}
                                >
                                    {/* Base Paper (stays in place) */}
                                    <motion.div
                                        className="absolute w-64 h-80 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 z-10"
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: animationStage >= 4 ? 0 : 1 }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
                                                style={{ width: `${60 + i * 5}%` }}
                                            />
                                        ))}
                                    </motion.div>

                                    {/* Book Cover - rotates from right, closing over the paper */}
                                    <motion.div
                                        className="absolute w-64 h-80"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transformOrigin: 'left center',
                                            zIndex: 20
                                        }}
                                        initial={{ rotateY: 170 }}
                                        animate={
                                            animationStage >= 3
                                                ? { rotateY: 0 }
                                                : { rotateY: 170 }
                                        }
                                        transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                                    >
                                        <div
                                            className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center"
                                            style={{ backfaceVisibility: 'hidden' }}
                                        >
                                            <FileText className="w-24 h-24 text-white" />
                                        </div>
                                    </motion.div>

                                    {/* 3D Cube appears after cover closes */}
                                    {animationStage >= 4 && (
                                        <motion.div
                                            className="relative ml-80"
                                            style={{ perspective: '1500px' }}
                                            initial={{ opacity: 0, scale: 0, x: -200 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                        >
                                            <motion.div
                                                style={{
                                                    transformStyle: 'preserve-3d',
                                                    width: '150px',
                                                    height: '150px'
                                                }}
                                                animate={{
                                                    rotateX: [0, 360],
                                                    rotateY: [0, 360],
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }}
                                            >
                                                {/* Front Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/60 to-blue-500/60 backdrop-blur-xl border-2 border-purple-400/70 flex items-center justify-center"
                                                    style={{ transform: 'translateZ(50px)' }}>
                                                    <FileText className="w-8 h-8 text-white" />
                                                </div>
                                                {/* Back Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/60 to-purple-500/60 backdrop-blur-xl border-2 border-blue-400/70"
                                                    style={{ transform: 'rotateY(180deg) translateZ(50px)' }} />
                                                {/* Right Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/60 to-purple-500/60 backdrop-blur-xl border-2 border-pink-400/70"
                                                    style={{ transform: 'rotateY(90deg) translateZ(50px)' }} />
                                                {/* Left Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/60 to-pink-500/60 backdrop-blur-xl border-2 border-purple-400/70"
                                                    style={{ transform: 'rotateY(-90deg) translateZ(50px)' }} />
                                                {/* Top Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/60 to-pink-500/60 backdrop-blur-xl border-2 border-blue-400/70"
                                                    style={{ transform: 'rotateX(90deg) translateZ(50px)' }} />
                                                {/* Bottom Face */}
                                                <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/60 to-blue-500/60 backdrop-blur-xl border-2 border-pink-400/70"
                                                    style={{ transform: 'rotateX(-90deg) translateZ(50px)' }} />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/* Stage 6-7: Zoom Out to 3D Blockchain Network with Hash Chains */}
                            {animationStage >= 6 && animationStage < 8 && (
                                <motion.div
                                    className="relative w-full h-[60vh]"
                                    initial={{ scale: 3 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 3, ease: 'easeOut' }}
                                    style={{ perspective: '2000px' }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* 9 Connected 3D Cubes */}
                                        {[...Array(9)].map((_, i) => {
                                            const positions = [
                                                { x: 0, y: 0 },      // Center
                                                { x: -250, y: -120 }, // Top-left
                                                { x: 250, y: -120 },  // Top-right
                                                { x: -250, y: 120 },  // Bottom-left
                                                { x: 250, y: 120 },   // Bottom-right
                                                { x: -400, y: 0 },    // Left
                                                { x: 400, y: 0 },     // Right
                                                { x: 0, y: -240 },    // Top
                                                { x: 0, y: 240 },     // Bottom
                                            ];

                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="absolute"
                                                    style={{
                                                        left: `calc(50% + ${positions[i].x}px)`,
                                                        top: `calc(50% + ${positions[i].y}px)`,
                                                        perspective: '800px'
                                                    }}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                                >
                                                    <motion.div
                                                        style={{
                                                            transformStyle: 'preserve-3d',
                                                            width: '60px',
                                                            height: '60px'
                                                        }}
                                                        animate={{
                                                            rotateX: [0, 360],
                                                            rotateY: [0, 360],
                                                            y: [0, -15, 0],
                                                        }}
                                                        transition={{
                                                            rotateX: { duration: 6, repeat: Infinity, ease: 'linear', delay: i * 0.3 },
                                                            rotateY: { duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.2 },
                                                            y: { duration: 2.5, repeat: Infinity, delay: i * 0.15 }
                                                        }}
                                                    >
                                                        {/* 3D Cube Faces */}
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 backdrop-blur-sm border border-purple-400/60 flex items-center justify-center"
                                                            style={{ transform: 'translateZ(30px)' }}>
                                                            <FileText className="w-5 h-5 text-purple-200" />
                                                        </div>
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 backdrop-blur-sm border border-blue-400/60"
                                                            style={{ transform: 'rotateY(180deg) translateZ(30px)' }} />
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/50 to-purple-500/50 backdrop-blur-sm border border-pink-400/60"
                                                            style={{ transform: 'rotateY(90deg) translateZ(30px)' }} />
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 backdrop-blur-sm border border-purple-400/60"
                                                            style={{ transform: 'rotateY(-90deg) translateZ(30px)' }} />
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/50 to-pink-500/50 backdrop-blur-sm border border-blue-400/60"
                                                            style={{ transform: 'rotateX(90deg) translateZ(30px)' }} />
                                                        <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/50 to-blue-500/50 backdrop-blur-sm border border-pink-400/60"
                                                            style={{ transform: 'rotateX(-90deg) translateZ(30px)' }} />
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}

                                        {/* Blockchain Connection Lines (Chains) */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                            <defs>
                                                <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.7)" />
                                                    <stop offset="50%" stopColor="rgba(236, 72, 153, 0.7)" />
                                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                                                </linearGradient>
                                            </defs>
                                            {[
                                                [0, 1], [0, 2], [0, 3], [0, 4],   // Center to corners
                                                [0, 5], [0, 6], [0, 7], [0, 8],   // Center to sides
                                                [1, 5], [1, 7], [2, 6], [2, 7],   // Additional connections
                                                [3, 5], [3, 8], [4, 6], [4, 8]
                                            ].map((connection, i) => {
                                                const positions = [
                                                    { x: 0, y: 0 },
                                                    { x: -250, y: -120 },
                                                    { x: 250, y: -120 },
                                                    { x: -250, y: 120 },
                                                    { x: 250, y: 120 },
                                                    { x: -400, y: 0 },
                                                    { x: 400, y: 0 },
                                                    { x: 0, y: -240 },
                                                    { x: 0, y: 240 },
                                                ];
                                                const start = positions[connection[0]];
                                                const end = positions[connection[1]];

                                                return (
                                                    <motion.line
                                                        key={i}
                                                        x1={`calc(50% + ${start.x}px)`}
                                                        y1={`calc(50% + ${start.y}px)`}
                                                        x2={`calc(50% + ${end.x}px)`}
                                                        y2={`calc(50% + ${end.y}px)`}
                                                        stroke="url(#chainGradient)"
                                                        strokeWidth="2.5"
                                                        strokeDasharray="6 3"
                                                        initial={{ pathLength: 0, opacity: 0 }}
                                                        animate={{ pathLength: 1, opacity: 0.8 }}
                                                        transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                                                    />
                                                );
                                            })}
                                        </svg>

                                        {/* Hash Labels on Main Chains */}
                                        {[
                                            { from: 0, to: 1, hash: '0xa4f2c9' },
                                            { from: 0, to: 2, hash: '0x7d3e1b' },
                                            { from: 0, to: 3, hash: '0x9f5c84' },
                                            { from: 0, to: 4, hash: '0x2b8a47' },
                                            { from: 0, to: 5, hash: '0x6c1d39' },
                                            { from: 0, to: 6, hash: '0xe8f4a2' },
                                            { from: 0, to: 7, hash: '0x3a7b56' },
                                            { from: 0, to: 8, hash: '0xd9e2c1' },
                                        ].map((chain, i) => {
                                            const positions = [
                                                { x: 0, y: 0 },
                                                { x: -250, y: -120 },
                                                { x: 250, y: -120 },
                                                { x: -250, y: 120 },
                                                { x: 250, y: 120 },
                                                { x: -400, y: 0 },
                                                { x: 400, y: 0 },
                                                { x: 0, y: -240 },
                                                { x: 0, y: 240 },
                                            ];
                                            const start = positions[chain.from];
                                            const end = positions[chain.to];
                                            const midX = (start.x + end.x) / 2;
                                            const midY = (start.y + end.y) / 2;

                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="absolute z-30"
                                                    style={{
                                                        left: `calc(50% + ${midX}px)`,
                                                        top: `calc(50% + ${midY}px)`,
                                                        transform: 'translate(-50%, -50%)',
                                                    }}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 2 + i * 0.15, duration: 0.4 }}
                                                >
                                                    <motion.div
                                                        className="px-2.5 py-1 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-lg border border-purple-400/60 shadow-lg"
                                                        animate={{
                                                            boxShadow: [
                                                                '0 0 10px rgba(168, 85, 247, 0.4)',
                                                                '0 0 20px rgba(168, 85, 247, 0.6)',
                                                                '0 0 10px rgba(168, 85, 247, 0.4)',
                                                            ],
                                                            scale: [1, 1.05, 1]
                                                        }}
                                                        transition={{
                                                            duration: 2.5,
                                                            repeat: Infinity,
                                                            delay: i * 0.2
                                                        }}
                                                    >
                                                        <span className="text-[10px] font-mono font-semibold text-purple-100">
                                                            {chain.hash}
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Stage 8: Final Hero Content */}
                    {animationStage >= 8 && (
                        <motion.div
                            key="hero-content"
                            className="text-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.h1
                                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                Catatan
                            </motion.h1>

                            <motion.p
                                className="text-2xl md:text-3xl dark:text-purple-300 text-purple-700 mb-4 font-light"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                by Blockchain
                            </motion.p>

                            <motion.p
                                className="text-lg md:text-xl dark:text-slate-300 text-slate-700 max-w-2xl mx-auto mb-12 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Simpan catatan Anda dengan aman di blockchain. Terdesentralisasi, transparan, dan tidak dapat diubah.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.button
                                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg overflow-hidden cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Mulai Sekarang</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>

                                <motion.button
                                    className="px-8 py-4 bg-white/50 backdrop-blur-lg rounded-full dark:text-white text-purple-700 font-semibold text-lg border border-white/20 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Pelajari Lebih Lanjut
                                </motion.button>
                            </motion.div>

                            {/* Scroll Indicator */}
                            <motion.div
                                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <div className="w-6 h-10 border-2 dark:border-purple-400 border-purple-600 rounded-full flex justify-center">
                                    <motion.div
                                        className="w-1 h-3 dark:bg-purple-400 bg-purple-600 rounded-full mt-2"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
