// Songs Project JavaScript
// Author: Boon Burns
// Description: Interactive functionality for the Songs Project page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Songs Project page loaded successfully!');
    
    // Initialize the page
    initializePage();
});

// Initialize page functionality
function initializePage() {
    loadMusicPlayer();
    loadProductionTools();
    addInteractiveElements();
    initializeVolume();
}

// Song data array
const songs = [
    {
        id: 1,
        title: "Kuroba",
        description: "The theme Rain from my unfinished show, featured in my album Indigo",
        genre: "Electronic/Epic Orchestral",
        duration: "5:48",
        filePath: "KurobaMaster_2.wav"
    },
    {
        id: 2,
        title: "The Spectacle",
        description: "An epic reprise of the theme Savoy from my unfinished show, featuered in my album Indigo",
        genre: "Electronic/Epic Orchestral",
        duration: "2:32",
        filePath: "The Spectacle_2.wav"
    },
    {
        id: 3,
        title: "Red Sun",
        description: "An epic reprise of the theme Rouge from my unfinished show, featured in my album Indigo",
        genre: "Epic Orchestral",
        duration: "4:14",
        filePath: "RedSun_2.wav"
    },
    {
        id: 4,
        title: "Scarlet Flames",
        description: "The theme of Rouge from my unfinished show, featured in my album Indigo",
        genre: "Electronic/Epic Orchestral",
        duration: "1:49",
        filePath: "ScarletFlames_2.wav"
    },
    {
        id: 5,
        title: "Indigo",
        description: "Theme of Ko from my unfinished show, featured in my album Indigo",
        genre: "Electronic/Epic Orchestral",
        duration: "6:48",
        filePath: "Indigo_2.wav"
    }
];

// Global audio object to control playback
let currentAudio = null;
let currentlyPlayingId = null;

// Load music player content
function loadMusicPlayer() {
    const musicPlayerSection = document.getElementById('music-player');
    
    if (musicPlayerSection) {
        // Generate table HTML with volume control
        let tableHTML = `
            <!-- Volume Control -->
            <div class="row mb-4">
                <div class="col-md-6 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-volume-down me-3 text-muted"></i>
                                <div class="flex-grow-1">
                                    <input type="range" class="form-range" id="volumeSlider" min="0" max="100" value="50" onInput="updateVolume(this.value)">
                                </div>
                                <i class="fas fa-volume-up ms-3 text-muted"></i>
                                <span class="ms-2 text-muted" id="volumeDisplay">50%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Song Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Add each song to the table
        songs.forEach(song => {
            tableHTML += `
                <tr>
                    <th scope="row">${song.id}</th>
                    <td><strong>${song.title}</strong></td>
                    <td>${song.description}</td>
                    <td><span class="badge bg-secondary">${song.genre}</span></td>
                    <td>${song.duration}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="playTrack(${song.id})" title="Play ${song.title}">
                            <i class="fas fa-play"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        // Close table HTML
        tableHTML += `
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <p class="text-center text-muted">
                    <i class="fas fa-info-circle me-2"></i>
                    Click the play button to preview each track
                </p>
            </div>
        `;
        
        musicPlayerSection.innerHTML = tableHTML;
    }
}

// Volume control function
function updateVolume(value) {
    const volumePercent = parseInt(value);
    const volumeDecimal = volumePercent / 100;
    
    // Update volume display
    const volumeDisplay = document.getElementById('volumeDisplay');
    if (volumeDisplay) {
        volumeDisplay.textContent = volumePercent + '%';
    }
    
    // Update current audio volume if playing
    if (currentAudio) {
        currentAudio.volume = volumeDecimal;
    }
    
    // Store volume preference for new tracks
    window.audioVolume = volumeDecimal;
    
    // Update volume icon based on level
    updateVolumeIcon(volumePercent);
}

// Update volume icon based on volume level
function updateVolumeIcon(volumePercent) {
    const volumeDownIcon = document.querySelector('.fa-volume-down');
    const volumeUpIcon = document.querySelector('.fa-volume-up');
    
    if (volumeDownIcon && volumeUpIcon) {
        if (volumePercent === 0) {
            volumeDownIcon.className = 'fas fa-volume-mute me-3 text-muted';
            volumeUpIcon.className = 'fas fa-volume-mute ms-3 text-muted';
        } else if (volumePercent < 50) {
            volumeDownIcon.className = 'fas fa-volume-down me-3 text-muted';
            volumeUpIcon.className = 'fas fa-volume-down ms-3 text-muted';
        } else {
            volumeDownIcon.className = 'fas fa-volume-down me-3 text-muted';
            volumeUpIcon.className = 'fas fa-volume-up ms-3 text-muted';
        }
    }
}

// Initialize volume on page load
function initializeVolume() {
    window.audioVolume = 0.5; // Default to 50%
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        updateVolume(volumeSlider.value);
    }
}

// Load production tools information
function loadProductionTools() {
    const toolsSection = document.getElementById('tools-section');
    
    if (toolsSection) {
        toolsSection.innerHTML = `
            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="text-center">
                        <i class="fas fa-microphone fa-3x text-primary mb-3"></i>
                        <h5>Recording</h5>
                        <p>Home studio recording techniques and equipment</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="text-center">
                        <i class="fas fa-sliders-h fa-3x text-primary mb-3"></i>
                        <h5>Electronic/Soundtrack Music</h5>
                        <p>Electronic music production and soundtrack composition</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="text-center">
                        <i class="fas fa-compact-disc fa-3x text-primary mb-3"></i>
                        <h5>Sound Design</h5>
                        <p>Sound design techniques for music and film</p>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h6>Software & Tools:</h6>
                <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-secondary">FL Studio</span>
                    <span class="badge bg-secondary">Serum/Serum 2</span>
                    <span class="badge bg-secondary">Vital</span>
                    <span class="badge bg-secondary">Audio Imperia Libraries</span>
                    <span class="badge bg-secondary">Native Instruments Libraries</span>
                    <span class="badge bg-secondary">ProjectSAM Libraries</span>
                </div>
            </div>
        `;
    }
}

// Add interactive elements
function addInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Function for playing/pausing tracks
function playTrack(trackId) {
    const song = songs.find(s => s.id === trackId);
    if (!song) {
        console.error(`Song with ID ${trackId} not found`);
        return;
    }

    const playButton = document.querySelector(`button[onclick="playTrack(${trackId})"]`);
    
    // If the same track is currently playing, pause it
    if (currentlyPlayingId === trackId && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        updatePlayButton(playButton, false);
        currentlyPlayingId = null;
        return;
    }
    
    // Stop any currently playing track
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        // Reset previous button
        if (currentlyPlayingId) {
            const prevButton = document.querySelector(`button[onclick="playTrack(${currentlyPlayingId})"]`);
            if (prevButton) updatePlayButton(prevButton, false);
        }
    }
    
    // Create new audio object
    currentAudio = new Audio("../song_files/" + song.filePath);
    currentlyPlayingId = trackId;
    
    // Apply current volume setting
    if (window.audioVolume !== undefined) {
        currentAudio.volume = window.audioVolume;
    }
    
    // Update button to show loading state
    updatePlayButton(playButton, true, true);
    
    // Set up event listeners
    currentAudio.addEventListener('loadstart', () => {
        console.log(`Loading ${song.title}...`);
    });
    
    currentAudio.addEventListener('canplay', () => {
        updatePlayButton(playButton, true, false);
    });
    
    currentAudio.addEventListener('ended', () => {
        updatePlayButton(playButton, false);
        currentlyPlayingId = null;
        currentAudio = null;
    });
    
    currentAudio.addEventListener('error', (e) => {
        console.error(`Error loading ${song.title}:`, e);
        alert(`Could not load ${song.title}. Please check if the audio file exists at: ${song.filePath}`);
        updatePlayButton(playButton, false);
        currentlyPlayingId = null;
        currentAudio = null;
    });
    
    // Start playing
    currentAudio.play().catch(error => {
        console.error(`Error playing ${song.title}:`, error);
        alert(`Could not play ${song.title}. Error: ${error.message}`);
        updatePlayButton(playButton, false);
        currentlyPlayingId = null;
        currentAudio = null;
    });
}

// Helper function to update play button appearance
function updatePlayButton(button, isPlaying, isLoading = false) {
    if (!button) return;
    
    // If setting a button to playing state, reset all other buttons first
    if (isPlaying && !isLoading) {
        const allPlayButtons = document.querySelectorAll('button[onclick^="playTrack("]');
        allPlayButtons.forEach(otherButton => {
            if (otherButton !== button) {
                const otherIcon = otherButton.querySelector('i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-play';
                    otherButton.classList.remove('btn-primary');
                    otherButton.classList.add('btn-outline-primary');
                    otherButton.disabled = false;
                }
            }
        });
    }
    
    const icon = button.querySelector('i');
    if (isLoading) {
        icon.className = 'fas fa-spinner fa-spin';
        button.disabled = true;
    } else if (isPlaying) {
        icon.className = 'fas fa-pause';
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
        button.disabled = false;
    } else {
        icon.className = 'fas fa-play';
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
        button.disabled = false;
    }
}

// Utility function to show loading states
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    }
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        playTrack,
        initializePage
    };
}