const inputChoose = document.querySelector('#input-choose'),
btnChoose = document.querySelector("#choose"),
previewImg = document.querySelector(".preview-panel img"),
mainPanel = document.querySelector("main"),
restBtn = document.querySelector("#reset"),
saveBtn = document.querySelector("#save"),
filterBtns = document.querySelectorAll(".filter-btn-a"),
sliderName = document.querySelector("#slider-name"),
sliderValue = document.querySelector("#slider-value"),
slider= document.querySelector("#slider"),
rotateBtns = document.querySelectorAll(".rotate-btn-a");

//desable
mainPanel.classList.add("desabled");

slider.addEventListener('input',()=> 
{   
    let btn = document.querySelector(".selected");
    sliderValue.innerText = slider.value + "%";
    switch (btn.value) {
        case 'b': filter.brightness = slider.value;
            break;
        case 'g': filter.grayscale = slider.value/2;
            break;
        case 's':filter.saturate = slider.value;
            break;
        case 'i': filter.invert = slider.value/2;
            break;
        case 'bl': filter.blur = slider.value/20;
            break;
        case 'c': filter.contrast = slider.value;
            break;
    }
    previewImg.style.filter = "brightness("+filter.brightness+"%) grayscale("+filter.grayscale+"%) invert("+filter.invert+"%) saturate("+filter.saturate+"%) blur("+filter.blur+"px) contrast("+filter.contrast+"%)";
    console.log(previewImg.style.filter);
});

filterBtns.forEach(element => 
    {
    element.addEventListener('click',() => {
    document.querySelector('.selected').classList.remove("selected"); 
    element.classList.add("selected");
    sliderName.innerText = element.innerText;
    if(element.value ==='b')
    {slider.value = filter.brightness;}
    else if(element.value ==='i')
    {slider.value = filter.invert*2;}
    else if(element.value ==='s')
    {slider.value = filter.saturate;}
    else if(element.value ==='g')
    {slider.value = filter.grayscale*2;}
    else if(element.value ==='bl')
    {slider.value = filter.blur*20;}
    else if(element.value ==='c')
    {slider.value = filter.contrast;}
    sliderValue.innerText = slider.value + "%";
    });
});

btnChoose.addEventListener('click',()=>inputChoose.click());

const img = ()=>{
if(!inputChoose.files[0]){
    return;
}else{
    file  = inputChoose.files[0];
    mainPanel.classList.remove("desabled");
    restBtn.classList.remove("desabled")
    saveBtn.classList.remove("desabled");
    previewImg.src = URL.createObjectURL(file);
    filter = {brightness : 100 ,grayscale : 0,saturate : 100,invert : 0,blur : 0,contrast : 100,rotate: 0,scaleXValue : 1, scaleYValue:1};
}};

inputChoose.addEventListener('change',img);

 // Reset filter  
restBtn.addEventListener("click",() => {previewImg.style.filter = 'initial'
filter = {brightness : 100 ,grayscale : 0,saturate : 100,invert : 0,blur : 0,contrast : 100,rotate: 0,scaleXValue : 1, scaleYValue : 1};
previewImg.style.transform = "rotate(0)";
});


// Rotate filter
rotateBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        if(btn.value === 'r') 
        {
            filter.rotate += 90;
        }else if(btn.value === 'l'){
            filter.rotate -= 90;
        }else if(btn.value === 'fr'){
            filter.scaleYValue = filter.scaleYValue < 0 ? 1: -1;
        }else if(btn.value === 'fl'){
            filter.scaleXValue = filter.scaleXValue < 0 ? 1: -1;
        }else console.log('hello wolrd bbut its a bug');
        previewImg.style.transform = 'rotate('+filter.rotate+'deg) scaleY('+filter.scaleYValue+') scaleX('+filter.scaleXValue+')'
    })
});

// Save and download the image
saveBtn.addEventListener('click',()=>{

    const cnv = document.createElement('canvas');
    cnv.width = previewImg.width;
    cnv.height = previewImg.height;
    const cntx = cnv.getContext('2d');
    cntx.filter = previewImg.style.filter;
    cntx.drawImage(previewImg,0,0,cnv.width,cnv.height);    
    const link = document.createElement('a');
    link.download = "bachir.jpg";
    link.href = cnv.toDataURL();
    link.click();
})