const ConsoleSummary = document.getElementById("Console_summary");

const CanvaSlider = document.getElementById("canva_slider");
const CanvaValueDisplay = document.getElementById("canva_slider_value");

let CanvaSize = CanvaSlider.value;

// Display the initial value
CanvaValueDisplay.innerHTML = CanvaSlider.value;


const Canva = document.getElementById('Canva');


const PixelSlider = document.getElementById("pixel_slider");
const PixelValueDisplay = document.getElementById("pixel_slider_value");
const PixelValues = [1, 5, 10, 25, 50, 100];

PixelSlider.min = 1;
PixelSlider.max = PixelValues.length;
PixelSlider.step = 1;


let PixelSize = PixelSlider.value;

PixelValueDisplay.innerHTML = PixelSlider.value;


Canva.style.width = CanvaSlider.value + 'px';
Canva.style.height = CanvaSlider.value + 'px';

// Update the value as the slider is being changed
CanvaSlider.oninput = function() {
    Canva.innerHTML="";
    CanvaValueDisplay.innerHTML = this.value;
    Canva.style.width = this.value + 'px';
    Canva.style.height = this.value + 'px';
    CanvaSize = this.value;

    ConsoleSummary.innerHTML = "<p>There will be " + (CanvaSize / PixelSize) * (CanvaSize / PixelSize) + " pixels generated</p>";
};


PixelSlider.oninput = function() {
    const PixelValuesIndex = parseInt(PixelSlider.value) - 1;
    PixelSize = PixelValues[PixelValuesIndex];
    PixelValueDisplay.innerHTML = PixelSize;

    PixelSlider.value = PixelSlider.value; // Ensures that the value is updated immediately
    
    Canva.innerHTML="<div class='pixel' id='pixel_0'></div>"
    const Pixels = document.getElementsByClassName("pixel");
    for (var i = 0; i < Pixels.length; i++) {
        Pixels[i].style.width = PixelSize + 'px';
        Pixels[i].style.height = PixelSize + 'px';
    }

  ConsoleSummary.innerHTML = "<p>There will be " + (CanvaSize / PixelSize) * (CanvaSize / PixelSize) + " pixels generated</p>";
};


let selectedMirroring = "plain";
let selectedColorPalete = "xyz";

const m_checkboxes = document.querySelectorAll('#mirroring_checkboxes input[type="checkbox"]');

// Attach event listener to each checkbox
m_checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        selectedMirroring = this.value;
        //console.log(selectedMirroring);

        // Uncheck the currently checked checkbox
        m_checkboxes.forEach(function(checkbox) {
            if (checkbox.checked && checkbox !== this) {
                checkbox.checked = false;
            }
        }, this);
    });
});

const c_checkboxes = document.querySelectorAll('#colorpalte_checkboxes input[type="checkbox"]');

// Attach event listener to each checkbox
c_checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        selectedColorPalete = this.value;
        //console.log(selectedColorPalete);


        // Uncheck the currently checked checkbox
        c_checkboxes.forEach(function(checkbox) {
            if (checkbox.checked && checkbox !== this) {
                checkbox.checked = false;
            }
        }, this);
    });
});

const SubmitButton = document.getElementById('Submit');

SubmitButton.addEventListener('click', function() {
    Canva.innerHTML="";
    for (let i = 1; i <= (CanvaSize / PixelSize); i++) {
        for (let j = 1; j <= (CanvaSize / PixelSize); j++) {
            const newPixel = document.createElement('div');
            newPixel.id = 'pixel_' + i + "_" + j;
            newPixel.className = 'pixel';
            newPixel.style.width = PixelSize + 'px';
            newPixel.style.height = PixelSize + 'px';
            if (selectedColorPalete == "binar") {
                if (getRandomNumber()) {
                    newPixel.style.backgroundColor = "#000";
                } else {
                    newPixel.style.backgroundColor = "#fff";
                }
            }
            else if (selectedColorPalete == "monochrom") {
                const colors = ["#000", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999", "#aaa", "#bbb", "#ccc", "#ddd", "#eee", "#fff"];
                const colorIndex = getRandomNumber(colors.length);
                newPixel.style.backgroundColor = colors[colorIndex];
            }   
            Canva.appendChild(newPixel);
        }
    }
});


function getRandomNumber(mult=1) {
    return Math.round(Math.random() * mult);
  }