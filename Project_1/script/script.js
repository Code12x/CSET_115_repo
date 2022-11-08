// Justin Koch. Group 2

// The global variables
let items = [];
let purchasedItems = [];
let currentView = "all";

updateView();

function addItem(item, view) {
    if(item.value === "") return;

    let itemName = item.value;
    items.push(itemName);

    updateView();

    item.value = "";
}

function toggleStrike(element) {
    let elementText = element.innerHTML;
    
    if(purchasedItems.includes(elementText)) {
        let index = purchasedItems.indexOf(elementText);
        let leftSide = purchasedItems.slice(0, index);
        let rightSide = purchasedItems.slice(index+1, purchasedItems.length);
        purchasedItems = leftSide.concat(rightSide);
    } else {
        purchasedItems.push(elementText);
    }
    updateView();
}

function updateView(view=currentView) {
    let itemsList = document.getElementById("items-list");
    while(itemsList.firstChild) {
        itemsList.removeChild(itemsList.firstChild);
    }

    if(document.getElementById("current-view-display")) document.getElementById("items-list-div").removeChild(document.getElementById("current-view-display"));

    currentView = view;

    for(let i=0; i<items.length; i++) {
        let item = items[i];
        
        switch(view) {
            case "all":
                displayItem(item);
                break;
            case "left":
                if(!purchasedItems.includes(item)) displayItem(item);
                break;
            case "purchased":
                if(purchasedItems.includes(item)) displayItem(item);
                break;
            default:
                console.warn("Wrong view name somewhere");
                break;
        }
    }

    let currentViewDisplay = document.createElement("h2");
    currentViewDisplay.id = "current-view-display";

    let displayText = "Currently Viewing ";
    
    switch(currentView) {
        case "all":
            displayText += "All";
            break;
        case "left":
            displayText += "the Remaining ";
            break;
        case "purchased":
            displayText += "the Purchased ";
            break;
        default:
            displayText += "[[DEBUG] Something broke lol]";
    }

    currentViewDisplay.innerHTML = displayText + " Items:";

    document.getElementById("items-list-div").insertBefore(currentViewDisplay, document.getElementById("items-list"));
}

function displayItem(itemName) {
    let element = document.createElement("li");
    element.innerHTML = itemName;
    if(purchasedItems.includes(itemName)) {
        element.style.textDecoration = "line-through";
    }

    element.setAttribute("onclick", `toggleStrike(this)`);
    
    document.getElementById("items-list").append(element);
}