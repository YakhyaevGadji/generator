import {Card} from "../types.ts";

export const view = (function() {

    // Обьект для поиска html элементов по тегу или id
    const DOMstrings = {
        buttons: '[data-button="nav"]',
        listCard: '.generator__block',
        selectedList: '.selecteds',
        selectedsItem: '.selecteds__item',
        card: '.card',
        buttonsGenerate: '.buttons__generate'
    };

    // html элемент в которой будут рендериться карточки
    const listCard = document.querySelector(DOMstrings.listCard) as HTMLElement;

    // html элемент вы которой будут рендериться выбранные карточки
    const selectedList = document.querySelector(DOMstrings.selectedList) as HTMLElement;

    // Кнопка generate
    const buttonsGenerate = document.querySelector(DOMstrings.buttonsGenerate) as HTMLButtonElement;

    // Рендерит карточки
    const renderCardInList = (card: Card, indexCard: number): void => {
        listCard?.insertAdjacentHTML('beforeend', `
            <div class="card ${card.status ? 'card__active' : ''}" data-id="${card.id}">
                <img class="selecteds__img" src="${card.img}" alt="${card.title}"/>
                <p class="card__counter">${indexCard !== 0 ? indexCard : ''}</p>
            </div>
        `);
    };

    // Рендерит выбранные карточки
    const renderSelectedCard = (item: Card): void => {
        selectedList?.insertAdjacentHTML('beforeend', `
            <div class="selecteds__item" data-card="${item.id}">
                <img class="card__img" src="${item.img}" alt="${item.title}"/>
            </div>
        `);
    };

    // Очищает html элемент в которой будут рендериться карточки
    const clearListElement = (): boolean | void => {
        if (!listCard) return false;

        listCard.innerHTML = '';
    };

    // Очищает html элемент в которой будут рендериться выбранне карточки
    const clearSelectedList = (): boolean | void => {
        if (!selectedList) return false;

        selectedList.innerHTML = '';
    };

    // Удаляет из страницы выбранную карточку
    const removeSelectedCard = (elem: HTMLElement): void => {
        elem.remove();
    };

    // Очищает html элемент где будут рендериться выбранные карточки
    const resetSelectedList = (): void => {
        selectedList.innerHTML = '';
    };

    // Переключает стили кнопок
    const toggleActive = (event: MouseEvent): void => {
        const target = event.target;

        if (target instanceof HTMLElement && target.classList.contains('buttons__button')) {
            document.querySelectorAll(DOMstrings.buttons).forEach(button => {
                button.classList.remove('button__active');
            });

            target.classList.add('button__active');
        }
    };

    //Переключает класс и disabled кнопки generate
    const toggleActiveGenerateBtn = (asActive: boolean): void => {
        buttonsGenerate.classList.toggle('buttons__generate__active', asActive);
        buttonsGenerate.disabled = !asActive;
    };

    return {
        getDomStrings: DOMstrings,
        renderCardInList,
        clearListElement,
        toggleActive,
        renderSelectedCard,
        clearSelectedList,
        resetSelectedList,
        removeSelectedCard,
        toggleActiveGenerateBtn
    }
})();