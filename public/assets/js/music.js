let musicDiv = document.querySelectorAll('.musicDiv')
let musicVolume = document.querySelector('.volumeSlider')
let musicPlaying = document.createElement('audio')
let musicData = document.querySelector('.swiper-wrapper')
let length = document.querySelector('.length')
const progressBar = document.querySelector(".progress");
let currentTime = document.querySelector('.current')
let title = document.querySelector('.title')
let artist = document.querySelector('.artist')

let music = JSON.parse(musicData.dataset.music)
let lastMusic;
let updateTimer;
let isPlaying = false

function runMusic(musicId){
    console.log(musicId - 1)
    if(musicId - 1 === lastMusic){
        lastMusic = musicId - 1
    }
    else {
        musicPlaying.src = "http://127.0.0.1:8000/assets/music/" + music[musicId - 1].link;
        musicPlaying.load();
        lastMusic = musicId - 1
        updateTimer = setInterval(setUpdate, 1000);
        artist.textContent = document.querySelector('.type' + musicId).textContent
        title.textContent = document.querySelector('.name' + musicId).textContent
    }
}
function setVolume(){
    musicPlaying.volume = musicVolume.value / 100
}
function playpauseTrack(musicId){
    if(!(musicId - 1 === lastMusic)){
        isPlaying = false
    }
    isPlaying ? pauseTrack(musicId) : playTrack(musicId);
}
function pauseTrack(musicId){
    musicDiv[musicId-1].classList.remove('running')
    musicPlaying.pause()
    isPlaying = false

}
function playTrack(musicId){
    if(!(musicId - 1 === lastMusic)){
        runMusic(musicId)
    }
    musicDiv[musicId-1].classList.add('running')
    musicPlaying.play()
    isPlaying = true

}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(musicPlaying.duration)){
        seekPosition = musicPlaying.currentTime * (100 / musicPlaying.duration);
        musicPlaying.value = seekPosition;
        progressBar.style.width = musicPlaying.currentTime / musicPlaying.duration * 100 + "%";

        let currentMinutes = Math.floor(musicPlaying.currentTime / 60);
        let currentSeconds = Math.floor(musicPlaying.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(musicPlaying.duration / 60);
        let durationSeconds = Math.floor(musicPlaying.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        length.textContent = durationMinutes + ":" + durationSeconds;
    }
}