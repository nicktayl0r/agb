// system-test.js
// Description: The JS needed for the system test page (method=cCorp.dspTest)
// Author: Jordan Marshall
// Created: May 2015

RECOMMENDED_BROWSER_VERSIONS = {
	'Google Chrome' : 28,
	'Safari' : 3,
	'Firefox' : 4,
	'Internet Explorer': 9
};

RECOMMENDED_BROWSERS = ['Google Chrome', 'Safari', 'Firefox', 'Internet Explorer' ]; // TODO: include Opera? Netscape?

$(document).ready(function(){
	
	setBrowserNameAndVersion();
	setFlashProperties();
	setOperatingSystemProperties();

	if(!html5enabled) $('#html5Warning').removeClass('hidden');

	if(!$('#noErrorsMessage').hasClass('hidden')){
		$('#noErrorsMessage').show();
	}

	$('.clearLS').on('click',function(){
		localStorage.clear();
		location.reload();
	});

});

function setOperatingSystemProperties(){
	var systemPlatform = BrowserDetect.OS;
	var systemVersion = (BrowserDetect.OSVersion != 'unknown') ? BrowserDetect.OSVersion : '';

	$('#systemPlatform').text(systemPlatform);
	$('#operatingSystem').text(systemVersion);
}

function setFlashProperties(){
	var flashInstalled = (PluginDetect.isMinVersion('Flash', '0') >= 0);
	var flashVersion = flashInstalled ? PluginDetect.getVersion('Flash').replace(/,/g, '.') : 'unknown';
	
	if(!flashInstalled && BrowserDetect.OS !== 'Apple iPad') {
		$('#flashWarning').removeClass('hidden');
		$('#noErrorsMessage').addClass('hidden');
	}

	$('#flashInstalled').text(flashInstalled ? 'Yes' : 'No');
	$('#flashVersion').text(flashVersion);
}

function setBrowserNameAndVersion(){

	var browserName = BrowserDetect.browser;

	$('#browserName').text(browserName);

	var browserVersion = (BrowserDetect.browserVersion != 'unknown') ? BrowserDetect.browserVersion : '';

	$('#browserVersion').text(browserVersion);

	if (!browserName in RECOMMENDED_BROWSERS) {
		$('#browserWarning').removeClass('hidden');
		$('#noErrorsMessage').addClass('hidden');
	}
	else if (browserVersion < RECOMMENDED_BROWSER_VERSIONS[browserName]) {
		$('#browserWarning').removeClass('hidden');
		$('#noErrorsMessage').addClass('hidden');
	}
}

/* CODE USED FOR GATHERING SYSTEM DATA FOR THE SUPPORT FORM */

var systest = {
	os: {
		label: 'System Platform',
		winReq: 'Windows 7, 8, 8.1',
		macReq: 'Mac OS X 10.3 (or higher)',
		iOSReq: 'iOS 6 (or higher)',
		linuxReq: 'Linux OS',
		chromeReq: 'Chromium',
		testReq: '',
		name: '',
		ver: '',
		title: '',
		passMsg: 'Your system platform is supported.',
		issueMsg: 'Your system platform may not be fully supported.',
		failMsg: 'Your system platform is not supported.',
		testMsg: '',
		status: 0,
		statusReason: 'Not_Supported',
		show: true
	},
	browser: {
		label: 'Web Browser',
		winReq: 'Internet Explorer 7 (or higher), Firefox 4 (or higher)',
		macReq: 'Safari 3 (or higher), Firefox 4 (or higher)',
		linuxReq: 'Firefox 4',
		chromeReq: 'Chrome',
		iOSReq: 'Safari',
		testReq: '',
		name: '',
		ver: '',
		title: '',
		passMsg: 'Your browser is supported.',
		issueMsg: 'Your browser may not be fully supported.',
		failMsg: 'Your browser is not supported.',
		testMsg: '',
		status: 0,
		statusReason: 'Not_Supported',
		show: true
	},
	flash: {
		label: 'Flash Player',
		allReq: '10',
		testReq: '',
		installed: false,
		ver: '',
		failMsg: 'Flash plugin not installed or not enabled.',
		testMsg: '',
		status: 0,
		statusReason: 'Not_Installed',
		show: true
	},
	cookies: {
		label: 'Cookie Support',
		testReq: 'Cookies enabled web browser',
		enabled: false,
		passMsg: 'Cookies are enabled.',
		issueMsg: 'Cookies supported not determined.',
		failMsg: 'Cookies are not enabled or not supported',
		testMsg: '',
		status: 0,
		statusReason: 'Not_Enabled',
		action: 'You must enable cookies in order to use ExploreLearning.com',
		show: true
	}
};


function getStatusMsg(status){
	var statusMsg = 'Fail';						
	if (status == 1) {					
		statusMsg = 'Issue';
	}else if (status == 2) {
		statusMsg = 'Pass';
	}

	return statusMsg;
}

function getDetectedMsg(testItem){
	var detectedTitle = (testItem.title) ? testItem.title + ': ' : '';
	return detectedTitle + testItem.testMsg;
}

function getSupportFormData(){

	populateSystemTestData();

	var systemInformation = {
		osDetected : getDetectedMsg(systest.os),
		osStatus : getStatusMsg(systest.os.status),
		osRequirement : systest.os.testReq,
		osReason : systest.os.statusReason,

		browserDetected : getDetectedMsg(systest.browser),
		browserStatus : getStatusMsg(systest.browser.status),
		browserRequirement : systest.browser.testReq,
		browserReason : systest.browser.statusReason,

		flashDetected : getDetectedMsg(systest.flash),
		flashStatus : getStatusMsg(systest.flash.status),
		flashRequirement : systest.flash.testReq,
		flashReason : systest.flash.statusReason,

		cookiesDetected : getDetectedMsg(systest.cookies),
		cookiesStatus : getStatusMsg(systest.cookies.status),
		cookiesRequirement : systest.cookies.testReq,
		cookiesReason : systest.cookies.statusReason,

		rawClientInfo : navigator.userAgent
	} 

	return systemInformation
}

function populateSystemTestData(){
	//OS properties 
	systest.os.name = systest.os.title = BrowserDetect.OS;
	systest.os.ver = (BrowserDetect.OSVersion != 'unknown') ? BrowserDetect.OSVersion : '';
	if (systest.os.ver != '') systest.os.title += (' ' + systest.os.ver);
	systest.os.testMsg = systest.os.failMsg;
	
	//Browser properties
	systest.browser.name = systest.browser.title = BrowserDetect.browser;	
	systest.browser.ver = (BrowserDetect.browserVersion != 'unknown') ? BrowserDetect.browserVersion : '';
	if (systest.browser.ver != '') systest.browser.title += (' ' + systest.browser.ver);
	systest.browser.testMsg = systest.browser.failMsg;
	
	//Flash properties
	systest.flash.installed = (PluginDetect.isMinVersion('Flash', '0') >= 0);
	systest.flash.ver = systest.flash.installed ? PluginDetect.getVersion('Flash').replace(/,/g, '.') : 'unknown';	
	var fCheck = PluginDetect.isMinVersion('Flash', systest.flash.allReq);
	if (fCheck == 1) {
		systest.flash.passMsg = 'Flash plugin ' + systest.flash.ver + ' is installed and enabled.';
		systest.flash.status = 2;
	} else if (fCheck == -1) {
		if (systest.flash.installed) {
			systest.flash.failMsg = 'Flash plugin ' + systest.flash.ver + ' is installed but version is < ' + systest.flash.allReq;
			systest.flash.statusReason = 'Lower_Version';
		}
	}
	systest.flash.testReq = 'Flash Player ' + systest.flash.allReq + ' (or higher).';
	systest.flash.testMsg = systest.flash.failMsg;
	
	//COOKIE properties
	var tick = ((new Date()).getTime() + '');
	document.cookie = 'testCookie=' + tick + '; path=/';
	systest.cookies.enabled = (document.cookie.indexOf('testCookie', 0) != -1);
	systest.cookies.status = systest.cookies.enabled ? 2 : 0;
		

	switch (systest.os.name) {
		case 'Windows':
			//platform
			systest.os.testReq = systest.os.winReq;
			systest.os.status = (systest.os.ver != '') ? 2 : 1;
			if (systest.os.status == 1) systest.os.statusReason = 'Partially_Supported';			
			
			//browser	
			systest.browser.testReq = systest.browser.winReq;
			systest.browser.status = ((systest.browser.name == 'Internet Explorer') && systest.browser.ver < 7) ? 0 : 2;			
			systest.browser.status = ((systest.browser.name == 'Netscape') && systest.browser.ver < 7) ? 0 : 2;
			systest.browser.status = ((systest.browser.name == 'Firefox') && systest.browser.ver < 4) ? 0 : 2;
			if (systest.browser.name == 'Google Chrome') systest.browser.status = 1;
			if ((systest.browser.name == 'Internet Explorer') && systest.browser.ver == 6) {
				systest.browser.status = 1;
				systest.browser.issueMsg = 'For the best user experience under Internet Explorer, users should upgrade to version 7 or 8.';
				systest.browser.statusReason = 'IE6_Supported';
			}
			
			//flash
			if (fCheck == -2) {
				systest.flash.issueMsg = 'Please enable ActiveX in Internet Explorer so that we can detect your Flash plugin.';						
				systest.flash.status = 1;
				systest.flash.statusReason = 'ActiveX_Disabled';
			}
			break;
		case 'Mac (PPC)':
		case 'Mac (Intel)':
			//platform
			systest.os.testReq = systest.os.macReq;
			systest.os.status = (systest.os.ver != '') ? 2 : 1;
			if (systest.os.status == 1) systest.os.statusReason = 'Partially_Supported';
			
			//browser
			systest.browser.testReq = systest.browser.macReq;
			systest.browser.status = (systest.browser.name == 'Internet Explorer') ? 1 : 2;
			if ((systest.browser.name == 'Firefox') && systest.browser.ver < 4) systest.browser.status = 1;
			if (systest.browser.name == 'Google Chrome') systest.browser.status = 1;
			if (systest.browser.status == 1) systest.browser.statusReason = 'Partially_Supported';	
			
			//flash
			if (fCheck == -2) {
				systest.flash.issueMsg = 'Flash plugin version could not be determined, you may need to get the latest Flash plugin.';						
				systest.flash.status = 1;
				systest.flash.statusReason = 'Unknown_Version';
			}
			break;
		case 'Linux':
			//platform
			systest.os.testReq = systest.os.linuxReq;
			systest.os.status = 2;			
			
			//browser
			systest.browser.testReq = systest.browser.linuxReq;
			systest.browser.status = ((BrowserDetect.browser == 'Firefox') && (BrowserDetect.browserVersion < 4)) ? 1 : 2;
			if (systest.browser.status == 1) systest.browser.statusReason = 'Partially_Supported';
			
		case 'Chromium':
			//platform
			systest.os.testReq = systest.os.chromeReq;
			systest.os.status = 1;		
			//browser
			systest.browser.testReq = systest.browser.chromeReq;
			systest.browser.status = 1;
			systest.browser.statusReason = 'Partially_Supported';
			
		case 'Apple iPad':
			//platform
			systest.os.testReq = systest.os.iOSReq;
			systest.os.status = systest.os.ver >= 6 ? 2 : 1;	
			systest.os.title = systest.os.name + ' iOS ' + systest.os.ver;
			//browser
			systest.browser.testReq = systest.browser.iOSReq;
			systest.browser.status = (BrowserDetect.browser == 'Safari') ? 2 : 1;
			systest.browser.issueMsg = 'For better integration, we recommend using Safari when on iPad.';
			systest.browser.statusReason = 'Partially_Supported';
			//flash
			systest.flash.show = false;
			break;						
	}

	$.each(systest, function(key, testItem) {
		if (testItem.status == 1) testItem.testMsg = testItem.issueMsg;
		if (testItem.status == 2) {
			testItem.testMsg = testItem.passMsg;
			testItem.statusReason = '';
		}
	});	
	
}
