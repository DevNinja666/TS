
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>ExtendedDate (Task 3)</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f1f1f1;
        }

        .block {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 350px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .title {
            font-size: 22px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .result {
            margin-top: 10px;
            padding: 10px;
            background: #eef;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <div class="block">
        <div class="title">ExtendedDate – Результаты</div>

        <label>Введите дату:</label><br>
        <input type="date" id="dateInput"><br><br>

        <button onclick="checkDate()">Проверить</button>

        <div id="output" class="result"></div>
    </div>

    <script src="script.js"></script>

</body>
</html>



      ///ts

class ExtendedDate extends Date {

    constructor(dateString?: string | number) {
        super(dateString);
    }
    toReadableString(): string {
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];

        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    IsFuture(): boolean {
        return this.getTime() >= Date.now();
    }

    IsLeapYear(): boolean {
        const year = this.getFullYear();
        return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
    }
}



----
function checkDate(): void {
    const input = document.getElementById("dateInput") as HTMLInputElement;
    const output = document.getElementById("output") as HTMLDivElement;

    if (!input.value) {
        output.innerHTML = "Введите дату!";
        return;
    }

    const d = new ExtendedDate(input.value);

    output.innerHTML = `
        <b>Введённая дата:</b> ${d.toLocaleDateString()} <br>
        <b>Текстовая дата:</b> ${d.toReadableString()} <br>
        <b>Будущая дата:</b> ${d.IsFuture() ? "Да" : "Нет"} <br>
        <b>Год високосный:</b> ${d.IsLeapYear() ? "Да" : "Нет"} <br>
    `;
}

