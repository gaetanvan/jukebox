let musicDiv = document.querySelectorAll('.musicDiv')
console.log(musicDiv)

function runMusic(musicId){
    if (!musicDiv[musicId-1].classList.contains('running')){
        musicDiv[musicId-1].classList.add('running')
        document.getElementById('music' + musicId).play()
    }
    else {
        musicDiv[musicId-1].classList.remove('running')
        document.getElementById('music' + musicId).pause()
    }
}