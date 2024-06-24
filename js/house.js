document.addEventListener("DOMContentLoaded", function (e) {
    let mainphotoimg = document.querySelector(".mainphotoimg ");
    let photos = document.querySelectorAll("img");
  
    if (photos.length != 0) {
      photos.forEach(function (item) {
        item.addEventListener("click", function (event) {
          mainphotoimg.src = item.src;
          item.classList.remove("photoselect");
  
          let photoselect = document.querySelector(".photoselect");
          photoselect.classList.remove("photoselect");
          item.classList.add("photoselect");
        });
      });
    }
    //---------------
  
    let buttons = document.querySelectorAll("button");
    let inftabs = document.querySelectorAll(".inftabs");
  
    if (buttons.length != 0) {
      buttons.forEach(function (item) {
        item.addEventListener("click", function (event) {
          if (inftabs.length != 0) {
            inftabs.forEach(function (inftab) {
              if (item.dataset.type == inftab.dataset.type) {
                inftab.classList.remove("nonvisable");
              } else {
                inftab.classList.add("nonvisable");
              }
            });
          }
  
          let butselect = document.querySelector(".butselect");
          butselect.classList.remove("butselect");
          item.classList.add("butselect");
        });
      });
    }
  });
  