if (window.location.pathname === '/') {
    let processingData = document.getElementById('processingData');
    const submitButton = document.getElementById('submitForm');
    const loadingImage = document.getElementById('loadingImage');
    loadingImage.style = 'display: none';

    submitButton.addEventListener('click', async () => {
        const getData = async () => {
            await fetch('/processing', { method: 'GET' }).then(async (res) => {
                const result = await res.json();
                if (result.index !== 'undefined') {
                    processingData.innerHTML = `Still working on it... <br> Generated names: 
                    [${result.index}] <br> Valid names: ${result.count}`;
                    loadingImage.style = 'display: block';
                } else {
                    console.log('Something went wrong with the request!');
                }
            }).catch((err) => { return console.log(err); });
            // const result = await response.json();
        }
        setInterval(getData, 1000);
    });
    loadingImage.style = 'display: none';
}