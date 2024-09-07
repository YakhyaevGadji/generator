import {model} from "./model.ts";
import {view} from "./view.ts";

const controller = (function(budgetCtrl, uiCtrl) {
    const DOM = uiCtrl.getDomStrings;

    // Функция для инициализации приложения
    const initialController = () => {
        const list = document.querySelector(DOM.listCard) as HTMLElement;
        const selectedList = document.querySelector(DOM.selectedList) as HTMLElement;

        list.addEventListener("click", onClickCard);
        selectedList.addEventListener("click", onClickSelectedCard);
    };

    // Обращается к функции рендеринга выбранных элементов
    const handleSelected = (): void => {
        const selectedCards = budgetCtrl.getSelcteds();

        selectedCards.forEach((card) => {
            uiCtrl.renderSelectedCard(card);
        });
    };

    // Клик по карточке
    const onClickCard = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;

        const cardElem = target.closest(DOM.card) as HTMLElement | null;

        if (cardElem) {
            const id = cardElem.dataset.id;

            budgetCtrl.toggleStatusCard(Number(id));
            budgetCtrl.addSelctedsCardId(Number(id));

            uiCtrl.clearSelectedList();

            handleSelected();
            renderCard();
        }
    };

    // Клик по выбранным карточкам
    const onClickSelectedCard = (event: MouseEvent): boolean | void => {
        const target = event.target as HTMLElement;

        if (!target) return false;

        const selectedItem = target.closest(DOM.selectedsItem) as HTMLElement;

        if (selectedItem) {
            const id = selectedItem.dataset.card;

            budgetCtrl.toggleStatusCard(Number(id));
            budgetCtrl.removeSelectedId(Number(id));

            uiCtrl.removeSelectedCard(selectedItem);

            renderCard();
        }
    };

    // Рендерит карточки после клика на кнопки
    const renderCard = (): void => {
        const cards = budgetCtrl.getFilterCard();
        const selectedCards = budgetCtrl.getSelcteds();

        uiCtrl.clearListElement();

        const selectedCardId = selectedCards.map((card) => card.id);

        cards.forEach((item) => {
            const indexCard = selectedCardId.indexOf(item.id) + 1;

            uiCtrl.renderCardInList(item, indexCard);
        });
    };

    // Сохраняет id и kit в файле model
    const onClickButton = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;

        const kit = target.id;
        const id = target.dataset.kit;

        budgetCtrl.setDataKit(kit);
        budgetCtrl.setDataCount(Number(id));
        budgetCtrl.resetCardsStatus();

        uiCtrl.toggleActive(event);
        uiCtrl.clearSelectedList();

        budgetCtrl.resetSelectedCards();

        renderCard();
    };

    const buttons = document.querySelectorAll<HTMLButtonElement>(DOM.buttons);

    buttons?.forEach((item): void => {
        item.addEventListener('click', onClickButton);
    });

    return {
        init: initialController
    };
})(model, view);

controller.init();