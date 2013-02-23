void ((function(){
  var a = document.createElement('a');
  a.href = document.URL;
  if(a.host === 'github.com'){
    window.location = 'http://5minfork.com'+a.pathname;
  }
})());