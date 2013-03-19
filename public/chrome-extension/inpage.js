"use strict";

var pageHeaderMatches = document.querySelectorAll(".pagehead-actions");
if(pageHeaderMatches && pageHeaderMatches.length)
{
	var cloneURL = document.location.href;

	var reResult = new RegExp("^.*?github.com[/:]([^/]+)/(.*?)(.git)?$").exec(cloneURL);
	var fiveMinForkURL = "http://5minfork.com/" + reResult[1] + "/" + reResult[2].split('/')[0];

	var pageHeader = pageHeaderMatches[0];

	var fiveMinForkButtonAnchor = document.createElement("a");
	fiveMinForkButtonAnchor.className ="minibutton";
	fiveMinForkButtonAnchor.href = fiveMinForkURL;
	fiveMinForkButtonAnchor.target = "_blank";

	var fiveMinForkButtonIcon = document.createElement("span");
	fiveMinForkButtonIcon.className = "mini-icon";
	fiveMinForkButtonIcon.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA20lEQVQYGXXBQSuDYQAA4GeKi5NE5CbNTrRSCoVQWotykpOUub4ncSESh5U4ShnlB3B0Ui5a0nKQloN2wN9g9n1Zsueh3rR9B8Y1dIGEcw1lHTk26x8dJlQFAfPWZdWZU5FTFQSDtrAtKbLkWUpNEHS7NOVSmx99PiTFgiDt0aR2kUN7fgUbStJq+q3xYlRsQd6ZU7EZ93xKihWQUBAbUqZoRmzMjl3DYhkPbLrSyLUcLcoy/pP1rtW3ERWr/lr0JiXS49aNZV1o1mlF0Z1edZpMyXvy5lXJiQGRL98/MTvJIbx7AAAAAElFTkSuQmCC)";
	fiveMinForkButtonIcon.style.backgroundSize = "16px";
	fiveMinForkButtonIcon.style.backgroundRepeat = "no-repeat";

	fiveMinForkButtonAnchor.appendChild(fiveMinForkButtonIcon);
	fiveMinForkButtonAnchor.appendChild(document.createTextNode("5 min fork"));

	var fiveMinForkButtonListItem = document.createElement("li");
	fiveMinForkButtonListItem.appendChild(fiveMinForkButtonAnchor);

	pageHeader.insertBefore(fiveMinForkButtonListItem, pageHeader.childNodes[0]);
}
