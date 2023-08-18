const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");
let image = document.getElementById("image");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  image.src = "";
  image.alt = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
          console.log(data.error);
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.forecast;
          image.src = data.weatherIcon[0];
          image.alt = "weather-img";
          // console.log(data.weatherIcon[0], "dada...");
        }
      });
    }
  );

  // fetch(`/weather?address=${location}`).then(
  //   (response) => {
  //     response.json().then((data) => {
  //       if (data.error) {
  //         msgOne.textContent = data.error;
  //         console.log(data.error);
  //       } else {
  //         msgOne.textContent = data.location;
  //         msgTwo.textContent = data.forecast;
  //         image.src = data.weatherIcon[0];
  //         image.alt = "weather-img";
  //         // console.log(data.weatherIcon[0], "dada...");
  //       }
  //     });
  //   }
  // );
});
