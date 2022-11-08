// Justin Koch. Group 2

let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowers = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let symbols = "!@#$%^&*_+-=?";

function generate() {
    let length = document.getElementById("length-input").value;
    let upper = document.getElementById("upper-checkbox").checked;
    let lower = document.getElementById("lower-checkbox").checked;
    let number = document.getElementById("numbers-checkbox").checked;
    let symbol = document.getElementById("symbols-checkbox").checked;

    let passwordPatter = "";
    let password = "";

    let codes = [];
    upper ? codes.push("u") : undefined;
    lower ? codes.push("l") : undefined;
    number ? codes.push("n") : undefined;
    symbol ? codes.push("s") : undefined;

    if(codes.length === 0) return;

    for(i=0; i<length; i++) {
        let codeIndex = Math.floor(Math.random() * codes.length)
        
        passwordPatter += codes[codeIndex];
    }

    for(i=0; i<passwordPatter.length; i++) {
        let pattern = passwordPatter[i];
        
        let array;

        switch(pattern) {
            case "u":
                array = uppers;
                break;
            case "l":
                array = lowers;
                break;
            case "n":
                array = numbers;
                break;
            case "s":
                array = symbols;
                break;
        }

        let characterIndex = Math.floor(Math.random() * array.length);
        
        password += array[characterIndex];
    }

    document.getElementById("result").innerHTML = password;
}