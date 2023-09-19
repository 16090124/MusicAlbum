//intailize the variable
let songIndex= 0;     
let audioElement = new Audio('1.mp3');          
let masterPlay= document.getElementById('masterPlay')
let myProgressBar= document.getElementById('myProgressBar')
let gif= document.getElementById('gif')
let masterSongName= document.getElementById('masterSongName')
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs= [
   { songName:"Music Ringtone",filePath:"1.mp3",coverPath:"1.jpg"},
    {songName:"Believer,Imagine Dragons",filePath:"2.mp3",coverPath:"2.jpg"},
    {songName:"Unstoppable",filePath:"3.mp3",coverPath:"3.jpg"},     
    {songName:"Despasito Ringtone",filePath:"4.mp3", coverPath:"4.jpg"},
   { songName:"Satisfya, Imran Khan",filePath:"5.mp3",coverPath:"5.jpg"},
   { songName:"Ringtone",filePath:"6.mp3",coverPath:"6.jpg"},
   { songName:"Musical Ringtone",filePath:"7.mp3",coverPath:"7.jpg"},
    {songName:"Ram Siya Ram",filePath:"8.mp3",coverPath:"8.jpg"},
   { songName:"Tu Mile",filePath:"9.mp3",coverPath:"9.jpg"},
   { songName:"Zinda Banda",filePath:"10.mp3",coverPath:"10.jpg"},
]

songItems.forEach((element,i)=>{
   // console.log(element,i)
    element.getElementsByTagName('img')[0].src =songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

// handle play& pause button
masterPlay.addEventListener('click', ()=>{
    if( audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity=1;
    }else{        
            audioElement.pause()
            masterPlay.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle')
            gif.style.opacity=0;     
    }
})

let currentStart=document.getElementById('currentStart');
let currentEnd= document.getElementById('currentEnd');
// listen to event
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    let music_curr= audioElement.currentTime;
    let music_dur= audioElement.duration;

    let minCurr = Math.floor(music_curr / 60);
    let secCurr = Math.floor(music_curr % 60);

    if (secCurr < 10) {
        secCurr = `0${secCurr}`;
    }
    currentStart.innerHTML = `${minCurr}:${secCurr}`;

    let minDur = Math.floor(music_dur / 60);
    let secDur = Math.floor(music_dur % 60);

    if (secDur < 10) {
        secDur = `0${secDur}`;
    }
    currentEnd.innerHTML = `${minDur}:${secDur}`;

});


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e);
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src=`${songIndex+1}.mp3`
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=0;
    }else{
    songIndex += 1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
    songIndex -= 1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
})