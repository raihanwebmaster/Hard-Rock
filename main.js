
const showList = document.querySelector('.search-result ');
// Search button function
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function(){
    document.querySelector('.single-lyrics').innerHTML= "";
    document.querySelector('.search-result ').innerHTML=""

    const searchBox = document.getElementById('search-box');
    const searchValue = searchBox.value;
    if(!searchValue){
        alert('please write song name')
    }else{
        searchSong(searchValue);
        document.getElementById('search-box').value = "";
    }
    
})

// API key search
function searchSong(searchValue){
    fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 10; i++) {
            const element = data.data[i];
            showList.innerHTML +=`
            <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-3">
            <img src="${element.album.cover_small}" >
            </div>
            <div class="col-md-6 text-center">
                <h3 class="lyrics-name">${element.title}</h3>
                <p class="author lead">Album by <span>${element.album.title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            
                <a href="#scroll" onclick="getLyrics('${element.artist.name}', '${element.title}')" class="btn btn-success">Get Lyrics</a>
            </div>
            </div>
        `
        }
       
    })
}

// Display data show function
// function showData(data){

//     let limitData = data.data.slice(0,10);
//     for (let i = 0; i < limitData.length; i++) {
//         const element = limitData[i];
//         showList.innerHTML +=`
//         <div class="single-result row align-items-center my-3 p-3">
//         <div class="col-md-3">
//         <img src="${element.album.cover_small}" >
//         </div>
//         <div class="col-md-6 text-center">
//             <h3 class="lyrics-name">${element.title}</h3>
//             <p class="author lead">Album by <span>${element.album.title}</span></p>
//         </div>
//         <div class="col-md-3 text-md-right text-center">
//             <button data-artist="${element.artist.name}" data-song="${element.title}" class="btn btn-success">Get Lyrics</button>
//         </div>
//         </div>
//     `
        
//     }
// }
//     showList.innerHTML =`
        
//     ${limitData.map(song => `
//     <div class="single-result row align-items-center my-3 p-3">
//     <div class="col-md-3">
//     <img src="${song.album.cover_small}" >
//     </div>
//     <div class="col-md-6 text-center">
//         <h3 class="lyrics-name">${song.title}</h3>
//         <p class="author lead">Album by <span>${song.album.title}</span></p>
//     </div>
//     <div class="col-md-3 text-md-right text-center">
//         <button data-artist="${song.artist.name}" data-song="${song.title}" class="btn btn-success">Get Lyrics</button>
//     </div>
//     </div>
//     `).join('')
//   }`    

// function scrollWin(){
//     window.scrollBy(0,1500)
// }
// get lyrics button function
// showList.addEventListener('click',e=>{
//     const clickElement = e.target;
//     if(clickElement.tagName === 'BUTTON'){
//         const artist = clickElement.getAttribute('data-artist');
//         const songName = clickElement.getAttribute('data-song');

//         getLyrics(artist,songName);
//     }
// })

// Lyrics show function
async function getLyrics(artist,songName){
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songName}`)
    const data = await res.json();

    let lyrics = data.lyrics;

    const lyricsShow = document.querySelector('.single-lyrics');
    if(lyrics == undefined){
        lyricsShow.innerHTML = `<P class ="lyrics-not">Sorry! song Lyrics Not Found.</p>`
        
    }else{
        lyricsShow.innerHTML = `
        <h2 class="text-success mb-4">${artist} -${songName}</h2>
        <pre  class="lyric text-white">
            ${lyrics}
        </pre>
        <button class="btn go-back">Back</button>
       `
    }
   
}