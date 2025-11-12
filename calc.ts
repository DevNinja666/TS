const result = document.getElementById('result') as HTMLInputElement;
const buttons = document.querySelectorAll('button[data-value]');
const clearBtn = document.getElementById('clear') as HTMLButtonElement;
const equalBtn = document.getElementById('equal') as HTMLButtonElement;
buttons.forEach(button => {
  button.addEventListener('click', () => {
    result.value += button.getAttribute('data-value');
  });
});


clearBtn.addEventListener('click', () => {
  result.value = '';
});


equalBtn.addEventListener('click', () => {
  try {
   
    result.value = eval(result.value) as unknown as string;
  } catch {
    result.value = 'Ошибка';
  }
});
