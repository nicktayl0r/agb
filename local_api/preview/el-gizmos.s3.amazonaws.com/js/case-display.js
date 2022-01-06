// case-display.js
// Description: The JS needed for case display (initialize, launch, resize, presentation mode, etc)
// Author: JGeist
// Created: October 2018 (based largely on gizmo-display.js)

var windowWidth;
var windowHeight;

var lastSavedGizmoState;
var savedScale;

var gizmoOnLoadFired = false;

var iframeWindow;

$(document).ready(function(){

	//check user's system info via case-system-check.js
	var systemStatus = checkSystem();

	// Initialize Gizmo
	if($('#gizmoHolder').length){

		resizeCase();

		// iPad was calling resize too often
		windowWidth = $(window).width();
		windowHeight = $(window).height();

		$(window).resize(function(){
			if($(window).width() != windowWidth || $(window).height() != windowHeight){
				resizeCase();
				windowWidth = $(window).width();
				windowHeight = $(window).height();
			}
		});
	}

	if ( !systemStatus[0] ) {
		$('#systemCheck').show();
		$('#caseOuterWrap').hide();
		$('.below-requirement').html(systemStatus[1]);
	}
	else {
		$("#caseIframe").load(function() {
			$('#caseOuterWrap').css('visibility', 'visible');
			$('#caseOuterWrap, #georgia').show();
			resizeCase();
			if(attemptID == 0) createAttempt(startCase);
			else startCase(attemptID);
		});
	}

	$('#launch-anyway').click(function() {
		$('#systemCheck').hide();
		$('#caseOuterWrap').css('visibility', 'visible');
		$('#caseOuterWrap, #georgia').show();
		resizeCase();
		if(attemptID == 0) createAttempt(startCase);
		else startCase(attemptID);
	});

	// Enable presentation mode
	$('.launch-presentation-mode').on('click', enterPresentationMode);

	// Exit presentation mode
	$('body').on('click', '#exitPresentationMode', exitFullScreenOrPresentationMode);
	$('body').keyup(function(event){
		if (event.keyCode == 27 ){
			exitFullScreenOrPresentationMode();
		}
	});

	// The "Gizmo Info" popover that is shown in presentation mode
	$('#openGizmoInfo').popover({ html : 'true'});
	$('#openGizmoInfo').on('show.bs.popover', function(){
		$(this).tooltip('hide');
		$(this).tooltip('disable');
		$('#openGizmoInfo').removeClass('glyphicon-info-sign').addClass('glyphicon-remove-circle');
	});
	$('#openGizmoInfo').on('hidden.bs.popover', function(){
		$(this).tooltip('enable');
		$('#openGizmoInfo').removeClass('glyphicon-remove-circle').addClass('glyphicon-info-sign');
	});

	$('#openGizmoInfo').tooltip({ title : 'View Gizmo Info'});

	$('#enterFullScreenMode').on('click', function(event){
		enterFullScreen();
	});

	$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(e){
		if(!isFullscreen()){
			onFullScreenExit();
		}
	});

	// Toggle lesson Info

	$('#affixedBarWrap.gizmo-bar').on('click', '.header', function(e){
		if($(e.target).parents('.pull-right').length == 0){
			$('#lessonInfo').collapse('toggle');
		}
	});

	// This functionality is for closing the lesson info bar by clicking outside of it.

	function closeLessonInfo(e){
		$('#lessonInfo').collapse('toggle');
	}

	$('#lessonInfo').on('shown.bs.collapse', function(){
		$('body').append($('<div/>', { 'id' : 'closeLessonInfoBackgroundDiv', 'style' : 'position:absolute; top: 0; left: 0; right: 0; bottom: 0;'}))
		$('body').on('click', '#closeLessonInfoBackgroundDiv', closeLessonInfo);
	});

	$('#lessonInfo').on('hide.bs.collapse', function(){
		$('body').unbind('click', closeLessonInfo);
		$('#closeLessonInfoBackgroundDiv').remove();
	});

});

var cycles = 0;
var count = 1;
function keepAlive(intervalMin, totalHour){
	var refreshPeriod = intervalMin * 1000 * 60;
	cycles = (totalHour * 60) / intervalMin;
    call = setInterval("keepAliveCall(cycles, count++, call)", refreshPeriod);
}

function keepAliveCall(cycles, count, call){
    $.ajax({
		url : elPaths.myself + 'cUserSecure.actInteractiveCaseAJAX&action=keepAlive',
        success : function(data) {
			if (data.length > 5) {
				location.href = 'index.cfm?method=cUser.dspLoginJoin';
			}
			if (cycles <= count) {
				clearInterval(call);
			}
        }
    });
}

function startCase(attemptIDtoUse) {
	// checkIframeWindow();
	// $('#gizmoHolder').show();
	// $('#caseIframe').css({"visibility" : "visible"});
	// iframeWindow.postMessage({messageName: "startAttempt", contents: { sessionID: session, attemptID: attemptIDtoUse }}, elPaths.contentRoot);
	// keepAlive(5, 2);
}

var CASE_ENDPOINT = "cUserSecure.actInteractiveCaseAJAX";
function createAttempt(callback){
    $.ajax({
        method: 'GET',
        url: 'index.cfm',
        data : {
            method : CASE_ENDPOINT,
            action : 'createAttempt',
            UserID : userID,
			ELClassID : classID,
			ResourceID : resourceID
        }
    }).done(function(data){
		var obj = jQuery.parseJSON(data);
		var newAttemptID = obj.ATTEMPTID;
		callback(newAttemptID);
    }).fail(function(jqXHR, textStatus, errorThrown){
        notifyError('AJAX request failed: '+textStatus + " Detail: "+errorThrown);    
	});  
}

function isFullscreen(){
	if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
		return true;
	}
	return false;
}

function enterFullScreen(){
	$('#openGizmoInfo').popover('hide');

	var element = $('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled')[0];
	$('#enterFullScreenMode').hide();
	if(element.requestFullscreen){
		element.requestFullscreen();
	} else if (element.msRequestFullscreen){
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen){
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen){
		element.webkitRequestFullscreen();
	}
	resizeCase();
}

function onFullScreenExit(){
	$('#enterFullScreenMode').show();
}

function exitFullScreenOrPresentationMode(){

	if(document.fullscreenElement){
		document.exitFullscreen();
	} else if (document.msFullscreenElement){
		document.msExitFullscreen();
	} else if (document.mozFullScreenElement){
		document.mozCancelFullScreen();
	} else if (document.webkitFullscreenElement){
		document.webkitExitFullscreen();
	}
	else {
		console.log('exit presentation');
		exitPresentationMode();
	}
}

function exitPresentationMode(){
	$('#gizmoHolder').closest('.bg-panel').removeClass('full-screen-enabled');
	$('#belowGizmoButtons').show();
	$('body').css('overflow', 'scroll');

	$('#presentationModeToolbar').hide();
	$('#openGizmoInfo').popover('hide');

	resizeCase();
}

function enterPresentationMode(){
	window.scrollTo(0,0); // Scroll to top of page.
	$('#gizmoHolder').closest('.bg-panel').addClass('full-screen-enabled');

	// For iPad.  The tooltip sometimes lingers.
	$('.launch-presentation-mode').tooltip('hide');

	$('#presentationModeToolbar').show();

	$('#enterFullScreenMode').show();

	$('#belowGizmoButtons').hide();
	$('body').css('overflow', 'hidden'); // Hide scroll bar
	resizeCase();
}

function checkIframeWindow(){
	if(!iframeWindow){
		var iframe= $('#caseIframe')[0];
		iframeWindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
	}	
}

function resizeCase(){

	var holder = $('#gizmoHolder'),
		g = $('#g.scale'),
		frame = $('#caseIframe');

	if(holder.length && g.length){

		var gRatio = parseFloat(g.data('ratio'));
		var windowHeight = $(this).height();
		var displayOffset = g.offset().top;
		var maxHeight = windowHeight - displayOffset-30;
		var minHeight = 400;

		//Content inside Cases are displayed at 97vh (97% of viewport height).
		//To make the case appear to fill it's container, we'll make the iframe taller by the inverse of that.
		var VH_INVERSE = 100/97;		

		var gPadding = 5;
		var newHeight = (holder.width()- 2*gPadding) / gRatio;
		var newWidth = holder.width() - 2*gPadding;

		if(newHeight > maxHeight){
			newHeight = maxHeight;
			newWidth = maxHeight * gRatio;
		}

		if(newHeight < minHeight){
			newHeight = minHeight;
			newWidth = minHeight * gRatio;
		}

		g.height(newHeight).width(newWidth);
		frame.height(newHeight * VH_INVERSE);

		if($(this).scrollTop()>g.offset().top){
			$(this).scrollTop($('#affixedBarWrap').offset().top );
		}

		if((g.width()+90) < $(window).width()){
			$('#presentationModeToolbar').removeClass('fullscreen-toolbar-portrait').addClass('fullscreen-toolbar-landscape');
		}
		else {
			$('#presentationModeToolbar').removeClass('fullscreen-toolbar-landscape').addClass('fullscreen-toolbar-portrait');
		}
	}
}