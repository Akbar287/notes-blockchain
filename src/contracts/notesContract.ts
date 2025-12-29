// Contract ABI and Address for NotesContract
// Update the CONTRACT_ADDRESS after deploying to Polygon

export const NOTES_CONTRACT_ADDRESS = '0xabCedE3e5b8C679802fC980F4850aE18Abac847c' as const;

export const NOTES_CONTRACT_ABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "_title", "type": "string" },
            { "internalType": "string", "name": "_content", "type": "string" }
        ],
        "name": "createNote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_noteId", "type": "uint256" }],
        "name": "deleteNote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyNotes",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "title", "type": "string" },
                    { "internalType": "string", "name": "content", "type": "string" },
                    { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
                    { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
                    { "internalType": "bool", "name": "deleted", "type": "bool" }
                ],
                "internalType": "struct NotesContract.Note[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyNotesCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_noteId", "type": "uint256" }],
        "name": "getNote",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "title", "type": "string" },
                    { "internalType": "string", "name": "content", "type": "string" },
                    { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
                    { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
                    { "internalType": "bool", "name": "deleted", "type": "bool" }
                ],
                "internalType": "struct NotesContract.Note",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_noteId", "type": "uint256" },
            { "internalType": "string", "name": "_title", "type": "string" },
            { "internalType": "string", "name": "_content", "type": "string" }
        ],
        "name": "updateNote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
            { "indexed": true, "internalType": "uint256", "name": "noteId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "title", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "createdAt", "type": "uint256" }
        ],
        "name": "NoteCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
            { "indexed": true, "internalType": "uint256", "name": "noteId", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "deletedAt", "type": "uint256" }
        ],
        "name": "NoteDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
            { "indexed": true, "internalType": "uint256", "name": "noteId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "title", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }
        ],
        "name": "NoteUpdated",
        "type": "event"
    }
] as const;

// Note type for TypeScript
export interface Note {
    id: bigint;
    title: string;
    content: string;
    createdAt: bigint;
    updatedAt: bigint;
    deleted: boolean;
}

// Formatted Note type for UI
export interface FormattedNote {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    color: string;
}

// Color palette for notes
const noteColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-rose-500 to-red-500',
    'from-violet-500 to-purple-500',
    'from-teal-500 to-green-500',
    'from-indigo-500 to-blue-500',
];

// Helper function to format blockchain note to UI format
export function formatNote(note: Note, index: number): FormattedNote {
    return {
        id: Number(note.id),
        title: note.title,
        content: note.content,
        createdAt: new Date(Number(note.createdAt) * 1000).toISOString().split('T')[0],
        updatedAt: new Date(Number(note.updatedAt) * 1000).toISOString().split('T')[0],
        color: noteColors[index % noteColors.length],
    };
}
