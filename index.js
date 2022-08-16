let song_name = document.getElementById('song');
let submit = document.getElementById('search-song');
let result = document.getElementById('display');
const api = 'https://api.lyrics.ovh';

// function for seaching
submit.addEventListener('click', e => {
    e.preventDefault();
    submitValue = song_name.value.trim();
    if (!submitValue) {
        alert("There is nothing to search");
    }
    else {
        searchSong(submitValue);
    }
});

const searchSong = async (submitValue) => {
    const data = await fetch(`${api}/suggest/${submitValue}`);
    const realData = await data.json();
    showData(realData);
}

const showData = (realData) => {
    result.innerHTML = `
    <ul class="song-list">
          ${realData.data.map(song =>
        `<li>
                <div>
                    <img src=  "${song.artist.picture}" alt="${song.artist.name}"/>
                    <strong>${song.artist.name}</strong>
                </div>
                <span data-artist="${song.artist.name}" data-song-title="${song.title}" target="_blank">GET LYRICS</span>
            </li>
            `).join('')}
      
    </ul>
    `;
}
result.addEventListener('click', e => {
    const clickElement = e.target;
    if (clickElement.tagName == 'SPAN') {
        const artist = clickElement.getAttribute('data-artist');
        const songTitle = clickElement.getAttribute('data-song-title');
        getLyrics(artist, songTitle);
    }
});

const getLyrics = async (artist, songTitle) => {
    const res = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
    result.innerHTML = `
       <div class="full-lyrics">
       <h2> ${artist}-${songTitle} </h2>
       <P>${lyrics}</p>

       </div>
       `;
}

let box_remove = document.getElementById('box-id');
let start_again = document.getElementById('start-again');
let loading = document.getElementById('show-load');
submit.addEventListener('click', removeBox=()=>{
         song_name.style.display = 'none';
         box_remove.style.height = '16vh';
         box_remove.style.margin='10px auto';
         pictures.style.display='none';
         submit.style.display= 'none';
         start_again.innerHTML = `
         <button class="btn-s1" id="search-song" target="blank" onclick="fun()">Back to Home</button>
         `;
         setTimeout(() => {
            loading.innerHTML = `
            <img  id="loading-icon"src="https://icons8.com/vue-static/landings/animated-icons-new/icons/windows-10/circles-menu-2/circles-menu-2_128.gif">`;
 
         }, 200);
         setTimeout(() => {
            loading.style.display = 'none';
         }, 2000);
         
        

});

function fun(){
    window.location.reload();
}
let pictures = document.getElementById('change-img');
const img_collection = ['img1.webp','img2.webp','img3.jpg','img4.webp','img5.webp','img6.webp','img7.webp','img8.webp','img9.webp','img10.webp'];
setInterval(() => {
    
    let ranNum = Math.floor(Math.random()*10);
    pictures.src = img_collection[ranNum];
}, 2000);