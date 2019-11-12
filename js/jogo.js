var counter = 1;
var limit = 4;
var container = document.getElementById("mainContainer");
var row;
var col;
var imgs = [];
var arr = [];
var p;
var clickCounter = 0;
var chosenTag;
var chosenCards = [];
var chosenElem;
var chosenElemChild;
var chosenElem2;
var chosenElem2Child;


for(p = 0; p < 8; p++){
    imgs[p] = `img/`+p+`.jpeg`;
}


for(var i = 0; i < 8; i++){
    imgs[p+i] = `img/`+i+`.jpeg`;
}


embaralhaArray();


for(var i = 0; i<limit; i++){
    row = document.createElement(`div`);
    row.classList.add(`row`);
    row.classList.add(`mb-3`);
    row.classList.add(`justify-content-center`);

    for(var j = 0 ; j < limit; j++){
        col = document.createElement(`div`);
        col.classList.add(`mx-auto`);
        col.appendChild(newCard(col));
        row.appendChild(col);
    }

    container.appendChild(row);
}



function newCard(elem){
    var divs = [];
    var img = document.createElement(`img`);
    var h = document.createElement(`h1`);

    img.src = imgs[counter-1];
    h.innerHTML = counter;
    h.classList.add(`text-center`);
    h.classList.add(`mt-auto`);

    img.innerHTML = counter;

    for(var i = 0 ; i < 4 ; i++){
        divs[i] = document.createElement(`div`);

        switch (i){
            case 0:
                    divs[i].classList.add(`flip-card`);
                    break;
            case 1:
                    divs[i].classList.add(`flip-card-inner`);
                    divs[i].name = counter;
                    divs[i].addEventListener("click",rotateDiv)
                    divs[i-1].appendChild(divs[i]);
                    break;
            case 2:
                    divs[i].classList.add(`flip-card-front`);
                    divs[i].appendChild(h);
                    divs[i-1].appendChild(divs[i]);
                    break;
            case 3:
                    divs[i].classList.add(`flip-card-back`);
                    divs[i].appendChild(img);
                    divs[i-2].appendChild(divs[i]);
                    break;
            default:
                break;
        }
    }
    counter++;

    return divs[0];
}

function rotateDiv(){
    var childs = this.childNodes;
    var imgName = childs[1].childNodes;

    if(this.style.transform == "rotateY(180deg)"){
        chosenTag = "";
        chosenCards[0] = "";
        this.style.transform = "";
        clickCounter = 0;
        return;
    }

    this.style.transform = "rotateY(180deg)";

    if(clickCounter == 0){
        chosenCards[0] = imgName[0].src;
        chosenElem = this;
        chosenElemChild = imgName[0];
        clickCounter++;

    }else{
        chosenElem2 = this;
        chosenElem2Child = imgName[0];
        chosenCards[1] = imgName[0].src;

        setTimeout(function(){if(chosenCards[0] == chosenCards[1]){

            chosenCards[0] = "";
            chosenCards[1] = "";
            clickCounter = 0;

            chosenElemChild.classList.add("correct");
            chosenElem2Child.classList.add("correct");
            chosenElem.removeEventListener('click', rotateDiv, false);
            chosenElem2.removeEventListener('click', rotateDiv, false);
            chosenElem = "";
            chosenElem2 = "";

        }else{

            chosenElemChild.classList.add("apply-shake");
            chosenElem2Child.classList.add("apply-shake");
            window.addEventListener("click",resetCard,true);
        }},500);
    }


}

function embaralhaArray() {
    var atual = imgs.length, tmpVal, iAlea;


    while (0 !== atual) {


     iAlea= Math.floor(Math.random() * atual);
     atual -= 1;

     tmpVal= imgs[atual];
     imgs[atual] = imgs[iAlea];
     imgs[iAlea] = tmpVal;
    }
}

function resetCard(){

    chosenCards[0] = "";
    chosenCards[1] = "";
    clickCounter = 0;

    chosenElemChild.classList.remove("apply-shake");
    chosenElem2Child.classList.remove("apply-shake");
    chosenElem.style.transform = "";
    chosenElem2.style.transform = "";

    chosenElem = "";
    chosenElem2 = "";
    window.removeEventListener("click",resetCard,true);
    return;
}
