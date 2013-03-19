// ==UserScript==
// @name       5 minute fork
// @namespace  http://5minfork.com/
// @version    1.0.1
// @description  Adds a button to GitHub pages so with one click view the files of the repo web hosted by 5minfork.com
// @include    http*://*github.com/*
// ==/UserScript==

var pageHeaderMatches = document.querySelectorAll(".pagehead-actions");
if(pageHeaderMatches && pageHeaderMatches.length)
{
	var cloneURL = document.querySelectorAll(".clone-url input");
	if(cloneURL && cloneURL.length)
		cloneURL = cloneURL[0].value;
	else
		cloneURL = document.location.href;

	var reResult = new RegExp("^.*?github.com[/:]([^/]+)/(.*?)(.git)?$").exec(cloneURL);
	var fiveMinForkURL = "http://5minfork.com/" + reResult[1] + "/" + reResult[2];

	var pageHeader = pageHeaderMatches[0];

	var fiveMinForkButtonAnchor = document.createElement("a");
	fiveMinForkButtonAnchor.className ="minibutton";
	fiveMinForkButtonAnchor.href = document.location.href.replace("github.com", "5minfork.com").replace("https://", "http://");
	fiveMinForkButtonAnchor.target = "_blank";
	fiveMinForkButtonAnchor.appendChild(document.createTextNode("5 min fork"));

	var fiveMinForkButtonListItem = document.createElement("li");
	fiveMinForkButtonListItem.appendChild(fiveMinForkButtonAnchor);

	pageHeader.insertBefore(fiveMinForkButtonListItem, pageHeader.childNodes[0]);
}
