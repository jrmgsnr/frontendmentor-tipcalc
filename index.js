
const userInput = document.querySelectorAll(".user-input");
const tipSelect = document.querySelectorAll(".tip-percent");
const resetBtn = document.querySelector("#reset");
const warningLabel = document.querySelectorAll(".warning");
var decimal;
var totalBill, totalPeople, tipPercent;
var hasBill, hasPeople, hasTip;
var totalTip;
var overallTotal

for(var i = 0; i < tipSelect.length; i++){
    if(tipSelect.length - i === 1){
        tipSelect[i].addEventListener("keydown", tipSelected);
    } else {
        tipSelect[i].addEventListener("click", tipSelected);
    }
}

for(var i = 0; i < userInput.length; i++){
    userInput[i].addEventListener("keydown", getValue);
}

resetBtn.addEventListener("click", () => {
    for(var i = 0; i < userInput.length; i++){
        userInput[i].value="";
    }
    for(var i = 0; i < tipSelect.length; i++){
        tipSelect[i].classList.remove("custom-tip");
        tipSelect[i].classList.remove("button-tip");
    }
    tipSelect[tipSelect.length-1].value="";
    decimal = false;
    totalBill = null;
    totalPeople = null;
    tipPercent = null;
    hasBill = false;
    hasPeople = false;
    hasTip = false;
    totalTip = null;
    overallTotal = null;
    document.querySelector("#tip").innerText = "$0.00";
    document.querySelector("#total").innerText = "$0.00";
});

function getValue(e){
    
    if(this.id === "bill"){
        if((isNaN(e.key) && e.key != ".") || (e.keyCode === 190 && decimal) || (this.value === "0" && e.key != ".")){
            if(e.keyCode != 8){
                e.preventDefault();
            }
        } else {
            this.addEventListener("keyup", (e) => {
                if(this.value === "." && e.keyCode == 190){
                    this.value = "0" + this.value;
                    console.log(this.value);
                }

                totalBill = Number(this.value);
                
                if(this.value.includes(".")){
                    decimal = true;
                } else {
                    decimal = false;
                }

                if(this.value.length > 0 && totalBill != 0) {
                    hasBill = true;
                    
                } else {
                    hasBill = false;
                }

                zeroWarning(this.value, 0);
                compute();
            });
        }

    } else if (this.id === "person") {
        if((this.value === "0" && (e.keyCode >= 48 && e.keyCode <= 57)) || e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 190){
            e.preventDefault();
        } else {
            this.addEventListener("keyup", (e) => {
                totalPeople = Number(this.value);
            
                if(this.value.length > 0 && totalPeople != 0) {
                    hasPeople = true;
                } else {
                    hasPeople = false;
                }

                zeroWarning(this.value, 1);
                compute();
            });  
        }
    }
}

function tipSelected(e){
    for(var i = 0; i < tipSelect.length; i++){
        tipSelect[i].classList.remove("custom-tip");
        tipSelect[i].classList.remove("button-tip");
    }

    if(e.type === "keydown"){
        if((this.value === "0" && (e.keyCode >= 48 && e.keyCode <= 57)) || e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 190){
            e.preventDefault();
        } else {
            this.addEventListener("keyup", (e) => {
                tipPercent = Number(this.value);
                if(this.value.length > 0 && tipPercent != 0) {
                    hasTip = true;
                    this.classList.add("custom-tip");
                } else {
                    hasTip = false;
                }
                compute();
            });
        }
    } else {
        tipSelect[tipSelect.length-1].value="";
        tipPercent = Number(this.value.replace("%", ""));
        if(this.value.length > 0 && tipPercent != 0) {
            hasTip = true;
            this.classList.add("button-tip");
        } else {
            hasTip = false;
        }
        compute();
    }
    
}

function compute(){

    if(hasBill && hasPeople && hasTip){
        totalTip = totalBill * (tipPercent / 100);
        if(!Number.isInteger(totalTip)){
            totalTip = totalTip.toFixed(2);
        }

        overallTotal = Number(totalBill) + Number(totalTip);

        document.querySelector("#tip").innerText = "$" + (totalTip/totalPeople).toFixed(2);
        document.querySelector("#total").innerText = "$" + (overallTotal/totalPeople).toFixed(2);
    } else {
        totalTip = null;
        overallTotal = null;
        document.querySelector("#tip").innerText = "$0.00";
        document.querySelector("#total").innerText = "$0.00";
    }
}

function zeroWarning(currentValue, index) {
    if(Number(currentValue) === 0 && currentValue != ""){
        warningLabel[index].classList.remove("hide");
        userInput[index].classList.add("warning-border");
    } else {
        warningLabel[index].classList.add("hide");
        userInput[index].classList.remove("warning-border");
    }
}