type TypeButtonData = {
    kit: string,
    count: number
}

//Кнопка
export type Button = {
    title: string; //Название в UI
    value: string; //Название в Backend
}

//Карточка
export type Card = {
    id: number; //Уникальное число
    img: string; //Изображение
    title: string; //Название
    kit: 'one' | 'two'; //Тип
    status: boolean; //Статус
}

export interface Data {
    buttons: Button[];
    cards: Card[];
    selectedCards: Card[];
    buttonData: TypeButtonData
}
