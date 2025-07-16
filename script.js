let currentIndex = 0;
let images = [];

function filterImages(category) {
  const cards = document.querySelectorAll('.image-card');
  cards.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  AOS.refresh();
}

function openLightbox(imgEl) {
  images = [...document.querySelectorAll('.image-card img')]
    .filter(i => i.parentElement.style.display !== 'none');
  currentIndex = images.indexOf(imgEl);

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const downloadBtn = document.getElementById('download-btn');

  lightboxImg.src = imgEl.src;
  downloadBtn.href = imgEl.src;

  lightbox.style.display = 'flex';
}

function closeLightbox(e) {
  if (e.target.id === 'lightbox' || e.target.tagName === 'IMG') {
    document.getElementById('lightbox').style.display = 'none';
  }
}

function prevImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

function nextImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById('lightbox-img');
  const downloadBtn = document.getElementById('download-btn');
  const currentImg = images[currentIndex];

  lightboxImg.src = currentImg.src;
  downloadBtn.href = currentImg.src;
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

document.addEventListener("keydown", function (e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextImage(e);
    if (e.key === 'ArrowLeft') prevImage(e);
    if (e.key === 'Escape') lightbox.style.display = 'none';
  }
});
