function printStyledText(styles: { [key: string]: string }[], text: string): void {
    let styleString: string = "";

    for (let i = 0; i < styles.length; i++) {
        for (let key in styles[i]) {
            styleString += key + ":" + styles[i][key] + "; ";
        }
    }

    console.log("<p style='" + styleString + "'>" + text + "</p>");
}

printStyledText([{ color: "pink" }], "Hello world");
