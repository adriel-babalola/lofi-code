const openFileBtn = document.getElementById('openFile');
const openFileAltBtn = document.getElementById('openFileAlt');
const audioListEl = document.getElementById('audioList');
const player = document.getElementById('player');
const nowPlaying = document.getElementById('nowPlaying');
const playPauseBtn = document.getElementById('playPause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const trackCountEl = document.getElementById('trackCount');
const albumArt = document.querySelector('.album-art');

let tracks = [];
let currentIndex = 0;
let isShuffling = false;
let isRepeating = false;

// Event listeners for both open file buttons
[openFileBtn, openFileAltBtn].forEach(btn => {
  btn.onclick = async () => {
    try {
      const fileHandles = await window.showOpenFilePicker({
        multiple: true,
        types: [{
          description: 'Audio Files',
          accept: { 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', '.flac'] }
        }]
      });

      tracks = [];
      audioListEl.innerHTML = '';

      for (const handle of fileHandles) {
        const file = await handle.getFile();
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        const url = URL.createObjectURL(blob);

        tracks.push({ 
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          url 
        });

        const trackEl = document.createElement('div');
        trackEl.innerHTML = `
          <i class="fas fa-music"></i>
          <span class="track-name">${tracks[tracks.length - 1].name}</span>
        `;
        
        // Add click event to play the track when clicked
        trackEl.addEventListener('click', () => {
          const index = Array.from(audioListEl.children).indexOf(trackEl);
          playTrack(index);
        });
        
        audioListEl.appendChild(trackEl);
      }

      if (tracks.length > 0) {
        document.querySelector('.empty-playlist')?.remove();
        playTrack(0); // Auto play first track
        updateTrackCount();
      }
    } catch (error) {
      console.error('Error opening files:', error);
      // Show empty playlist state if error occurs
      if (tracks.length === 0) {
        showEmptyPlaylist();
      }
    }
  };
});

function showEmptyPlaylist() {
  audioListEl.innerHTML = `
    <div class="empty-playlist">
      <i class="fas fa-music"></i>
      <p>No tracks loaded</p>
      
    </div>
  `;
  document.getElementById('openFileAlt').onclick = openFileBtn.onclick;
}

function playTrack(index) {
  if (tracks.length === 0 || index < 0 || index >= tracks.length) return;
  
  currentIndex = index;
  const track = tracks[currentIndex];
  player.src = track.url;
  
  // Reset progress bar
  progressBar.style.width = '0%';
  currentTimeEl.textContent = '0:00';
  
  player.play()
    .then(() => {
      nowPlaying.textContent = track.name;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      document.querySelector('.player-card').classList.add('playing');
      highlightActive();
      
      // Update duration display once metadata is loaded
      player.onloadedmetadata = () => {
        durationEl.textContent = formatTime(player.duration);
      };
    })
    .catch(error => {
      console.error('Playback failed:', error);
      // If playback fails, try the next track
      if (tracks.length > 1) {
        setTimeout(() => nextBtn.click(), 500);
      }
    });
}

function highlightActive() {
  const children = audioListEl.children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.toggle('active', i === currentIndex);
    
    // Scroll into view if active
    if (i === currentIndex) {
      children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// Play/Pause toggle
playPauseBtn.onclick = () => {
  if (tracks.length === 0) return;
  
  if (player.paused) {
    if (player.src) {
      player.play()
        .then(() => {
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
          document.querySelector('.player-card').classList.add('playing');
        });
    } else {
      // If no track is loaded but we have tracks, play the first one
      playTrack(0);
    }
  } else {
    player.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    document.querySelector('.player-card').classList.remove('playing');
  }
};

// Next track
nextBtn.onclick = () => {
  if (tracks.length === 0) return;
  
  if (isShuffling) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tracks.length);
    } while (newIndex === currentIndex && tracks.length > 1);
    currentIndex = newIndex;
  } else {
    currentIndex = (currentIndex + 1) % tracks.length;
  }
  playTrack(currentIndex);
};

// Previous track
prevBtn.onclick = () => {
  if (tracks.length === 0) return;
  
  if (player.currentTime > 3) {
    // If more than 3 seconds into song, restart it
    player.currentTime = 0;
  } else {
    // Otherwise go to previous track
    if (isShuffling) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * tracks.length);
      } while (newIndex === currentIndex && tracks.length > 1);
      currentIndex = newIndex;
    } else {
      currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    }
    playTrack(currentIndex);
  }
};

// Shuffle toggle
shuffleBtn.onclick = () => {
  isShuffling = !isShuffling;
  shuffleBtn.style.color = isShuffling ? 'var(--primary)' : 'var(--text)';
  shuffleBtn.title = isShuffling ? 'Shuffle: ON' : 'Shuffle: OFF';
};

// Repeat toggle
repeatBtn.onclick = () => {
  isRepeating = !isRepeating;
  repeatBtn.style.color = isRepeating ? 'var(--primary)' : 'var(--text)';
  repeatBtn.title = isRepeating ? 'Repeat: ON' : 'Repeat: OFF';
};

// Volume control
volumeControl.addEventListener('input', () => {
  player.volume = volumeControl.value;
  // Save volume preference
  localStorage.setItem('playerVolume', volumeControl.value);
});

// Load saved volume preference
if (localStorage.getItem('playerVolume')) {
  volumeControl.value = localStorage.getItem('playerVolume');
  player.volume = volumeControl.value;
}

// Update progress bar
player.addEventListener('timeupdate', () => {
  const currentTime = player.currentTime;
  const duration = player.duration || 1;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  
  // Update time displays
  currentTimeEl.textContent = formatTime(currentTime);
});

// Click on progress bar to seek
progressBar.parentElement.addEventListener('click', (e) => {
  if (!isNaN(player.duration)) {
    const width = progressBar.parentElement.clientWidth;
    const clickX = e.offsetX;
    const duration = player.duration;
    player.currentTime = (clickX / width) * duration;
  }
});

// Format time (seconds to MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// When song ends
player.addEventListener('ended', () => {
  if (isRepeating) {
    player.currentTime = 0;
    player.play();
  } else {
    nextBtn.click();
  }
});

// Update track count
function updateTrackCount() {
  const count = tracks.length;
  trackCountEl.textContent = `${count} ${count === 1 ? 'track' : 'tracks'}`;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseBtn.click();
  } else if (e.code === 'ArrowRight') {
    nextBtn.click();
  } else if (e.code === 'ArrowLeft') {
    prevBtn.click();
  }
});

// Initialize empty playlist state
if (tracks.length === 0) {
  showEmptyPlaylist();
}


