(function (d, w) {
  var actions = d.querySelector('.pagehead-actions'),
      button = '<li>' +
                 '<a href="' + w.location.href.replace(/https?:\/\/github/, 'http://5minfork') + '" class="minibutton" title="Create a 5 minute fork of this repo">' +
                   '<span class="mini-icon" style="background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA9ElEQVQYGQXBPSiEYQAA4Ocok+vEnSgxKKJMko7CEaPdKpPFIJLVYJPdYrOeXRkomaToE4vyd537+2S5y93reQCAeU/erQMAAHBv0YCiTgAA6EBkWlpBFwBAm0PnWFFUs4VZV25kAfYFJf3Ii5DwatWSF2BUw48RkBehXSwloyQBx4JtQF6kz4WmNx82gUdBGiwoiZUVLevWC/DrGxCZ0qNsDAyalIKqGuBOzpCCJDgTZOFWMA5mPPu0ARJeNaVhT3AKAGBNcAkkFQQbAGBCRcscQE5Dy4kxkLErFhwAQM6XIKiq+BPU7QAAJO24Fqt7cGQY4B/0wlLnM/C+BgAAAABJRU5ErkJggg==) no-repeat;"></span>' +
                   '<span class="text">5 min fork</span>' +
                 '</a>' +
               '</li>';

  if (!(actions && d.body.classList.contains('vis-public'))) return;

  actions.innerHTML = button + actions.innerHTML;
})(document, window);