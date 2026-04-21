document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('carImage');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const form = document.getElementById('addCarForm');

    // 1. Trigger file input when clicking the upload zone
    uploadZone.addEventListener('click', (e) => {
        // Prevent click if they are clicking the remove button
        if (e.target !== removeImageBtn) {
            fileInput.click();
        }
    });

    // 2. Handle Drag & Drop Events
    // Prevent default browser behavior (opening the file in a new tab)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Add visual cue when dragging over
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.remove('dragover');
        }, false);
    });

    // Handle dropped files
    uploadZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    // Handle files selected via file dialog
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // 3. Process and Preview the File
    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        
        // Basic validation: ensure it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPEG, PNG, etc.).');
            return;
        }

        // Use FileReader to read the file locally and display preview
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // e.target.result contains the Base64 Data URL of the image
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadPrompt.style.display = 'none';
            removeImageBtn.style.display = 'block';
        };

        reader.readAsDataURL(file);
    }

    // 4. Remove Image Functionality
    removeImageBtn.addEventListener('click', () => {
        fileInput.value = ''; // Clear the input
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        uploadPrompt.style.display = 'block';
        removeImageBtn.style.display = 'none';
    });

    // 5. Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check if image is uploaded
        if (fileInput.files.length === 0) {
            alert('Please upload an image of the car before submitting.');
            return;
        }

        alert('Success! Car details and image preview generated. Ready for Phase-B backend integration.');
    });
});