// ==UserScript==
// @name        5 minute fork
// @namespace   http://5minfork.com/
// @version     1.0.8
// @description Adds a button to GitHub pages so with one click you can view the files of the repo hosted on the web by 5minfork.com
// @match       http://*.github.com/*
// @match       https://*.github.com/*
// @exclude     *://github.com/organizations/*
// @exclude     *://github.com/orgs/*
// @exclude     *://gist.github.com*
// @grant       none
// ==/UserScript==

var pageHeaderMatches = document.querySelector(".pagehead-actions");
if (pageHeaderMatches) {
	var reResult = new RegExp("^.*?github.com[/:]([^/]+)/(.*?)(.git)?$").exec(document.location.href);

	var fiveMinForkButtonAnchor = document.createElement("a");
	fiveMinForkButtonAnchor.className = "btn btn-sm";
	fiveMinForkButtonAnchor.href = "http://5minfork.com/" + reResult[1] + "/" + reResult[2].split('/')[0];
	fiveMinForkButtonAnchor.target = "_blank";

	var fiveMinForkButtonIcon = document.createElement("img");
	fiveMinForkButtonIcon.className = "octicon";
	fiveMinForkButtonIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA9ElEQVQYGQXBPSiEYQAA4Ocok+vEnSgxKKJMko7CEaPdKpPFIJLVYJPdYrOeXRkomaToE4vyd537+2S5y93reQCAeU/erQMAAHBv0YCiTgAA6EBkWlpBFwBAm0PnWFFUs4VZV25kAfYFJf3Ii5DwatWSF2BUw48RkBehXSwloyQBx4JtQF6kz4WmNx82gUdBGiwoiZUVLevWC/DrGxCZ0qNsDAyalIKqGuBOzpCCJDgTZOFWMA5mPPu0ARJeNaVhT3AKAGBNcAkkFQQbAGBCRcscQE5Dy4kxkLErFhwAQM6XIKiq+BPU7QAAJO24Fqt7cGQY4B/0wlLnM/C+BgAAAABJRU5ErkJggg==";

	fiveMinForkButtonAnchor.appendChild(fiveMinForkButtonIcon);
	fiveMinForkButtonAnchor.appendChild(document.createTextNode("5 min fork"));

	var fiveMinForkButtonListItem = document.createElement("li");
	fiveMinForkButtonListItem.appendChild(fiveMinForkButtonAnchor);

	var pageHeader = pageHeaderMatches;
	pageHeader.insertBefore(fiveMinForkButtonListItem, pageHeader.childNodes[0]);
}
