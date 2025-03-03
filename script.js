let lockedColors = {};

function generatePalette() {
    const palette = document.getElementById("palette");
    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let color = lockedColors[i] || getRandomColor();
        let colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.innerText = color;

        let lock = document.createElement("span");
        lock.className = "lock";
        lock.innerText = lockedColors[i] ? "🔒" : "🔓";
        lock.onclick = () => toggleLock(i, color);
        
        colorBox.onclick = () => copyToClipboard(color);
        colorBox.appendChild(lock);
        palette.appendChild(colorBox);
    }
}

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
    });
}

function copyAllColors() {
    let colors = Array.from(document.getElementsByClassName("color-box")).map(box => box.innerText);
    navigator.clipboard.writeText(colors.join(", ")).then(() => {
        alert("Copied all colors!");
    });
}

function toggleLock(index, color) {
    if (lockedColors[index]) {
        delete lockedColors[index];
    } else {
        lockedColors[index] = color;
    }
    generatePalette();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function savePalette() {
    const savedPalettes = document.getElementById("saved-palettes");
    const colors = Array.from(document.getElementsByClassName("color-box")).map(box => box.innerText);

    let paletteDiv = document.createElement("div");
    paletteDiv.className = "palette";
    
    colors.forEach(color => {
        let colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.innerText = color;
        paletteDiv.appendChild(colorBox);
    });

    savedPalettes.appendChild(paletteDiv);
}

function downloadPalette() {
    html2canvas(document.getElementById("palette")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "color-palette.png";
        link.click();
    });
}

// Gener
