import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function DecentralizationSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
        const nodeCount = 15;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8
            });
        }

        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                nodes.forEach((otherNode, j) => {
                    if (i !== j) {
                        const dx = otherNode.x - node.x;
                        const dy = otherNode.y - node.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(otherNode.x, otherNode.y);
                            ctx.strokeStyle = `rgba(168, 85, 247, ${1 - distance / 150})`;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    }
                });

                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#a855f7';
                ctx.fill();
                ctx.strokeStyle = '#c084fc';
                ctx.lineWidth = 3;
                ctx.stroke();

                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15);
                gradient.addColorStop(0, 'rgba(168, 85, 247, 0.5)');
                gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Network visualization */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="relative dark:bg-white/5 bg-white/80 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-purple-200 p-8 overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <canvas
                                ref={canvasRef}
                                className="w-full h-96 rounded-2xl"
                            ></canvas>

                            <div className="absolute inset-0 bg-gradient-to-t dark:from-purple-900/50 from-purple-100/50 to-transparent pointer-events-none rounded-3xl"></div>
                        </motion.div>

                        {/* Floating stats */}
                        <motion.div
                            className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-2xl shadow-purple-500/50 backdrop-blur-xl"
                            initial={{ opacity: 0, y: -20, rotate: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <p className="text-white/80 text-sm mb-1">Active Nodes</p>
                            <motion.p
                                className="text-white text-3xl font-bold"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                15
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-2xl shadow-blue-500/50 backdrop-blur-xl"
                            initial={{ opacity: 0, y: 20, rotate: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                            <p className="text-white/80 text-sm mb-1">Network Health</p>
                            <motion.p
                                className="text-white text-3xl font-bold"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                100%
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r dark:from-purple-400 dark:to-pink-400 from-purple-600 to-pink-600 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Jaringan Terdesentralisasi
                        </motion.h2>
                        <motion.p
                            className="text-xl dark:text-slate-300 text-slate-700 mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Data Anda tidak tersimpan di satu server pusat, melainkan tersebar di seluruh jaringan blockchain yang aman.
                        </motion.p>

                        <div className="space-y-6">
                            {[
                                { title: 'Tidak Ada Single Point of Failure', desc: 'Jika satu node mati, data Anda tetap aman di node lainnya', color: 'bg-green-400' },
                                { title: 'Transparansi Penuh', desc: 'Setiap transaksi dapat diverifikasi oleh siapa saja di jaringan', color: 'bg-blue-400' },
                                { title: 'Konsensus Terdistribusi', desc: 'Keputusan dibuat secara kolektif oleh seluruh jaringan', color: 'bg-purple-400' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="p-6 dark:bg-white/5 bg-white/80 backdrop-blur-xl rounded-2xl border dark:border-white/10 border-purple-200"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                    whileHover={{ scale: 1.05, x: 10, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <motion.div
                                            className={`w-3 h-3 ${item.color} rounded-full`}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [1, 0.5, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <h3 className="text-xl font-semibold dark:text-white text-slate-900">{item.title}</h3>
                                    </div>
                                    <p className="dark:text-slate-400 text-slate-600 pl-7">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
