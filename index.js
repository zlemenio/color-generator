const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");

// add a click event to select button
selectBtn.addEventListener("click", () => {
  // add/remove active class on the container element
  customSelect.classList.toggle("active");
  // update the aria-expanded attribute based on the current state
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});



const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");
const getBtn = document.getElementById("GET-color")
const colorBtn = document.getElementById("colorpicker")

optionsList.forEach((option) => {
  function handler(e) {
    // Click Events
    if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
      selectedValue.textContent = this.children[1].textContent;
      getBtn.removeAttribute("disabled")
      customSelect.classList.remove("active");
    }
    // Key Events
    if (e.key === "Enter") {
      selectedValue.textContent = this.textContent;
      customSelect.classList.remove("active");
    }
  }

  option.addEventListener("keyup", handler);
  option.addEventListener("click", handler);
});

getBtn.addEventListener("click",function(){
    const mode = selectedValue.textContent
    document.getElementById("colorpicker").innerHTML = (colorBtn.value)
    const hex = colorBtn.value.replace("#", "")
    fetchColor(hex, mode)
    // Avoid spam
    // getBtn.setAttribute("disabled", "disabled")
})

async function fetchColor(hex, mode) {
    const fetchData = await fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=6`)
    const color = await fetchData.json()

    const arr = ["first", "second", "third", "fourth", "fifth"]
    for(let i = 0; i < arr.length; i++){
        document.getElementById(`${arr[i]}ColorScheme`).style.background = color.colors[i].hex.value
        document.getElementById(`${arr[i]}ColorCode`).textContent = color.colors[i].hex.value
    }
}


/*
#firstColorScheme {
    background: red;
    width: 20vw;
    height: 90vh;
}

#secondColorScheme {
    background: orange;
    width: 20vw;
    height: 90vh;
}
#thirdColorScheme {
    background: brown;
    width: 20vw;
    height: 90vh;
}
#fourthColorScheme {
    background: purple;
    width: 20vw;
    height: 90vh;
}
#fifthColorScheme {
    background: mintcream;
    width: 20vw;
    height: 90vh;
}
*/
