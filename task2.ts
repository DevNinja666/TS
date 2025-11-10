///1

function swapCharacters(str: string): void {
    let result: string = "";

    for (let i = 0; i < str.length; i++) {
        let ch: string = str[i];

        if (ch >= "0" && ch <= "9") {
            result += "_";
        } else if (ch === ch.toUpperCase()) {
            result += ch.toLowerCase();
        } else {
            result += ch.toUpperCase();
        }
    }

    console.log(result);
}

swapCharacters("Abc123XyZ"); 



////2

function toCamelCase(str: string): void {
    let result: string = "";
    let makeUpper: boolean = false;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "-") {
            makeUpper = true;
        } else {
            if (makeUpper) {
                result += str[i].toUpperCase();
                makeUpper = false;
            } else {
                result += str[i];
            }
        }
    }

    console.log(result);
}

toCamelCase("background-color");



//3
function makeAbbreviation(str: string): void {
    let result: string = "";
    let words: string[] = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            result += words[i][0].toUpperCase();
        }
    }

    console.log(result);
}

makeAbbreviation("cascading style sheets"); 



//4
function parseURL(url: string): void {
    let protocol: string = "";
    let domain: string = "";
    let path: string = "";

    let parts: string[] = url.split("://");
    protocol = parts[0];

    let domainAndPath: string[] = parts[1].split("/");
    domain = domainAndPath[0];

    path = "/";
    for (let i = 1; i < domainAndPath.length; i++) {
        path += domainAndPath[i];
        if (i < domainAndPath.length - 1) {
            path += "/";
        }
    }

    console.log("протокол:", protocol);
    console.log("домен:", domain);
    console.log("путь:", path);
}
parseURL("https://itstep.org/ua/about");

//5
function print(template: string, a1?: any, a2?: any, a3?: any, a4?: any): void {
    let result: string = "";
    for (let i = 0; i < template.length; i++) {
        if (template[i] === "%" && !isNaN(Number(template[i + 1]))) {
            let num = Number(template[i + 1]);

            if (num === 1) result += a1;
            if (num === 2) result += a2;
            if (num === 3) result += a3;
            if (num === 4) result += a4;

            i++;
        } else {
            result += template[i];
        }
    }
    console.log(result);
}

print("Today is %1 %2.%3.%4", "Monday", 10, 8, 2020);





