// ==========================================
// js/add-car.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STRICT AUTHENTICATION GUARD (路由守卫) ---
    // Check if the user is currently logged in
    const userStr = localStorage.getItem('currentUser');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || !user.isLoggedIn) {
        // If not logged in, alert the user and redirect to login page
        alert("Access Denied: Authentication is required. Please log in to your account to add a new car advertisement.");
        window.location.href = 'log-in.html';
        
        // Return immediately to stop executing the rest of the script
        return; 
    }

    // --- 2. IMAGE UPLOAD & DRAG/DROP LOGIC (表单与拖拽逻辑) ---
    const uploadZone = document.getElementById('uploadZone');
    if (!uploadZone) return;

    const fileInput = document.getElementById('carImage');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const form = document.getElementById('addCarForm');

    // Trigger file input when clicking the upload zone (except remove button)
    uploadZone.addEventListener('click', (e) => { 
        if (e.target !== removeImageBtn) {
            fileInput.click(); 
        }
    });

    // Handle Drag & Drop Events (Prevent default browser behavior)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
        uploadZone.addEventListener(evt, e => { 
            e.preventDefault(); 
            e.stopPropagation(); 
        });
    });

    // Add visual styling when dragging over
    ['dragenter', 'dragover'].forEach(evt => {
        uploadZone.addEventListener(evt, () => uploadZone.classList.add('dragover'));
    });

    // Remove visual styling when dragging leaves or drops
    ['dragleave', 'drop'].forEach(evt => {
        uploadZone.addEventListener(evt, () => uploadZone.classList.remove('dragover'));
    });

    // Process dropped files
    uploadZone.addEventListener('drop', (e) => {
        handleFiles(e.dataTransfer.files);
    });

    // Process clicked files
    fileInput.addEventListener('change', function() { 
        handleFiles(this.files); 
    });

    // Core function to read and preview the image
    function handleFiles(files) {
        if (files.length === 0) return;
        const file = files[0];
        
        // Basic validation: ensure it's an image
        if (!file.type.startsWith('image/')) { 
            alert('Invalid file format. Please upload a valid image file (JPEG, PNG, etc.).'); 
            return; 
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result; 
            imagePreview.style.display = 'block';
            uploadPrompt.style.display = 'none'; 
            removeImageBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Handle Image Removal
    removeImageBtn.addEventListener('click', () => {
        fileInput.value = ''; 
        imagePreview.src = ''; 
        imagePreview.style.display = 'none';
        uploadPrompt.style.display = 'block'; 
        removeImageBtn.style.display = 'none';
    });

    // --- 3. FORM SUBMISSION ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ensure image is uploaded
        if (fileInput.files.length === 0) { 
            alert('Action required: Please upload an image of your vehicle before submitting.'); 
            return; 
        }
        
        alert('Success! Your vehicle advertisement has been securely posted to the platform.');
        window.location.href = 'search.html';
    });
});