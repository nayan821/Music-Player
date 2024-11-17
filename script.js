let music_list = [
    {
        name: "Galliyan",
        image: "images/galliyan.jpg",
        music: "music/galliyan.mp3",
    },
    {
        name: "Ankeein Ye Meri",
        image: "images/ankein_ye_meri.jpg",
        music: "music/ankein_ye_meri.mp3",
    },
    {
        name: "Baaton Ko Teri",
        image: "images/baaton_ko_teri.jpg",
        music: "music/baaton_ko_teri.mp3",
    },
    {
        name: "Apna Har Pal Aise Jiyo",
        image: "images/golmaal3.jpg",
        music: "music/golmaal3.mp3",
    },
];

let track_number = document.querySelector("#track-number");
let track_image = document.querySelector("#track-image");
let track_name = document.querySelector("#track-name");
let current_time = document.querySelector("#current-time");
let seek_slider = document.querySelector("#seek-slider");
let total_duration = document.querySelector("#total-time");
let volume_slider = document.querySelector("#volume-slider");
let random_btn = document.querySelector("#random-btn");
let previous_btn = document.querySelector("#prev-btn");
let playpause_btn = document.querySelector("#playpause-btn");
let next_btn = document.querySelector("#next-btn");
let repeat_btn = document.querySelector("#repeat-btn");
let random_icon = document.querySelector("#random-icon");

let music_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let timer;
let isRamdom = false;

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(timer);
    music_track.src = music_list[track_index].music;
    track_number.textContent = `Playing ${track_index + 1} of ${music_list.length}`;
    track_image.src = music_list[track_index].image;
    track_name.textContent = music_list[track_index].name;

    timer = setInterval(setUpdate,1000);
    music_track.addEventListener("ended" ,nextTrack);
}

function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    music_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    music_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < music_list.length - 1 && isRamdom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRamdom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else if(track_index == music_list.length - 1)
    track_index = 0;
    else
    track_index++;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index <= 0 && isRamdom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }
    if(track_index == 0)
    track_index = music_list.length - 1;
    else
    track_index--;
    loadTrack(track_index);
    playTrack();
}

function repeatTrack() 
{
    loadTrack(track_index);
    playTrack();
}

function updateSeekSlider() {
    let seekto = current_time.duration * (seek_slider.value / 100);
    current_time.currentTime = seekto;
}

function setVolume() {
    music_track.volume = volume_slider.value / 100;
}

function randomTrack() {
        isRamdom ? removeRandom() : setRandom();
}

function setRandom() {
    isRamdom = true;
    random_icon.style.color = "red";
}

function removeRandom() {
    isRamdom = false;
    random_icon.style.color = "black";
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(music_track.duration)) {
        seekPosition = music_track.currentTime * (100 / music_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(music_track.currentTime / 60);
        let currentSeconds = Math.floor(music_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(music_track.duration / 60);
        let durationSeconds = Math.floor(music_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}