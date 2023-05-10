


let filteredList;
let shownCriminalIndexes = []
let mostWanted = []
const numberOfCriminalsToShow = [6]

// funcion principal que se encarga de traer a todos los criminales y la muestra
async function main() {
  mostWanted = await getMostWanted();
  let listLength = mostWanted.length

  for (let index = 0; index < numberOfCriminalsToShow; index++) {
    getFilterAndPrint()
  }
}
// funcion que se encarga de no coger un dato repetido filtrar los datos e imprimirlos
function getFilterAndPrint() {
  const criminal = getRandomUnrepeatedCriminal()
  const filteredCrimimnalData = filterParams(criminal)
  printCriminal(filteredCrimimnalData)
}
// Se encarga de coger un nuevo dato aleatorio
function getRandomIndex(max) {
  return Math.floor(Math.random() * (max - 0) - 0);
}

// Se encarga de no traer repetidos y si esta repetido buscar el siguiente
function getRandomUnrepeatedCriminal() {
  const criminalIndex = getRandomIndex(mostWanted.length)

  if (shownCriminalIndexes.includes(criminalIndex)) {
    return getRandomUnrepeatedCriminal(mostWanted)
  } else {
    console.log('no hay')
    shownCriminalIndexes.push(criminalIndex)
    return mostWanted[criminalIndex]
  }
}
// Coneta con la Api y trae los datos 
async function getMostWanted() {
  try {
    const response = await fetch('https://api.fbi.gov/wanted/v1/list',
      params = { "page": 1 });
    const data = await response.json();
    console.log('TOTAL: ' + data.total);
    return data.items;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
// Pinta los datos en el card
function printCriminal(filteredCriminalData) {
  const cardsSection = document.getElementById('cards')
  const cardHTML =

    `<div id="fbi">

      <div class="cards">
        <img class="wanted" src="${filteredCriminalData.images[0].large}" alt="">
          <h1>${filteredCriminalData.title}</h1>
          <p class="description">${filteredCriminalData.reward_text}</p>
          <p class="delito">${filteredCriminalData.subjects}</p>

      </div>
    </div>`



  cardsSection.insertAdjacentHTML("beforeend", cardHTML)
}


// Filtra los parametros que luego vamos a pedir por la key
function filterParams(criminalData) {
  let filteredCriminalData = {}
  const paramsNeeded = [
    "title",
    "images",
    "aliases",
    "details",
    "reward_text",
    "scars_and_marks",
    "subjects",
    "url"
  ]
  paramsNeeded.forEach(key => {
    filteredCriminalData[key] = criminalData[key]
  })

  return filteredCriminalData
}


main();
