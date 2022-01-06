// commonformvalidation.js
// Description: The JS needed for several forms spreadout across the site.
// Author: Jordan Marshall
// Created: May 2015

function addWhatITeachValidationSettings(){

	$('.whatITeachFormElements .subject-button').each(function(){
		$(this).rules('add', {
			messages : {
				required: "You must choose at least one subject."
			},
		});
	});

	$('.whatITeachFormElements .grades-checkbox').each(function (){
		$(this).rules('add', {
			required : function(element){
				return !$('.classes-checkbox').is(':checked');
			},
			messages : {
				required : "Please choose at least one grade or topic."
			}
		});
	});

	$('.whatITeachFormElements .classes-checkbox').on('change', function(){
		$(this).parents('form').valid();
	});

	$('.whatITeachFormElements .grades').on('change', function(){ 
		$(this).parents('form').valid();
	});
}

// JS for "What I teach" form behavior
function displayWhatITeachFormElements(topLevelDiv){

	// Determine which grade boxes to display
	var gradeTarget = topLevelDiv.find('li.active').data('grade')
	if(topLevelDiv.find('div.grades label.checkbox-inline').filter('.'+gradeTarget).length){
		topLevelDiv.find('div.grades').show();
	} else {
		topLevelDiv.find('div.grades').hide();
	}
	topLevelDiv.find('div.grades label.checkbox-inline').hide().filter('.'+gradeTarget).show();

	// Recalculate which class labels are displayed
	if(gradeTarget == "E"){
		topLevelDiv.find('div.classes').hide();
	}
	else {	
		topLevelDiv.find('div.classes').show();

		var classList = topLevelDiv.find('div.classes label.checkbox-inline');
		classList.hide();

		var mathChecked = topLevelDiv.find('div.subjects input').first().is(':checked');
		var scienceChecked = topLevelDiv.find('div.subjects input').last().is(':checked');

		if(!mathChecked && !scienceChecked){
			mathChecked = true;
			scienceChecked = true;
		}

		if(mathChecked){
			// The filtering is weird because classes can have multiple grade targets (IE Science-MH)
			var re = new RegExp("Math-.*["+gradeTarget+"].*");

			classList.filter(function(){
				return $(this).attr('class').indexOf('Math') > 0 &&  re.test($(this).attr('class'));
			}).show();
		}
		else {
			classList.filter('[class*=" Math-"]').children('input').prop('checked',false);
		}

		if(scienceChecked){
			var re = new RegExp("Science-.*["+gradeTarget+"].*");

			classList.filter(function(){
				return $(this).attr('class').indexOf('Science') > 0 &&  re.test($(this).attr('class'));
			}).show();
		}
		else {
			classList.filter('[class*=" Science-"]').children('input').prop('checked',false);
		}
	}
}

$(document).ready(function(){

	addCharacterCounter($('#addLessonMaterialsForm textarea'), 300);
	addCharacterCounter($('#editUserLessonMaterial textarea'), 300);
	addCharacterCounter($('#shareClassGizmosForm textarea'), 256);

	// "What I Teach" common form element (Subjects, Grades, Classes)
	$('div.whatITeachFormElements ul.nav a').on('click', function(e){
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		
		var academicLevel = $(this).parents('form').find('input[name="academicLevel"]');
		
		if(academicLevel.length > 0){
			academicLevel.val($(this).parent('li').data('level'));
		}

		displayWhatITeachFormElements($(this).parents('.whatITeachFormElements'));
		e.preventDefault();
	});

	$('div.whatITeachFormElements div.subjects input').on('change', function() {
		displayWhatITeachFormElements($(this).parents('.whatITeachFormElements'))
	});

	// The 'each' function is used here because there could be multiple forms on the page (dspClass)
	$('div.whatITeachFormElements').each(function(){
		displayWhatITeachFormElements($(this));
	});

	$('#registerForm #username').on('keyup change', function(){
		successFunction = function(isTaken){
			if(isTaken){
				$('#usernameUnique').val('').valid();
			}
			else {
				$('#usernameUnique').val('true').valid();
			}
		}
		usernameIsTaken($(this).val(), successFunction)
	});

	initializeAddLessonMaterialsValidation();
	initializeAddRecommendationValidation();

	initializeWhatITeachValidation();
	initializeShareClassGizmosValidation();
	initializeUserRegistrationValidation();
	initializeUpdateProfileValidation();
	initializeCommentFormValidation();
	initializeGetLoginFormValidation();
	initializeDeleteGizmoListValidation();

	initializeContactUsForm();


	// Must be initialized after validate is called on each form
	addWhatITeachValidationSettings();
});

function initializeContactUsForm(){

	$('#ContactUsForm').validate({
		errorClass : 'text-danger',
		errorElement : 'em',
		rules : {
			supportFormUserData : {
				emailWithDot : true
			}
		},
		errorPlacement : function (error, element){
			// No error message placement
		},
		highlight: function(element, errorClass, validClass){
			$(element).closest('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).closest('div').removeClass('has-error');
		},
		submitHandler : function(form){
			// This prevents people from submitting the contact form multiple times
			$(form).find('#contactUsSubmit').attr('disabled', true); 

			var userData = getSupportFormData();

			for(var key in userData){
				var newInput = $('<input>');
				newInput.attr('type', 'hidden').attr('name', key).val(userData[key]);
				$(form).append(newInput);
			}

			form.submit();
		}
	});

	$('#ContactUsForm').on('change keyup focusout', function(event){
		if($(this).valid()){
			$(this).find('button#contactUsSubmit').removeClass('disabled');
		} else {
			$(this).find('button#contactUsSubmit').addClass('disabled');
		}
	});
}

function initializeDeleteGizmoListValidation(){

	var deleteFormValidationOptions = {
		errorClass : 'text-danger',
		messages : {
			deleteConfirm : {
				required : "Please confirm your action."
			},
			stopSharingConfirm : {
				required : "Please confirm your action"
			}
		},
		errorPlacement : function(error,element){
			error.insertAfter(element.parent());
		},
		errorElement : 'em',
		highlight: function(element, errorClass, validClass){
			$(element).parent('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).parent('div').removeClass('has-error');
		}
	};

	$('#deleteGizmoListForm').validate(deleteFormValidationOptions);
	$('#stopSharingGizmoListForm').validate(deleteFormValidationOptions);

}


function initializeGetLoginFormValidation(){
	$('#recoverLoginInformationForm').validate({
		errorClass : 'text-danger',
		errorElement : 'em',
		rules : {
			emailAddr : {
				emailWithDot : true
			}
		},
		highlight: function(element, errorClass, validClass){
			$(element).parent('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).parent('div').removeClass('has-error');
		}
	});
}


function profileInterceptSetVal(){
	var selectField = $('#ProfileInterceptForm #schoolID');
		
	if(selectField.val() && selectField.val() == 0){
		$('#notlistedinfo').show();
	}
	else {
		$('#notlistedinfo').hide();
	}
}

function initializeUpdateProfileValidation(){

	$('#ProfileInterceptForm #schoolID').on('change', function(){
		profileInterceptSetVal();
	});

	profileInterceptSetVal();

	$('#ProfileInterceptForm').validate({
		errorClass : 'text-danger',
		errorElement : 'em'
	});
}

function initializeUserRegistrationValidation(){
	$('#userRegistrationForm2').validate({
		errorClass : 'text-danger',
 		errorElement : 'em',
 		errorPlacement : function(error, element){
 			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else if ($(element).hasClass('grades-checkbox')) {
				errorDiv = $('#userRegistrationForm2 .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
			else {
				$(element).closest('div').prepend(error);
			}
 		},
	 	submitHandler : function(form){
			$(form).find('button[type="submit"]').addClass('disabled').prop('disabled', true);
			form.submit();
		}
	});

	$('#regCodeForm').validate({
		messages : {
			regCode : {
				required : "Please enter a Registration Key."
			}	
		},
		errorClass : 'text-danger',
 		errorElement : 'span',
	});

	jQuery.validator.addMethod('checkForSpaces', function(value, element){
		return this.optional(element) || (value.indexOf(' ') == -1);
	});

	$('#registerForm').validate({
		ignore : ":hidden:not(#usernameUnique)",
		rules : {
			cemail : {
				equalTo : '[name=email]'
			},
			password : {
				minlength : 6,
			},
			cpassword : {
				equalTo : '[name=password]'
			},
			username : {
				maxlength : 50,
				checkForSpaces : true
			}
		},
		messages : {
			cemail : {
				equalTo : "Email addresses do not match."
			},
			password : {
				minlength : "Passwords must be at least 6 characters long."
			},
			cpassword : {
				equalTo : "Passwords do not match."
			},
			schoolID : {
				required : "Please select your school."
			},
			usernameUnique : {
				required : "Username has already been taken."
			},
			username : {
				checkForSpaces : "Username can't contain spaces."
			}
		},
		errorClass : 'text-danger',
		errorElement : 'span',
		submitHandler : function(form){
			$(form).find('button[type="submit"]').addClass('disabled').prop('disabled', true);
			form.submit();
		}
	});

}

// Two forms (on dspList and dspClass) use this JS
function initializeShareClassGizmosValidation(){
	$('#shareClassGizmosForm').validate({
		messages : {
			shareClassGizmoListForm_sharedTitle : {
				required : "Please provide a title."
			},
			shareClassGizmoListForm_sharedDescription : {
				required : "Please provide a description."
			}
		},
		rules : {
			shareClassGizmoListForm_sharedDescription : {
				checkHTMLChars : true
			},
			shareClassGizmoListForm_sharedTitle : {
				checkHTMLChars : true
			}
		},
		errorClass : 'text-danger',
 		errorElement : 'em',
 		errorPlacement : function(error, element){
 			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else if ($(element).hasClass('grades-checkbox')) {
				errorDiv = $('#shareClassGizmosForm .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
			else {
				$(element).closest('div').prepend(error);
			}
 		}
	});
}

function initializeCommentFormValidation(){

	$('#gizmoCommentForm').validate({
		errorClass : 'text-danger',
 		errorElement : 'em',
 		rules : {
 			email : {
 				emailWithDot : true
 			},
 			message : {
 				checkHTMLChars : true,
 				maxlength : 1000
 			}
 		}
	});
}

function initializeAddRecommendationValidation(){
	$('#addGizmoRecommendationForm').validate({
		rules : {
			addRecommendationForm_comment : {
				checkHTMLChars : true
			}
		},
		messages : {
			addRecommendationForm_comment : {
				required : "Please enter a comment."
			}
		},
		errorClass : 'text-danger',
 		errorElement : 'em',
 		errorPlacement : function(error, element){
 			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else if ($(element).hasClass('grades-checkbox')) {
				errorDiv = $('#addGizmoRecommendationForm .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
			else {
				$(element).closest('div').prepend(error);
			}
 		}
	});
}


function initializeAddLessonMaterialsValidation(){

	jQuery.validator.addMethod('checkBadChars', function(value, element){
		var re = /<+|>+|\/+/;
		return this.optional(element) || !(re.test(value));
	}, "Invalid characters found.  Characters &gt;, &lt;, and / not allowed.");

	$('#addLessonMaterialsForm').validate({
		rules : {
			addLessonMaterialForm_title : {
				checkBadChars : true
			},
			addLessonMaterialForm_description : {
				checkBadChars : true
			}
		},
		messages : {
			addLessonMaterialForm_agree : "Check to accept Terms and Conditions",
			addLessonMaterialForm_title : {
				required : "Please enter a title",
			},
			addLessonMaterialForm_filepath : "File was not supplied or is not of the correct type.",
			addLessonMaterialForm_description : {
				required : "Please enter a description"
			}
		},
		errorClass : 'text-danger',
 		errorElement : 'em',
 		errorPlacement : function(error, element){
 			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else if ($(element).hasClass('grades-checkbox')) {
				errorDiv = $('#addLessonMaterialsForm .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
			else {
				$(element).closest('div').prepend(error);
			}
 		}
	});

	$('#editUserLessonMaterial').validate({
		rules : {
			lmTitle : {
				checkBadChars : true
			},
			lmDescription : {
				checkBadChars : true
			}
		},
		errorClass : 'text-danger',
		errorElement : 'em',
		errorPlacement : function(error, element){
 			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else if ($(element).hasClass('grades-checkbox')) {
				errorDiv = $('#editUserLessonMaterial .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
			else {
				$(element).closest('div').prepend(error);
			}
 		}
	});
}

function initializeWhatITeachValidation(){
	$('#whatITeachForm').validate({
		errorClass : 'text-danger',
		errorElement : 'em',
		errorPlacement : function(error, element){
			if($(element).hasClass('subject-button')) {
				$(element).parent('label').parent('div').append(error);
			}
			else {
				errorDiv = $('#whatITeachForm .whatITeachErrorMessage');
				if(errorDiv.children().length==0) errorDiv.append(error);
			}
		},
	});
}