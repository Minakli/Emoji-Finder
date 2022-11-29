import { tmpData } from "./emoji.js";

let data;
const headerInput = document.createElement("input");
const mainCardsBlock = document.createElement("div");

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
  const divCont = document.createElement("div");
  const h1 = document.createElement("h1");
  const headerP = document.createElement("p");
  const divInput = document.createElement("div");
  const contEmogi = document.createElement("div");
  contEmogi.append(mainCardsBlock);
  document.body.prepend(header);
  document.body.append(contEmogi);
  header.prepend(divCont);
  divCont.append(h1);
  divCont.append(headerP);
  divCont.append(divInput);
  divInput.append(headerInput);
  headerInput.setAttribute("type", "text");
  headerInput.setAttribute("placeholder", "placeholder");
  mainCardsBlock.classList.add("main__cards");
  divCont.className = "container";
  contEmogi.className = "body__background";
  h1.textContent = "Emoji Finder";
  headerP.textContent = "Find emoji by keywords";
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
