if (window.location.pathname === '/') {
    let processingData = document.getElementById('processingData');
    const submitButton = document.getElementById('submitForm');
    const loadingImage = document.getElementById('loadingImage');
    submitButton.addEventListener('click', async () => {
        const getData = async () => {
            const response = await fetch('/processing', { method: 'GET' });
            const result = await response.json();
            processingData.innerHTML = `Still working on it... <br> Generated names: [${result.index}] <br> Valid names: ${result.count}`;
            loadingImage.style = 'display: block';
        }
        setInterval(getData, 1000);
    });
    loadingImage.style = 'display: none';
}