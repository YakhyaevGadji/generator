import './style.css'
import {setupCounter} from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="generator">
        <div class="buttons">
            <div class="buttons__flex">
                <button class="buttons__button">Набор 1</button>
                <button class="buttons__button">Набор 1</button>
            </div>
            <button class="buttons__button">Генератор</button>
        </div>
        <div class="generator__block">
            tets
        </div>
    </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
