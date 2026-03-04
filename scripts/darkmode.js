let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkmode', 'active');
    console.log("darkmode on");
}

const disableDarkmode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkmode', null);
    console.log("darkmode off");
}

if (darkmode === "active") {
    enableDarkmode();
}

themeSwitch.addEventListener("change", function () {

    darkmode = localStorage.getItem('darkmode');
    if (this.checked) {
        enableDarkmode();
    } else {
        disableDarkmode();
    }    

    colorSurface = window.getComputedStyle(document.body).getPropertyValue('--surface');
    colorSurfaceVariant = window.getComputedStyle(document.body).getPropertyValue('--surface-variant');

    colorCellDead = parseHexToRgbObject(colorSurface);
    colorCellAlive = parseHexToRgbObject(colorSurfaceVariant);
})