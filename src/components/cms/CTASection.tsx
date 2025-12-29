import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CTASection() {
    const [stars, setStars] = useState<Array<{
        left: number;
        top: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        // Generate random star positions only on client-side
        setStars(
            Array.from({ length: 50 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 3,
            }))
        );
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50 py-24 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    style={{ backgroundSize: '400% 400%' }}
                />

                {/* Twinkling stars */}
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 dark:bg-white bg-purple-400 rounded-full"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Main CTA Card */}
                <motion.div
                    className="relative p-12 dark:bg-white/5 bg-white/90 backdrop-blur-2xl rounded-[3rem] border dark:border-white/10 border-purple-200 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: 'spring' }}
                >
                    {/* Gradient border effect */}
                    <motion.div
                        className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-xl"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="relative">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30 mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-2 h-2 bg-green-400 rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [1, 0.5, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="dark:text-purple-300 text-purple-700 text-sm font-medium">Siap Digunakan Sekarang</span>
                        </motion.div>

                        <motion.h2
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Mulai Simpan Catatan Anda dengan Aman
                        </motion.h2>

                        <motion.p
                            className="text-xl md:text-2xl dark:text-slate-300 text-slate-700 mb-12 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            Bergabunglah dengan ribuan pengguna yang telah mempercayai blockchain untuk menyimpan catatan mereka
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.button
                                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full text-white font-bold text-lg overflow-hidden min-w-[250px]"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span className="relative z-10 flex items-center justify-center gap-3 cursor-pointer">
                                    Mulai Gratis
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Animated border */}
                                <motion.div
                                    className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-sm -z-10"
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                />
                            </motion.button>

                            <motion.button
                                className="px-10 py-5 dark:bg-white/10 bg-purple-100 backdrop-blur-lg rounded-full dark:text-white text-purple-700 font-bold text-lg border-2 dark:border-white/20 border-purple-300 min-w-[250px] cursor-pointer "
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Lihat Demo
                            </motion.button>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            className="mt-12 pt-8 border-t dark:border-white/10 border-purple-200"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 }}
                        >
                            <div className="flex flex-wrap justify-center items-center gap-8 dark:text-slate-400 text-slate-600">
                                {[
                                    { text: '100% Aman', color: 'from-green-500 to-emerald-500' },
                                    { text: 'Gratis Selamanya', color: 'from-blue-500 to-cyan-500' },
                                    { text: 'Tanpa Kartu Kredit', color: 'from-purple-500 to-pink-500' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.2 + i * 0.1 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <motion.div
                                            className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Check className="w-5 h-5 text-white" />
                                        </motion.div>
                                        <span>{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer text */}
                <motion.p
                    className="mt-12 dark:text-slate-200 text-slate-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4 }}
                >
                    Dengan memulai, Anda menyetujui{' '}
                    <motion.a
                        href="#"
                        className="dark:text-purple-400 text-purple-600 hover:text-purple-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                    >
                        Syarat & Ketentuan
                    </motion.a>{' '}
                    dan{' '}
                    <motion.a
                        href="#"
                        className="dark:text-purple-400 text-purple-600 hover:text-purple-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                    >
                        Kebijakan Privasi
                    </motion.a>
                </motion.p>
            </div>
        </section>
    );
}
