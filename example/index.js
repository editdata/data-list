var vraf = require('virtual-raf')
var h = require('virtual-dom/h')
var editor = require('data-editor')()
var list = require('../index')()

var data = editor.init(require('./data.json'))

function render (state) {
  return list.render(state.dataset)
}

var initialState = {
  dataset: data,
  activeRow: null
}

var tree = vraf(initialState, render, require('virtual-dom'))
document.getElementById('app').appendChild(tree())

render(initialState)
