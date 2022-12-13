// import { tmpData } from "./emoji.js";

let data;
const headerInput = document.createElement("input");
const mainCardsBlock = document.createElement("div");
const main = document.querySelector("main");
let tmpData = await getEmoji();
//Получает массив с сервера
async function getEmoji() {
  let response = await fetch("https://emoji.ymatuhin.workers.dev/");
  let data = await response.json();
  return data;
}

//Фильтрация повторений в data.keywords
function dataFilter() {
  data = tmpData.map((elem) => {
    let keywordsSet = new Set(elem.keywords.split(" "));
    let keywordsArray = Array.from(keywordsSet);
    return {
      title: elem.title,
      symbol: elem.symbol,
      keywords: keywordsArray.join(" "),
    };
  });
}

//Создание header
function createHeader() {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const headerP = document.createElement("p");
  document.body.prepend(header);
  header.append(h1);
  header.append(headerP);
  header.append(headerInput);
  headerInput.setAttribute("type", "text");
  headerInput.setAttribute("placeholder", "      Placeholder");
  h1.textContent = "Emoji Finder";
  headerP.textContent = "Find emoji by keywords";
}
//Создание main
function createMain() {
  const contEmogi = document.createElement("div");
  const decorLine = document.createElement("div");
  main.append(contEmogi);
  contEmogi.className = "body__background";
  decorLine.className = "decor__line";
  mainCardsBlock.classList.add("main__cards");
  contEmogi.append(mainCardsBlock);
  contEmogi.append(decorLine);
}
//Создание footer
function createFooter() {
  const footer = document.createElement("footer");
  const footerText = document.createElement("p");
  footerText.classList.add("footer__text");
  footerText.textContent = "2022 © Made with love by me";
  document.body.append(footer);
  footer.append(footerText);
}
//Создание одной карточки
function createCard(emo) {
  let cardWrapper = document.createElement("div");
  cardWrapper.className = "card";
  let title = document.createElement("p");
  let symbol = document.createElement("p");
  let keywords = document.createElement("p");
  mainCardsBlock.append(cardWrapper);
  cardWrapper.append(symbol);
  cardWrapper.append(title);
  cardWrapper.append(keywords);
  title.textContent = emo.title;
  symbol.textContent = emo.symbol;
  keywords.textContent = emo.keywords;
}

//Отрисовка массива карточек
function showCards(arr = data) {
  arr.forEach((elem) => {
    createCard(elem);
  });
}
//Функция поиска
function searchCard() {
  let arrFilter = data.filter(
    (elem) =>
      elem.title
        .slice(0, headerInput.value.trim().length)
        .toLocaleLowerCase() ==
        headerInput.value.toString().toLocaleLowerCase().trim() ||
      elem.keywords
        .toLocaleLowerCase()
        .includes(headerInput.value.toLocaleLowerCase().trim())
  );
  return arrFilter;
}

dataFilter();
createHeader();
createMain();
createFooter();
showCards();
//Поиск
headerInput.addEventListener("input", () => {
  mainCardsBlock.innerHTML = "";
  showCards(searchCard());
});
//Возврат в исходное
headerInput.addEventListener("blur", () => {
  if (!headerInput.value) {
    showCards();
  }
});
