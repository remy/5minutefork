(function (d, w) {
  var actions = d.querySelector('.pagehead-actions'),
      button = '<li>' +
                 '<a href="' + w.location.href.replace(/https?:\/\/github/, 'http://5minfork') + '" class="minibutton" title="Create a 5 minute fork of this repo">' +
                   '<span class="mini-icon mini-icon-zap"></span>' +
                   '<span class="text">5 min fork</span>' +
                 '</a>' +
               '</li>'

  if (!(actions && document.body.classList.contains('vis-public'))) return;

  actions.innerHTML += button
})(document, window)