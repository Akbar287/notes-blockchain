import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import {
    NOTES_CONTRACT_ADDRESS,
    NOTES_CONTRACT_ABI,
    Note,
    FormattedNote,
    formatNote
} from '../contracts/notesContract';

/**
 * Hook to get all notes for the connected wallet
 */
export function useGetMyNotes() {
    const { address } = useAccount();

    const { data, isLoading, isError, error, refetch } = useReadContract({
        address: NOTES_CONTRACT_ADDRESS,
        abi: NOTES_CONTRACT_ABI,
        functionName: 'getMyNotes',
        chainId: sepolia.id,
        account: address, // Required for msg.sender in Solidity
        query: {
            enabled: !!address, // Only fetch when wallet is connected
        },
    });

    // Format notes for UI
    const notes: FormattedNote[] = data
        ? (data as Note[]).map((note, index) => formatNote(note, index))
        : [];

    return {
        notes,
        isLoading,
        isError,
        error,
        refetch,
    };
}

/**
 * Hook to get notes count for the connected wallet
 */
export function useGetMyNotesCount() {
    const { address } = useAccount();

    const { data, isLoading, isError, error, refetch } = useReadContract({
        address: NOTES_CONTRACT_ADDRESS,
        abi: NOTES_CONTRACT_ABI,
        functionName: 'getMyNotesCount',
        chainId: sepolia.id,
        account: address,
        query: {
            enabled: !!address,
        },
    });

    return {
        count: data ? Number(data) : 0,
        isLoading,
        isError,
        error,
        refetch,
    };
}

/**
 * Hook to get a specific note by ID
 */
export function useGetNote(noteId: number | undefined) {
    const { address } = useAccount();

    const { data, isLoading, isError, error, refetch } = useReadContract({
        address: NOTES_CONTRACT_ADDRESS,
        abi: NOTES_CONTRACT_ABI,
        functionName: 'getNote',
        args: noteId !== undefined ? [BigInt(noteId)] : undefined,
        chainId: sepolia.id,
        account: address,
        query: {
            enabled: !!address && noteId !== undefined,
        },
    });

    const note = data ? formatNote(data as Note, noteId || 0) : null;

    return {
        note,
        isLoading,
        isError,
        error,
        refetch,
    };
}

/**
 * Hook to create a new note
 */
export function useCreateNote() {
    const { address } = useAccount();

    const {
        writeContract,
        data: hash,
        isPending,
        isError,
        error,
        reset
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash });

    const createNote = async (title: string, content: string) => {
        writeContract({
            address: NOTES_CONTRACT_ADDRESS,
            abi: NOTES_CONTRACT_ABI,
            functionName: 'createNote',
            args: [title, content],
            chain: sepolia,
            account: address,
        });
    };

    return {
        createNote,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
        reset,
    };
}

/**
 * Hook to update an existing note
 */
export function useUpdateNote() {
    const { address } = useAccount();

    const {
        writeContract,
        data: hash,
        isPending,
        isError,
        error,
        reset
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash });

    const updateNote = async (noteId: number, title: string, content: string) => {
        writeContract({
            address: NOTES_CONTRACT_ADDRESS,
            abi: NOTES_CONTRACT_ABI,
            functionName: 'updateNote',
            args: [BigInt(noteId), title, content],
            chain: sepolia,
            account: address,
        });
    };

    return {
        updateNote,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
        reset,
    };
}

/**
 * Hook to delete a note (soft delete)
 */
export function useDeleteNote() {
    const { address } = useAccount();

    const {
        writeContract,
        data: hash,
        isPending,
        isError,
        error,
        reset
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash });

    const deleteNote = async (noteId: number) => {
        writeContract({
            address: NOTES_CONTRACT_ADDRESS,
            abi: NOTES_CONTRACT_ABI,
            functionName: 'deleteNote',
            args: [BigInt(noteId)],
            chain: sepolia,
            account: address,
        });
    };

    return {
        deleteNote,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        isError,
        error,
        reset,
    };
}
