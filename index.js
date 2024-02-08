const fs = require('fs')
const pug = require('pug')
const htmlnano = require('htmlnano')
const safe = require('htmlnano').presets.safe

const htmlOptions = {
  removeEmptyAttributes: false,
  collapseWhitespace: 'conservative',
}

const erros = require('./data.json')

const render = pug.compileFile('./template.pug', { basedir: './' })

fs.mkdir('./dist/', { recursive: true }, (err) => {
  if (err) throw err;
});

erros.forEach((erro) => {
  const html = render(erro)

  htmlnano
    .process(html, htmlOptions, safe)
    .then((result) => {
      fs.writeFileSync(`./dist/${erro.code}.html`, result.html)
    })
    .catch((err) => { console.error(err) })

})
