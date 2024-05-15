const playElmt = document.getElementById("Play");
const pauseElmt = document.getElementById("Pause");
const NextSongElmt = document.getElementById("NextSong");
const PrevSongElmt = document.getElementById("PrevSong");
const durationElmt = document.getElementsByClassName("duration")[0];
const MusicCardElmt = document.getElementsByClassName("MusicCard")[0];
const MusicList = [
    {
        name: "Mine",
        source: "Musics/Mine.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/1.png"
    },
    {
        name: "Beautiful",
        source: "Musics/Beautiful.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/2.jpeg"
    },
    {
        name: "Hurts So Good",
        source: "./Musics/Hurts So Good.mp3",
        artistName: "Alyssa",
        imgSource: "./MusicCovers/3.jpg"
    },
    {
        name: "Runaway",
        source: "./Musics/Runaway.mp3",
        artistName: "Aurora",
        imgSource: "./MusicCovers/4.png"
    },
];
const musicCoverElmt = document.getElementById("Image");
const rangeElmt = document.getElementById("seekBar");
const songElmt = document.getElementById("Song");
let index = 0;
function PlaySong() {
    songElmt.play();
    playElmt.style.display = "none";
    pauseElmt.style.display = "grid";
    MusicCardElmt.innerHTML = `
    <h1 class="songTitle">${MusicList[index].name}</h1>
    <h3 class="songArtist">${MusicList[index].artistName}</h3>
    <div style="background-image: url('${MusicList[index].imgSource}');" id="Image" class="Image"></div>
    `
    
    setInterval(function () {
        let currentDuration = songElmt.currentTime;
        var Second = parseInt(songElmt.currentTime % 60);
        var Minute = parseInt((songElmt.currentTime / 60) % 60);
        let percentage = (currentDuration / songElmt.duration) * 100;
        let durationMinutes = Math.floor(songElmt.duration / 60);
        let durationSeconds = Math.floor(songElmt.duration % 60);
        let formattedDuration = `${(durationMinutes).toString().padStart(1, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        formattedDuration = formattedDuration.slice(0, 4);
        rangeElmt.value = percentage;
        rangeElmt.addEventListener('change', () => {
            songElmt.currentTime = (rangeElmt.value / 100) * songElmt.duration;
        });  
        durationElmt.innerHTML = `
        <div class="currDuration">${(Minute.toString()).padStart(2, "0")}:${(Second.toString()).padStart(2, "0")}</div>
        <div class="fullDuration">0${formattedDuration}</div>` 
    }, 1000);
}

function PauseSong() {
    songElmt.pause();
    playElmt.style.display = "grid";
    pauseElmt.style.display = "none";
}

function NextSong() {
    index++;
    if (index > MusicList.length - 1) {
        index = 0;
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
    else {
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
}

function PrevSong() {
    index--;
    if (index < 0) {
        index = MusicList.length - 1;;
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
    else {
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
}
