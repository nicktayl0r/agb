var currentFilter = 'all';
var displayArea = null;

// Open Correct Panel Given Hash
$(document).ready(function(){

	// Only run this action on the browse page
	var qs = $.getQueryParameters();

	if(qs.hasOwnProperty('method')){
		if(qs.method == 'cResource.dspResourceCatalog'){
			if(location.hash && $(location.hash+'Panel').length){
				$(location.hash+'Panel').find('.glyphicon')[1].click();
			}
		}
	}

	displayArea = $('#browse-results');
});

// Open Panel
$('div.panel-correlation div.panel-heading').on('click', function(){
	var panel = $(this).parents('.panel');
	panel.find('.controls .glyphicon').toggleClass('hide');
	panel.children('.panel-body').toggleClass('hide');
});

// Switch Panel Open When Header Nav is Used
if($('div.panel-correlation').length){
	window.onhashchange = function(){
		if($(location.hash+'Panel').length){
			$('.panel .panel-body').addClass('hide');
			$('.controls .glyphicon-menu-up').addClass('hide');
			$('.controls .glyphicon-menu-down').removeClass('hide');
			$(location.hash+'Panel').find('.glyphicon')[1].click();
		}
	};
}

$(document).on('localStorageReady', function(){

	var pageBaseURL = document.URL.replace(/&browse=.*/,'');
	var intentionalURLchange = false;

	window.addEventListener('popstate', function(event) {
		if (intentionalURLchange) {
			intentionalURLchange = false;
		} else {
			interpretParam();
		}
	}, false);

	$('.browse-menu').on('click', 'a', function(){
		$('body').append($('#addToClassMenu'));
		var selection = $(this);
		var browseBtn = $('#'+selection.parents('.browse-menu').data('browse-btn'));
		changeBtnText(browseBtn, selection.text());
		browseBtn.data('value', selection.data('value'));
		var dependent = $('#'+browseBtn.data('dependent'));
		disableDependents(dependent);
		var URLtail = '';
		var subTree;
		if(store.enabled){
			subTree = store.get('browseTree').tree.subjects;
		} else {
			subTree = localStorageBackup.browseTree.tree.subjects;
		}
		var subjectBtn = $('#browse-subject');
		if(!subjectBtn.hasClass('hide') && subjectBtn.data('value') !== 'All'){
			URLtail = URLtail+subjectBtn.data('value');
			subTree = subTree[subjectBtn.data('value')].gradeLevels;
			var gradeLevelBtn = $('#browse-gradeLevel');
			if(!gradeLevelBtn.hasClass('hide') && gradeLevelBtn.data('value') !== 'All'){
				URLtail = URLtail+'/'+gradeLevelBtn.data('value');
				subTree = subTree[gradeLevelBtn.data('value')].topics;
				var topicBtn = $('#browse-topic');
				if(!topicBtn.hasClass('hide') && topicBtn.data('value') !== 'All'){
					URLtail = URLtail+'/'+topicBtn.data('value');
					subTree = subTree[topicBtn.data('value')].subtopics;
					var subTopicBtn = $('#browse-subTopic');
					if(!subTopicBtn.hasClass('hide') && subTopicBtn.data('value') !== 'All'){
						URLtail = URLtail+'/'+subTopicBtn.data('value');
						subTree = subTree[subTopicBtn.data('value')].resources;
					}
				}
			}
		}
		if(selection.data('value')!=='All'){
			constructDropdown(dependent, subTree);
		}
		intentionalURLchange = true;
		URLtail = URLtail.replace(/\s/g,'+');
		history.pushState({},'',pageBaseURL+'&browse='+JSON.stringify(URLtail).replace(/\"/g,''));
		if(browseBtn.data('value')==='All'){
			var parent = $('[data-dependent="'+browseBtn.attr('id')+'"]');
			if(parent.length > 0){
				changeHeader(parent.text());
			} else {
				changeHeader('Gizmo Catalog');
			}
		} else {
			changeHeader(selection.text());
		}
		displayArea.empty();
		el.gizmoHelper.displayGizmos(addTeacherProp(gizmoTreeToList(subTree)), displayArea, 'horizontalTemplate', 'sortOrder');
		if(!Array.isArray(subTree) && Object.keys(subTree).length===1){
			console.log('Single Child');
		}
		applyFilter(currentFilter);
	});
	$('#resourceExplorer .tab[data-filter]').on('click', function(e, el){
		$('.tab').removeClass('active');
		$(this).addClass('active');
		applyFilter($(this).data('filter'));
	});
});

function addTeacherProp(gizmoIDs){
	var gizmoObjects = [];
	var sortOrder = 1;
	for(var index in gizmoIDs){
		gizmoObjects.push({id:gizmoIDs[index],hasRole:user.hasRole, sortOrder:sortOrder});
		sortOrder++;
	}
	return gizmoObjects;
}

function applyFilter(filter){
	currentFilter = filter;
	var gizmos = $('.card-gizmo');
	var numHidden = 0;
	if(filter === 'all'){
		gizmos.removeClass('hide');
	} else {
		gizmos.each(function(){
			var gizmo = $(this);
			if(gizmo.hasClass('card-gizmo-'+filter)){
				gizmo.removeClass('hide');
			} else {
				gizmo.addClass('hide');
				++numHidden;
			}
		});
	}
	if(numHidden >= gizmos.length){
		if(!$('.emptyMsg').length){
			displayArea.append($('<h3>').addClass('emptyMsg').text('No Gizmos match your search criteria.'));
		}
	} else {
		$('.emptyMsg').remove();
	}
}

function changeBtnText(element, newText){
	element.empty();
	element.append(newText+' ');
	element.append($('<span>').addClass('caret'));
}

function changeHeader(textToDisplay){
	$('div.page-header h2.title').html('Browse by Grade &amp; Topic <span class="sub">' + textToDisplay.trim() + '</span>');
}

function constructDropdown(dependent, subTree){
	
	var orderedTree = Object.keys(subTree).sort(function(a,b){return subTree[a].sortOrder - subTree[b].sortOrder;});
			
	var dependentMenu = dependent.parent().children('.dropdown-menu');
	dependentMenu.empty();
	
	for(var orderedIndex in orderedTree)
	{
		var node = orderedTree[orderedIndex];
		dependentMenu.append($('<li>').append($('<a>').attr({'data-target':'#','data-value':node,href:"#"}).append(node)));
	}
	dependentMenu.append($('<li>').addClass('divider').attr('role','presentation'));
	dependentMenu.append($('<li>').append($('<a>').attr({'data-target':'#','data-value':'All',href:"#"}).append('<em>All '+dependent.data('label')+'</em>')));
	dependent.removeClass('hide');
}

function disableDependents(browseBtn) {
	browseBtn.addClass('hide');
	var browseMenu = browseBtn.parent().children('.dropdown-menu');
	browseMenu.empty();
	changeBtnText(browseBtn,'All '+browseBtn.data('label'));
	browseBtn.data('value','All');
	var dependentID = browseBtn.data('dependent');
	if(dependentID !== undefined){
		disableDependents($('#'+dependentID));
	}
}

function gizmoTreeToList(subTree){
	var gizmoIDs = [];
	for(var node in subTree){
		if(subTree[node].gradeLevels){
			gizmoIDs = gizmoIDs.concat(gizmoTreeToList(subTree[node].gradeLevels));
		} else if(subTree[node].topics){
			gizmoIDs = gizmoIDs.concat(gizmoTreeToList(subTree[node].topics));
		} else if (subTree[node].subtopics){
			gizmoIDs = gizmoIDs.concat(gizmoTreeToList(subTree[node].subtopics));
		} else if (subTree[node].resources) {
			gizmoIDs = gizmoIDs.concat(gizmoTreeToList(subTree[node].resources));
		} else {
			gizmoIDs = gizmoIDs.concat(subTree[node]);
		}
	}
	return gizmoIDs;
}

function interpretParam(){
	try{
		var browseString = decodeURIComponent($.urlParam('browse'));
		browseString = browseString.replace(/\+/g,' ');
		var treePath = browseString.split('/');
		var deepestValidPathIndex = null;
		if(browseString!=='null' && treePath[0]!=="0"){
			var subTree;
			if(store.enabled){
				subTree = store.get('browseTree').tree.subjects;
			} else {
				subTree = localStorageBackup.browseTree.tree.subjects;
			}
			if(treePath.length >= 1 && subTree[treePath[0]]){
				deepestValidPathIndex = 0;
				subTree = subTree[treePath[0]].gradeLevels;
				browseBtn = $('#browse-subject');
				changeBtnText(browseBtn, treePath[0]);
				browseBtn.data('value', treePath[0]);
				browseBtn.attr('data-value', treePath[0]);
				dependent = $('#'+browseBtn.data('dependent'));
				constructDropdown(dependent,subTree);
			} else {
				$('#browse-gradeLevel').addClass('hide');
			}
			if(treePath.length >= 2 && subTree[treePath[1]]){
				deepestValidPathIndex = 1;
				subTree = subTree[treePath[1]].topics;
				browseBtn = $('#browse-gradeLevel');
				browseBtn.removeClass('hide');
				changeBtnText(browseBtn, treePath[1]);
				browseBtn.data('value', treePath[1]);
				browseBtn.attr('data-value', treePath[1]);
				dependent = $('#'+browseBtn.data('dependent'));
				constructDropdown(dependent,subTree);
			} else {
				$('#browse-topic').addClass('hide');
			}
			if(treePath.length >= 3 && subTree[treePath[2]]){
				deepestValidPathIndex = 2;
				subTree = subTree[treePath[2]].subtopics;
				browseBtn = $('#browse-topic');
				browseBtn.removeClass('hide');
				changeBtnText(browseBtn, treePath[2]);
				browseBtn.data('value', treePath[2]);
				browseBtn.attr('data-value', treePath[2]);
				dependent = $('#'+browseBtn.data('dependent'));
				constructDropdown(dependent,subTree);
			} else {
				$('#browse-subTopic').addClass('hide');
			}
			if(treePath.length >= 4 && subTree[treePath[3]]){
				deepestValidPathIndex = 3;
				subTree = subTree[treePath[3]].resources;
				browseBtn = $('#browse-subTopic');
				browseBtn.removeClass('hide');
				changeBtnText(browseBtn, treePath[3]);
				browseBtn.data('value', treePath[3]);
				browseBtn.attr('data-value', treePath[3]);
			}
			if(deepestValidPathIndex){
				changeHeader(treePath[deepestValidPathIndex]);
			}
			$('#browse-results').empty();
			el.gizmoHelper.displayGizmos(addTeacherProp(gizmoTreeToList(subTree)), $('#browse-results'), 'horizontalTemplate', 'sortOrder');
		} else {
			$('#browse-results').empty();
			if(store.enabled){
				el.gizmoHelper.displayGizmos(addTeacherProp(gizmoTreeToList(store.get('browseTree').tree.subjects)), $('#browse-results'), 'horizontalTemplate', 'sortOrder');
			} else {
				el.gizmoHelper.displayGizmos(addTeacherProp(gizmoTreeToList(localStorageBackup.browseTree.tree.subjects)), $('#browse-results'), 'horizontalTemplate', 'sortOrder');
			}
		}
	} catch (e) {
		// Error Either Interpreting Param or Displaying Gizmos
	}
}