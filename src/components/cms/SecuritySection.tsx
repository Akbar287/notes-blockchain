import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SecuritySection() {
    const [activeBlock, setActiveBlock] = useState(0);
    const [blockHashes, setBlockHashes] = useState<string[]>([]);
    const [particles, setParticles] = useState<Array<{
        left: number;
        top: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        // Generate random values only on client-side
        setBlockHashes(
            Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 15))
        );
        setParticles(
            Array.from({ length: 30 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5,
            }))
        );
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50 py-24 overflow-hidden">
            {/* Animated particles */}
            <div className="absolute inset-0">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 dark:bg-blue-400 bg-blue-600 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r dark:from-blue-400 dark:to-cyan-400 from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Keamanan Blockchain
                        </motion.h2>
                        <motion.p
                            className="text-xl dark:text-slate-300 text-slate-700 mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Setiap catatan Anda dilindungi oleh teknologi blockchain yang telah terbukti aman dan tidak dapat diubah.
                        </motion.p>

                        <div className="space-y-6">
                            {[
                                { num: 1, title: 'Enkripsi End-to-End', desc: 'Data Anda dienkripsi sebelum disimpan di blockchain', color: 'from-blue-500 to-cyan-500' },
                                { num: 2, title: 'Immutable Storage', desc: 'Sekali tersimpan, data tidak dapat diubah atau dihapus', color: 'from-purple-500 to-pink-500' },
                                { num: 3, title: 'Verifikasi Kriptografi', desc: 'Setiap transaksi diverifikasi dengan algoritma kriptografi', color: 'from-green-500 to-emerald-500' },
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-start gap-4 group"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.div
                                        className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <span className="text-white font-bold text-xl">{step.num}</span>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-semibold dark:text-white text-slate-900 mb-2">{step.title}</h3>
                                        <p className="dark:text-slate-400 text-slate-600">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side - Blockchain visualization */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col gap-4">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`relative p-6 bg-white/5 dark:bg-white/5 bg-white/80 backdrop-blur-xl rounded-2xl border transition-all duration-500`}
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, x: -10 }}
                                    onHoverStart={() => setActiveBlock(i)}
                                    animate={{
                                        borderColor: activeBlock === i ? 'rgb(96, 165, 250)' : 'rgba(255, 255, 255, 0.1)',
                                        boxShadow: activeBlock === i ? '0 20px 60px rgba(96, 165, 250, 0.5)' : '0 0 0 rgba(0, 0, 0, 0)',
                                    }}
                                >
                                    {/* Block header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <motion.span
                                            className="dark:text-blue-400 text-blue-600 font-mono text-sm"
                                            animate={{ opacity: activeBlock === i ? 1 : 0.6 }}
                                        >
                                            Block #{i + 1}
                                        </motion.span>
                                        <motion.div
                                            className="w-2 h-2 bg-green-400 rounded-full"
                                            animate={{
                                                scale: activeBlock === i ? [1, 1.5, 1] : 1,
                                                opacity: [1, 0.5, 1],
                                            }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    </div>

                                    {/* Block content */}
                                    <div className="space-y-2">
                                        <motion.div
                                            className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"
                                            style={{ width: '75%' }}
                                            animate={{
                                                width: activeBlock === i ? '85%' : '75%',
                                            }}
                                        />
                                        <motion.div
                                            className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full"
                                            style={{ width: '50%' }}
                                            animate={{
                                                width: activeBlock === i ? '60%' : '50%',
                                            }}
                                        />
                                    </div>

                                    {/* Hash */}
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-xs dark:text-slate-500 text-slate-600 font-mono">
                                            Hash: {blockHashes[i]}...
                                        </p>
                                    </div>

                                    {/* Connection line to next block */}
                                    {i < 4 && (
                                        <motion.div
                                            className="absolute left-1/2 -bottom-4 w-0.5 h-4 bg-gradient-to-b from-blue-400 to-transparent transform -translate-x-1/2"
                                            animate={{
                                                height: activeBlock === i ? 6 : 4,
                                                opacity: activeBlock === i ? 1 : 0.5,
                                            }}
                                        />
                                    )}

                                    {/* Morphing glow effect */}
                                    {activeBlock === i && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Connecting lines animation */}
                        <motion.div
                            className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 transform -translate-x-1/2 -z-10 blur-sm"
                            animate={{
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
