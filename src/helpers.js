import { escapeHTML } from './utils'



export const makeElement = function(el) {
  if (typeof el === 'undefined') {
    return el;
  }
  if (el instanceof HTMLElement) {
    return el;
  }
  if (typeof el === 'string') {
    if (!document) {
      throw Error('Not found `document` object.');
    }
    var _el = document.querySelector(el);
    if (!_el) {
      throw Error('Not found in document.querySelector(el)');
    }
    return _el;
  }
  throw TypeError('"el" is not HTMLElement or valid selector.');
};




export const createPreviewElement = function(file) {
  if (!(file instanceof File || file instanceof Blob)) {
    throw TypeError('invalid argument type: required File or Blob, but found ' + file.type);
  }

  var reader = new FileReader();
  
  if (/image\/.*/.test(file.type)) {
    if (!document) {
      throw Error('Not found `document` object.');
    }
    var img = document.createElement('img');
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      img.src = reader.result;
    };
    return img;
  }

  if (/application\/pdf/.test(file.type)) {
    if (!document) {
      throw Error('Not found `document` object.');
    }
    var obj = document.createElement('object');
    obj.type = 'application/pdf';
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      obj.data = reader.result;
    };
    return obj;
  }

  if (/text\/(.+)/.test(file.type)) {
    if (!document) {
      throw Error('Not found `document` object.');
    }
    var pre = document.createElement('pre');
    reader.readAsText(file);
    reader.onloadend = function() {
      pre.innerHTML = escapeHTML(reader.result);
    };
    return pre;
  }

  throw TypeError('Not support file type: ' + file.type);
};

