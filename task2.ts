// CssObject
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



// -HtmlObject

class HtmlObject {
    tagName: string;
    selfClosing: boolean;
    textContent: string;
    attributes: { name: string; value: string }[];
    styles: CssObject | null;
    children: HtmlObject[];

    constructor(tagName: string, selfClosing = false, textContent = "") {
        this.tagName = tagName;
        this.selfClosing = selfClosing;
        this.textContent = textContent;

        this.attributes = [];
        this.styles = null;
        this.children = [];
    }


    setAttribute(name: string, value: string): void {
        this.attributes.push({ name, value });
    }

    setStyles(styleObj: CssObject): void {
        this.styles = styleObj;
    }

    addChildEnd(child: HtmlObject): void {
        this.children.push(child);
    }

    addChildStart(child: HtmlObject): void {
        this.children.unshift(child);
    }

    getHtml(indent = 0): string {
        const space = " ".repeat(indent);

        let attrs = "";

        this.attributes.forEach(attr => {
            attrs += ` ${attr.name}="${attr.value}"`;
        });

        if (this.styles) {
            const s = this.styles.styles;
            if (Object.keys(s).length > 0) {
                let inline = "";
                for (const key in s) inline += `${key}: ${s[key]}; `;
                attrs += ` style="${inline.trim()}"`;
            }
        }

        if (this.selfClosing) {
            return `${space}<${this.tagName}${attrs} />`;
        }

        let html = `${space}<${this.tagName}${attrs}>`;

     
        if (this.textContent) {
            html += this.textContent;
        }

       
        if (this.children.length > 0) {
            html += "\n";
            this.children.forEach(child => {
                html += child.getHtml(indent + 2) + "\n";
            });
            html += space;
        }

        html += `</${this.tagName}>`;

        return html;
    }
}


---------
const wrapperStyle = new CssObject(".wrapper");
wrapperStyle.setStyle("padding", "20px");
wrapperStyle.setStyle("background", "#eee");
wrapperStyle.setStyle("border-radius", "10px");

const wrapper = new HtmlObject("div");
wrapper.setAttribute("class", "wrapper");
wrapper.setStyles(wrapperStyle);

const title = new HtmlObject("h2", false, "Hello from TypeScript!");
const text = new HtmlObject("p", false, "Этот HTML создан через HtmlObject.");

wrapper.addChildEnd(title);
wrapper.addChildEnd(text);

document.write(wrapper.getHtml());
