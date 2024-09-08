import {model} from "./model.ts";
import {view} from "./view.ts";

const controller = (function(budgetCtrl, uiCtrl) {
    const DOM = uiCtrl.getDomStrings;

    // Инициализация приложения
    const initializeApp = (): void => {
        const list = document.querySelector(DOM.listCard) as HTMLElement;
        const selectedList = document.querySelector(DOM.selectedList) as HTMLElement;

        list.addEventListener("click", handleCardClick);
        selectedList.addEventListener("click", handleSelectedCardClick);
    };

    // Обработка клика по карточке
    const handleCardClick = (event: MouseEvent): void => {
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

        toggleButtonGenerate();
    };

    // Обработка клика по выбранной карточке
    const handleSelectedCardClick = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        const selectedItem = target.closest(DOM.selectedsItem) as HTMLElement;

        if (selectedItem) {
            const id = selectedItem.dataset.card;

            budgetCtrl.toggleStatusCard(Number(id));
            budgetCtrl.removeSelectedId(Number(id));

            uiCtrl.removeSelectedCard(selectedItem);

            toggleButtonGenerate();
            renderCard();
        }
    };

    // Рендер выбранных карточек
    const handleSelected = (): void => {
        const selectedCards = budgetCtrl.getSelcteds();

        selectedCards.forEach((card) => {
            uiCtrl.renderSelectedCard(card);
        });
    };

    // Рендерит карточки после клика на кнопки
    const renderCard = (): void => {
        const cards = budgetCtrl.getFilterCard();
        const selectedCards = budgetCtrl.getSelcteds();
        const selectedCardId = selectedCards.map((card) => card.id);

        uiCtrl.clearListElement();

        cards.forEach((item) => {
            const indexCard = selectedCardId.indexOf(item.id) + 1;

            uiCtrl.renderCardInList(item, indexCard);
        });
    };

    // Обработка клика по кнопке
    const handleButtonClick = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        const kit = target.id;
        const id = target.dataset.kit;

        budgetCtrl.setDataKit(kit);
        budgetCtrl.setDataCount(Number(id));
        budgetCtrl.resetCardsStatus();

        uiCtrl.toggleActive(event);
        uiCtrl.clearSelectedList();

        budgetCtrl.resetSelectedCards();

        toggleButtonGenerate();
        renderCard();
    };

    // Обновление состояния кнопки generate
    const toggleButtonGenerate = () => {
        const selectedCards = budgetCtrl.getSelcteds();

        if(selectedCards.length >= 2) {
            uiCtrl.toggleActiveGenerateBtn(true);
        }else {
            uiCtrl.toggleActiveGenerateBtn(false);
        }
    };

    const buttons = document.querySelectorAll<HTMLButtonElement>(DOM.buttons);

    buttons?.forEach((item): void => {
        item.addEventListener('click', handleButtonClick);
    });

    return {
        init: initializeApp
    };
})(model, view);

controller.init();