document.addEventListener('DOMContentLoaded', () => {
    const carsData = window.mockCars || [];
    const carGrid = document.getElementById('carGrid');
    const noResults = document.getElementById('noResults');
    const searchForm = document.getElementById('searchForm');
    const resetBtn = document.getElementById('resetBtn');
    
    if(!carGrid) return;

    function renderCars(carsToRender) {
        carGrid.innerHTML = ''; 
        if (carsToRender.length === 0) {
            noResults.style.display = 'block'; return;
        }
        noResults.style.display = 'none';

        carsToRender.forEach(car => {
            const card = document.createElement('div'); card.className = 'car-card';
            card.innerHTML = `
                <img src="${car.image}" alt="${car.model}" class="car-card-img">
                <div class="car-card-content">
                    <h4 class="car-card-title">${car.model}</h4>
                    <div class="car-card-price">¥${car.price.toLocaleString('en-US')}</div>
                    <div style="color:var(--text-light);font-size:0.9rem;display:flex;justify-content:space-between;">
                        <span>🗓️ ${car.year}</span><span>📍 ${car.location}</span>
                    </div>
                </div>`;
            card.addEventListener('click', () => window.location.href = `car-details.html?id=${car.id}`);
            carGrid.appendChild(card);
        });
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sModel = document.getElementById('searchModel').value.toLowerCase().trim();
        const sLocation = document.getElementById('searchLocation').value;
        const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;

        const filteredCars = carsData.filter(car => 
            car.model.toLowerCase().includes(sModel) &&
            (sLocation === "" || car.location === sLocation) &&
            car.price >= minPrice && car.price <= maxPrice
        );
        renderCars(filteredCars);
    });

    resetBtn.addEventListener('click', () => { searchForm.reset(); renderCars(carsData); });
    renderCars(carsData);
});