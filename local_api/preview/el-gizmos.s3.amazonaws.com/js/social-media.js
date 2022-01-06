// social-media.js
// Description: JS Needed for social media functionality
// Author: Jordan Marshall
// Created: July 2015

function initializeShareEmailValidation(){
	$('#shareURL-email').validate({
		errorClass : 'text-danger',
		errorElement : 'em',
		rules : {
			recipients : {
				multipleEmails : true,
			}
		},
		submitHandler : function(form){

			shareURL = getShareURL(UTM_SOURCE_WEBSITE, UTM_MEDIUM_EMAIL);

			var successHandler = function(data){
				$.post(AJAX_URL, {
					method : $(form).find('[name=method]').val(),
					linkHREF : data.shortenedURL,
					linkTitle : $(form).find('[name=linkTitle]').val(),
					subject : $(form).find('[name=subject]').val(),
					greeting : $(form).find('[name=greeting]').val(),
					recipients : $(form).find('[name=recipients]').val(),
					message : $(form).find('[name=message]').val(),
				},
				function(data){
					if(data.success){
						notify('<strong>Success:</strong> '+data.message[0]);
					}
					else {
						if(data.message){
							notify('<strong>Error:</strong> '+data.message[0])
						}
						else {
							notify('<strong>Error:</strong> There was a problem with your request.');
						}
					}
				});
			}

			getShortenedURL(shareURL, successHandler);


			$('#shareEmail').modal('hide');
		},
		highlight: function(element, errorClass, validClass){
			$(element).parent('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).parent('div').removeClass('has-error');
		}
	});
}

UTM_SOURCE_TWITTER = "twitter";
UTM_SOURCE_FACEBOOK = "facebook";
UTM_SOURCE_WEBSITE = "website";

UTM_MEDIUM_SOCIAL = "social";
UTM_MEDIUM_EMAIL = "email";

function getShareURL(UTM_SOURCE, UTM_MEDIUM){
	var campaign = $('#socialCampaign').val();
	var content = $('#socialContent').val();

	var baseURL = $('#shareBaseURL').val();

	var shareURL = baseURL+"&utm_campaign="+campaign+"&utm_medium="+UTM_MEDIUM+"&utm_source="+UTM_SOURCE+"&utm_content="+content;

	return shareURL;	
}

function getShortenedURL(shareURL, successHandler){
	$.post(AJAX_URL, {
		method : 'cUser.actBitlyShortenURL',
		URL : shareURL,
	},
	function(data){
		if(data.success == true){
			successHandler(data);
		}
		else {
			if(data.errors){
				notify('<strong>Error:</strong>' + data.errors[0])
			}
			else {
				notify('<strong>Error:</strong> There was a problem with your request.');
			}
		}
	}, 'json');
}

function initializeTweetValidation(){
	$('#shareURL-twitter').validate({
		errorClass : 'text-danger',
		errorElement : 'em',
		submitHandler : function(form){
			message = $(form).find('[name=message-tweet]').val();

			var twitterURL = getShareURL(UTM_SOURCE_TWITTER, UTM_MEDIUM_SOCIAL);

			var successHandler = function (data){
				window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(data.shortenedURL) + '&text=' + encodeURIComponent(message) + '&hashtags=gizmos',"_blank", "width=550, height=420");
			}

			getShortenedURL(twitterURL, successHandler);

			$('#shareTwitter').modal('hide');
		},
		highlight: function(element, errorClass, validClass){
			$(element).parent('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).parent('div').removeClass('has-error');
		}
	});
}

function initializeFacebookSharing(){

	var facebook_url = encodeURIComponent(getShareURL(UTM_SOURCE_FACEBOOK, UTM_MEDIUM_SOCIAL));

	$(document.body).on('click', '#shareURL-facebook', function(e) {
		window.open('http://www.facebook.com/sharer.php?u=' + facebook_url, "_blank", "width=550, height=420");
	});
}

$(document).ready(function(){
	initializeFacebookSharing();
	initializeTweetValidation();
	initializeShareEmailValidation();
});