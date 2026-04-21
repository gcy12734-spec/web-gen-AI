document.addEventListener('DOMContentLoaded', () => {
    // 1. Static Mock Data Array (Simulating a Database)
    const mockCars = [
        { id: 1, model: "Toyota Camry", year: 2021, color: "Silver", location: "Beijing", price: 145000, image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=800&q=80" },
        { id: 2, model: "Honda Civic", year: 2019, color: "White", location: "Shanghai", price: 112000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" },
        { id: 3, model: "BMW 3 Series", year: 2022, color: "Black", location: "Guangzhou", price: 280000, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80" },
        { id: 4, model: "Audi A4", year: 2020, color: "Blue", location: "Shenzhen", price: 210000, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80" },
        { id: 5, model: "Tesla Model 3", year: 2023, color: "Red", location: "Hangzhou", price: 235000, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80" },
        { id: 6, model: "Volkswagen Golf", year: 2018, color: "Grey", location: "Chengdu", price: 85000, image: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&w=800&q=80" }
    ];

    const carGrid = document.getElementById('carGrid');
    const noResults = document.getElementById('noResults');
    const searchForm = document.getElementById('searchForm');
    const resetBtn = document.getElementById('resetBtn');

    // Modal Elements
    const modal = document.getElementById('carModal');
    const closeModal = document.getElementById('closeModal');
    
    // 2. Function to Render Car Cards
    function renderCars(carsToRender) {
        carGrid.innerHTML = ''; // Clear current grid

        if (carsToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        carsToRender.forEach(car => {
            // Create Card Element
            const card = document.createElement('div');
            card.className = 'car-card';
            
            // Format Price to have commas (e.g., 145,000)
            const formattedPrice = car.price.toLocaleString('en-US');

            card.innerHTML = `
                <img src="${car.image}" alt="${car.model}" class="car-card-img">
                <div class="car-card-content">
                    <h4 class="car-card-title">${car.model}</h4>
                    <div class="car-card-price">¥${formattedPrice}</div>
                    <div class="car-card-specs">
                        <span>🗓️ ${car.year}</span>
                        <span>📍 ${car.location}</span>
                    </div>
                </div>
            `;

            // Add click event to open Modal
            card.addEventListener('click', () => openModal(car));
            
            carGrid.appendChild(card);
        });
    }

    // 3. Search and Filter Logic
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchModel = document.getElementById('searchModel').value.toLowerCase().trim();
        const searchYear = document.getElementById('searchYear').value.trim();

        const filteredCars = mockCars.filter(car => {
            const matchesModel = car.model.toLowerCase().includes(searchModel);
            const matchesYear = searchYear === '' ? true : car.year.toString() === searchYear;
            return matchesModel && matchesYear;
        });

        renderCars(filteredCars);
    });

    // Reset Search
    resetBtn.addEventListener('click', () => {
        document.getElementById('searchModel').value = '';
        document.getElementById('searchYear').value = '';
        renderCars(mockCars); // Show all
    });

    // 4. Modal Logic
    function openModal(car) {
        // Populate modal data
        document.getElementById('modalImage').src = car.image;
        document.getElementById('modalTitle').textContent = car.model;
        document.getElementById('modalPrice').textContent = `¥${car.price.toLocaleString('en-US')}`;
        document.getElementById('modalYear').textContent = car.year;
        document.getElementById('modalColor').textContent = car.color;
        document.getElementById('modalLocation').textContent = car.location;

        // Show Modal
        modal.classList.add('active');
        // Prevent background scrolling
        document.body.style.overflow = 'hidden'; 
    }

    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeModal.addEventListener('click', close);

    // Close modal if user clicks outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });

    // 5. Initial Render on Page Load
    renderCars(mockCars);
});