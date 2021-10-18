window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const customText = urlParams.get('text') || 'FOLLOW TIKTOK @dimasmiftah';
const space = '                        ';
const txt = space + customText;

var hCell = 80;
var vCell = 20;
var sPos = Math.random() * 10000;
var tick = false;
var pval = false;
var u = 0;
var ready = true;

var c = document.createElement('canvas');

function _div() {
  return document.getElementById('led');
}

function _class(e, cn) {
  if (e.setAttribute) {
    e.setAttribute('className', cn);
  }
  e.className = cn;
}

function _isOn(x, y) {
  x += Math.floor(sPos);

  if (y >= charH) return false;

  var cidx = x / charW;
  cidx = cidx % txt.length;

  var gidx = txt.charCodeAt(cidx) - _cOff;
  if (gidx < 0 || gidx >= _cdisp.length) return false;
  else {
    x = x % charW;
    var val = _cdisp[gidx][x * charH + y];

    if (val == 0) return true;
    else return false;
  }
}

function _ref(c) {
  if (!c) return;

  var $ = c.getContext('2d');
  if (!$) return;

  var colOn = 'hsla(' + u + ', 100%, 50%, 1)';
  var colOff = 'hsla(0,0%,10%,1)';
  var w = (c.width = window.innerWidth);
  var h = (c.height = window.innerHeight / 4);
  var cw = w / hCell;
  var ch = h / vCell;

  for (var i = 0; i < hCell; i++) {
    for (var j = 0; j < vCell; j++) {
      var on = _isOn(i, j);
      var comp = false;
      if (pval) {
        if (on == pval[i][j]) comp = true;
      }
      if (!comp) {
        var col = 0;
        if (on) col = colOn;
        else col = colOff;
        $.fillStyle = col;
        $.beginPath();

        $.rect(i * cw, j * ch, cw - 1, ch - 1);
        $.fill();
        $.closePath();
      }
    }
  }
}

function refTbl(tbody) {
  var trs = tbody.getElementsByTagName('tr');
  var nval = new Array();
  for (var i = 0; i < trs.length; i++) {
    var j = 0;
    nval.push(new Array());
    for (var tdN = trs[i].firstChild; tdN; tdN = tdN.nextSibling) {
      if (!tdN.tagName) continue;
      if (!tdN.tagName.toUpperCase() == 'TD') continue;

      var on = _isOn(j, i);
      nval[i].push(on);
      var comp = false;
      if (pval) {
        if (on == pval[i][j]) comp = true;
      }
      if (!comp) {
        if (_isOn(j, i)) _class(tdN, 'on');
        else _class(tdN, 'off');
      }
      j++;
    }
  }
  pval = nval;
}

function dsptbel() {
  var tb = document.createElement('tbody');

  for (var j = 0; j < vCell; j++) {
    var tr = document.createElement('tr');
    for (var i = 0; i < hCell; i++) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(' '));
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  }

  return tb;
}

function tblelm() {
  var c = document.createElement('canvas');

  return c;
}

function _dsptblelm() {
  var tble = document.createElement('table');
  var tb = dsptbel();

  refTbl(tb);

  tbl.appendChild(tb);
  return tbl;
}

function _anim() {
  u -= 0.5;
  if (!ready) return;
  var _curt = new Date().getTime();
  if (tick) {
    var dt = _curt - tick;
    sPos += dt * 0.02;
  }
  tick = _curt;
  upd();

  window.requestAnimFrame(_anim);
}

function upd() {
  var elem = _div();
  if (elem) {
    var tbs = elem.getElementsByTagName('tbody');
    if (tbs.length > 0) {
      refTbl(tbs[0]);
    } else {
      var celm = elem.getElementsByTagName('canvas');

      if (celm.length > 0) {
        _ref(celm[0]);
      } else {
        var c = tblelm();
        elem.appendChild(c);
        _ref(c);
      }
    }
  }
}
_anim();
