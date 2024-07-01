window.onload = function() {
    setTimeout(function(){
        const apiUrl = 'https://fakestoreapi.com/products';
        let products = [];
        let filteredProducts = [];
        let pageSize = 9;
        let currentPage = 1;
    
        async function fetchProducts() {
            try {
                document.getElementById('loading').style.display = 'block';
                const response = await fetch(apiUrl);
                products = await response.json();
                filteredProducts = products;
                document.getElementById('loading').style.display = 'none';
                displayProducts();
                createPagination();
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('Failed to fetch products. Please try again later.');
            }
        }
    
        function displayProducts() {
            const productContainer = document.getElementById('product-list');
            productContainer.innerHTML = '';
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            const paginatedProducts = filteredProducts.slice(start, end);
            paginatedProducts.forEach(product => {
                const productElement = `
                    <div class="product-item">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-info">
                        <a href='productDetails.html' >
                            <h4>${product.title}</h4>
                        </a>
                            <p>$${product.price}</p>
                            <button class="wishlist-btn">&#9825;</button>
                        </div>
                    </div>
                `;
                productContainer.insertAdjacentHTML('beforeend', productElement);
            });
            document.getElementById('results-count').textContent = `${filteredProducts.length} Results`;
        }
    
        function createPagination() {
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';
            const totalPages = Math.ceil(filteredProducts.length / pageSize);
    
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.classList.add('page-btn');
                if (i === currentPage) {
                    button.classList.add('active');
                }
                button.addEventListener('click', () => {
                    currentPage = i;
                    displayProducts();
                    createPagination();
                });
                paginationContainer.appendChild(button);
            }
        }
    
        function applyFilters() {
            const selectedCategories = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked')).map(cb => cb.value);
            if (selectedCategories.length > 0) {
                filteredProducts = products.filter(product => selectedCategories.includes(product.category));
            } else {
                filteredProducts = products;
            }
            currentPage = 1;
            displayProducts();
            createPagination();
        }
    
        function applySorting() {
            const sortOption = document.getElementById('sort').value;
            if (sortOption === 'price-asc') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'price-desc') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            currentPage = 1;
            displayProducts();
            createPagination();
        }
    
        function applySearch() {
            const searchQuery = document.getElementById('search-bar').value.toLowerCase();
            filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchQuery));
            currentPage = 1;
            displayProducts();
            createPagination();
        }
    
        document.querySelectorAll('.filters input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', applyFilters);
        });
    
        document.getElementById('sort').addEventListener('change', applySorting);
        document.getElementById('search-bar').addEventListener('input', applySearch);
    
        fetchProducts();
    },500);
}

