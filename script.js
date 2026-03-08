let currentPage = 1;
const totalPages = 3;
const audio = document.getElementById('audio');

function nextPage() {
    if (currentPage < totalPages) {
        document.getElementById('page' + currentPage).classList.remove('active');
        currentPage++;
        document.getElementById('page' + currentPage).classList.add('active');
        if (currentPage === 2) {
            audio.play();
        }
    }
}

// Auto start or something, but user clicks begin to start.