class CssObject {
    selector: string;
    styles: Record<string, string>;

    constructor(selector: string) {
        this.selector = selector;
        this.styles = {};
    }

    setStyle(property: string, value: string): void {
        this.styles[property] = value;
    }

    removeStyle(property: string): void {
        delete this.styles[property];
    }

    getCss(): string {
        let css = `${this.selector} {\n`;
        for (const key in this.styles) {
            css += `  ${key}: ${this.styles[key]};\n`;
        }
        css += "}";
        return css;
    }
}

const cssObj = new CssObject(".title");
cssObj.setStyle("color", "blue");
cssObj.setStyle("font-size", "24px");

console.log(cssObj.getCss());
