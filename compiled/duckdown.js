// duckdown (0.0.1)
// Simple, lightweight Markdown-like language with extensible grammar.
// Christopher Giffard 2012
// 
// 
// Package built Mon Aug 06 2012 15:05:55 GMT+1000 (EST)
// 


(function(e){function t(e){return window[{"./ducknode.js":"DuckdownNode","./index.js":"Duckdown","./grammar.js":"DuckdownGrammar"}[e]]}(function(e){"use strict";var t={};t.wordCharacters=/[a-z0-9 ]/ig,t.escapeCharacters=/[^a-z0-9\s\-\_\:\\\/\=\%\~\`\!\@\#\$\*\(\)\+\[\]\{\}\|\;\,\.\?\']/ig,t.replacer=function(e,t,n){return e==="&"?"&amp;":e==="<"?"&lt;":e===">"?"&gt;":e==='"'?"&quot;":"&#x"+e.charCodeAt(0).toString(16)+";"},t.tokenMappings={"\n":{wrapper:!0,swallowTokens:!1,exit:/\n/,state:"IMPLICIT_BREAK",semanticLevel:"hybrid"},"	":{wrapper:!0,swallowTokens:!1,exit:/\n/,state:"IMPLICIT_INDENT",semanticLevel:"hybrid"},"    ":{wrapper:!0,swallowTokens:!1,exit:/\n/,state:"IMPLICIT_INDENT",semanticLevel:"hybrid"},"&":{wrapper:!1,exit:/([^#a-z0-9]|;)/i,validIf:/^&#?[a-z0-9]+;$/ig,state:"ENTITY",semanticLevel:"text"},"~":{semanticLevel:"text",wrapper:!0,allowSelfNesting:!1,exit:/[\~\n]/,validIf:/^\~\S[^\n]+\S\~$/,state:"TEXT_EMPHASIS"},"*":{semanticLevel:"text",wrapper:!0,allowSelfNesting:!1,exit:/[\*\n]/,validIf:/^\*\S[^\n]+\S\*$/,state:"TEXT_STRONG"},"-":{wrapper:!0,semanticLevel:"text",exit:/[\-\n]/,validIf:/^\-\S[^\n]+\S\-$/,state:"TEXT_DEL"},_:{wrapper:!0,semanticLevel:"text",exit:/[_\n]/,validIf:/^\_\S[^\n]+\S\_$/,state:"TEXT_UNDERLINE"},"<":{wrapper:!1,semanticLevel:"hybrid",exit:/[>\n]/,validIf:/^<[a-z][a-z0-9\-\_]*(\s[^>\n]+)*>$/i,state:"SPECIAL_FEATHER"},"`":{wrapper:!1,semanticLevel:"text",exit:/[`\n]/,state:"CODE_LITERAL"},"h1.":{wrapper:!0,exit:/\n/i,state:"HEADING_1",semanticLevel:"textblock"},"h2.":{wrapper:!0,exit:/\n/i,state:"HEADING_2",semanticLevel:"textblock"},"h3.":{wrapper:!0,exit:/\n/i,state:"HEADING_3",semanticLevel:"textblock"},"h4.":{wrapper:!0,exit:/\n/i,state:"HEADING_4",semanticLevel:"textblock"},"h5.":{wrapper:!0,exit:/\n/i,state:"HEADING_5",semanticLevel:"textblock"},"h6.":{wrapper:!0,exit:/\n/i,state:"HEADING_6",semanticLevel:"textblock"},"http://":{wrapper:!1,exit:/[^a-z0-9\-_\.\~\!\*\'\(\)\;\:\@\&\=\+\$\,\/\?\%\#\[\]\#]/i,validIf:/^http[s]?:\/\/[a-z0-9\-]+(\:\d+)?.*$/i,state:"AUTO_LINK",swallowTokens:!1,semanticLevel:"text"},"https://":{wrapper:!1,exit:/[^a-z0-9\-_\.\~\!\*\'\(\)\;\:\@\&\=\+\$\,\/\?\%\#\[\]\#]/i,validIf:/^http[s]?:\/\/[a-z0-9\-]+(\:\d+)?.*$/i,state:"AUTO_LINK",swallowTokens:!1,semanticLevel:"text"},"(":{wrapper:!0,exit:/(\s\s+|\n|\))/,validIf:/^\([^\n]+\)$/,state:"PAREN_DESCRIPTOR",allowSelfNesting:!0,semanticLevel:"text"}},t.stateList={ENTITY:{process:function(){},compile:function(e,t){var n=e.children[e.children.length-1];return e.exitToken===";"?"&"+e.children.join("")+";":typeof n=="string"&&n.match(/\;/)?"&"+e.children.join(""):"&amp;"+t(e)}},IMPLICIT_BREAK:{process:function(e){if(!e.text().length)return!1},compile:function(e,t){var n=t(e),r=!0;for(var i=0;i<e.children.length;i++){if(e.children[i]instanceof Object&&e.children[i].semanticLevel!=="hybrid"&&e.children[i].semanticLevel!=="text"){r=!1;break}if(e.children[i].state==="IMPLICIT_INDENT"){r=!1;break}}return r?"<p>"+n+"</p>\n":n+"\n"}},IMPLICIT_INDENT:{process:function(e){if(!e.text().length)return!1},compile:function(e,t){var n=!1;if(!e.parent||e.parent.state==="IMPLICIT_BREAK"||e.parent.semanticLevel==="block"||e.parent.semanticLevel==="hybrid"){var r=!1;for(var i=0;i<e.children.length;i++)if(e.children[i].semanticLevel==="block"||e.children[i].semanticLevel==="textblock"){r=!0;break}r||(n=!0)}return n?"<pre>"+e.raw(!0).replace(/^\s+/,"")+"</pre>\n":t(e)}},TEXT_EMPHASIS:{compile:function(e,t){return"<em>"+t(e)+"</em>"}},TEXT_STRONG:{compile:function(e,t){return"<strong>"+t(e)+"</strong>"}},TEXT_DEL:{compile:function(e,t){return"<del>"+t(e)+"</del>"}},TEXT_UNDERLINE:{compile:function(e,t){return"<u>"+t(e)+"</u>"}},CODE_LITERAL:{compile:function(e,t){return"<code>"+e.text()+"</code>"}},HEADING_1:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h1>"+t(e)+"</h1>"}},HEADING_2:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h2>"+t(e)+"</h2>"}},HEADING_3:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h3>"+t(e)+"</h3>"}},HEADING_4:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h4>"+t(e)+"</h4>"}},HEADING_5:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h5>"+t(e)+"</h5>"}},HEADING_6:{process:function(e){if(e.previousSibling)return!1},compile:function(e,t){return"<h6>"+t(e)+"</h6>"}},AUTO_LINK:{compile:function(e,t){var n=e.token+e.text(),r=n;return e.parent&&e.parent.state==="PAREN_DESCRIPTOR"&&!!e.parent.link?n:(e.linkDetail&&(r=t(e.linkDetail)),'<a href="'+n+'">'+r+"</a>")}},PAREN_DESCRIPTOR:{process:function(e){e.previousSibling&&e.previousSibling.state==="AUTO_LINK"&&(e.previousSibling.linkDetail||(e.previousSibling.linkDetail=e,e.link=e.previousSibling))},compile:function(e,t){return e.link?"":"("+t(e)+")"}},SPECIAL_FEATHER:{process:function(e){if(!e.children.length)return;var t=e.children.join("").split(/\s+/ig);e.children=[];var n=t.shift().replace(/\s+/ig,""),r={};if(!n.length)return;if(this.feathers[n]&&this.feathers[n]instanceof Function){var i=0,s=[],o=[];for(var u=0;u<t.length;u++){var a=t[u];i===0?a.match(/\:/)?(a=a.split(/[:]+/),s.push(a.shift()),o=o.concat(a),i=1):s.push(a):a.match(/\:/)?(i=0,u--,r[s.join(" ")]=o.join(" "),s=[],o=[]):o.push(a)}if(s.length||o.length)r[s.join(" ")]=o.join(" ");var f=this.feathers[n](r);e.compiled=!0;if(typeof f=="string"||typeof f=="number")e.children=[f]}return}}},typeof module!="undefined"&&module.exports?module.exports=t:typeof define!="undefined"?define("DuckdownGrammar",[],function(){return t}):e.DuckdownGrammar=t})(this),function(e){function i(e){return e.replace(n.escapeCharacters,n.replacer)}var n=t("./grammar.js"),r=function(e){this.state=e&&typeof e=="string"?e:"NODE_TEXT",this.stateStack=[],this.depth=0,this.children=[],this.parent=null,this.wrapper=!0,this.token="",this.exitToken="",this.textCache="",this.rawCache="",this.previousSibling=null,this.semanticLevel="text",this.mismatched=!1};r.prototype.text=function(){var e="";if(!this.textCache.length){for(var t=0;t<this.children.length;t++)if(this.children[t]instanceof r)e+=this.children[t].text();else{if(typeof this.children[t]!="string"&&typeof this.children[t]!="number")throw new Error("Unable to coerce unsupported type to string!");var n=i(this.children[t]);e+=n}return this.textCache=e,this.textCache}return this.textCache},r.prototype.raw=function(e){var t="";if(!this.rawCache.length){t+=this.token;for(var n=0;n<this.children.length;n++)if(this.children[n]instanceof r)t+=this.children[n].raw();else{if(typeof this.children[n]!="string"&&typeof this.children[n]!="number")throw new Error("Unable to coerce unsupported type to string!");t+=this.children[n]}return t+=this.exitToken,this.rawCache=t,e?i(this.rawCache):this.rawCache}return e?i(this.rawCache):this.rawCache},r.prototype.toString=function(){return"<"+this.state+":"+this.children.length+">"},typeof module!="undefined"&&module.exports?module.exports=r:typeof define!="undefined"?define("DuckdownNode",[],function(){return r}):e.DuckdownNode=r}(this),function(e){"use strict";var n=t("./grammar.js"),r=t("./ducknode.js"),i=0,s=1,o=0,u=function(t){this.options=t instanceof Object?t:{},this.clear()};u.prototype.clear=function(){this.currentToken="",this.prevToken="",this.tokenPosition=0,this.parserStates=[],this.parserAST=[],this.parseBuffer=[],this.currentNode=null,this.prevNode=null,this.nodeDepth=0,this.characterIndex=0,this.tokeniserState=i,this.tokenBuffer="",this.tokens=[],this.curChar="",this.prevChar="",this.feathers={},this.tokenList=function(){var e=[];for(var t in n.tokenMappings)n.tokenMappings.hasOwnProperty(t)&&e.push(t);return e}(),this.longestToken=this.tokenList.sort(function(e,t){return t.length-e.length}).slice(0,1).pop().length},u.prototype.tokenise=function(e){typeof e!="string"&&(e=String(e)),this.tokens.length||(e="\n"+e);var t=!e||!e.length?0:e.length;this.prevChar="",this.curChar="";for(var r=0;r<=t;r++){this.curChar=e.charAt(r);var o=this.longestToken;o=o>t-r?t-r:o;for(;o>0;o--){var u=e.substr(r,o);if(n.tokenMappings[u]){this.tokenBuffer.length&&(this.tokens.push(this.tokenBuffer),this.tokenBuffer=""),this.tokens.push(u),r+=o-1;break}o===1&&(!this.curChar.match(n.wordCharacters)&&this.tokeniserState===s||this.curChar.match(n.wordCharacters)&&this.tokeniserState===i?this.tokenBuffer+=this.curChar:(this.tokenBuffer.length&&(this.tokens.push(this.tokenBuffer),this.tokenBuffer=""),this.tokenBuffer+=this.curChar,this.tokeniserState=[s,i][this.tokeniserState]))}this.characterIndex=r,this.prevChar=this.curChar}return this.tokenBuffer.length&&(this.tokens.push(this.tokenBuffer),this.tokenBuffer=""),this.tokens},u.prototype.parse=function(e){e&&typeof e=="string"&&this.tokenise(e);for(;this.tokenPosition<this.tokens.length;this.tokenPosition++)this.parseToken(this,null);return this.parserAST},u.prototype.parseToken=function(e,t){function l(){if(!e.parserStates.length)return!0;var t=e.parserStates[e.parserStates.length-1],n=c(t);return n?n.wrapper:!1}function c(e){if(!n.stateList[e])return!1;if(!n.stateList[e].tokenGenus){for(var t in n.tokenMappings)if(n.tokenMappings.hasOwnProperty(t)&&n.tokenMappings[t].state===i)return n.stateList[e].tokenGenus=n.tokenMappings[t],n.tokenMappings[t];return!1}return n.stateList[e].tokenGenus}function h(t){if(!e.currentNode)return!0;if(!t.semanticLevel)return!0;if(t.semanticLevel==="hybrid")return!0;var n="hybrid",r={hybrid:4,block:3,textblock:2,text:1};for(var i=0;i<e.parserStates.length;i++){var s=c(e.parserStates[i]);s.semanticLevel&&r[s.semanticLevel]<r[n]&&(n=s.semanticLevel)}return r[t.semanticLevel]>r[n]?!1:t.semanticLevel==="textblock"&&n==="textblock"?!1:!0}function p(t,n,r){var i=null,s=!1,o,u=0,a=0;r||(o=n.exitCondition.exec(e.currentToken),u=o.index,a=o[0]?o[0].length:0,u>0&&e.parseBuffer.push(e.currentToken.substr(0,u)),e.currentNode.exitToken=o[0]),e.currentNode.children.push.apply(e.currentNode.children,e.parseBuffer),v&&v.validIf instanceof RegExp&&(v.validIf.exec(e.currentNode.raw())||(s=!0)),s?e.parseBuffer=[e.currentNode.token].concat(e.parseBuffer):e.parseBuffer=[],!s&&n.process&&n.process instanceof Function&&(i=n.process.call(e,e.currentNode)),!s&&i!==!1&&(e.prevNode=e.currentNode),e.currentNode=e.currentNode.parent,e.nodeDepth--,e.parserStates.length=e.nodeDepth;if(i===!1||s)f=e.currentNode?e.currentNode.children:e.parserAST,f.length--;if(!r)if(n.tokenGenus.swallowTokens!==!1&&!s){e.currentToken=e.currentToken.substring(u+a);if(!e.currentToken.length)return}else u>0&&(e.currentToken=e.currentToken.substring(u))}var i,s,o,a,f;this instanceof u&&(e=this),t&&t.length&&(e.tokens.push(t),e.tokenPosition=e.tokens.length-1),e.currentToken=e.tokens[e.tokenPosition];for(var d=e.parserStates.length-1;d>=0;d--){i=e.parserStates[d],a=n.stateList[i];var v=c(i);v&&(a.exitCondition=v.exit);if(!a)throw new Error("State genus for the state "+i+" was not found!");if(a.exitCondition&&a.exitCondition.exec(e.currentToken)){while(i!==e.currentNode.state)e.currentNode.mismatched=!0,p(i,a,!0);p(i,a)}}if(n.tokenMappings[e.currentToken]){o=n.tokenMappings[e.currentToken],s=o.state,a=n.stateList[o.state];if(e.hasParseState(o.state)&&!o.allowSelfNesting)e.parseBuffer.push(e.currentToken);else if(l()&&h(o)){e.addParseState(o.state);var m=new r(o.state);m.stateStack=e.parserStates.slice(0),m.depth=e.nodeDepth,m.parent=e.currentNode,m.wrapper=o.wrapper,m.token=this.currentToken,o.semanticLevel&&(m.semanticLevel=o.semanticLevel);var g=e.parseBuffer.filter(function(e){return!!e.replace(/\s+/ig,"").length});g.length?m.previousSibling=g.pop():(f=e.currentNode?e.currentNode.children:e.parserAST,f.length&&(m.previousSibling=f[f.length-1])),e.currentNode?(e.currentNode.children.push.apply(e.currentNode.children,e.parseBuffer),e.currentNode.children.push(m)):(e.parserAST.push.apply(e.parserAST,e.parseBuffer),e.parserAST.push(m)),e.parseBuffer=[],e.currentNode=m,e.nodeDepth++}else e.parseBuffer.push(e.currentToken)}else e.currentToken.length&&e.parseBuffer.push(e.currentToken),e.tokenPosition>=e.tokens.length-1&&(e.currentNode?e.currentNode.children.push.apply(e.currentNode.children,e.parseBuffer):e.parserAST.push.apply(e.parserAST,e.parseBuffer),e.parseBuffer=[]);return e.previousToken=e.currentToken,e.parserStates.join(" ").toLowerCase().replace(/\_/ig,"-")},u.prototype.compile=function(e){return e&&this.parse(e),function t(e){var i=[];i=e;var s="";e instanceof r&&(i=e.children);if(i instanceof Array){for(var o=0;o<i.length;o++){var u=i[o];if(u instanceof r){if(u.children.length&&u.text().length){var a=n.stateList[u.state];a&&a.compile&&a.compile instanceof Function?s+=a.compile(u,t):s+=t(u)}}else if(typeof u=="number"||typeof u=="string"){var f=u;n.replacer&&n.replacer instanceof Function&&(f=f.replace(n.escapeCharacters,n.replacer)),s+=f}}return s.replace(/\s+/g,"").length?(e instanceof r&&(e.semanticLevel==="block"||e.semanticLevel==="textblock"||e.semanticLevel==="hybrid")&&(s=s.replace(/^\s+/,"").replace(/\s+$/,"")),s):""}return s}(this.parserAST)},u.prototype.toString=function(){return this.compile()},u.prototype.registerFeather=function(e,t){if(!e.match(/^[a-z0-9]+$/))throw new Error("Feather names must consist of lowercase letters and numbers only.");if(this.feathers[e])throw new Error("A feather with the specified name already exists.");if(!(t&&t instanceof Function))throw new Error("You must provide a function for processing the feather output.");this.feathers[e]=t},u.prototype.unregisterFeather=function(e){if(!this.feathers[e])throw new Error("Requested feather does not exist.");delete this.feathers[e]},u.prototype.hasParseState=function(e){for(var t=0;t<this.parserStates.length;t++)if(this.parserStates[t]===e)return!0;return!1},u.prototype.addParseState=function(e){this.parserStates.push(e)},typeof module!="undefined"&&module.exports?module.exports=u:typeof define!="undefined"?define("Duckdown",[],function(){return u}):e.Duckdown=u}(this)})(this)