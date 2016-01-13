/**
 * Events
 * addEventListener / removeEventListener polyfill to support all browsers.
 *
 * @author Cole Chamberlain (upgraded from http://www.dustindiaz.com/rock-solid-addevent/)
 * @module events.js
 *
 */

export const addEvent = (obj, type, fn, useCapture = false) => {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, useCapture)
  } else if (obj.attachEvent) {
    obj[`e${type}${fn}`] = fn
    obj[type+fn] = () => { obj[`e${type}${fn}`](window.event) }
    obj.attachEvent(`on${type}`, obj[type+fn])
  } else {
    obj['on'+type] = obj['e'+type+fn]
  }
}

export const removeEvent = (obj, type, fn, useCapture = false) => {
  if(obj.removeEventListener)
    obj.removeEventListener(type, fn, useCapture)
  if(type.substring(0, 2) !== 'on'){
    type = `on${type}`
  }
  if(obj.detachEvent){
    obj.detachEvent(type, fn)
  }
  if(obj[type])
    obj[type] = null
}
