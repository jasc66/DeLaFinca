let currentFontSize = 16;

window.toggleContrast = function() {
    document.body.classList.toggle('high-contrast');
};

window.increaseFontSize = function() {
    currentFontSize += 2;
    document.body.style.fontSize = currentFontSize + 'px';
};

window.decreaseFontSize = function() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + 'px';
    }
};

window.resetStyles = function() {
    document.body.style.fontSize = '16px';
    document.body.classList.remove('high-contrast', 'light-mode', 'dark-mode');
    currentFontSize = 16;
};

window.changeToLight = function() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
};

window.changeToDark = function() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
};
