(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{273:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.displaySignatureChevron=i;var t=function(e){e.removeClass("signature-collapsed"),e.find(".signature-expand-icon").addClass("signature-close-icon").removeClass("signature-expand-icon"),e.find(".signature-image").removeClass("signature-preview")},r=function(e){e.addClass("signature-collapsed"),e.find(".signature-close-icon").addClass("signature-expand-icon").removeClass("signature-close-icon"),e.find(".signature-image").addClass("signature-preview")};function s(e,n){var a=e.find(".lbContainer");"expanded"==n?(t(e),a.addClass("lbContainer--canZoom")):(r(e),a.removeClass("lbContainer--canZoom")),e.attr("status",n)}function i(e){var n=(e||document).querySelectorAll("#message-signature");(n=Array.from(n)).forEach((function(e){var n=e.querySelector(".bbWrapper"),a=n.querySelector("img"),t=e.querySelector("#signature-content-wrapper");if(n.clientHeight>40||null!=a){var r=e.querySelector("#signature-view");r&&(r.style.display="initial")}else t.style.cursor="default"}))}$(document.body).on("click touchend",".signature-content-wrapper",(function(e){var n=$(e.currentTarget),a=e.target,t=n.parent();"closed"!=t.attr("status")||"IMG"!=a.tagName&&"PICTURE"!=a.tagName||e.preventDefault(),"A"!=a.tagName&&window.innerWidth>900&&"closed"==t.attr("status")&&s(t,"expanded")})),$(document.body).on("click touchend",".signature-view",(function(e){e.preventDefault();var n=$(e.currentTarget).parent();"closed"==n.attr("status")?s(n,"expanded"):s(n,"closed")})),$(document).ready((function(){i()}))}},[[273,0]]]);