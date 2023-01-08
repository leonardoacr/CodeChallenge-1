if (window.location.pathname === '/') {
    let consonants = document.getElementById('consonants') || null;
    const consonantsList = 'bcdfghjklmnpqrstwvxyz';

    for (const letter of consonantsList) {
        consonants.innerHTML +=
            `<input type="checkbox" id="consonants" name="deleteConsonant_${letter}">
    <label for="consonants">${letter}</label> `;
    }
}