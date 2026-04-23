document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    const carsData = window.mockCars || [];
    const car = carsData.find(c => c.id === carId);

    if (car) {
        detailsContainer.style.display = 'grid';
        document.getElementById('detailImage').src = car.image;
        document.getElementById('detailTitle').textContent = car.model;
        document.getElementById('detailPrice').textContent = `¥${car.price.toLocaleString('en-US')}`;
        document.getElementById('detailYear').textContent = car.year;
        document.getElementById('detailColor').textContent = car.color;
        document.getElementById('detailLocation').textContent = car.location;
    } else {
        document.getElementById('errorContainer').style.display = 'block';
    }

    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            const userStr = localStorage.getItem('currentUser');
            const user = userStr ? JSON.parse(userStr) : null;
            if (user && user.isLoggedIn) {
                alert(`Success! Order process started for ${car.model}.`);
            } else {
                alert('Authentication Required. Please log in to purchase.');
                window.location.href = 'log-in.html';
            }
        });
    }
});