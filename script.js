const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path:'Ramana Aei.mp3',
        displayName: 'Guntur karam',
        cover: 'https://m.media-amazon.com/images/M/MV5BYWM0YTI2YTUtYmYwYy00M2I3LWFhMDQtNWQwN2QyYzM5YTJlXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg',
        artist: 'Mahesh',
    },
    {
        path:'Bloody-Sweet.mp3',
        displayName: 'Bloody-Sweet',
        cover: 'https://www.hindustantimes.com/ht-img/img/2023/06/22/1600x900/Leo_First_Look_1687403718085_1687403733149.jpg',
        artist: 'Vijay',
    },
    {
        path:'Naa-Ready.mp3',
        displayName: 'Naa-Ready',
        cover: 'https://imagesvs.oneindia.com/webp/img/2023/10/leo-movie-review-05-1697656956.jpg',
        artist: 'Vijay',
    },
    {
        path:'Mahiye-Jinna-Sohna.mp3',
        displayName: 'Mahiye-Jinna-Sohna',
        cover:'https://c.saavncdn.com/122/Mahiye-Jinna-Sohna-Hindi-2023-20230801104702-500x500.jpg',
        artist: 'Private',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


