const iconeSol = document.getElementById('btnTemaLight');
const iconeLua = document.getElementById('btnTemaDark');

function exibirLight(el) {
  document.getElementById(el).style.marginLeft = "4px"
}

function exibirDark(el) {
  document.getElementById(el).style.marginLeft = "48px"
}

function tema(t){
  const ls = localStorage.getItem("tema");

  if(ls) document.body.classList.remove(ls);

  document.body.classList.add(t)
  localStorage.setItem("tema", t);
}

var ls = localStorage.getItem("tema");
  if(ls) document.body.classList.add(ls);

// const themes = {
//     light: {
//       background: 'white',
//       text: 'black',
//     },
//     dark: {
//       background: 'black',
//       text: 'white',
//     }
//   };

// function setTheme(newTheme) {
// const themeColors = themes[newTheme]; // Seleciona o tema para aplicar

// Object.keys(themeColors).map(function(key) {
//     html.style.setProperty(`--${key}`, themeColors[key]); // Altera as variáveis no css
// });
// }

// const darkModeToggle = document.querySelector('.darkMode');

// darkModeToggle.addEventListener('change', function({ target }) {
//     setTheme(target.checked ? 'dark' : 'light');
// });

// function setTheme(newTheme) {
//     const themeColors = themes[newTheme]; // Seleciona o tema para aplicar
  
//     Object.keys(themeColors).map(function(key) {
//       html.style.setProperty(`--${key}`, themeColors[key]); // Altera as variáveis no css
//     });
  
//     localStorage.setItem('theme', newTheme); //Salva o tema escolhido no localStorage
// }

// const theme = localStorage.getItem('theme');

// if( theme ) {
//   setTheme(theme)
// }