// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title NotesContract
 * @dev A smart contract for storing personal notes on the Polygon blockchain
 * @notice Each note is linked to the wallet address that created it
 */
contract NotesContract {
    
    struct Note {
        uint256 id;
        string title;
        string content;
        uint256 createdAt;
        uint256 updatedAt;
        bool deleted;
    }
    
    // Mapping from wallet address to their notes
    mapping(address => Note[]) private userNotes;
    
    // Counter for generating unique note IDs per user
    mapping(address => uint256) private noteCounter;
    
    // Events
    event NoteCreated(address indexed owner, uint256 indexed noteId, string title, uint256 createdAt);
    event NoteUpdated(address indexed owner, uint256 indexed noteId, string title, uint256 updatedAt);
    event NoteDeleted(address indexed owner, uint256 indexed noteId, uint256 deletedAt);
    
    /**
     * @dev Create a new note
     * @param _title The title of the note
     * @param _content The content of the note
     */
    function createNote(string calldata _title, string calldata _content) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_title).length <= 200, "Title too long");
        require(bytes(_content).length <= 10000, "Content too long");
        
        uint256 newNoteId = noteCounter[msg.sender];
        noteCounter[msg.sender]++;
        
        Note memory newNote = Note({
            id: newNoteId,
            title: _title,
            content: _content,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            deleted: false
        });
        
        userNotes[msg.sender].push(newNote);
        
        emit NoteCreated(msg.sender, newNoteId, _title, block.timestamp);
    }
    
    /**
     * @dev Get all non-deleted notes for the caller
     * @return An array of notes belonging to msg.sender
     */
    function getMyNotes() external view returns (Note[] memory) {
        Note[] storage allNotes = userNotes[msg.sender];
        
        // Count non-deleted notes
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allNotes.length; i++) {
            if (!allNotes[i].deleted) {
                activeCount++;
            }
        }
        
        // Create array of active notes
        Note[] memory activeNotes = new Note[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < allNotes.length; i++) {
            if (!allNotes[i].deleted) {
                activeNotes[index] = allNotes[i];
                index++;
            }
        }
        
        return activeNotes;
    }
    
    /**
     * @dev Get the total count of notes (including deleted) for the caller
     * @return The total number of notes
     */
    function getMyNotesCount() external view returns (uint256) {
        uint256 count = 0;
        Note[] storage allNotes = userNotes[msg.sender];
        for (uint256 i = 0; i < allNotes.length; i++) {
            if (!allNotes[i].deleted) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * @dev Update an existing note
     * @param _noteId The ID of the note to update
     * @param _title The new title
     * @param _content The new content
     */
    function updateNote(uint256 _noteId, string calldata _title, string calldata _content) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_title).length <= 200, "Title too long");
        require(bytes(_content).length <= 10000, "Content too long");
        
        Note[] storage notes = userNotes[msg.sender];
        bool found = false;
        
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].id == _noteId && !notes[i].deleted) {
                notes[i].title = _title;
                notes[i].content = _content;
                notes[i].updatedAt = block.timestamp;
                found = true;
                
                emit NoteUpdated(msg.sender, _noteId, _title, block.timestamp);
                break;
            }
        }
        
        require(found, "Note not found or already deleted");
    }
    
    /**
     * @dev Soft delete a note
     * @param _noteId The ID of the note to delete
     */
    function deleteNote(uint256 _noteId) external {
        Note[] storage notes = userNotes[msg.sender];
        bool found = false;
        
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].id == _noteId && !notes[i].deleted) {
                notes[i].deleted = true;
                notes[i].updatedAt = block.timestamp;
                found = true;
                
                emit NoteDeleted(msg.sender, _noteId, block.timestamp);
                break;
            }
        }
        
        require(found, "Note not found or already deleted");
    }
    
    /**
     * @dev Get a specific note by ID
     * @param _noteId The ID of the note to retrieve
     * @return The note data
     */
    function getNote(uint256 _noteId) external view returns (Note memory) {
        Note[] storage notes = userNotes[msg.sender];
        
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].id == _noteId && !notes[i].deleted) {
                return notes[i];
            }
        }
        
        revert("Note not found");
    }
}
