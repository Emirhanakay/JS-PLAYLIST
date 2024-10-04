//! Htmldeki idleri erisme
const playButton = document.getElementById("play")
const prevButton = document.getElementById("prev")
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playListButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')
const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')
const currentProgress = document.getElementById('current-progress')
//! Htmldeki idleri erisme


//Sira 
let index





// Döngü
let loop = true


// sarki listesi
const songsList = [
    {
        name: "Yürüyorum",
        link: "assets/Yürüyorum Dikenlerin Üstünde.mp3",
        artist : "Selda Bagcan",
        image: "assets/Selda_Bagcan.jpeg"
    },
    {

        name : "Mevlam Birçok Dert Vermiş",
        link: "assets/Kerim Yağcı - Mevlam Birçok Dert Vermiş.mp3",
        artist: "Kerim Yağcı",
        image: "assets/kerim_yagci.jpg"
    },
    {
        name:"Ey Sevdiğim Sana Şikayetim Var",
        link: "assets/Koray Avcı - Ey Sevdiğim Sana Şikayetim Var (Akustik).mp3",
        artist:"Koray Avcı",
        image: "assets/koray_avci.jpeg"
    },
    {
        name:"Dilo Dilo Yaylalar",
        link: "assets/Zafer Dilek - Dilo Dilo Yaylalar (1976).mp3",
        artist: "Zafer Dilek",
        image: "assets/zafer_dilek_yaylalar.jpg"
    },
    {
        name :"Sarardım Ben Sarardım Akustik",
        link:" assets/cem-celebi-sarardim-ben-akustik-128-ytshorts.savetube.me.mp3",
        artist: "Cem Çelebi",
        image: "assets/cemcelebi.jpg"
    },

    {
        name: "Altin Yüzüğüm Kırıld",
        link: "assets/Altın Yüzüğüm Kırıldı.mp3",
        artist: "Grup Abdal",
        image : "assets/grupabdal.jpeg"
    },
    {

        name : "Dağlar Oy Dağlar",
        link: "assets/koray-avci-daglar-oy-daglar-akustik-128-ytshorts.savetube.me.mp3",
        artist: "Koray Avcı",
        image:"assets/koray_avci.jpeg"
    }

   
]

// Sarki atama fonksiyonu

const setSong = (arrayIndex) => {



    let {name,link,artist,image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

        // Sureyi az sonra düzenle
    

    audio.onloadeddata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add("hide")
        playAudio()

}


// Zaman formati ve ya düzenlmesi
const timeFormatter = (timeInput) =>{
    let minute  = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}



// Sarkiyi oynatma kismi


const playAudio = () =>{
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
 }
 
 //sarkiyi durdur
 const pauseAudio = () =>{
     audio.pause()
     pauseButton.classList.add("hide")
     playButton.classList.remove("hide")
 }



 //! sonraki sarki


const nextSong = () =>{
    if (loop) { //! Döngü acik ise
        if( index == (songsList.length - 1)){
            index = 0
        } else {
            index = index + 1
        }
    } else {
        //! Karistirici shuffle acikla
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
    setSong(index)
    playAudio()
}


//! Önceki sarki
const previousSong = () =>{
    pauseAudio()

    if (index > 0) {
        index = index - 1
    } else {
        index = songsList.length - 1
    }

    setSong(index)
    playAudio()

}


// Oynata tiklanildiginda
playButton.addEventListener("click",playAudio)

//Dura tiklanilidiginda
pauseButton.addEventListener("click",pauseAudio)

//! Sonrakine gec tiklanildiginda 
nextButton.addEventListener("click", nextSong)


//! Önceye tiklanirsa
prevButton.addEventListener("click",previousSong) 



//karistirici tiklanildiginda
shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove('active')
        loop = true
        // console.log('karistirma kapali')
    } else {
        shuffleButton.classList.add('active')
        loop = false
        // console.log('karistirma acik')
    }
})

//tekrar  shuffle tiklanildiginda
repeatButton.addEventListener('click',()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false;
        // console.log('tekrar kapatildi')
    } else {
        repeatButton.classList.add('active')
        loop = true;
        // console.log('tekrar acildi')
    }
})



// ilerleme cubugunda tiklanildiginda
progressBar.addEventListener('click',(event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    // console.log(coordStart)

    let coordEnd = event.clientX
    // console.log(coordEnd)

    console.log(progressBar.offsetWidth)
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    console.log(progress);

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    audio.play();
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

})



//! Oynatma listesini gönder
playListButton.addEventListener("click" ,()=>{
    playListContainer.classList.remove("hide")
    })
   
//oynatma listesini kapata tiklanildiginda
    
closeButton.addEventListener('click',()=>{
playListContainer.classList.add('hide')
})


//ekran yuklenince
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3)) * 100 + "%"
}, 1000);


//zaman guncellendiginde 

audio.addEventListener("timeupdate",()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// sarki btiginde ne yapsin 
audio.onended = () => {
    nextSong()
}


//Sarki listesini olustur

const initPlayList = () =>{
    for (const i in songsList) {
        playListSongs.innerHTML += `<li class ="playListSong"
        onclick = "setSong(${i})">

        <div class = "playList-image-container">
        <img src ="${songsList[i].image}"/>
        </div>
        <div class = "playlsit-song-details">
        <span id = "playList-song-name">
        ${songsList[i].name}
        </span>
        <span id = "playlist-song-artist-album">
        ${songsList[i].artist}
         </span>
         </div>
         </li> `
       
     
        }
    }



    window.onload = () =>{
        index = 0
        setSong(index)
        pauseAudio()
        initPlayList();
    }



























