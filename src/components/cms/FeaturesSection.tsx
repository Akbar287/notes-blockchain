import { motion } from 'framer-motion';
import { Lock, Zap, Globe, Shield } from 'lucide-react';

const features = [
    {
        icon: Lock,
        title: 'Keamanan Terjamin',
        description: 'Data Anda dienkripsi dan disimpan di blockchain yang tidak dapat diubah.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: Zap,
        title: 'Cepat & Efisien',
        description: 'Akses catatan Anda dengan cepat dari mana saja, kapan saja.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Globe,
        title: 'Terdesentralisasi',
        description: 'Tidak ada server pusat. Data Anda tersebar di seluruh jaringan.',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: Shield,
        title: 'Privasi Terlindungi',
        description: 'Hanya Anda yang memiliki akses ke catatan pribadi Anda.',
        color: 'from-orange-500 to-red-500',
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1 },
};

export default function FeaturesSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
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
                        Fitur Unggulan
                    </motion.h2>
                    <motion.p
                        className="text-xl dark:text-slate-300 text-slate-700 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Teknologi blockchain memberikan keamanan dan transparansi yang tidak tertandingi
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="group relative h-full p-8 dark:bg-white/5 bg-white/80 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-purple-200 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl`}
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Icon container with 3D effect */}
                                <motion.div
                                    className="relative mb-6"
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                                        animate={{
                                            boxShadow: [
                                                '0 10px 30px rgba(168, 85, 247, 0.3)',
                                                '0 10px 50px rgba(168, 85, 247, 0.5)',
                                                '0 10px 30px rgba(168, 85, 247, 0.3)',
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    {/* Glow effect */}
                                    <motion.div
                                        className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl`}
                                        animate={{
                                            opacity: [0, 0.5, 0],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </motion.div>

                                <motion.h3
                                    className="text-2xl font-bold dark:text-white text-slate-900 mb-4"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {feature.title}
                                </motion.h3>
                                <p className="dark:text-slate-300 text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Animated particles */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                                        style={{
                                            top: `${20 + i * 30}%`,
                                            right: `${10 + i * 10}%`,
                                        }}
                                        animate={{
                                            y: [0, -20, 0],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
