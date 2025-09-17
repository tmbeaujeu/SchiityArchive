document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const thumbnails = document.querySelectorAll(".thumb");
  const mainImage = document.getElementById("main-image");

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.add("hidden"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.remove("hidden");
    });
  });

  // Thumbnail image switching
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImage.src = thumb.src;
    });
  });

  // --- Lightbox functionality ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  // Open lightbox when clicking the main image
  mainImage.addEventListener("click", () => {
    lightbox.classList.remove("hidden");
    lightboxImg.src = mainImage.src;
  });

  // Also open lightbox when clicking a thumbnail
  thumbnails.forEach(thumb => {
    thumb.addEventListener("dblclick", () => { // double-click on thumb to open directly
      lightbox.classList.remove("hidden");
      lightboxImg.src = thumb.src;
    });
  });

  // Close when clicking X
  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
    }
  });
});
