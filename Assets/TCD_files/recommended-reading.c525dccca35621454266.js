(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{378:function(e,n,t){"use strict";$(document).ready((function(){$.get("/similar-threads",{threadId:window.threadId},(function(e,n){var t;"success"==n&&($("#thread-recommended-reading").html(e.html.content),t=Math.random().toString(36).substring(2)+(new Date).getTime().toString(36),$("#refine-content-question").hide(),$("#feedback-submitted").hide(),function(e){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&"isIntersecting"in window.IntersectionObserverEntry.prototype){var n=new IntersectionObserver((function(e){e[0].isIntersecting&&(s(),n.disconnect())}),{root:null,rootMargin:"0px",threshold:.3}),t=document.querySelector("#thread-recommended-reading");n.observe(t)}else s()}(),function(e){$(".q1-answer-buttons input").on("change",(function(){var n=$(this)[0].value;window.dataLayer.push({event:"MLSurveyResponse",MLSurveyQuestion:"Q1",MLSurveyAnswers:n,SessionId:e,UserId:XF.config.userId}),$("#relevant-content-question").hide(),$("#refine-content-question").show()}))}(t),function(e){$(".q2-answer-buttons input").on("change",(function(){$(".q2-answer-buttons input").toArray().find((function(e){return e.checked}))?$("#q2-submit-button").addClass("selected"):$("#q2-submit-button").removeClass("selected")})),$(".recommended-survey-wrapper .close-overlay").click((function(){$(".recommended-survey-wrapper").hide(),r()})),$("#q2-submit-button").click((function(){if($(this).hasClass("selected")){var n=[];$(".q2-answer-buttons input").each((function(e,t){t.checked&&n.push(t.id)})),window.dataLayer.push({event:"MLSurveyResponse",MLSurveyQuestion:"Q2",MLSurveyAnswers:n,SessionId:e,UserId:XF.config.userId}),r(),$("#refine-content-question").hide(),$("#feedback-submitted").show(),$(".recommended-survey-wrapper").delay(3e3).fadeOut(500)}}))}(t))}))}));var r=function(){XF.ajax("post","/threads/surveyCompleted",null,null,{})};function s(){$(".recommended-survey-wrapper").delay(3e3).fadeIn(500)}}},[[378,0]]]);