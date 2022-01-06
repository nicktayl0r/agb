Modernizr.addTest('ipad', function () {
  return !!navigator.userAgent.match(/iPad/i);
});
 
Modernizr.addTest('iphone', function () {
  return !!navigator.userAgent.match(/iPhone/i);
});
 
Modernizr.addTest('ipod', function () {
  return !!navigator.userAgent.match(/iPod/i);
});
 
Modernizr.addTest('appleios', function () {
  return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});

// Added for GIZ-8495
Modernizr.addTest('windows', function(){
	return (navigator.appVersion.indexOf("Win") != -1);
});

jQuery.extend({
	getQueryParameters : function(str) {
		return (str || decodeURIComponent(document.location.search)).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
	}
});

function initializeTooltips(){
	$('[data-rel="tooltip"]').tooltip({
		container: 'body',
		animation: false,
		delay: { "show": 500, "hide": 0 }
	});
	$('[data-toggle="tooltip"]').tooltip();
}

var localStorageBackup = {};

$(document).ready(function(){

	var navBarSearch = $('#navBarSearch');
	if (navBarSearch.length) {
		navBarSearch.on('shown.bs.dropdown', function (e, i) {
			CenterDrop();
			$('#uncompiledQuery').focus();
		});
	}
	function wireSearch() {

		if (navBarSearch.length) {
						
			var q = $('#uncompiledQuery'),
				navBarSearchButton = $('#navBarSearchButton'),
				navSearchBox = navBarSearch.find('.nav-search-box');
				
			q.on('keyup focus', function() {
				navSearchBox[(q.val() === '' ? 'add' : 'remove') + 'Class']('nav-search-box-cleared');
			}).on('keyup', function(){
				var gIDs = [];
				var cIDs = [];
				var guideIDs = [];
				var suggestions = $('.gizmo-suggestion');
				suggestions.each(function (index, element){
					var elem = $(element);
					var elemID = elem.data('id');
					var caseID = elem.data('case');
					var guideID = elem.data('guide');

					if($.inArray(elemID,gIDs)===-1 && $.inArray(caseID,cIDs)===-1 && $.inArray(guideID,guideIDs)===-1){
						gIDs.push(elemID);
					} else {
						elem.remove();
					}

					if(caseID && $.inArray(caseID,cIDs)===-1){
						cIDs.push(caseID);
					} 

					if(guideID && $.inArray(guideID,guideIDs)===-1){
						guideIDs.push(guideID);
					} 
				});
			});
			navBarSearch.find('.nav-search-clear').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				q.val('');
				q.typeahead('val', '');
				q.focus();
			});

			var gSource;
			if(store.enabled){
				gSource = store.get('resources').gizmos;
			} else {
				gSource = localStorageBackup.resources.gizmos;
			}
			var gStrands;
			if(store.enabled){
				gStrands = store.get('browseStrands');
			} else {
				gStrands = localStorageBackup.browseStrands;
			}
			
			var gTitles = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.title;
					return Bloodhound.tokenizers.whitespace(searchData.replace('(','').replace(')',''));
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});

			var gKeywords = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.keywords;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});
			
			var gIDs = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.resourceID;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.resourceID; },
				local: gSource
			});

			var browseStrands = new Bloodhound({
				datumTokenizer: function (data) {
					var searchData = data.searchTerms;
					return Bloodhound.tokenizers.whitespace(searchData);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.displayName; },
				local: gStrands
			});

			/*
			var promise = gKeywords.initialize();

			promise
			.done(function() { console.log('ready to go!'); })
			.fail(function() { console.log('err, something went wrong :('); });
			*/

			var gizmoSuggestionTemplates = {
				// empty: [
				//   '<div class="empty-message">',
				//   'Unable to find Gizmos match the current query',
				//   '</div>'
				// ].join('\n'),
				suggestion: function(data) {
					var labels = data.measurementSystem.length  ? '<span class="labels"><span class="label label-metric">Metric</span></span>' : '';
					var caseData = '';

					if (data.resourceTypeName == 'InteractiveCase') {
						labels += '<span class="labels"><span class="tag-case">STEM Case</span></span>';
						thumbName = 'TNc';
						caseData = 'data-case ="' + data.interactivecaseid + '" ';
					}
					else if (data.resourceTypeName == 'InteractiveGuide') {
						labels += '<span class="labels"><span class="tag-handbook">AP Handbook</span></span>';
						thumbName = 'TNg';
						caseData = 'data-guide ="' + data.interactivecaseid + '" ';
					}

					data.interactivecaseid > 0 ? imageString = "CaseSnap/" + data.interactivecaseid + thumbName : imageString = "GizmoSnap/" + data.resourceID + "TN";
					return '<div data-id="'+data.resourceID+'" ' + caseData +  ' class="gizmo-suggestion">'+labels+'<img src="'+elPaths.imageRoot+'/img/'+imageString+'.png" class="thumb"><span class="title">'+data.title+'</span></div>';
				}
			};
			var browseStrandSuggestionTemplates = {
				header: '<div class="tt-divider">Grade Bands &AMP; Topics</div>',
				suggestion: function(browseStrand) {
					return '<div data-browseStrand="'+browseStrand.deepLink+'" class="browseStrand-suggestion"><span class="glyphicon glyphicon-th-list"></span>'+browseStrand.displayName+'</div>';
				},
			};
			var taObject = {};
			
			q.typeahead({
				hint: true,
				highlight: true,
				minLength: 1,
				autoselect:true
			},
			{
				name: 'IDs',
				displayKey: 'title',
				source: gIDs,
				templates: gizmoSuggestionTemplates
			},
			{
				name: 'Titles',
				displayKey: 'title',
				source: gTitles,
				templates: gizmoSuggestionTemplates,
			},
			{
				name: 'Keywords',
				displayKey: 'title',
				source: gKeywords,
				templates: gizmoSuggestionTemplates
			},
			{
				name: 'browseStrands',
				displayKey: 'displayName',
				source: browseStrands,
				templates: browseStrandSuggestionTemplates
			}).on('typeahead:selected', function (event, data, dataset) {
				if(data.resourceID) {
					window.location.href = elPaths.myself + 'cResource.dspDetail&ResourceID=' + data.resourceID;
				} else if(data.deepLink) {
					window.location.href = elPaths.myself + 'cResource.dspResourceExplorer&browse=' + data.deepLink;
				}
			});
			$('.tt-menu').append($('<div>').addClass('tt-suggestion tt-selectable tt-footer more text-center').append($('<a>').attr('href','#').text('See Full Search Results')));

			navBarSearchButton.find('.glyphicon').css('color', 'inherit');

			$('.tt-menu').on('click','div.more',function(){
				$(this).parents('form').submit();
			})

		 //    $(window).keydown(function(e) {
			// 	if (!($('input').is(':focus') || $('textarea').is(':focus') || $('object').is(':focus'))) {
			//         var code = e.which,
		 //   				key = String.fromCharCode(code);
			// 	   if (!(e.altKey || e.ctrlKey || e.metaKey) && !(code == 116 || code == 117) && key.match(/^[a-z0-9]+$/i)) {
			// 	   		if (!q.is(":focus")) { 
			// 	   			navBarSearchButton.trigger('click.bs.dropdown');
			// 	   			q.val('');
			// 	   			q.focus();			   			
			// 	   		}
			// 	   }
			//     }		   
			// });
		}

		// notify('Typeahead Enabled');
	}	

	// try {
	// 	// populate local storage
	// 	if(store.get('resources')===null || store.get('browseTree')===null || store.get('browseStrands')===null || store.get('gizmoReplacements')===null || localStorageOutOfDate('resources')){
	// 		$('#navBarSearchButton').find('.glyphicon').css('color', '#555');
	// 		$.ajax({
	// 			method: "GET",
	// 			url: el.getContentRoot() + "/json/qryResources.json",
	// 			dataType: 'JSON'
	// 		}).success(function(msg) {
	// 			// Build Resources Object
	// 			var searchArray = [];
	// 			$.each(msg.data, function(index,object){
	// 				var searchEntry = {
	// 					title : object.title,
	// 					keywords : object.keywords,
	// 					introText : object.introtext,
	// 					resourceID : Number(object.resourceid),
	// 					flag : object.flag,
	// 					// HTML5 : Number(object.html5) && !Number(object.html5isqa), -- JIRA 9774. MBG Clean up. By cgraham, on 12/07/18.
	// 					// resourceType : object.resourcetype, -- JIRA 9774. MBG Cleanup. By cgraham, on 09/26/18.
	// 					resourceTypeName : object.resourcetypename,
	// 					measurementSystem : object.measurementsystem,
	// 					free : Number(object.free), 
	// 					interactivecaseid : Number(object.interactivecaseid)
	// 				};
	// 				searchArray.push(searchEntry);
	// 			});
	// 			var resources = {'gizmos': searchArray, 'version': serverLocalStorageVersion};
	// 			if(store.enabled){
	// 				store.set('resources',resources);
	// 			} else {
	// 				localStorageBackup.resources = resources;
	// 			}

	// 			// Build BrowseTree Object
	// 			$.ajax({
	// 				method: "GET",
	// 				url: el.getContentRoot() + "/json/qryBrowse.json",
	// 				dataType: 'JSON'
	// 			}).success(function(msg) {
	// 				var browseTree = {name : 'root', subjects: {}};
	// 				for(var x in msg.data){
	// 					var node = msg.data[x];
	// 					if(!(node.subjectname in browseTree.subjects)){
	// 						browseTree.subjects[node.subjectname] = {gradeLevels : {}};
	// 					}
	// 					if(!(node.gradelevelname in browseTree.subjects[node.subjectname].gradeLevels)){
	// 						browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname] = {sortOrder : node.gradelevelsortorder, topics : {}};
	// 					}
	// 					if(!(node.topicname in browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics)){
	// 						browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname] = {sortOrder : node.topicsortorder, subtopics : {}};
	// 					}
	// 					if(!(node.subtopicname in browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics)){
	// 						browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname] = {sortOrder : node.subtopicsortorder, resources : []};
	// 					}
	// 					if(browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname].resources.indexOf(node.resourceID)===-1){
	// 						browseTree.subjects[node.subjectname].gradeLevels[node.gradelevelname].topics[node.topicname].subtopics[node.subtopicname].resources.push(node.resourceid);
	// 					}
	// 				}
	// 				var browseTreeObject = {'tree': browseTree, 'version':serverLocalStorageVersion};
	// 				// Build BrowseStrands Object
	// 				var browseStrandsObject = buildBrowseStrands(browseTree, {}, []);
	// 				if(store.enabled){
	// 					store.set('browseTree', browseTreeObject);
	// 					store.set('browseStrands',  browseStrandsObject);
	// 				} else {
	// 					localStorageBackup.browseTree = browseTreeObject;
	// 					localStorageBackup.browseStrands = browseStrandsObject;
	// 				}
	// 				if (interpretParam) interpretParam();
	// 				wireSearch();
	// 				$.ajax({
	// 					method: 'GET',
	// 					url: el.getContentRoot() + "/json/deprecatedGizmos.json",
	// 					dataType: 'JSON'
	// 				}).success(function(msg){
	// 					var gizmoReplacementsObject = {};
	// 					$.each(msg, function(index, object){
	// 						gizmoReplacementsObject[index] = object;
	// 					});
	// 					if(store.enabled){
	// 						store.set('gizmoReplacements', gizmoReplacementsObject);
	// 					} else {
	// 						localStorageBackup.gizmoReplacements = gizmoReplacementsObject;
	// 					}
	// 					$(document).trigger('localStorageReady');
	// 				}).fail(function(request, status, error){
	// 					console.log(error);
	// 				});
	// 			}).fail(function(request, status, error){
	// 				// getBrowseJSON AJAX Failure
	// 			});
	// 		}).fail(function(request, status, error){
	// 			// getRecourcesJSON AJAX Failure
	// 			console.log('error = ' + error);
	// 		});
	// 	} else {
	// 		// local storage already populated 
	// 		$(document).trigger('localStorageReady');
	// 		if($('#browse-results').length){
	// 			if (interpretParam) interpretParam();
	// 		}
	// 		wireSearch();
	// 	}
	// } catch (e) {
	// 	console.log(e);
	// 	// store failure (probably)
	// 	if($('#browse-results').length){
	// 		notifyError('Local storage must be enabled in your browser to make use of this feature.');
	// 	}
	// }

	function buildBrowseStrands(treeNode, parentNodeObject, resultsArray){
		if(treeNode.subjects){
			for(var subject in treeNode.subjects){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),subject);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.subjects[subject], nodeObject, resultsArray);
			}
		} else if (treeNode.gradeLevels){
			for(var gradeLevel in treeNode.gradeLevels){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),gradeLevel);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.gradeLevels[gradeLevel], nodeObject, resultsArray);
			}
		} else if (treeNode.topics){
			for(var topic in treeNode.topics){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),topic);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.topics[topic], nodeObject, resultsArray);
			}
		} else if (treeNode.subtopics){
			for(var subtopic in treeNode.subtopics){
				var nodeObject = amendNodeObject($.extend({},parentNodeObject),subtopic);
				resultsArray.push(nodeObject);
				buildBrowseStrands(treeNode.subtopics[subtopic], nodeObject, resultsArray);
			}
		}
		return resultsArray;
	}

	function amendNodeObject(nodeObject, amendment){
		if(nodeObject.displayName === undefined){
			nodeObject.displayName = amendment;
			nodeObject.searchTerms = amendment;
			nodeObject.deepLink = amendment.replace(/\ /g,'+');
			return nodeObject;
		} else {
			nodeObject.displayName += ' > '+amendment;
			nodeObject.searchTerms = amendment;
			nodeObject.deepLink += '/'+amendment.replace(/\ /g,'+');
			return nodeObject;
		}
	}
	

	$('.theme-nav .btn').on('click', function() {
		$('.home').attr('class', $(this).data('class'));
	});
    $('.dropdown-menu input, .dropdown-header, .dropdown-body').on('click', function (e) {
        e.stopPropagation();
    });
	
    initializeTooltips();
	
	// var $affixedBar = $('#affixedBar');
	// if ($affixedBar.length) {
	// 	$affixedBar.affix({
	// 		offset: {
	// 			top: $('#navBar').height()
	// 		}
	// 	});
	// 	$('#affixedBarWrap').css('min-height', $affixedBar.height());
	// }

	function CenterDrop() {
		var drop = $('.open .dropdown-menu');
		if (drop.length) {
			var p = drop.parent(),
				pR = p.offset().left + p.width(),
				w = drop.width(),
				l = pR - w,
				cL = $(window).width()/2 - (w/2);
			drop.css('right', l < cL ? l - cL : 0);
		}
	}
	$(window).resize(CenterDrop);
	
	$(document.body).on('click', '[data-context-dropdown]', function(e) {
		var clicked = $(this),
			menu = $(clicked.data('context-dropdown'));
		
		//move and show menu
		clicked.dropdown();
		clicked.parent().on('show.bs.dropdown', function () {
		  // do something…
		  menu.data('id', clicked.data('id'));
		  clicked.parent().append(menu);
		  //console.log(clicked.data('id'));
		});
	});

	$(document.body).on('click', '[data-menu]', function(e){
		var menu = $(this).data('menu');

		switch(menu){
			case "support-form" :
				// Activate the "contact us" form on the helpdesk widget
				$('#help-popover').trigger('click');
				$('#help-popover-container #helpdeskContactButton').trigger('click');
				break;
		}

		e.preventDefault();
	});

	$(document.body).on('click', '.unwrap', function(e) {
		e.preventDefault();
		
		var clicked = $(this),
			prop = 'white-space',
			nowrap = clicked.css(prop) == 'nowrap';
		clicked.css(prop, nowrap ? 'normal' : 'nowrap');
	});

	$(document.body).on('click', '.addToClass', function(e) {
		e.preventDefault();

		var clicked = $(this),
			classID = clicked.data('classid'),
			listID = clicked.parents('ul').siblings('a').data('listid'),
			resourceID = clicked.parents('ul').data('id'),
			caseType = clicked.parents('ul').prev('a').data('ctype'),
			caseID = clicked.parents('ul').prev('a').data('cid'),
			addToAllClasses = false,
			classTitle = clicked.text().trim(),
			addingGizmoList = false,
			method = 'cResourceSecure.actAddResourceToClass_ajax';
		
		caseID > 0 ? imageString = "CaseSnap/" + caseID + "TN" + caseType : imageString = "GizmoSnap/" + resourceID + "TN";

		if(typeof listID === 'number') addingGizmoList = true;

		if(clicked.hasClass('addToAllClasses')) {
			classTitle = "all classes";
			addToAllClasses = true;
		}

		var notifyArgs = {
			icon: elPaths.amzPath + '/img/' + imageString + '.png',
			title: 'Gizmo added to ' + classTitle,
			message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Gizmo in Class',
			url: el.getAjaxBaseUrl() + 'cUserSecure.dspClass&ClassID=' + classID,
			target: '_self'
		}

		if(addingGizmoList){
			method = 'cResourceSecure.actAddResourcesToClasses_ajax';
			notifyArgs = {
				title: 'Gizmo List added to ' + classTitle,
				message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Class',
				url: el.getAjaxBaseUrl() + 'cUserSecure.dspClass&ClassID=' + classID,
				target: '_self'
			}
		}

		$.post(
			'index.cfm', 
			{
				method : method,
				resourceID : resourceID,
				SharedGizmoListID : listID,
				classID : classID,
				classIDs : classID
			},
			function( data ) {
				
				// Animate "Add to Class" Button
				var addToClassBtn = $('[data-context-dropdown="#addToClassMenu"][data-id="'+resourceID+'"]');
				var originalHTML = addToClassBtn.html();

				addToClassBtn.addClass('btn-outline').html('<span class="glyphicon glyphicon-ok"></span>&nbsp; Added');
				window.setTimeout(function(){
					addToClassBtn.removeClass('btn-outline').html('<span class="glyphicon glyphicon-plus"></span><span class="hidden-xs"> Add to<span class="hidden-sm"> Class</span></span>');
				}, 3000);

				// Add checkmarks to list of classes
				// if(!addToAllClasses){
				// 	$('#addToClassMenu .addToClass[data-classid='+classID+'] .glyphicon').removeClass('glyphicon-arrow-right').addClass('glyphicon-ok').addClass('added');
				// }

				if (data.trim() == '1') {
					
					if(addingGizmoList){
						$.notify({
							title: 'Gizmo List added to ' + classTitle,
							message: (Modernizr.touch ? 'Tap' : 'Click') + ' to View Class',
							url: el.getAjaxBaseUrl() + 'method=cUserSecure.dspClass&ClassID=' + classID,
							target: '_self'
						},{
							type: 'el',
							delay: 5000,
							placement: { align : 'left', from : 'bottom'  },
							icon_type: 'image',
							mouse_over: 'pause',
							template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
									'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
								    '<span data-notify="title">{1}</span>' +
								'<span data-notify="message">Click to see updated class.</span>' +
								'<a href="{3}" target="{4}" data-notify="url"></a>' +
							'</div>'
						});
					}
					else if(addToAllClasses){
						$.notify({
							icon: elPaths.imageRoot + '/img/' + imageString + '.png',
							title: 'Gizmo added to ' + classTitle,
						},{
							type: 'el',
							delay: 5000,
							placement: { align : 'left', from : 'bottom'  },
							icon_type: 'image',
							mouse_over: 'pause',
							template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
								'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
								'<img data-notify="icon" class="pull-left">' +
								'<span data-notify="title">{1}</span>' +
							'</div>'
						});
					} else {
						$.notify({
							icon: elPaths.imageRoot + '/img/' + imageString + '.png',
							title: 'Gizmo added to <span class="classname">' + classTitle+'</span>',
							url: el.getAjaxBaseUrl() + 'method=cUserSecure.dspClass&ClassID=' + classID,
							target: '_self'
						},{
							type: 'el',
							delay: 5000,
							placement: { align : 'left', from : 'bottom'  },
							icon_type: 'image',
							mouse_over: 'pause',
							template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
								'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
								'<img data-notify="icon" class="pull-left">' +
								'<span data-notify="title">{1}</span>' +
								'<a href="{3}" target="{4}" data-notify="url"></a>' +
							'</div>'
						});
					}	
				} else if(data.trim() == '2'){
					$.notify({},{
						type: 'el',
						delay: 5000,
						placement: { align : 'left', from : 'bottom'  },
						icon_type: 'image',
						mouse_over: 'pause',
						template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-danger" role="alert">' +
							'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
							'<img data-notify="icon" class="pull-left">' +
							'<span data-notify="title"><strong>Error: Gizmo(s) Not Added</strong><br></span>' +
							'<span data-notify="message">Check to make sure you are still logged in.</span>' + 
						'</div>'
					});
				}
			}
		);
	});
	
	if ($('#bc1').length) {
		$(window).resize(function() {
	        ellipses1 = $("#bc1 :nth-child(2)");
	        if ($("#bc1 a:hidden").length >0) {
				ellipses1.show();
			} else {
				ellipses1.hide();
			}
	    });
	}
	$('.user-submitted-list .description').each(function(){
		if($(this).find('span.desc-hidden').length !== 0){
			$(this).on('click', function(){
				$(this).find('span.desc-hidden').removeClass('hidden');
				$(this).find('a.more-link').addClass('hidden');
			});
		}
	});

	$('.user-submitted-list a.more-link').on('click', function(event){
		$(this).addClass('hidden');
		$(this).siblings('span.desc-hidden').removeClass('hidden');
		event.preventDefault();
	});

	$('.user-submitted-list a.overflow-link').on('click', function(event){
		$(this).closest('div').find('.user-submitted-list').removeClass('hidden');
		$(this).addClass('hidden');
		event.preventDefault();
	});


	$('.best-for-popover').popover({
		content : function(){
			return $(this).siblings('.best-for-content').html();
		},
		html : true,
		container : ".user-submitted-list",
		placement : "top"
	});

	// Flash Messages
	$('#flashNotifications .notification').each(function(){
		notify($(this).html());
	});

	$('#expirationDialogue').modal('show');

	$('#dismissWelcomeAlert').on('click', function(event){
		$(this).parents('#affixedBarWrap').hide();
		dismissAlert(1, $('#welcomeAlertUserID').val());
	});

	$('.dismiss-bar').on('click', function(event){

		$(this).parents('.bar-dismissable').addClass($(this).data('hidden-class'));
		// $(this).parents('.bar-dismissable').addClass('bar-hidden');
		dismissAlert($(this).data('alertid'), elUser.userID);
	});

	if ($('#heatmapTour').length && $('#heatmapTour').data('flag')) {
		$('#heatmapTour').modal('show');
	}
	
	$('#heatmapTour').on("hide.bs.modal", function() {
		dismissAlert($('#closeTour').data('alertid'), elUser.userID);
	});

	$('.read-more-link').on('click', function(event){
		event.preventDefault();
		$(this).parents('.read-more-row').hide().next('.read-more-content').show();
	});

	// This is to hide the title bar that went over the video.
	// The best cross browser solution I could find.
	$(document).on('click touchstart', '#introVideo', function(){

		var jsURL = elPaths.amzPath + "/js/vendor/video.js?b="+elPaths.jsBuildNumber;
		var cssURL = elPaths.amzPath + "/css/video-js.css";

		$('head').append($('<link/>', { 'rel' : 'stylesheet', 'type' : 'text/css', 'href' : cssURL}));

		$.getScript(jsURL).done(function(){
			// For some reason the script seems to still be loading in the "done" action
			// so we have to add a timeout. 
			window.setTimeout(function(){
				$('#videoModal').modal('show');
			}, 1);
		});
	});

	$('[class^=caseVideo]').click(function(){
		var videoID = this.className.replace('caseVideo', '');
		$('#videoModal' + videoID).modal('show');
	});

	// pause video when modal closed/hidden
	$('[id^=videoModal]').on('hide.bs.modal', function(){
		$(this).find('video')[0].pause();
	});

	// Play video when modal opened
	$('[id^=videoModal]').on('shown.bs.modal', function(){
		$(this).find('video')[0].play();
	});

	$('#presetHelp').on('show.bs.modal', function(){
		console.log('Modal being shown');
		$('#presetHelp [data-lazy-load-image]').each(function(index, element){
			var img = new Image();
			img.src = $(element).data('lazy-load-image');
			img.className = $(element).data('image-classes');
			$(element).after(img);
			$(element).remove();
		});
	});

	$('.disable-on-submit').on('submit', function(e){
		$(this).find('button[type="submit"]').addClass('disabled').prop('disabled', true);
	});

	var galleryContainer = $('#gallery-container');
	if (galleryContainer.length) {
		$('#gallery-container').magnificPopup({
			delegate: 'a', 
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}

	initializeTeacherHomepage();
	initializeFreemiumFeatures();
	initializeCommonValidatorMethods();

	checkUTMCodes();
}); // document.ready


function initializeFreemiumFeatures(){

	// Login Intercept Page
	if($('#fullpage.login-intercept-page').length > 0){
		// Footer injected into fullpage.  Must be done before fullpage initialization
		if($('.section-footer').length >0){
			var footerContent = $('footer').html();
			var new_footer = $('<footer>'+footerContent+'</footer>');
			$('.section-footer').append(new_footer);
		}

		$('#fullpage').fullpage({
			navigation: false, // show the circles on the side of each page
			slidesNavigation : true,
			controlArrows: false,
		});		
	}

	// Teacher Homepage
	// if($('#upgradeEligibleModal').length > 0){
	// 	$('#upgradeEligibleModal').modal('show');
	// }

	// Alert modals for upgrade eligible, new trial, and trial expired.
	$('#upgradeEligibleModal.launch-now').modal('show');
	$('#pilotApplicationApproved').modal('show');
	$('#trialAccountExpired').modal('show');

	$('#upgradeEligibleModal .btn.apply').on('click', function(){
		$('#upgradeEligibleModal form').submit();
	});

	// Other free gizmo page
	// $('.free-gizmo-block').on('click', function(){
	// 	$(this).next('.modal').modal('show');
	// });

	// Free Gizmos Page - Toggle list/grid view
	$('.free-gizmo-page-content .btn-group-toggle button').on('click', function(e){
		button = $(this);

		if(!button.hasClass('active')){
			$('.btn-group-toggle .active').removeClass('active');
			button.addClass('active');
			$('.free-gizmo-page-content').toggleClass('grid-view').toggleClass('list-view');			
		}

		e.preventDefault();
	});


	// This is all for the modal that is displayed
	// on the Free Gizmo pages when a Gizmo is clicked.

	// var GIZMO_DESCRIPTION_MAX_LENGTH = 400;

	function launchGizmoModal(thisGizmo, openModal){

		var gizmoID = thisGizmo.data('modal-target');
		var gizmoTitle = thisGizmo.data('modal-title'); 
		var gizmoDescription = thisGizmo.find('.hidden-description').html();

		thisGizmo.addClass('open');

		// Trim the description so everything fits.
		// if(gizmoDescription.length > GIZMO_DESCRIPTION_MAX_LENGTH){
		// 	gizmoDescription = gizmoDescription.substring(0, GIZMO_DESCRIPTION_MAX_LENGTH) + " ...";
		// }

		var thisModal = $('.gizmo-details-modal');
		thisModal.find('#gizmoModalTitle').html(gizmoTitle);
		thisModal.find('#gizmoModalDescription').html(gizmoDescription);

		var linkToGizmo = thisModal.find('#lessonInfoLink').data('href') + gizmoID;
		thisModal.find('#lessonInfoLink').attr('href', linkToGizmo);

		var gizmoImage = thisModal.find('.img-responsive').data('src')+gizmoID+"DET.jpg";
		thisModal.find('.img-responsive').attr('src', gizmoImage);

		var launchLink = thisModal.find('.launch-link').data('href') + gizmoID;
		thisModal.find('.launch-link').attr('href', launchLink);

		var imageLink = thisModal.find('.gizmo-image-link').data('href') + gizmoID;
		thisModal.find('.gizmo-image-link').attr('href', imageLink);

		thisModal.find('#addToClassButton').data('id', gizmoID);

		if(openModal) thisModal.modal('show');
		// $('.modal-backdrop').css('background-color', 'white').css('opacity', '.85');
	}

	function navigateGizmoDetailsModal(direction){
		var nextGizmo;

		if(direction=="right"){
			nextGizmo = $('.gizmo-gallery-modal.open').nextAll('.gizmo-gallery-modal:visible').first();
		}
		else {
			nextGizmo = $('.gizmo-gallery-modal.open').prevAll('.gizmo-gallery-modal:visible').first();
		}

		if(nextGizmo.length == 0 && direction == "right"){
			nextGizmo = $('.gizmo-gallery-modal').first();
		}
		else if (nextGizmo.length == 0 && direction == "left"){
			nextGizmo = $('.gizmo-gallery-modal').last();
		}

		$('.gizmo-gallery-modal.open').removeClass('open');
		launchGizmoModal(nextGizmo, false);
	}

	var KEYCODE_RIGHT_ARROW = 39;
	var KEYCODE_LEFT_ARROW = 37;

	if($('.free-gizmo-page-content').length > 0){
		window.onkeyup = function(e){

			if($('.gizmo-gallery-modal.open').length > 0){
				var code = e.keyCode ? e.keyCode : e.which;

				if (code == KEYCODE_RIGHT_ARROW){
					navigateGizmoDetailsModal("right");
				}
				else if (code == KEYCODE_LEFT_ARROW){
					navigateGizmoDetailsModal("left");
				}
			}
		}
	}

	$('.gizmo-details-modal').on('click', '.gizmo-nav', function(){

		if($(this).hasClass('gizmo-nav-right')){
			navigateGizmoDetailsModal("right");
		}
		else {
			navigateGizmoDetailsModal("left");
		}
	});

	$('.gizmo-details-modal').on('hide.bs.modal', function(){
		$('.gizmo-gallery-modal.open').removeClass('open');
	});

	// Free Gizmos Page - open Gizmos modal 
	$('.gizmo-gallery-modal').on('click', function(event){
		launchGizmoModal($(this), true);
		event.preventDefault();
	});

	// List view cards have a button that launches the modal.
	// $('.launch-quick-summary').on('click', function(event){
	// 	launchGizmoModal($(this).parents('.gizmo-gallery-modal'), true);
	// 	event.preventDefault();
	// });

	if($('.gizmo-gallery-modal.show-on-load').length > 0){
		launchGizmoModal($('.free-gizmo-block.show-on-load'), true);
	}

	// Free Gizmos Page - Filter Gizmos
	$('.gizmo-list-body .free-gizmo-toggle-2').on('click', function(event){
		if(!$(this).hasClass('active')){
			$('.free-gizmo-toggle-2.active').removeClass('active');
			$(this).addClass('active');

			var target = $(this).data('category-target');

			if(target == "all"){
				$('.free-gizmo-block').removeClass('free-hidden');
				$('.card-gizmo').removeClass('free-hidden');
			}
			else {
				$('.free-gizmo-block,.card-gizmo').addClass('free-hidden');
				$('.free-gizmo-block.category-'+target+',.card-gizmo.category-'+target).removeClass('free-hidden');
			}

			$('.category-name').text($(this).data('category-name'));
		}
		event.preventDefault();
	});

	// Free Gizmos page 
	$('.category-list-page .section-header').on('click', function(){
		$(this).find('> .glyphicon').toggleClass('glyphicon-minus').toggleClass('glyphicon-plus');
	});

	// Upgrade Form

	$('#upgradeForm').validate({
		rules: {
			phone : {
				phoneNumberCheck : true
			},
			title : {
				checkSelection : true
			},
		},
		errorClass : 'text-danger',
		errorElement : 'em',
		messages : {
			title : {
				checkSelection : "Please select your title."
			}
		},
	});

	$('.apply-now-button').on('click', function(){
		$('#upgradeForm').submit();
	});

	// browse page
	$('.gizmo-category-btn').on('click', function(){
		var category = $(this).data('category');
		$('.free-gizmos').hide();
		$('.free-gizmos-'+category).show();
		$(this).addClass('active').siblings('.btn').removeClass('active');
	});

	$('#searchSection .search-filter').on('click', '[data-filter-url]', function(e){
		var filter = $(this).data('filter-url');
		location.href = filter;
		e.preventDefault();
	});

	function checkClassDisplay(){
		var subject = $('.subject button.active').data('subjectname');
		var gradeLevel = $('.grade-level button.active').data('grade');

		if(subject === undefined || gradeLevel === undefined) return;

		$('.choose-class').hide();
		$('.my-classes button').hide();
		if(subject == 'both'){
			$('.my-classes button[data-gradelevel*='+gradeLevel+']').show();
		}
		else {
			$('.my-classes button[data-gradelevel*='+gradeLevel+'][data-subject*='+subject+']').show();
		}
		$('.my-classes').show();
	}

	$('.radio-button-group button').on('click', function(event){
		$(this).siblings('button').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});

	$('.subject button').on('click', function(event){
		$('#subjectid').val($(this).data('subjectid'));
		checkClassDisplay();
		event.preventDefault();
	});

	$('.grade-level button').on('click', function(event){
		checkClassDisplay();
	});

	$('.checkbox-button-group button').on('click', function(event){
		$(this).toggleClass('active');
		event.preventDefault();

		// Set the "topic" form field
		var valueList = "";
		$('.my-classes button.topic-btn.active').each(function(){
			valueList += $(this).data('topicid')+",";
		});
		$('#topiclist').val(valueList);
		
		// Set the "gradeid" form field
		valueList = "";
		$('button.gradecode-btn.active').each(function(){
			valueList += $(this).data('gradecodeid')+",";
		});
		$('#gradecodelist').val(valueList);

		// Valid check
		if($('.checkbox-button-group button.active').length > 0){
			$('.what-i-teach-form button[type=submit]').removeClass('disabled').removeAttr('disabled');
		} else {
			$('.what-i-teach-form button[type=submit]').addClass('disabled').attr('disabled', true);
		}
	});

	// Several Pages - show modal popup when users click on a "free" or "locked" tag
	$('.free-gizmo-tag, .locked-gizmo-tag').on('click', function(){
		$('#howFreemiumWorks').modal('show');
	});

}

function initializeTeacherHomepage(){


	$('#teacherHomeBottomBar .close').on('click', function(){
		$('#teacherHomeBottomBar').css('display', 'none');
	});

	if($('#recommendedGizmosBar').length > 0){

		// Initialize "Gizmos You'll love" slider bar.
		$('#recommendedGizmosBar').slick({
			slidesToShow: 4,
			dots: false,
			infinite: true,
			speed: 300,
			slidesToScroll: 4,
			nextArrow: $('.arrow-control.next-arrow .glyphicon'),
			prevArrow: $('.arrow-control.previous-arrow .glyphicon'),
			responsive: [
				{
					breakpoint: 565,
					settings : {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 991,
					settings : {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
		});

	}

	$('.recommended-gizmos').show();

	$('.webinars-popover').popover({placement : 'right', html: true});

	function scrollCard(){
		parentCard = $(this).parents('.borderless-card').addClass('expanded');
		parentCard.find('.hidden-list-item').show();
		parentCard.find('.list').animate({scrollTop : 80}, 1500);
		$(this).unbind('click');
	}

	// GIZ-8419 - Reset the 'show more' buttons if the back-forward cache is used.
	$(window).bind("pageshow", function(e){
		if(e.originalEvent.persisted){
			var expanded = $('.borderless-card.expanded');
			expanded.find('.hidden-list-item').hide();
			expanded.find('.list').scrollTop(0);
			expanded.removeClass('expanded')
			$('.show-more').on('click', scrollCard);
		}
	});

	$('.show-more').on('click', scrollCard);

	$('.founder-message').popover();

	$('.fixed-bottom-bar').on('click', '.getting-started-video', function(){
		$('.founder-message').popover('hide');
		$('#videoModal').modal('show');
	});

	$('#PDFormSubmit').on('click', function(){
		$('#PDForm').submit();
		return false;
	});
}


function iterateStates(){
	var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");
	var i = 0;
	window.setInterval(function() {$('.stateface').attr('class', 'stateface stateface-' + stateList[i]);i++;}, 3000);
}

var TRACKED_UTM_VALUES = ['utm_source','utm_medium','utm_term','utm_content','utm_campaign','utm_type'];

function checkUTMCodes(){

	addUTMCodesToSession();

	addUTMCodesToExternalLinks();

	addUTMCodesToForms();
}

function addUTMCodesToExternalLinks(){

 	var utmParams = getUTMParams();

 	if(utmParams.length > 0){

		$('a[href*="blog.explorelearning.com"], a[href*="info.explorelearning.com"], a[href*="help.explorelearning.com"], a[href*="explorelearning.zendesk.com"], a[href*="reflexmath.com"] ').each(function() {

	        var hrefParts = $(this).attr('href').split('?');    

	        if (hrefParts.length == 1){
	        	var newHREF = hrefParts[0] + "?" + utmParams;
	        }
	        else {
	        	var newHREF = hrefParts[0] + "?" + hrefParts[1]+"&"+utmParams;
	        }

	        //update link href
			$(this).attr('href', newHREF.replace(/%2B/ig, '+'));
		});
	}
}

function addUTMCodesToForms(){
	var trackingForm = $('.utmCodeTracking');

	if(trackingForm.length > 0){

		$.each(TRACKED_UTM_VALUES, function(index, value){
			var cookieValue = readCookie(value)

			if(cookieValue){
				trackingForm.append('<input type="hidden" name="'+value+'" value="'+cookieValue+'">')
			}
		});
	}
}

function addUTMCodesToSession(){
	if (document.location.search.length) {

	    // get qs vars as obj
		var qs = $.getQueryParameters();

		for(var key in qs){
			if(key.indexOf('utm_') === 0){
				setCookie(key, qs[key], 180);
			}
		}
	}
}

function getUTMParams(){

	paramString = "";

	$.each(TRACKED_UTM_VALUES, function(index, value){
		var cookieValue = readCookie(value)

		if(cookieValue){

			if(paramString.length > 0) paramString += "&";

			paramString += value+"="+cookieValue;
		}
	});

	return paramString;
}

var COMMON_VALIDATION_PARAMETERS;
var NOT_SELECTED = "NOT_SELECTED";

function initializeCommonValidatorMethods(){
	jQuery.validator.addMethod('checkHTMLChars', function(value, element){
		var re = /<+|>+|\/+/;
		return this.optional(element) || !(re.test(value));
	}, "Invalid characters found.  Characters &gt;, &lt;, and / not allowed.");

	jQuery.validator.addMethod('forbidCharacter', function(value, element, params){
		return this.optional(element) || value.indexOf(params[0]) == -1;
	}, function(params, element){
		return "The "+params[0]+" character is not allowed."
	});

	jQuery.validator.addMethod('emailWithDot', function(value, element, params){
		var regex = /^[_'a-zA-Z0-9-]+(\.[_'a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([a-zA-Z]{2,})|(aero|coop|info|museum|name|ae))$/;
		return this.optional(element) || regex.test(value);
	}, "Please enter a valid email address.");

	jQuery.validator.addMethod('multipleEmails', function(value, element, params){
		var singleEmail = "[_'a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.(([a-zA-Z]{2,})|(aero|coop|info|museum|name|ae))";
		var regex = new RegExp('^'+singleEmail+'(\\s*,\\s*'+singleEmail+')*\\s*$', 'g');
		return this.optional(element) || regex.test(value);
	}, "An address above does not follow a valid email address format.");

	jQuery.validator.addMethod('nameFormatCheck', function(value, element){
		return this.optional(element) || /^[a-zA-Z\s'-]+$/.test(value)
	}, "Invalid Characters.");

	jQuery.validator.addMethod('displaynameFormatCheck', function(value, element){
		return this.optional(element) || /^[a-zA-Z0-9_\.'\-\ \@]+$/.test(value)
	}, "Cannot contain special characters.");

	jQuery.validator.addMethod('phoneNumberCheck', function(value, element){
	return this.optional(element) || /^[0-9 \(\)\\.\\-]+$/.test(value)
	// return this.optional(element) || /[\(.]?[2-9]\d\d[\).]?[  -]?[2-9]\d\d[-.]\d{4}/.test(value)
	}, "Invalid Characters.  Only use numbers, spaces, parentheses, dashes, and periods.");

	jQuery.validator.addMethod('mustBeTrue', function(value, element){
	return (value == 'true');
	}, "School not selected");

	jQuery.validator.addMethod('checkSelection', function(value, element){
	return this.optional(element) || (value != NOT_SELECTED)
	}, "School not selected");

	COMMON_VALIDATION_PARAMETERS = {
		errorClass : 'text-danger',
		errorElement : 'em',
		highlight: function(element, errorClass, validClass){
			$(element).closest('div').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass){
			$(element).closest('div').removeClass('has-error');
		}
	};
}

el = {
	gizmoHelper : {
		displayGizmos : function(gizmos, parentElement, templateID, sortProperty){
			try {
				var template = document.getElementById(templateID).firstChild.textContent;
				if($.type(parentElement)==='string'){
					parentElement = $('#'+parentElement);
				}
				var gizmosToDisplay = [];
				if(typeof gizmos[0] === 'number' || typeof gizmos[0] === 'string'){
					gizmosToDisplay = this.getGizmosByID(gizmos, store.get('resources').gizmos);
				} else if(typeof gizmos[0] === 'object') {
					gizmoIDs = [];
					for(var index in gizmos){
						gizmoIDs.push(Number(gizmos[index].id));
					}
					if(store.enabled){
						gizmosToDisplay = this.getGizmosByID(gizmoIDs, store.get('resources').gizmos);
					} else {
						gizmosToDisplay = this.getGizmosByID(gizmoIDs, localStorageBackup.resources.gizmos);
					}
					for(var i in gizmos){
						var gizmoData = gizmos[i];
						for(var j in gizmosToDisplay){
							var gizmoObject = gizmosToDisplay[j];	
							if(parseInt(gizmoData.id) == gizmoObject.resourceID){
								gizmosToDisplay[j] = $.extend(true, gizmoObject, gizmoData);
							}
						}
					}
				}
				if(sortProperty !== undefined){
					if (typeof gizmosToDisplay[0][sortProperty] === 'string'){
						gizmosToDisplay.sort(function(a,b){
							return a[sortProperty].localeCompare(b[sortProperty]);
						});
					} else if (typeof gizmosToDisplay[0][sortProperty] === 'number'){
						gizmosToDisplay.sort(function(a,b){
							return a[sortProperty]-b[sortProperty];
						});
					}
				}
				$(gizmosToDisplay).each(function(){
					parentElement.append(Mark.up(template,this));
				});
			} catch (e) {
				throw 'store not available.';
			}
		},
		getGizmosByID : function(gizmoIDs, gizmoLibrary){
			var gizmos = [];
			$.each(gizmoLibrary, function(){
				if($.inArray(this.resourceID, gizmoIDs)>=0){
					gizmos.push(this);
				}
			});
			return gizmos;
		}
	},
	getAjaxBaseUrl : function(){
		return elPaths.secureBasePath;		
	},
	getContentRoot : function(){
		return elPaths.contentRoot;
		// This is for testing from cgraham local machine.
		// return "https://el-gizmos-dev.s3.amazonaws.com";
	}
};

function localStorageOutOfDate(itemToCheck){
	try {
		var localVersion = store.get(itemToCheck).version;
		return serverLocalStorageVersion > localVersion;
	} catch (e) {
		return true;
	}
}


// Copied from http://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};

// http://10.214.8.135:50122/index.cfm?method=cResource.dspDetail&ResourceID=615&utm_source=facebook&utm_medium=social&utm_content=007dyf8sbzy2thg&utm_campaign=Generous

// Adapted from http://www.w3schools.com/js/js_cookies.asp
function setCookie(name, value, exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = name + "=" + value + "; " +expires+";path=/;";
}

// Adapted from http://www.quirksmode.org/js/cookies.html
function readCookie(cookieName){
	var nameEQ = cookieName + "=";
	var cookieList = document.cookie.split(';');
	for(var i=0;i < cookieList.length;i++) {
		var c = cookieList[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ)===0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Add a character counter to a textarea.  Enforces limit of maxChars.
function addCharacterCounter(originalElement, maxChars){
	originalElement.on('keyup paste', function(e){
		// The paste event fires before text is actually entered
		var element = $(this);
		setTimeout(function() {
			var currentLength = element.val().length;

			if(currentLength > maxChars){
				element.val(element.val().substring(1,maxChars));
			}

			var charsLeft = maxChars - currentLength;

			if (charsLeft <= 0){
				element.siblings().find('.characters-left').text('No ');
			} else {
				element.siblings().find('.characters-left').text(charsLeft);
			}
		}, 0);
	});

	// Fire event just to initialize with correct value
	originalElement.trigger('keyup');
}

function notifySuccess(message){
	$.notify({
		message: message,
		target: '_self'
	}, {
		placement : {align : 'center'},
		type : 'success',
		z_index : 99999
	});
}

function notifyError(message){
	$.notify({
		message: message,
		target: '_self'
	}, {
		placement : {align : 'center'},
		type : 'danger',
		z_index : 99999
	});
}

function notify(message, delay){

	if(typeof delay == 'undefined') delay = 5000;

	$.notify({
		message: message,
		target: '_self'
	}, {
		type: 'el',
		placement : {align : 'left', from : 'bottom'},
		delay: delay,
		template: '<div data-notify="container" class="col-xs-10 col-sm-5 col-md-4 alert alert-{0}" role="alert">' +
			'<button type="button" class="close" data-dismiss="alert" data-notify="dismiss">&times;</button>' +
			'<span class="message-content">{2}</span>' +
		'</div>'
	});
}

function printPage(){
	if (window.print) {
		window.print();  
	}else{
		var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
		document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
		WebBrowser.ExecWB(6, 2);//Use a 1 vs. a 2 for a prompting dialog box    WebBrowser1.outerHTML = "";  
	}
}

var AJAX_CHECK_USERNAME = 'ut';
var AJAX_URL = 'index.cfm';
var AJAX_GET_METHOD = 'cUser.actAJAXMDR';

function usernameIsTaken(username, successFunction){
	$.getJSON(AJAX_URL,
		  {
		  	method : AJAX_GET_METHOD,
		  	a : AJAX_CHECK_USERNAME,
		  	id : username,
		  },
		  function(data){
		  	var isTaken = data.isTaken;

		  	successFunction(isTaken);
		  });
}

function dismissAlert(alertID, userID){
	$.ajax({
	  type: 'POST',
	  url: 'index.cfm',
	  dataType : 'json',
	  data: {
	  	method: 'cUserSecure.actUserAlertDismiss',
	  	AlertID : alertID,
	  	UserID : userID			  	
	  },
	  success: function(data) {
		// Do nothing on success or failure 
	  }
	});
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}