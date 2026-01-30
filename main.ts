type ColorType = 'HEX' | 'RGB' | 'RGBA';

interface Color {
  name: string;
  value: string;
  type: ColorType;
}

const nameInput = document.getElementById('name') as HTMLInputElement;
const valueInput = document.getElementById('value') as HTMLInputElement;
const palette = document.getElementById('palette') as HTMLDivElement;
const error = document.getElementById('error') as HTMLDivElement;
const addBtn = document.getElementById('add') as HTMLButtonElement;
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const rgbRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
const rgbaRegex = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|0?\.\d+|1)\s*\)$/;

function detectColorType(value: string): ColorType | null {
  if (hexRegex.test(value)) return 'HEX';
  if (rgbaRegex.test(value)) return 'RGBA';
  if (rgbRegex.test(value)) return 'RGB';
  return null;
}

function createColorCard(color: Color): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'color-card';

  const preview = document.createElement('div');
  preview.className = 'preview';
  preview.style.background = color.value;

  const info = document.createElement('div');
  info.className = 'info';
  info.innerHTML = `
    <strong>${color.name.toLowerCase()}</strong><br>
    ${color.value}<br>
    <span class="type">${color.type}</span>
  `;

  card.append(preview, info);
  return card;
}

addBtn.addEventListener('click', () => {
  error.textContent = '';

  const name = nameInput.value.trim();
  const value = valueInput.value.trim();

  if (!nameRegex.test(name)) {
    error.textContent = 'Название: только буквы, без регистра';
    return;
  }

  const type = detectColorType(value);
  if (!type) {
    error.textContent = 'Неверный формат цвета';
    return;
  }

  const color: Color = { name, value, type };
  palette.appendChild(createColorCard(color));

  nameInput.value = '';
  valueInput.value = '';
});
