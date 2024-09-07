import {Data} from "../types.ts";

export const model = (function() {
    let data: Data = {
        buttons: [
            {title: 'Набор 1', value: 'kitOne'},
            {title: 'Набор 2', value: 'kitTwo'},
        ],
        cards: [
            {id: 1, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nAnjJlvd4VGFaoKIyredFj6o66AFuevc7A&s', title: 'kit one1', kit: 'one', status: false},
            {id: 2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgMO_vLuojLTA7Jmm4XBQmSuF0ykBMXZVig&s', title: 'kit one2', kit: 'one', status: false},
            {id: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH0lutGHI_snEF6hOUkp83oXDBuGPhHST9YQ&s', title: 'kit one3', kit: 'one', status: false},
            {id: 4, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimeX2iQJcWi0ZIJ38Lb0SCZ1Yte71DEJWyw&s', title: 'kit one4', kit: 'one', status: false},
            {id: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlytK5DOFx-h3FUbWQ0a5vk5xGurkrUEYRkQ&s', title: 'kit one5', kit: 'one', status: false},
            {id: 6, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qXIMl6Fo07vNCLdwyHjpMno7bc-CUsmgBg&s', title: 'kit one6', kit: 'one', status: false},
            {id: 7, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAR_NokEMsPB2RAL6gc2CEqHd_7ZEcSjorQ&s', title: 'kit one1', kit: 'two', status: false},
            {id: 8, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4DVbS8xGvoVmc5TeqhV1JPT_K9w4Nff4UzA&s', title: 'kit one2', kit: 'two', status: false},
            {id: 9, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhdNPW46S44FHPAiB27dMinszAqabpXfGQQ&s', title: 'kit one3', kit: 'two', status: false},
            {id: 10, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6mtllIWGnO8L3OKlLDPL9RvoLTJmT8w9Lg&s', title: 'kit one4', kit: 'two', status: false},
            {id: 11, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtuu3EKfalAj5i9ZX4oSrjDaeVK1px9qQ3Pw&s', title: 'kit one5', kit: 'two', status: false},
            {id: 12, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDQkRN3MeUWK4U-9j0hjr0bNGFUcgQN5vhg&s', title: 'kit one6', kit: 'two', status: false},
        ],
        selectedCards: [],
        buttonData: {
            kit: '',
            count: 0
        }
    };

    // Возвращает название kit
    const getDataKit = () => {
        return data.buttonData.kit
    };

    // Записывает в kit новое название
    const setDataKit = (kit: string) => {
        data.buttonData.kit = kit;
    };

    // Записывает количество карточек
    const setDataCount = (count: number) => {
        data.buttonData.count = count;
    };

    // Возвращает количестов карточек
    const getDataCount = () => {
        return data.buttonData.count;
    };

    // Фильтрирует карточки в их kit
    const getFilterCard = () => {
        return data.cards.filter((item) => item.kit === data.buttonData.kit).splice(0, data.buttonData.count);
    };

    // Возвращяет выбранные карточки
    const getSelcteds = () => {
        return data.selectedCards;
    };

    // Удаляет нужный объект из массива выбранных карточек по id
    const removeSelectedId = (id: number) => {
        data.selectedCards = data.selectedCards.filter((item) => item.id !== Number(id));
    };

    // Записывает пустой массив в выбранных карточках
    const resetSelectedCards = () => {
        data.selectedCards = [];
    };

    // Меняет статус карточке
    const toggleStatusCard = (id: number) => {
        const index = data.cards.findIndex((item) => item.id == id);
        data.cards[index].status = !data.cards[index].status;
    };

    // Добавляет в массив объект выбранных карточек
    const addSelctedsCardId = (id: number) => {
        const item = data.cards.find((item) => item.id == Number(id));

        if(item) {
            data.selectedCards.push(item);
        }
    };

    // Сбрасывает статус всех карточек
    const resetCardsStatus = () => {
        data.cards.forEach((_, index) => {
           data.cards[index].status = false;
        });
    };

    // Возвращяет массив карточек сравнивая их с выбранными карточками
    const findSelectedCardInCards = () => {
        return data.cards.filter(item => data.selectedCards.includes(item));
    };

    return {
        setDataKit,
        getDataKit,
        setDataCount,
        getDataCount,
        getFilterCard,
        resetSelectedCards,
        addSelctedsCardId,
        getSelcteds,
        findSelectedCardInCards,
        toggleStatusCard,
        resetCardsStatus,
        removeSelectedId
    };
})();