const CanvaSlider = document.getElementById("canva_slider");
const CanvaValueDisplay = document.getElementById("canva_slider_value");

let CanvaSize = CanvaSlider.value;

// Display the initial value
CanvaValueDisplay.innerHTML = CanvaSlider.value;


const Canva = document.getElementById('Canva');

Canva.style.width = CanvaSlider.value + 'px';
Canva.style.height = CanvaSlider.value + 'px';

// Update the value as the slider is being changed
CanvaSlider.oninput = function() {
    CanvaValueDisplay.innerHTML = this.value;
    Canva.style.width = this.value + 'px';
    Canva.style.height = this.value + 'px';
    CanvaSize = this.value;
};


const PixelSlider = document.getElementById("pixel_slider");
const PixelValueDisplay = document.getElementById("pixel_slider_value");

let PixelSize = PixelSlider.value;

PixelValueDisplay.innerHTML = PixelSlider.value;

PixelSlider.oninput = function() {
    PixelValueDisplay.innerHTML = this.value;
    PixelSize = this.value;
    Canva.innerHTML="<div class='pixel'><div id='pixel_1'></div></div>"
    const Pixels = document.getElementsByClassName("pixel");
    for (var i = 0; i < Pixels.length; i++) {
        Pixels[i].style.width = PixelSize + 'px';
        Pixels[i].style.height = PixelSize + 'px';
      }

};

const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');

// Attach event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
    // Uncheck the currently checked checkbox
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked && checkbox !== this) {
            checkbox.checked = false;
        }
    }, this);
  });
});