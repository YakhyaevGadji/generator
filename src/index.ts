document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <div class="main">
            <div class="buttons__block">
                <h1 class="title">Creator AI</h1>
                
                <div class="buttons">
                    <div class="buttons__flex">
                        <button class="buttons__button" id="kit-one">Набор 1</button>
                        <button class="buttons__button" id="kit-two">Набор 2</button>
                    </div>
                    <button class="buttons__generate" disabled>Генератор</button>
                </div>
            </div>
            <div class="render__block">
                <div class="generator__block">
                    
                </div>
                <div class="selecteds">
                    
                </div>
            </div>
        </div>
`;
