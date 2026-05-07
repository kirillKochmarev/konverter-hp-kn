const coef = 0.7355;
let rowNumber = 1;
let history = [];

/**
 * Главная функция конвертации. Проверяет ввод и вызывает нужную функцию.
 * @returns {void}
 */
function convert() {
    const inputVal = document.getElementById('inputValue').value;
    const type = document.getElementById('conversionType').value;

    if (inputVal === "") {
        alert('Заполните поле');
        return;
    }
    
    const val = parseFloat(inputVal);
    if (isNaN(val) || val < 0) {
        alert('Введите корректное число в поле л.с.');
        return;
    }
    
    if (type === 'hpToKn')
        resultFromHp(val, type);
    
    if (type === 'knToHp')
        resultFromKn(val, type);
}

/**
 * Конвертирует лошадиные силы в килоньютоны и добавляет запись в таблицу
 * @param {number} val - значение в лошадиных силах
 * @param {string} type - тип конвертации ("hpToKn")
 * @returns {void}
 */
function resultFromHp(val, type) {
    const result = val * coef;
    document.getElementById('resultText').textContent = result.toFixed(2);
    
    if(isDuplicate(val, 'hpToKn')) {
        alert("Значение " + val + " уже есть в таблице для направления л.с. → кН");
        document.getElementById('inputValue').value = "";
        return;
    }
    
    history.push({ value: val, type: "hpToKn" });
    
    const tbody = document.getElementById('table');
    const row = tbody.insertRow();
    
    row.insertCell(0).textContent = rowNumber;
    row.insertCell(1).textContent = val;
    row.insertCell(2).textContent = "л.с. → кН";
    row.insertCell(3).textContent = result.toFixed(2);
    
    document.getElementById('inputValue').value = "";
    
    rowNumber++;
}

/**
 * Конвертирует килоньютоны в лошадиные силы и добавляет запись в таблицу
 * @param {number} val - значение в килоньютонах
 * @param {string} type - тип конвертации ("knToHp")
 * @returns {void}
 */
function resultFromKn(val, type) {
    const result = val / coef;
    document.getElementById('resultText').textContent = result.toFixed(2);
    
    if(isDuplicate(val, 'knToHp')) {
        alert("Значение " + val + " уже есть в таблице для направления кН → л.с.");
        document.getElementById('inputValue').value = "";
        return;
    }
    
    history.push({ value: val, type: "knToHp" });
    
    const tbody = document.getElementById('table');
    const row = tbody.insertRow();
    
    row.insertCell(0).textContent = rowNumber;
    row.insertCell(1).textContent = val;
    row.insertCell(2).textContent = "кН → л.с.";
    row.insertCell(3).textContent = result.toFixed(2);
    
    document.getElementById('inputValue').value = "";
    
    rowNumber++;
}

/**
 * Проверяет, есть ли уже такая конвертация в истории
 * @param {number} val - значение для проверки
 * @param {string} type - тип конвертации
 * @returns {boolean} - true если дубликат, false если нет
 */
function isDuplicate(val, type) {
    for (let i = 0; i < history.length; i++) {
        if (val === history[i].value && type === history[i].type)
            return true;
    }
    return false;
}