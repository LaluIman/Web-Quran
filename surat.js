function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e){
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');
console.log(nomorsurat);



function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response =>{
        // title
        const titleSurat= document.querySelector('#title-surat');
        titleSurat.textContent= `surat ${response.nama_latin}`

        // judul surat
        const judulSurat = document.querySelector('.judul-surat')
        const cardJudulSurat = `
        <b>${response.nama_latin}-${response.nama}</b>
        <p>jumlah ayat: ${response.jumlah_ayat} <br><b>${response.arti}</b></p>
        <button class="btn btn-primary audio-button-play"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
              </svg>
         <b>Dengar</b></button>
         <button class="btn btn-danger audio-button-pause hidden-button"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
            </svg>
         <b>Stop</b></button>
         <audio id="audio-tag"src="${response.audio}"></audio>`
         


        judulSurat.innerHTML = cardJudulSurat;

        const surat =response.ayat;
        let isiSurat = '';
        surat.forEach(s =>{
            isiSurat+=` <div class="card mb-4">
            <div class="card-body ">
             <p>${s.nomor}</p>
             <h3 class="text-end">${s.ar}</h3>
             <p>${s.tr}</p>
             <p>${s.idn}</p>
               </div>
         </div>`;
        });
        const cardIsisurat = document.querySelector('.card-isi-surat');
        cardIsisurat.innerHTML=isiSurat
        
        // play and pause
        const buttonPlay = document.querySelector('.audio-button-play')
        const buttonPause = document.querySelector('.audio-button-pause')
        const audioSurat = document.querySelector('#audio-tag')

        buttonPlay.addEventListener('click', function(){
            audioSurat.play();
    
        });
        buttonPause.addEventListener('click', function(){
            audioSurat.pause();
    
        });
    });
}

getSurat();