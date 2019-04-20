const form = document.querySelector("form");
const search = document.querySelector("input");
form.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  const text = document.getElementById("response");

  text.textContent = "Loading...";

  fetch("/weather?search="+location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        text.textContent = "ERROR! " + data.error;
      } else {
        console.log(data);
        text.textContent = data.location + ": " + data.forecast;
      }
    })
  })
});
