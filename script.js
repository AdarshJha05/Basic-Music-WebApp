console.log("welcome to javascript")

//Initalize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));

let songs = [
    {songName:"Wafa ne bewafa", filePath:"songs/1.mp3", coverPath:"covers/wnb1.jpg"},
    {songName:"Haan Tu Hain", filePath:"songs/2.mp3", coverPath:"covers/wnb2.jpg"},
    {songName:"Raaz Aankhein Teri", filePath:"songs/3.mp3", coverPath:"covers/wnb3.jpg"},
    {songName:"Zaroorat", filePath:"songs/4.mp3", coverPath:"covers/wnb4.jpg"},
    {songName:"Sapna Jahan", filePath:"songs/5.mp3", coverPath:"covers/wnb5.jpg"},
    {songName:"Wajah Tum Ho", filePath:"songs/6.mp3", coverPath:"covers/wnb6.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName").innerText = songs[i].songName;
})

//audioElement.play(); 

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})

const makeAllPlay =()=>{
    Array.from(document.getElementsByClassName('songItemsPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemsPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused){
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        }
        else{
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity =0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        }   
    })
})

//next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >=5){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
