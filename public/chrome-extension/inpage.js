"use strict";

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
