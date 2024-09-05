import './style.css'

//Кнопка
type Button = {
    title: string; //Название в UI
    value: string; //Название в Backend
}

//Карточка
type Card = {
    id: number; //Уникальное число
    img: string; //Изображение
    title: string; //Название карточки
    kit: 'one' | 'two'; //Тип карточки
}

interface Data {
    buttons: Button[];
    cards: Card[];
}

//Данные корточек и кнопак
const data: Data = {
    buttons: [
        {title: 'Набор 1', value: 'kitOne'},
        {title: 'Набор 2', value: 'kitTwo'},
    ],

    cards: [
        {id: 1, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nAnjJlvd4VGFaoKIyredFj6o66AFuevc7A&s', title: 'kit one1', kit: 'one'},
        {id: 2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgMO_vLuojLTA7Jmm4XBQmSuF0ykBMXZVig&s', title: 'kit one2', kit: 'one'},
        {id: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH0lutGHI_snEF6hOUkp83oXDBuGPhHST9YQ&s', title: 'kit one3', kit: 'one'},
        {id: 4, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimeX2iQJcWi0ZIJ38Lb0SCZ1Yte71DEJWyw&s', title: 'kit one4', kit: 'one'},
        {id: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlytK5DOFx-h3FUbWQ0a5vk5xGurkrUEYRkQ&s', title: 'kit one5', kit: 'one'},
        {id: 6, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qXIMl6Fo07vNCLdwyHjpMno7bc-CUsmgBg&s', title: 'kit one6', kit: 'one'},
        {id: 7, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAR_NokEMsPB2RAL6gc2CEqHd_7ZEcSjorQ&s', title: 'kit one1', kit: 'two'},
        {id: 8, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4DVbS8xGvoVmc5TeqhV1JPT_K9w4Nff4UzA&s', title: 'kit one2', kit: 'two'},
        {id: 9, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhdNPW46S44FHPAiB27dMinszAqabpXfGQQ&s', title: 'kit one3', kit: 'two'},
        {id: 10, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6mtllIWGnO8L3OKlLDPL9RvoLTJmT8w9Lg&s', title: 'kit one4', kit: 'two'},
        {id: 11, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtuu3EKfalAj5i9ZX4oSrjDaeVK1px9qQ3Pw&s', title: 'kit one5', kit: 'two'},
        {id: 12, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDQkRN3MeUWK4U-9j0hjr0bNGFUcgQN5vhg&s', title: 'kit one6', kit: 'two'},
    ]
};

const buttonOne = document.querySelector('#kit-one');
const buttonTwo = document.querySelector('#kit-two');
const list = document.querySelector('.generator__block');
const selects = document.querySelector('.selecteds');
const buttonGenerate = document.querySelector('.buttons__generate');
let selectedCards: any = [];

//Слушатель на кнопку Набор 1
buttonOne?.addEventListener('click', (event: any) => {
    toggleActive(event)
    handleButtonClick('one', 4)
});

//Слушатель на кнопку Набор 2
buttonTwo?.addEventListener('click', (event: any) => {
    toggleActive(event)
    handleButtonClick('two', 5)
});

function toggleActive(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;

    if (target && target.classList.contains('buttons__button')) {
        document.querySelectorAll('.buttons__button').forEach(button => {
            button.classList.remove('button__active');
        });

        target.classList.add('button__active');
    }
}

//фильтрует вырбранный раздел
function handleButtonClick(kit: string, count: number) {
    const filtersArray = data.cards.filter((item) => item.kit === kit);
    if(selects) clearRendering(selects);

    selectedCards = [];
    toggleButtonGenerate();

    renderCard(filtersArray.slice(0, count));
    renderSelectedCards(filtersArray);
}

//Рендерит карточек
function renderCard(filterArray: Card[]) {
    if(!list) return false;

    clearRendering(list);

    filterArray.forEach(item => {
        const activedCard = selectedCards.includes(item.id);
        const indexCard = selectedCards.indexOf(item.id) + 1;

        list.insertAdjacentHTML('beforeend', `
            <div class="card ${selectedCards.indexOf(item.id) > -1 ? 'card__active' : ''}" data-id="${item.id}">
                <img class="selecteds__img" src="${item.img}" alt="${item.title}"/>
                <p class="card__counter">${activedCard ? indexCard : ''}</p>
            </div>
        `);

        const card = document.querySelector(`.card[data-id="${item.id}"]`);

        card?.addEventListener('click', () => toggleCard(item.id, card, filterArray));
    });
}

//Меняет класс карточки на активную
function toggleCard(id: number, card: Element, filterArray: Card[]) {
    card.classList.add('card__active');
    selectedCards.push(id);

    toggleButtonGenerate();

    //Рендерим активные карточки
    renderSelectedCards(filterArray);
    renderCard(filterArray);
}

//Рендерит выбранные карточки
function renderSelectedCards(filterArray: Card[]) {
    if(!selects) return false;

    clearRendering(selects);

    data.cards.forEach((item: any) => {
        if(selectedCards.includes(item.id)) {
            selects.insertAdjacentHTML('beforeend', `
               <div class="selecteds__item" data-card="${item.kit + item.id}">
                   <img class="card__img" src="${item.img}" alt="${item.title}"/>
               </div>
            `);

            const card = document.querySelector(`.selecteds__item[data-card="${item.kit + item.id}"]`);

            card?.addEventListener('click', () => removeCard(card, item.id, filterArray));
        }
    })
}

//Очищает выбранный элемент старницы
function clearRendering(elem: Element) {
    elem.innerHTML = '';
}

//Удаляет карточку из выбранных и меняет класс в карточках
function removeCard(elem: Element, id: number, filterArray: Card[]) {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    const index = selectedCards.indexOf(id);

    if (card) {
        card.classList.remove('card__active');
    }

    if (index > -1) {
        selectedCards.splice(index, 1);
    }

    toggleButtonGenerate();

    elem.remove();
    renderCard(filterArray);
}

function toggleButtonGenerate() {
    if(selectedCards.length >= 2) {
        buttonGenerate?.classList.add('buttons__generate__active');
        buttonGenerate?.setAttribute('disabled', 'disabled');
    }else {
        buttonGenerate?.classList.remove('buttons__generate__active');
        buttonGenerate?.removeAttribute('disabled');
    }
}