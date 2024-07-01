document.addEventListener("DOMContentLoaded", function () {
  const elementsToLoad = {
    "#navbar": "navbar.html",
    "#banner": "banner.html",
    "#productList": "productlist.html",
    "#footer": "footer.html",
  };

  for (const [selector, url] of Object.entries(elementsToLoad)) {
    loadHTML(selector, url);
  }
});

function loadHTML(selector, url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
}

function toggleMenu() {
    const navList = document.querySelector('.navlist');
    navList.classList.toggle('active');
}