import {Card} from "../types.ts";

export const view = (function() {
    const DOMstrings = {
        buttons: '.buttons__button',
        listCard: '.generator__block',
        selectedList: '.selecteds',
        selectedsItem: '.selecteds__item',
        card: '.card'
    };

    const listCard = document.querySelector(DOMstrings.listCard) as HTMLElement;
    const selectedList = document.querySelector(DOMstrings.selectedList) as HTMLElement;

    const renderCardInList = (card: Card, indexCard: number): void => {
        listCard?.insertAdjacentHTML('beforeend', `
            <div class="card ${card.status ? 'card__active' : ''}" data-id="${card.id}">
                <img class="selecteds__img" src="${card.img}" alt="${card.title}"/>
                <p class="card__counter">${indexCard !== 0 ? indexCard : ''}</p>
            </div>
        `);
    };

    const renderSelectedCard = (item: Card): void => {
        selectedList?.insertAdjacentHTML('beforeend', `
            <div class="selecteds__item" data-card="${item.id}">
                <img class="card__img" src="${item.img}" alt="${item.title}"/>
            </div>
        `);
    };

    const toggleActiveCard = (card: HTMLDivElement): void => {
        card.classList.add('card__active');
    };

    const clearListElement = (): boolean | void => {
        if(!listCard) return false;

        listCard.innerHTML = '';
    };

    const clearSelectedList = (): boolean | void => {
        if(!selectedList) return false;

        selectedList.innerHTML = '';
    };

    const removeSelectedCard = (elem: HTMLElement): void => {
        elem.remove();
    };

    const resetSelectedList = (): void => {
        selectedList?.insertAdjacentHTML('beforeend', ``);
    };

    const toggleActive = (event: MouseEvent): void => {
        const target = event.target;

        if (target instanceof HTMLElement && target.classList.contains('buttons__button')) {
            document.querySelectorAll(DOMstrings.buttons).forEach(button => {
                button.classList.remove('button__active');
            });

            target.classList.add('button__active');
        }
    };

    return {
        getDomStrings: DOMstrings,
        renderCardInList,
        clearListElement,
        toggleActiveCard,
        toggleActive,
        renderSelectedCard,
        clearSelectedList,
        resetSelectedList,
        removeSelectedCard
    }
})();