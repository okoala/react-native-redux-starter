const colors = [
  '#E74C3C', '#C0392B', '#1ABC9C', '#16A085',
  '#2ECC71', '#27AE60', '#3498DB', '#2980B9',
  '#9B59B6', '#8E44AD', '#34495E', '#2C3E50',
  '#E67E22', '#D35400', '#7F8C8D'
];

function rand (min, max) {
  return Min + Math.round(Math.random() * (max - min))
}

export function () {
  return colors[rand(0, colors.length - 1)]
}
