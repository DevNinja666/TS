const table = document.getElementById('myTable') as HTMLTableElement;
const rows = table.getElementsByTagName('tr');

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];

  row.addEventListener('mouseenter', () => {
    row.classList.add('hovered');
  });

  row.addEventListener('mouseleave', () => {
    row.classList.remove('hovered');
  });
}
