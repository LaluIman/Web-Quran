function getSurat(searchTerm = '') {
  fetch(`https://equran.id/api/surat?search=${searchTerm}`)
  .then(response => response.json())
  .then(response => {
      let cardSurat = '';
      response.forEach(surat => {
          cardSurat += `
              <div class="col-lg-4 col-md-4 col-sm-12">
                  <div class="card mb-2 cardSurat">
                      <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                          <h5 class="card-title"><b>${surat.nomor}</b> ${surat.nama_latin}</h5>
                          <h3 class="card-subtitle mb-2 text-end h1">${surat.nama}</h3>
                          <p class="card-text text-end">${surat.arti}</p>
                      </div>
                  </div>
              </div>`;
      });
      const listSurat = document.querySelector('.card-surat-list');
      listSurat.innerHTML = cardSurat;
      console.log(response);
  });
}

getSurat();

function searchSurat() {
  var searchTerm = document.getElementById('searchInput').value;
  getSurat(searchTerm);
}
