var BaseElement = require('base-element')
var inherits = require('inherits')
var rowsView = require('./rows')

module.exports = DataList
inherits(DataList, BaseElement)

function DataList (options) {
  if (!(this instanceof DataList)) return new DataList(options)
  options = options || {}
  BaseElement.call(this, options.el)
  var self = this

  this.rows = rowsView(options)
  this.properties = propertiesView(options)
  this.rows.addEventListener('load', function (el) {
    el.style.height = (window.innerHeight - (options.offsetX || 35)) + 'px'
  })

  this.rows.addEventListener('click', function (e, row, key, value) {
    self.send('click', e, row, key, value)
  })

  this.rows.addEventListener('focus', function (e, row, key, value) {
    self.send('focus', e, row, key, value)
  })

  this.rows.addEventListener('blur', function (e, row, key, value) {
    self.send('blur', e, row, key, value)
  })

  this.rows.addEventListener('input', function (e, row, key, value) {
    self.send('input', e, row, key, value)
  })

  this.on = this.addEventListener
}

DataList.prototype.render = function (state) {
  var vtree = this.html('div#data-list', [
    this.properties.render(state),
    this.rows.render(state)
  ])

  return this.afterRender(vtree)
}
