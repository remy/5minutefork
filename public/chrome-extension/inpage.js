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
	var iconout = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA9ElEQVQYGQXBPSiEYQAA4Ocok+vEnSgxKKJMko7CEaPdKpPFIJLVYJPdYrOeXRkomaToE4vyd537+2S5y93reQCAeU/erQMAAHBv0YCiTgAA6EBkWlpBFwBAm0PnWFFUs4VZV25kAfYFJf3Ii5DwatWSF2BUw48RkBehXSwloyQBx4JtQF6kz4WmNx82gUdBGiwoiZUVLevWC/DrGxCZ0qNsDAyalIKqGuBOzpCCJDgTZOFWMA5mPPu0ARJeNaVhT3AKAGBNcAkkFQQbAGBCRcscQE5Dy4kxkLErFhwAQM6XIKiq+BPU7QAAJO24Fqt7cGQY4B/0wlLnM/C+BgAAAABJRU5ErkJggg==)";

	fiveMinForkButtonIcon.style.backgroundImage = iconout;
	fiveMinForkButtonIcon.style.backgroundSize = "16px";
	fiveMinForkButtonIcon.style.backgroundRepeat = "no-repeat";

	fiveMinForkButtonAnchor.appendChild(fiveMinForkButtonIcon);
	fiveMinForkButtonAnchor.appendChild(document.createTextNode("5 min fork"));

	var fiveMinForkButtonListItem = document.createElement("li");
	fiveMinForkButtonListItem.appendChild(fiveMinForkButtonAnchor);

	pageHeader.insertBefore(fiveMinForkButtonListItem, pageHeader.childNodes[0]);
}
