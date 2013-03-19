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
	fiveMinForkButtonAnchor.href = fiveMinForkURL;
	fiveMinForkButtonAnchor.target = "_blank";

	var fiveMinForkButtonIcon = document.createElement("span");
	fiveMinForkButtonIcon.className = "mini-icon";
	fiveMinForkButtonIcon.style.backgroundImage = "url(https://assets.github.com/images/icons/emoji/clock5.png)";
	fiveMinForkButtonIcon.style.backgroundSize = "16px";
	fiveMinForkButtonIcon.style.backgroundRepeat = "no-repeat";

	fiveMinForkButtonAnchor.appendChild(fiveMinForkButtonIcon);
	fiveMinForkButtonAnchor.appendChild(document.createTextNode("5 min fork"));

	var fiveMinForkButtonListItem = document.createElement("li");
	fiveMinForkButtonListItem.appendChild(fiveMinForkButtonAnchor);

	pageHeader.insertBefore(fiveMinForkButtonListItem, pageHeader.childNodes[0]);
}
