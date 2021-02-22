const cartes = document.querySelectorAll(".carte");
const texte = document.querySelector("h5");
const comment = document.querySelector("p");
const plusUn = document.querySelector("h4");

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;
let nbDePaire = 0;
texte.innerText = `Nombres de paires trouvées: ${nbDePaire}/6`;

cartes.forEach((carte) => {
  carte.addEventListener("click", retourneCarte);
});

function retourneCarte() {
  if (verouillage === true) {
    return;
  }

  this.childNodes[1].classList.toggle("active");

  if (!carteRetournee) {
    carteRetournee = true;
    premiereCarte = this;
    return;
  }

  carteRetournee = false;
  secondeCarte = this;

  correspondance();
  fullVision();
}

function correspondance() {
  if (
    premiereCarte.getAttribute("data-attr") ===
    secondeCarte.getAttribute("data-attr")
  ) {
    premiereCarte.removeEventListener("click", retourneCarte);
    secondeCarte.removeEventListener("click", retourneCarte);
    nbDePaire++;
    texte.innerText = `Nombres de paires trouvées: ${nbDePaire}/6`;
    plusUn.classList.add("plusUn");
    setTimeout(() => {
      plusUn.classList.remove("plusUn");
    }, 700);
  } else {
    verouillage = true;
    setTimeout(() => {
      premiereCarte.childNodes[1].classList.remove("active");
      secondeCarte.childNodes[1].classList.remove("active");
      verouillage = false;
    }, 1000);
  }
}

function aleatoire() {
  cartes.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}
aleatoire();

function fullVision() {
  if (nbDePaire === 6) {
    comment.innerText = "Bravo !";
  } else {
    return;
  }
}
