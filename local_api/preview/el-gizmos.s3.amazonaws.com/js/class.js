// class.js
// Description: The JS needed for the class pages, including assessment results
// Authors: Tad, Jordan
// Created: June 2015

var AJAX_REQUEST_URL = "index.cfm";
var RESET_STUDENTS_METHOD = "cUserSecure.actResetAssessmentResultsG2";
var UPGRADE_STUDENT_METHOD = "cUserSecure.actUpgradeVersionG2";
var CLASS_TAB_REORDER_METHOD = "cUser.actReorderClassTab";
var ENTER_KEYCODE = 13;
var SMALL_SCREEN_BREAKPOINT = 767;

var isClass = true;
var isGizmoList = false;


$(document).on('localStorageReady', function(){
	var resources;
	if(store.enabled){
		resources = store.get('resources').gizmos;
	} else {
		resources = localStorageBackup.resources.gizmos;
	}
	var popoverTemplates = {
		gizmo: '<a class="unviewed-results" href="'+elPaths.myself+'cUserSecure.dspAssessmentResults{{if gizmo.resourceTypeName|equals>MasteryBasedGizmo}}G2{{/if}}&ClassID={{classID}}&ResourceID={{gizmo.resourceID}}">'
					+'<div class="numberUnviewed">'
						+'<div class="count">&nbsp;{{unviewedResults}}<span class="glyphicon glyphicon-stats"></span></div>'
						+'<img src="'+elPaths.imageRoot+'/img/GizmoSnap/{{gizmo.resourceID}}tn_58.png">'
					+'</div>'
					+'<p>{{gizmo.title}}</p>'
				+'</a>'
	};

	var popoverPosition = function(){
		if(window.innerWidth < SMALL_SCREEN_BREAKPOINT) return "left";
		return "right";
	}

	var options = {
		trigger: "click",
		placement : popoverPosition,
		html: true,
		selector: '.unviewed-results[data-toggle="popover"]',
		content: function(){
			var targetElement = $(this);
			if(targetElement.data('classid')){
				popoverAnchor = targetElement;
			} else {
				//console.log(targetElement);
				return 'test';
			}
			var classID = popoverAnchor.data('classid');
			var resourceIDs = String(popoverAnchor.data('assessmentResources')).split(',').map(Number);
			var gizmos = el.gizmoHelper.getGizmosByID(resourceIDs, resources);
			var results = String(popoverAnchor.data('assessmentUnviewed')).split(',').map(Number);
			var content = "";
			$.each(gizmos,function(index){
				content += Mark.up(popoverTemplates.gizmo, {gizmo: this, unviewedResults: results[index], 'classID' : classID});
			});
			return content;
		}
	};

	$('body').popover(options);

	// Close Popover is Another is Opened
	$('body').on('show.bs.popover', function(){
		$('.popover').popover('hide');
	});
	// Close Popover if User Clicks Outside of Popover (but still allow trigger)
	$('body').on('click',function(event){
		if($(event.target).closest('[data-toggle="popover"]').length === 0 && $(event.target).parents('.popover').length === 0){
			$('.popover').popover('hide');
		}
	});
	// Close Popover if User Hits 'Esc' Key
	$(document).keyup(function(event){
		if(event.keyCode === 27){
			$('.popover').popover('hide');
		}
	});
	// Close Popover if Window Resizes
	$(window).resize(function(){
		$('.popover').popover('hide');
	});
});

$(document).ready(function(){
	var tourBtn = $('#teacher-homepage-tour');
	if(tourBtn.length){
		var homepageTour = new SpotLight({startLocation: '.teacherhome-top .teacherhome-spotlight-select', masterCloseBtn : true, slideCloseBtns : true, endBtnTxt : 'Exit'});
		tourBtn.on('click', function(){
			homepageTour.tour(
				// (1) highlight classes.
				[{selector : '.teacherhome-top .teacherhome-spotlight-select', title : 'Welcome Home', message : 'The teacher homepage is your home base.  All your classes, recommended Gizmos, professional development webinars and more, all in one place.'},
				// Streamline language.  Easily navigate to recently viewed Gizmos.  These shortcuts.  
				{selector:'body > div:eq(2) > div:eq(0) > div:eq(0) > div:eq(1)', title:'Gizmo History', message:'Pick up right where you left off with quick access to recently viewed Gizmos.'},
				// Keep track of student activity.  Keep track of student activity with assessment notifications.
				{selector:'.list-of-links > li:eq(0) > a:eq(1)', title:'Class Updates', message:'Keep track of student activity with assessment notifications.'},
				// Your Standards.  Quickly find out which Gizmos meet your lesson requirements.
				{selector:'.teacherhome-top .state-standards-button', title:"Your Standards", message:"Quickly find Gizmos that support your curriculum standards."},
				// Getting Started With Gizmos.  Get Started With Gizmos.  Teaching With Gizmos.  Gizmo Best Practices   How To Gizmo.  Gizmo Introduction.
				{selector : '.fixed-bottom-bar button.getting-started-video', title : 'Get Started', message : 'Get up and running now with our Gizmos Quick Start video.'}
				//{selector:'', title:'', message:''},
			]);
		});
	}


	$('nav.tabs').sortable({
		items : "> a.draggable-class-tab",
		tolerance : 'pointer',
		update: function(event, ui){
			allClasses = $('nav.tabs a.draggable-class-tab, nav.tabs div.dropdown a.draggable-class-tab');
			var classIDString = allClasses.map(function(){
				return this.dataset.classid;
			}).get().join(', ');
			setClassTabSortOrder(classIDString);
		}
	});

	$('nav.tabs a.draggable-class-tab').on('mousedown', function(){
		$(this).tooltip('hide').tooltip('disable');
	}).on('mouseleave', function(){
		$(this).tooltip('enable');
	});

	var gizmoList = $('#gizmoList');
	if(gizmoList.data('isgizmolist')){
		isClass = false;
		isGizmoList = true;
	}
	if (gizmoList.length) {
		function SetRLSortOrder(sortOrder, arrayOfItems) {
			$.ajax({
			  type: 'POST',
			  url: 'index.cfm',
			  data: {
			  	method: 'cUserSecure.actManageClass',
				action: 'updateResourceListSortOrder',
				StartSortOrder : sortOrder,
				ResourceListResourceIDs : arrayOfItems,
			  },
			  success: function(data) {
			  	if (!data.success) notify('<strong>Error:</strong> Changes not saved.');
			  }
			});
		}
		var sortable = Sortable.create(gizmoList[0], {
			group: 'classGizmos',
			handle: '.drag-handle',
			animation: 90,
			draggable: '.drag-item',
			ghostClass: 'drag-ghost',
			dataIdAttr: 'data-rlrid',
		    onUpdate: function (e) {
		    	SetRLSortOrder(1, sortable.toArray().join(', '))
		    }
		});
		$(document.body).on('click', '[data-rlr-menu]', function(e) {
			//get menu and id
			var menu = $($(this).data('rlr-menu'));

			menu.data('id', $(this).data('id'));
			
			//move and show menu
			var clicked = $(e.target),
				pos = clicked.offset(),
				backdrop = $(document.createElement('div')).addClass('dropdown-backdrop'),
				body = $('body'),
				dragItem = clicked.parents('.drag-item'),
				rlrHidden = dragItem.hasClass('rlr-hidden');

			backdrop.appendTo(body);

			//customize menu
			var firstRLR = dragItem.is(':first-child'),
				lastRLR = dragItem.is(':last-child'),
				lastDivider = dragItem.nextAll('.divider').length == 0;

			menu.find("[data-action='group-up']")[dragItem.next().hasClass('card-gizmo') && !firstRLR  ? 'show' : 'hide']();
			menu.find("[data-action='group-down']")[dragItem.next().hasClass('card-gizmo') && !lastDivider  ? 'show' : 'hide']();


			menu.find("[data-action='up']")[firstRLR ? 'hide' : 'show']();
			menu.find("[data-action='down']")[lastRLR ? 'hide' : 'show']();
			menu.find('.toggle-hide')[rlrHidden ? 'hide' : 'show']();
			menu.find('.toggle-unhide')[rlrHidden ? 'show' : 'hide']();

			menu.appendTo(body);
			menu.css({
		      display: "block",
		      left: pos.left - menu.width() + clicked.width(),
		      top: pos.top + clicked.height()
		    });		    
	    	//set context area active
	    	var activeWrapper = clicked.parents('.menu');
	    	activeWrapper.addClass('active');
		    return false;
		});
		function SetRLRVisibility(id, hide) {
			$.ajax({
			  type: 'POST',
			  url: 'index.cfm',
			  data: {
			  	method: 'cUserSecure.actManageClass',
				action: 'updateResourceListResourceVisibility',
				isHidden: hide ? 1 : 0,
				resourceListResourceID: id
			  },
			  success: function(data) {
			  	if (!data.success) notify('<strong>Error:</strong> Changes not saved.');
			  }
			});
		}
		function addHeaderForm(element){
			if($('#gizmoList #addDividerTemplate').length==0){
				var headerForm = $('#addDividerTemplate').clone().removeClass('hidden').addClass('active');
				headerForm.find('input').on('keyup', function(event){
					if(event.which == ENTER_KEYCODE && $(this).val().length > 0){
						$(this).parents('#addDividerTemplate').find('.add-header-button').click();
					}
					else if($(this).val().length > 0){
						$(this).parent().find('button').attr('disabled', false);
					}
					else {
						$(this).parent().find('button').attr('disabled', true);
					}
				});

				headerForm.insertBefore(element).find('input').focus();
			} else {
				// focus on existing add-heading element
				$('#gizmoList #addDividerTemplate input').focus();
			}
		}
		function addHeaderToDOM(headingText, sortOrder){
			var header = $('#addHeadingTemplate').clone().removeClass('hidden');
			header.find('h4.title span.inner').text(headingText);
			$('#addDividerTemplate.active').remove();
			header.insertBefore($('#gizmoList div.drag-item:nth-child('+sortOrder+')'));
			initializeTooltips();
		}
		function addHeaderToDB(headingText, classID, sortOrder){
			var AJAX_data = {
			  	method: 'cUserSecure.actManageClass',
				action: 'addClassResourceListHeading',
				ClassID: classID,
				HeadingText: headingText,
				HeadingSortOrder: sortOrder,		  	
			  };
			if(isGizmoList){
				AJAX_data = {
				  	method: 'cUserSecure.actManageClass',
					action: 'addGizmoListResourceListHeading',
					GizmoListID: classID,
					HeadingText: headingText,
					HeadingSortOrder: sortOrder,		  	
			  	};
			}
			$.ajax({
			  type: 'POST',
			  url: 'index.cfm',
			  data: AJAX_data,
			  success: function(data) {
			  	if (!data.success) {
			  		notify('<strong>Error:</strong> Changes not saved.');
			  		$('#gizmoList #addHeadingTemplate').remove();
			  	} else {
			  		// Set the ID of the new header
			  		var rlID = data.data.resourceListResourceID
			  		var header = $('#gizmoList #addHeadingTemplate').removeAttr('id');
			  		header.attr('data-rlrid', rlID);
			  		header.find('[data-id]').each(function() {
			  			$(this).data('id', rlID);
			  		});
			  		SetRLSortOrder(1, sortable.toArray().join(', ')); // Save position of list elements.  Needed for corner cases.
			  	}
			  }
			});
		}
		function removeGizmo(rlr, contextID){
			rlr.slideUp('fast', function() {
				rlr.remove();
			});
			$.ajax({
			  type: 'POST',
			  url: 'index.cfm',
			  data: {
			  	method: 'cUserSecure.actManageClass',
				action: 'deleteResourceListResource',
				resourceListResourceID: contextID			  	
			  },
			  success: function(data) {
			  	if (!data.success) notify('Error: Changes not saved.');
			  }
			});
		}
		$(document).on('click', '[data-context] [data-action]', function(e) {
			e.preventDefault();

			var clicked = $(this),
				context = clicked.parents('[data-context]'),
				contextPrefix = context.data('context'),
				contextID = context.data('id'),
				action = contextPrefix + '-' + clicked.data('action'),
				rlr = $("[data-rlrid='"+contextID+"']"),
				isDropDown = context.hasClass('dropdown-menu');

			// hide tooltip
			switch(action) {
				case  'rlr-up':
					rlr.insertBefore(rlr.prev());
					SetRLSortOrder(1, sortable.toArray().join(', '));
					break;
				case  'rlr-down':
					rlr.insertAfter(rlr.next());
					SetRLSortOrder(1, sortable.toArray().join(', '));
					break;
				case 'rlr-cancel-remove':
					var confirmDelete = rlr.find('.confirm-gizmo-delete');
					confirmDelete.hide();					
					break;
				case  'rlr-remove':
					// Confirm delete only exists if the gizmo has assessment results
					var confirmDelete = rlr.find('.confirm-gizmo-delete');

					if(confirmDelete.length > 0){
						confirmDelete.show();
					} else {
						removeGizmo(rlr, contextID);
					}
					break;
				case 'rlr-remove-confirm':
					removeGizmo(rlr, contextID);
					break;
				case  'rlr-hide':
					rlr.addClass('rlr-hidden');
					SetRLRVisibility(contextID, true);
					// toggle		
					if (isDropDown) {			
						context.find('.toggle-unhide').show();	
						context.find('.toggle-hide').hide();
					}
					break;
				case  'rlr-unhide':				
					rlr.removeClass('rlr-hidden');
					SetRLRVisibility(contextID, false);
					// toggle
					if (isDropDown) {
						context.find('.toggle-hide').show();	
						context.find('.toggle-unhide').hide();	
					}
					break;
				case 'rlr-group-up': 
					var top = rlr.prevAll('.divider');
					var gizmoGroup = rlr.nextUntil('.divider');

					if(top.length == 0){
						$('#gizmoList').prepend(gizmoGroup).prepend(rlr);
					} else {
						var topDivider = top.filter(':first');
						rlr.insertBefore(topDivider);
						gizmoGroup.insertBefore(topDivider);
					}

					SetRLSortOrder(1, sortable.toArray().join(', '));
					break;
				case 'rlr-group-down':
					var bottom = rlr.nextAll('.divider').filter(':eq(1)');
					var gizmoGroup = rlr.nextUntil('.divider');

					if(bottom.length == 0){
						$('#gizmoList').append(rlr).append(gizmoGroup);
					} else {
						rlr.insertBefore(bottom);
						gizmoGroup.insertBefore(bottom);
					}

					SetRLSortOrder(1, sortable.toArray().join(', '));

					break;
				case  'rlr-heading':
					addHeaderForm(rlr);
					break;
				case 'manage-heading':
					addHeaderForm($('#gizmoList div').first());
					break;
				case 'manage-addHeading':
					var headingText = $(this).parents('#addDividerTemplate').find('.heading-input').val();
					var classID = $('#gizmoList').data('rlid');
					var sortOrder = $('#gizmoList #addDividerTemplate').prevAll().length;

					addHeaderToDOM(headingText, sortOrder+1);
					addHeaderToDB(headingText, classID, sortOrder);
					break;
				case 'manage-cancelHeading':
					$('#addDividerTemplate.active').remove();
					break;
			}
			if (isDropDown) {
				$('.menu.active').removeClass('active');
				context.hide();
			}
			// cleanup tooltip
			if (clicked.attr('data-original-title')) clicked.tooltip('hide');

		});
		$(document).on('click', '.dropdown-backdrop', function(){
		    $("body > .dropdown-menu").hide();
		    $('.menu.active').removeClass('active');
		});
	}

	$('.el-table-group').on('click', 'input.select-all-checkboxes', function(e){
		var checkboxes = $(this).parents('table').find('.select-student').not(':disabled');
		
		if($(this).prop('checked') == true){
			checkboxes.prop('checked', true);
		}
		else {
			checkboxes.prop('checked', false);
		}

		setActionButton($(this).parents('.el-table-group'));
	});

	$('.el-table-group').on('click', 'table .select-student', function(e){
		if(!$(this).is(':checked')){
			$(this).parents('table').find('.select-all-checkboxes').prop('checked', false);
		}

		setActionButton($(this).parents('.el-table-group'));
	});

	$('.el-table-group .action-button').on('click', function(event){
		if(!$(this).hasClass('disabled')){
			$(this).parents('.el-table-group').find('.action-confirm').show();
			$(this).hide();
		}
		event.preventDefault();
	});

	$('.el-table-group .cancel-action').on('click', function(event){
		$(this).parents('.el-table-group').find('.action-button').show();
		$(this).parents('.action-confirm').hide();
		event.preventDefault();
	});

	$('.el-table-group .reset-students').on('click', function(){
		resetMultipleStudents($(this).parents('.el-table-group'));
	});

	$('.el-table-group .reset-single-student').on('click', function(){
		resetSingleStudent($(this).parents('.el-table-group'));
	});

	$('.el-table-group .reset-multiple-students-original').on('click', function(){
		$(this).parents('.el-table-group').find('#DeleteStudentAnswers').submit();
	});

	$('.el-table-group .level-popover').popover({}).on('click, mouseenter', function(){
		$(this).popover('toggle');
	}).on('mouseleave', function(){
		$(this).popover('hide');
	});

	// adjust text size on recent activity feed if title is long
	if ($('.recent-title').length) {
		$('.recent-title').each(function() {
			if( $(this).width() < 300 && $(this).html().length > 25) {
				$(this).addClass('small-12-text');
			}
			if( $(this).width() < 225 &&  $(this).html().length > 35) {
				var title = $(this).html();
				$(this).html(title.substring(0,35) + "...");
			}
		});
	}
	// adjust text size on recent activity feed if title is long
	if ($('.card-gizmo.recent').length) {
		$('.card-gizmo.recent').click(function() {
			window.location = $(this).data("href");
		});
	}

	// Upgrade Label
	$('.el-table-group .label-upgrade').on('click', function(){
		upgradeStudent($(this).attr('data-userid'), $(this));
	});

	// Set the progress bar for each student
	$('.el-table-group tr.student-data').each(function(){
		setProgressBar($(this), $(this).find('td.student-progress').attr('data-initial-completion'));
	});

	// Individual Reports
	$('.el-table-group .show-level-description').on('click', function(){
		$(this).siblings('.level-description').toggle();
		$(this).find('span').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-bottom');
	});

	// Delete multiple students
	$('#rosterForm').on('submit', function(e){
		e.preventDefault();

		var elTableGroup = $(this).parents('.el-table-group');

		elTableGroup.find('.action-confirm').hide();
		elTableGroup.find('.action-button').addClass('disabled').show();

		var method = $(this).find('input[name="method"]').val();
		var classID = $(this).find('input[name="ClassID"]').val();
		var studentIDs = "";

		$(this).find('.select-student').filter(':checked').each(function(){
			studentIDs += $(this).val()+",";
		})

		successFunction = function(){
			elTableGroup.find('.select-student').filter(':checked').parents('tr').remove();
			classSizeCalculations();
			setActionButton(elTableGroup);
		}

		deleteStudents(method, classID, studentIDs, successFunction);
	});

	$('.el-table-group .notify-block').popover({ container : '.el-table-group'}).on('click, mouseenter', function(){
		$(this).popover('toggle');
	}).on('mouseleave', function(){
		$(this).popover('hide');
	});

	// Mask Passwords
	$('.el-table-roster').on('click', '.password-toggle', function(){
		$(this).find('.password-mask').toggleClass('hidden');
	});

	freemiumClassInitialization();

	initializeNewClassValidation();
	initializeEditClassFormValidation();
	initializeResetDeleteFormValidation();
	initializeAddStudentValidation();

	// Check if we need to display class full notice.
	classSizeCalculations();

}); // document.ready


function freemiumClassInitialization(){

	function showHideLockedGizmos(){
		$('.locked-gizmo-tag').parents('.card-gizmo').toggle();

		var numFreeGizmos = $('.freemium-class-page-tag').length;
		// var lockedGizmosVisible = $('.locked-gizmo-tag:visible').length > 0 ? true : false;

		if(numFreeGizmos == 0){
			$('.no-free-gizmos-message').toggle();
		}
	}

	$('#inset_3').on('change', function(e){
		$('.freemium-class-message .student-toggle').toggleClass('active');
		showHideLockedGizmos();
	});

	$('.freemium-class-message .student-toggle').on('click', function(){
		$('#inset_3').trigger('click');
	});
}

function classSizeCalculations(){

	if($('#rosterForm').length){

		elTableGroup = $('#rosterForm').parent('.el-table-group');

		if(elTableGroup.find('.select-student').length != 0)
		{
			var studentsEnrolled = elTableGroup.find('.select-student').filter(':unchecked').length;
			var maxSeats = $('#maxStudentSeats').html();
			var remainingSeats = parseInt(maxSeats) - parseInt(studentsEnrolled);
	
			if(remainingSeats > 0){
				$('#classFullWarning').hide();
				$('#addNewStudentButton').removeClass('disabled')
			}
			else {
				$('#classFullWarning').show();
				$('#addNewStudentButton').addClass('disabled');
			}
	
			$('#totalNumStudents').html(studentsEnrolled);
			$('#remainingStudentSeats').html(remainingSeats);
		}
	}
}

function initializeNewClassValidation(){

	$('#addClassForm').validate({
		errorClass : 'text-danger',
 		errorElement : 'em',
 		rules : {
 			addClassForm_shortName : {
 				checkHTMLChars : true,
 				forbidCharacter : '$'
 			},
 			addClassForm_descName : {
 				checkHTMLChars : true,
 				forbidCharacter : '$'
 			}
 		},
 		submitHandler: function(form){
 			$(form).find('button.btn-primary').attr('disabled',true);
 			 form.submit();
 		},
 		highlight: function(element, errorClass, validClass){
			$(element).parent('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).parent('div').removeClass('has-error');
		}
	});
}

function initializeEditClassFormValidation(){
	var editFormParams = jQuery.extend({}, COMMON_VALIDATION_PARAMETERS);

	editFormParams.rules =  {
		editClassForm_shortName : {
			checkHTMLChars : true,
			forbidCharacter : '$'
		},
		editClassForm_descName : {
			checkHTMLChars : true,
			forbidCharacter : '$'
		}
 	};

 	$('#editClassForm').validate(editFormParams);
}

function initializeResetDeleteFormValidation(){
	var resetParams = jQuery.extend({}, COMMON_VALIDATION_PARAMETERS);

	resetParams.errorPlacement = function(error,element){
		error.insertAfter(element.parent());
	};

	resetParams.messages = {
		resetClassForm_confirm : {
			required : 'Please confirm your action.'
		},
		deleteConfirm : {
			required : 'Please confirm your action.'
		} 
	};

	$('#resetClassForm').validate(resetParams);
	$('#deleteClassForm').validate(resetParams);
}

function initializeAddStudentValidation(){

	var addStudentParams = jQuery.extend({}, COMMON_VALIDATION_PARAMETERS);

	addStudentParams.rules = {
		addStudentForm_firstName : {
			checkHTMLChars : true,
			nameFormatCheck : true
		},
		addStudentForm_lastName : {
			checkHTMLChars : true,
			nameFormatCheck : true
		}
	}

	$('#addStudentForm').validate(addStudentParams);
}

function setActionButton(elTableGroup){

	var totalChecked = elTableGroup.find('.select-student').filter(':checked').length

	if(totalChecked){
		elTableGroup.find('.action-button').removeClass('disabled').show();
		elTableGroup.find('.action-count').html('/ '+totalChecked);
	}
	else {
		elTableGroup.find('.action-button').addClass('disabled').show();
		elTableGroup.find('.action-count').html('');
	}

	elTableGroup.find('.action-confirm').hide();
}

function resetMultipleStudents(elTableGroup){
	var userList = "";

	var studentsToReset = elTableGroup.find('.select-student').filter(':checked');
	
	studentsToReset.each(function(){
		userList += $(this).val()+",";
	});

	successFunction = function(){
		studentsToReset.each(function(){
			$(this).prop('checked', false).prop('disabled', true);
			setProgress($(this).parents('tr'), 0, 0);
		});

		setActionButton(elTableGroup);
	}

	resetStudents(userList, successFunction);
}

function resetSingleStudent(elTableGroup){
	userList = $('#studentID').val();

	successFunction = function(){

		elTableGroup.find('tr.data-row').each(function(rowNumber, val){
			if(rowNumber == 0 || $(this).hasClass('summary-row')){
				$(this).find('.progress-col .progress-bar').css('width', '0%').find('glyphicon-ok').hide();
				$(this).find('.student-percentage').html('0%');
				$(this).find('.student-average').html('0.0');
			}
			else {
				$(this).find('.progress-col').prop('colspan',3).find('.progress').html('LOCKED');
				$(this).find('.student-percentage').remove();
				$(this).find('.student-average').remove();
			}
		});

		setActionButton(elTableGroup);
	}

	resetStudents(userList, successFunction);
}

function setClassTabSortOrder(classIDs){
	$.getJSON(AJAX_REQUEST_URL ,
	{
		method : CLASS_TAB_REORDER_METHOD,
		classIDList : classIDs,
	},
	function(data){	
		if(data.success != true){
			notify('<strong>Error:</strong> There was an error while reordering class tabs.  Changes not saved.');
		}
	}, 'json');
}

function resetStudents(userList, successFunction){
	var classID = $('#classID').val();
	var resourceID = $('#resourceID').val();

	$.getJSON(AJAX_REQUEST_URL ,
	{
		method : RESET_STUDENTS_METHOD,
		classID : classID,
		resourceID : resourceID,
		users : userList
	},
	function(data){	

		if(data.success == true){
			notify('<strong>Success:</strong> Student results reset.');
			successFunction();
		}
		else {
			notify('<strong>Error:</strong> There was a problem with your request.');
		}
	});
}

function upgradeStudent(userID, label){

	var classID = $('#classID').val();
	var resourceID = $('#resourceID').val();

	$.getJSON(AJAX_REQUEST_URL,
	{
		method : UPGRADE_STUDENT_METHOD,
		classID : classID,
		resourceID : resourceID,
		userID : userID
	},
	function(data){	
		if(data.success == true){
			label.hide();
			setProgress(label.parent('td').parent('tr'), data.VERSIONPERCENTCOMPLETED, data.VERSIONAVERAGESCORE);
			notify('Upgrade successful.')
		}
		else {
			notify('Upgrade failed.');
		}
	});
}

function deleteStudents(method, classID, studentUserIDs, successFunction){

	$.post(AJAX_REQUEST_URL, 
	{
		method : method,
		classID : classID,
		studentIDs : studentUserIDs,
	},
	function(data){
		if(data.success == true){
			notify('<strong>Success:</strong> Student(s) deleted.');
			successFunction();
		}
		else {
			notify('<strong>Error:</strong> There was a problem with your request.');
		}
	},
	'json');
}

function setProgress(row, versionCompleted, versionAverageScore){
	row.find('.student-percentage').html(versionCompleted.toFixed(0)+"%");
	row.find('.student-average').html(versionAverageScore.toFixed(1));

	setProgressBar(row, versionCompleted)
}

function setProgressBar(row, percentCompleted){

	var bar = row.find('.progress-bar-success')

	bar.css('width', percentCompleted + '%');

	if(percentCompleted < 100){
		bar.find('.glyphicon').hide();
	}
}