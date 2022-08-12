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
                <span data-artist="${song.artist.name}" data-song-title="${song.title}">GET LYRICS</span>
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
    const lyrics = data.lyrics.replace(/(\r\n|\r|n)/g, "<br>");
    result.innerHTML = `
       <div class="full-lyrics">
       <h2> ${artist}-${songTitle} </h2>
       <P>${lyrics}</p>

       </div>
       `;
}