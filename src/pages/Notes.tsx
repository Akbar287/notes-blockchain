import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Plus, Grid3X3, List, Edit3, Trash2, FileText, Calendar, Clock, Loader2, AlertCircle, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAccount, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { useGetMyNotes, useDeleteNote } from '../hooks/useNotesContract';
import { FormattedNote } from '../contracts/notesContract';

type ViewMode = 'grid' | 'list';

export default function Notes() {
    const navigate = useNavigate();
    const { address, isConnected, chainId } = useAccount();
    const { switchChain } = useSwitchChain();
    const { notes, isLoading, isError, error, refetch } = useGetMyNotes();
    const { deleteNote, isPending: isDeleting, isConfirmed: isDeleteConfirmed, reset: resetDelete } = useDeleteNote();

    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [hoveredNote, setHoveredNote] = useState<number | null>(null);
    const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
    const [selectedNote, setSelectedNote] = useState<FormattedNote | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Calculate pagination
    const totalNotes = notes.length;
    const totalPages = Math.ceil(totalNotes / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedNotes = notes.slice(startIndex, endIndex);

    // Reset to first page when page size changes or notes change
    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize, notes.length]);

    // Auto-switch to Sepolia when on wrong network
    useEffect(() => {
        if (isConnected && chainId && chainId !== sepolia.id) {
            switchChain({ chainId: sepolia.id });
        }
    }, [isConnected, chainId, switchChain]);

    // Refetch notes when network changes to Sepolia
    useEffect(() => {
        if (chainId === sepolia.id) {
            refetch();
        }
    }, [chainId, refetch]);

    // Refetch notes when delete is confirmed
    useEffect(() => {
        if (isDeleteConfirmed) {
            refetch();
            setDeletingNoteId(null);
            resetDelete();
        }
    }, [isDeleteConfirmed, refetch, resetDelete]);

    const handleDelete = (id: number) => {
        navigate(`/notes/${id}/delete`);
    };

    const handleEdit = (id: number) => {
        navigate(`/notes/${id}/edit`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: { duration: 0.3 },
        },
    } as const;

    // Not connected state
    if (!isConnected) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 from-slate-50 via-purple-50 to-slate-50">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <AlertCircle className="w-12 h-12 dark:text-purple-400 text-purple-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
                            Wallet Belum Terhubung
                        </h3>
                        <p className="dark:text-slate-400 text-slate-600 mb-6 text-center max-w-md">
                            Hubungkan wallet Anda untuk melihat dan mengelola catatan di blockchain
                        </p>
                    </motion.div>
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
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{ backgroundSize: '200% 200%' }}
                    >
                        Catatan Saya
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl dark:text-slate-300 text-slate-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Kelola dan simpan catatan Anda dengan aman di blockchain
                    </motion.p>
                </motion.div>

                {/* Action Bar */}
                <motion.div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Create Button */}
                    <Link to="/notes/create">
                        <motion.button
                            className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 overflow-hidden group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-lg opacity-0 group-hover:opacity-50"
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

                            <motion.div
                                className="relative z-10 flex items-center gap-2"
                                whileHover={{ x: [0, -3, 0] }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Plus className="w-5 h-5" />
                                </motion.div>
                                <span>Buat Catatan Baru</span>
                            </motion.div>
                        </motion.button>
                    </Link>

                    {/* View Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Page Size Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm dark:text-slate-400 text-slate-600 hidden sm:inline">Tampilkan:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="px-3 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 dark:border-white/10 dark:text-white text-slate-900 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        {/* Grid/List Toggle */}
                        <div className="flex items-center gap-2 p-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10">
                            <motion.button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'dark:text-slate-400 text-slate-600 hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-lg transition-all cursor-pointer ${viewMode === 'list'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'dark:text-slate-400 text-slate-600 hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <List className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Loader2 className="w-12 h-12 dark:text-purple-400 text-purple-600" />
                        </motion.div>
                        <p className="mt-4 dark:text-slate-400 text-slate-600">
                            Memuat catatan dari blockchain...
                        </p>
                    </motion.div>
                )}

                {/* Error State */}
                {isError && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
                            Gagal Memuat Catatan
                        </h3>
                        <p className="dark:text-slate-400 text-slate-600 mb-4 text-center max-w-md">
                            {error?.message || 'Terjadi kesalahan saat memuat catatan dari blockchain'}
                        </p>
                        <motion.button
                            onClick={() => refetch()}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Coba Lagi
                        </motion.button>
                    </motion.div>
                )}

                {/* Notes Grid/List */}
                {!isLoading && !isError && notes.length > 0 && (
                    <LayoutGroup>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode}
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                        : 'flex flex-col gap-4'
                                }
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <AnimatePresence>
                                    {paginatedNotes.map((note: FormattedNote) => (
                                        <motion.div
                                            key={note.id}
                                            layout
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className={`group relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden ${viewMode === 'list' ? 'flex items-center' : ''
                                                }`}
                                            onMouseEnter={() => setHoveredNote(note.id)}
                                            onMouseLeave={() => setHoveredNote(null)}
                                            whileHover={{
                                                y: viewMode === 'grid' ? -8 : 0,
                                                scale: viewMode === 'list' ? 1.01 : 1,
                                                borderColor: 'rgba(168, 85, 247, 0.5)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            {/* Gradient accent bar */}
                                            <motion.div
                                                className={`absolute ${viewMode === 'grid' ? 'top-0 left-0 right-0 h-1' : 'top-0 bottom-0 left-0 w-1'} bg-gradient-to-r ${note.color}`}
                                                initial={{ scaleX: viewMode === 'grid' ? 0 : 1, scaleY: viewMode === 'list' ? 0 : 1 }}
                                                animate={{ scaleX: 1, scaleY: 1 }}
                                                transition={{ delay: 0.2 }}
                                            />

                                            {/* Hover glow effect */}
                                            <motion.div
                                                className={`absolute inset-0 bg-gradient-to-br ${note.color} opacity-0`}
                                                animate={{ opacity: hoveredNote === note.id ? 0.05 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />

                                            {/* Content */}
                                            <div className={`relative z-10 ${viewMode === 'grid' ? 'p-6' : 'flex-1 p-5 flex items-center gap-6'}`}>
                                                {viewMode === 'list' && (
                                                    <motion.div
                                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center flex-shrink-0`}
                                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FileText className="w-6 h-6 text-white" />
                                                    </motion.div>
                                                )}

                                                <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                                                    {viewMode === 'grid' && (
                                                        <motion.div
                                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center mb-4`}
                                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FileText className="w-6 h-6 text-white" />
                                                        </motion.div>
                                                    )}

                                                    <h3 className={`font-bold dark:text-white text-slate-900 mb-2 ${viewMode === 'grid' ? 'text-xl' : 'text-lg'} truncate`}>
                                                        {note.title}
                                                    </h3>

                                                    <p className={`dark:text-slate-400 text-slate-600 mb-4 ${viewMode === 'grid' ? 'line-clamp-3' : 'line-clamp-1'}`}>
                                                        {note.content}
                                                    </p>

                                                    {/* Meta info */}
                                                    <div className={`flex items-center gap-4 text-xs dark:text-slate-500 text-slate-500 ${viewMode === 'list' ? 'hidden sm:flex' : ''}`}>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{note.createdAt}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{note.updatedAt}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <motion.div
                                                    className={`flex items-center gap-2 ${viewMode === 'grid'
                                                        ? 'mt-5 pt-4 border-t border-white/10'
                                                        : 'flex-shrink-0'
                                                        }`}
                                                    initial={{ opacity: viewMode === 'list' ? 1 : 0 }}
                                                    animate={{ opacity: hoveredNote === note.id || viewMode === 'list' ? 1 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.button
                                                        onClick={() => setSelectedNote(note)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors cursor-pointer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className={viewMode === 'list' ? 'hidden sm:inline' : ''}>Detail</span>
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleEdit(note.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors cursor-pointer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                        <span className={viewMode === 'list' ? 'hidden sm:inline' : ''}>Edit</span>
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleDelete(note.id)}
                                                        disabled={isDeleting && deletingNoteId === note.id}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {isDeleting && deletingNoteId === note.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                        <span className={viewMode === 'list' ? 'hidden sm:inline' : ''}>Hapus</span>
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </AnimatePresence>
                    </LayoutGroup>
                )}

                {totalPages > 1 && (
                    <motion.div
                        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Notes Info */}
                        <div className="text-sm dark:text-slate-400 text-slate-600">
                            Menampilkan {startIndex + 1}-{Math.min(endIndex, totalNotes)} dari {totalNotes} catatan
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 dark:border-white/10 dark:text-white text-slate-900 text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                            >
                                Awal
                            </motion.button>
                            <motion.button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 dark:border-white/10 dark:text-white text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <motion.button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium cursor-pointer transition-all ${currentPage === pageNum
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                                : 'bg-white/10 dark:bg-white/5 dark:text-white text-slate-900 hover:bg-white/20 dark:hover:bg-white/10'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {pageNum}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <motion.button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 dark:border-white/10 dark:text-white text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 dark:border-white/10 dark:text-white text-slate-900 text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                            >
                                Akhir
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && notes.length === 0 && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <FileText className="w-12 h-12 dark:text-purple-400 text-purple-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
                            Belum Ada Catatan
                        </h3>
                        <p className="dark:text-slate-400 text-slate-600 mb-6 text-center max-w-md">
                            Mulai buat catatan pertama Anda dan simpan dengan aman di blockchain
                        </p>
                        <Link to="/notes/create">
                            <motion.button
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Plus className="w-5 h-5" />
                                <span>Buat Catatan Pertama</span>
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Detail Dialog Modal */}
            <AnimatePresence>
                {selectedNote && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNote(null)}
                        />

                        {/* Dialog Content */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700"
                                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Gradient accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedNote.color}`} />

                                {/* Close Button */}
                                <motion.button
                                    onClick={() => setSelectedNote(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer z-10"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 dark:text-slate-400 text-slate-600" />
                                </motion.button>

                                <div className="p-6 sm:p-8">
                                    {/* Note Icon and Title */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <motion.div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedNote.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                                        >
                                            <FileText className="w-7 h-7 text-white" />
                                        </motion.div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <motion.h2
                                                className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-2"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                {selectedNote.title}
                                            </motion.h2>
                                            <motion.div
                                                className="flex flex-wrap items-center gap-4 text-sm dark:text-slate-400 text-slate-500"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{selectedNote.createdAt}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{selectedNote.updatedAt}</span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Note Content */}
                                    <motion.div
                                        className="mb-8 p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <p className="dark:text-slate-300 text-slate-700 whitespace-pre-wrap leading-relaxed text-base">
                                            {selectedNote.content}
                                        </p>
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <motion.button
                                            onClick={() => {
                                                setSelectedNote(null);
                                                handleEdit(selectedNote.id);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Edit3 className="w-5 h-5" />
                                            <span>Edit Catatan</span>
                                        </motion.button>
                                        <motion.button
                                            onClick={() => {
                                                setSelectedNote(null);
                                                handleDelete(selectedNote.id);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-xl font-semibold border border-red-500/30 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span>Hapus Catatan</span>
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
