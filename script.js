const ConsoleSummary = document.getElementById("Console_summary");
const Canva = document.getElementById('Canva');

//ConsoleSlider code

 const CanvaSlider = document.getElementById("canva_slider");
let CanvaSize = CanvaSlider.value;
const CanvaValueDisplay = document.getElementById("canva_slider_value");
    CanvaValueDisplay.innerHTML = CanvaSize;

    Canva.style.width = CanvaSize + 'px';
    Canva.style.height = CanvaSize + 'px';

    CanvaSlider.oninput = function() {
        Canva.innerHTML=""; //Clear Canva
        
        CanvaSize = this.value; 
        CanvaValueDisplay.innerHTML = CanvaSize;

        Canva.style.width = this.value + 'px';
        Canva.style.height = this.value + 'px';
        
        UpdateConsoleSummary();
    };


    //PixelSlider code

    const PixelSlider = document.getElementById("pixel_slider");
    let PixelSize = PixelSlider.value;
    const PixelValueDisplay = document.getElementById("pixel_slider_value");
    PixelValueDisplay.innerHTML = PixelSize;

    const PixelValues = [1, 5, 10, 25, 50, 100]; //define possible values
    PixelSlider.min = 1;
    PixelSlider.max = PixelValues.length;
    PixelSlider.step = 1;

    PixelSlider.oninput = function() {
        const PixelValuesIndex = parseInt(PixelSlider.value) - 1; //get the index of value

        PixelSize = PixelValues[PixelValuesIndex]; //Chenge the pixel size
        PixelValueDisplay.innerHTML = PixelSize; //Display chenged pixel size
    
        PixelSlider.value = PixelSlider.value; // Ensures that the value is updated immediately
        
        Canva.innerHTML=""; //Clear Canva

        const newPixel = document.createElement('div'); //create new pixel
        newPixel.className = 'pixel';
        newPixel.style.width = PixelSize + 'px';
        newPixel.style.height = PixelSize + 'px';

        Canva.appendChild(newPixel); //Add new pixel to canva

        UpdateConsoleSummary();
    };

    //Mirroring console
    let selectedMirroring = "plain";

    const mirror_checkboxes = document.querySelectorAll('#mirroring_checkboxes input[type="checkbox"]');

    // Attach event listener to each checkbox
    mirror_checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            selectedMirroring = this.value;

            // Uncheck the currently checked checkbox
            mirror_checkboxes.forEach(function(checkbox) {
                if (checkbox.checked && checkbox !== this) {
                    checkbox.checked = false;
                }
            }, this);
        });
    });


    //Color console 
    let selectedColorPalete = "binar";

    const color_checkboxes = document.querySelectorAll('#colorpalte_checkboxes input[type="checkbox"]');

    // Attach event listener to each checkbox
    color_checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            selectedColorPalete = this.value;

            // Uncheck the currently checked checkbox
            color_checkboxes.forEach(function(checkbox) {
                if (checkbox.checked && checkbox !== this) {
                    checkbox.checked = false;
                }
            }, this);
        });
    });

    //Updae Summary and Num Of Pix
    let NumberOfPixels = 10000;

    function UpdateConsoleSummary() {
        NumberOfPixels = Math.pow((CanvaSize / PixelSize), 2);
        ConsoleSummary.innerHTML = "<p>There will be " + NumberOfPixels + " pixels generated</p>";
    }

    //Submitting selections
    const SubmitButton = document.getElementById('Submit');

    function GenerateColors() {
        Canva.innerHTML="";
        const PixelsColorArr = [];

        function GeneratePixels() {
            for (let i = 0; i < CanvaSize/PixelSize; i++){
                for (let j = 0; j < CanvaSize/PixelSize; j++){
                    const newPixel = document.createElement('div');
                    newPixel.id = 'pixel_' + i + "_" + j;
                    newPixel.style.backgroundColor = PixelsColorArr[i][j];
                    newPixel.style.width = PixelSize + 'px';
                    newPixel.style.height = PixelSize + 'px';
                    Canva.appendChild(newPixel);
                }
            }
        }
        
        switch(selectedMirroring) {
            case "plain":

                for (let i = 1; i <= CanvaSize/PixelSize; i++) {
                    const PixelRow = [];
                        for (let j = 1; j <= CanvaSize/PixelSize; j++) {
                            if (selectedColorPalete == "binar"){
                                PixelRow.push(getRandomGrey());
                            } else if (selectedColorPalete == "monochrom"){
                                PixelRow.push(getRandomGrey(2));
                            }
                            }
                    PixelsColorArr.push(PixelRow);
                }
                    
                GeneratePixels();
                break;

            case "mirror":

                for (let i = 1; i <= CanvaSize/PixelSize; i++) {
                    const PixelRow = [];
                    for (let j = 1; j <= CanvaSize/PixelSize; j++) {
                        if (j <= CanvaSize/PixelSize/2){
                            if (selectedColorPalete == "binar"){
                                PixelRow.push(getRandomGrey());
                            } else if (selectedColorPalete == "monochrom"){
                                PixelRow.push(getRandomGrey(2));
                            }
                        } else {
                            const backword_index = CanvaSize/PixelSize/2-(j-CanvaSize/PixelSize/2);
                            const PrevColor = PixelRow[backword_index];
                            PixelRow.push(PrevColor);
                        }
                    }
                    PixelsColorArr.push(PixelRow);
                }

                GeneratePixels();
                break;

                case "double_mirror":

                for (let i = 1; i <= CanvaSize/PixelSize; i++) {
                    const PixelRow = [];
                    if (i <= CanvaSize/PixelSize/2){
                        for (let j = 1; j <= CanvaSize/PixelSize; j++) {
                            if (j <= CanvaSize/PixelSize/2){
                                if (selectedColorPalete == "binar"){
                                    PixelRow.push(getRandomGrey());
                                } else if (selectedColorPalete == "monochrom"){
                                    PixelRow.push(getRandomGrey(2));
                                }
                            } else {
                                const backword_index = CanvaSize/PixelSize/2-(j-CanvaSize/PixelSize/2);
                                const PrevColor = PixelRow[backword_index];
                                PixelRow.push(PrevColor);
                            }
                        }
                        PixelsColorArr.push(PixelRow);
                    } else {
                        const backword_index = CanvaSize/PixelSize/2-(i-CanvaSize/PixelSize/2);
                        const PrevRow = PixelsColorArr[backword_index];
                        PixelsColorArr.push(PrevRow);
                    }
                }

                GeneratePixels();
                break;
        }
    }

    function getRandomNumber(mult=1) {
        return Math.round(Math.random() * mult);
    }

    function getRandomGrey(option=1) {
        const colors = ["#000", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999", "#aaa", "#bbb", "#ccc", "#ddd", "#eee", "#fff"];
        if (option > colors.length){
            return "#fff";
        }
        switch(option) {
            case 1:
                if (getRandomNumber()){
                    return colors[0];
                } else {
                    return colors[colors.length-1];
                }
                break;

            case 2:
                const colorIndex = getRandomNumber(colors.length);
                return colors[colorIndex];
                break;
            
        }
    }