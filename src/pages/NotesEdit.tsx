import { motion } from 'framer-motion';
import { ArrowLeft, Save, FileText, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useGetNote, useUpdateNote } from '../hooks/useNotesContract';

// Helper function to format blockchain errors into user-friendly messages
function formatErrorMessage(error: Error | null): string {
    if (!error) return 'Terjadi kesalahan saat menyimpan ke blockchain';

    const message = error.message.toLowerCase();

    if (message.includes('user rejected') || message.includes('user denied')) {
        return 'Transaksi dibatalkan oleh pengguna';
    }

    if (message.includes('insufficient funds')) {
        return 'Saldo ETH tidak cukup untuk biaya gas';
    }

    if (message.includes('network') || message.includes('disconnected')) {
        return 'Koneksi jaringan terputus. Silakan coba lagi';
    }

    if (message.includes('execution reverted')) {
        return 'Transaksi gagal dieksekusi di smart contract';
    }

    return 'Terjadi kesalahan. Silakan coba lagi';
}

// Validation schema
const noteSchema = yup.object({
    title: yup
        .string()
        .required('Judul catatan wajib diisi')
        .min(3, 'Judul minimal 3 karakter')
        .max(100, 'Judul maksimal 100 karakter'),
    content: yup
        .string()
        .required('Konten catatan wajib diisi')
        .min(10, 'Konten minimal 10 karakter')
        .max(5000, 'Konten maksimal 5000 karakter'),
}).required();

type NoteFormData = {
    title: string;
    content: string;
};

export default function NotesEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const noteId = id ? parseInt(id) : undefined;

    const { chainId } = useAccount();
    const { switchChain } = useSwitchChain();

    // Track if form has been initialized to prevent re-initialization
    const formInitialized = useRef(false);

    const { note, isLoading: isLoadingNote, isError: isNoteError } = useGetNote(noteId);
    const {
        updateNote,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
        reset
    } = useUpdateNote();

    const form = useForm<NoteFormData>({
        resolver: yupResolver(noteSchema) as any,
        defaultValues: {
            title: '',
            content: '',
        },
        mode: 'onChange',
    });

    // Auto-switch to Sepolia when on wrong network (only once)
    useEffect(() => {
        if (chainId && chainId !== sepolia.id) {
            switchChain({ chainId: sepolia.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId]);

    // Pre-populate form with existing note data (only once when note loads)
    useEffect(() => {
        if (note && !formInitialized.current) {
            form.reset({
                title: note.title,
                content: note.content,
            });
            formInitialized.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note?.id, note?.title, note?.content]);

    // Navigate back after successful update
    useEffect(() => {
        if (isConfirmed) {
            const timer = setTimeout(() => {
                navigate('/notes');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmed, navigate]);

    const onSubmit = async (data: NoteFormData) => {
        if (noteId !== undefined) {
            await updateNote(noteId, data.title, data.content);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    } as const;

    const isSubmitting = isPending || isConfirming;

    // Loading state
    if (isLoadingNote) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50">
                <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <Loader2 className="w-12 h-12 dark:text-purple-400 text-purple-600" />
                    </motion.div>
                    <p className="mt-4 dark:text-slate-400 text-slate-600">
                        Memuat catatan dari blockchain...
                    </p>
                </div>
            </div>
        );
    }

    // Error state or note not found
    if (isNoteError || !note) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50">
                <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
                        Catatan Tidak Ditemukan
                    </h3>
                    <p className="dark:text-slate-400 text-slate-600 mb-6">
                        Catatan dengan ID tersebut tidak ditemukan atau sudah dihapus.
                    </p>
                    <motion.button
                        onClick={() => navigate('/notes')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Kembali ke Catatan
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50">
            {/* Animated background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [-100, 100, -100],
                        y: [-50, 50, -50],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <motion.div
                className="max-w-3xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate('/notes')}
                    className="flex items-center gap-2 mb-8 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ x: -5 }}
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Kembali ke Catatan</span>
                </motion.button>

                {/* Header Section */}
                <motion.div className="mb-10" variants={itemVariants}>
                    <motion.div
                        className="flex items-center gap-4 mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FileText className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                Edit Catatan
                            </motion.h1>
                        </div>
                    </motion.div>
                    <motion.p
                        className="text-lg dark:text-slate-300 text-slate-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Perbarui catatan Anda dengan aman di blockchain
                    </motion.p>
                </motion.div>

                {/* Transaction Status Banner */}
                {(isPending || isConfirming || isConfirmed || isError) && (
                    <motion.div
                        className={`mb-6 p-4 rounded-2xl border ${isConfirmed
                            ? 'bg-green-500/10 border-green-500/30'
                            : isError
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-blue-500/10 border-blue-500/30'
                            }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3">
                            {isConfirmed ? (
                                <>
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <div>
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            Catatan Berhasil Diperbarui!
                                        </p>
                                        <p className="text-sm text-green-600/80 dark:text-green-400/80">
                                            Mengalihkan ke halaman catatan...
                                        </p>
                                    </div>
                                </>
                            ) : isError ? (
                                <>
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                    <div>
                                        <p className="font-semibold text-red-600 dark:text-red-400">
                                            Gagal Memperbarui Catatan
                                        </p>
                                        <p className="text-sm text-red-600/80 dark:text-red-400/80">
                                            {formatErrorMessage(error)}
                                        </p>
                                    </div>
                                </>
                            ) : isPending ? (
                                <>
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    <div>
                                        <p className="font-semibold text-blue-600 dark:text-blue-400">
                                            Menunggu Konfirmasi Wallet
                                        </p>
                                        <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                                            Silakan konfirmasi transaksi di wallet Anda
                                        </p>
                                    </div>
                                </>
                            ) : isConfirming ? (
                                <>
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    <div>
                                        <p className="font-semibold text-blue-600 dark:text-blue-400">
                                            Menyimpan ke Blockchain
                                        </p>
                                        <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                                            Transaksi sedang dikonfirmasi...
                                            {hash && (
                                                <a
                                                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline ml-1"
                                                >
                                                    Lihat di Etherscan
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </motion.div>
                )}

                {/* Form Card */}
                <motion.div
                    className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-2xl"
                    variants={itemVariants}
                >
                    {/* Gradient accent bar */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    />

                    {/* Animated sparkle */}
                    <motion.div
                        className="absolute top-6 right-6"
                        animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Sparkles className="w-6 h-6 text-blue-400" />
                    </motion.div>

                    <div className="p-6 sm:p-8 md:p-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {/* Title Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-semibold dark:text-white text-slate-900">
                                                    Judul Catatan
                                                </FormLabel>
                                                <FormControl>
                                                    <motion.div
                                                        whileFocus={{ scale: 1.01 }}
                                                    >
                                                        <Input
                                                            placeholder="Masukkan judul catatan..."
                                                            className="h-12 text-base"
                                                            disabled={isSubmitting || isConfirmed}
                                                            {...field}
                                                        />
                                                    </motion.div>
                                                </FormControl>
                                                <FormDescription>
                                                    Berikan judul yang jelas dan deskriptif untuk catatan Anda
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Content Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-semibold dark:text-white text-slate-900">
                                                    Konten Catatan
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tulis konten catatan Anda di sini..."
                                                        className="min-h-[200px] text-base"
                                                        disabled={isSubmitting || isConfirmed}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Perubahan akan disimpan secara permanen di blockchain
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Character Counter */}
                                <motion.div
                                    className="flex justify-end text-sm text-slate-500 dark:text-slate-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <span className={form.watch('content')?.length > 4500 ? 'text-orange-500' : ''}>
                                        {form.watch('content')?.length || 0}
                                    </span>
                                    <span>/5000 karakter</span>
                                </motion.div>

                                {/* Action Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <motion.button
                                        type="button"
                                        onClick={() => navigate('/notes')}
                                        disabled={isSubmitting}
                                        className="flex-1 px-6 py-3.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:bg-white/20 dark:hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Batal
                                    </motion.button>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting || isConfirmed}
                                        className="relative flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 overflow-hidden group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: isSubmitting || isConfirmed ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting || isConfirmed ? 1 : 0.98 }}
                                    >
                                        {/* Glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-lg opacity-0 group-hover:opacity-50"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        {/* Shine effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.6 }}
                                        />

                                        <div className="relative z-10 flex items-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>{isPending ? 'Menunggu Wallet...' : 'Menyimpan...'}</span>
                                                </>
                                            ) : isConfirmed ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span>Tersimpan!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    <span>Simpan Perubahan</span>
                                                </>
                                            )}
                                        </div>
                                    </motion.button>
                                </motion.div>

                                {/* Retry button on error */}
                                {isError && (
                                    <motion.div
                                        className="flex justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={() => reset()}
                                            className="text-purple-500 hover:text-purple-400 font-medium cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Coba Lagi
                                        </motion.button>
                                    </motion.div>
                                )}
                            </form>
                        </Form>
                    </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20"
                    variants={itemVariants}
                >
                    <div className="flex items-start gap-4">
                        <motion.div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                            <h3 className="font-semibold dark:text-white text-slate-900 mb-1">
                                Perubahan Tersimpan di Blockchain
                            </h3>
                            <p className="text-sm dark:text-slate-400 text-slate-600">
                                Setelah disimpan, perubahan catatan Anda akan tersimpan secara permanen
                                di jaringan Ethereum. Transaksi membutuhkan biaya gas dalam ETH.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
