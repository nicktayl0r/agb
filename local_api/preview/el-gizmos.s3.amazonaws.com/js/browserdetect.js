var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || 'unknown';
		this.browserVersion = this.searchBrowserVersion(navigator.userAgent) || this.searchBrowserVersion(navigator.appVersion) || 'unknown';		
		this.OS = this.searchString(this.dataOS) || 'unknown';
		this.OSVersion = this.searchOSVersion(navigator.userAgent) || this.searchOSVersion(navigator.appVersion) || 'unknown';
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			this.subString = data[i].subString;	
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)					
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchBrowserVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseInt(dataString.substring(index+this.versionSearchString.length+1));
	},
	searchOSVersion: function (dataString) {		
		var v = '';
		if (this.subString == 'Win') {
			if (dataString.indexOf(this.versionSearchString + ' NT 6.3') != -1) v = '8.1';
			if (dataString.indexOf(this.versionSearchString + ' NT 6.2') != -1) v = '8';
			if (dataString.indexOf(this.versionSearchString + ' NT 6.1') != -1) v = '7';
			if (dataString.indexOf(this.versionSearchString + ' NT 6.0') != -1) v = 'Vista';
			if (dataString.indexOf(this.versionSearchString + ' NT 5.2') != -1) v = 'Server 2003/Windows XP x64 Edition';
			if (dataString.indexOf(this.versionSearchString + ' NT 5.1') != -1) v = 'XP';

		}else if (this.subString == 'CrOS'){
			v = '';
		}else if (this.subString == 'iPad'){
			var vArray = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    		// return [parseInt(vArray[1], 10), parseInt(vArray[2], 10), parseInt(vArray[3] || 0, 10)];
			v = parseInt(vArray[1], 10);
		}else{
			v = 'OS 9';
			var index = dataString.indexOf(this.versionSearchString);
			if (index != -1) v = 'OS X';	
		}
		return v;
	},
	dataBrowser: [
		{ string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb' },
		{ string: navigator.userAgent, subString: 'CriOS', versionSearch: 'Version', identity: 'Google Chrome' },
		{ string: navigator.vendor, subString: 'Apple', versionSearch: 'Version', identity: 'Safari' },
		{ prop: window.opera, identity: 'Opera' },
		{ string: navigator.vendor, subString: 'iCab', identity: 'iCab' },
		{ string: navigator.vendor, subString: 'KDE', identity: 'Konqueror' },
		{ string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox' },
		{ string: navigator.userAgent, subString: 'Edge', identity: 'Edge', versionSearch: 'Edge'},
		{ string: navigator.userAgent, subString: 'Chrome', identity: 'Google Chrome', versionSearch: 'Chrome' },
		{ string: navigator.vendor, subString: 'Camino', identity: 'Camino' },		
		{ string: navigator.userAgent, subString: 'Netscape', identity: 'Netscape' }, // for newer Netscapes (6+)
		{ string: navigator.userAgent, subString: 'MSIE', identity: 'Internet Explorer', versionSearch: 'MSIE' },
		{ string: navigator.userAgent, subString: 'Trident/7', identity: 'Internet Explorer', versionSearch: 'rv' },
		{ string: navigator.userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv' },		
		{ string: navigator.userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla' } // for older Netscapes (4-)
	],
	dataOS : [
		{ string: navigator.platform, subString: 'Win', identity: 'Windows', versionSearch: 'Windows' },
		{ string: navigator.platform, subString: 'MacPPC', identity: 'Mac (PPC)', versionSearch: 'Mac OS X' },
		{ string: navigator.platform, subString: 'MacIntel', identity: 'Mac (Intel)', versionSearch: 'Mac OS X' },		
		{ string: navigator.userAgent, subString: 'CrOS', identity: 'Chromium' },
		{ string: navigator.platform, subString: 'iPad', identity: 'Apple iPad' },
		{ string: navigator.platform, subString: 'Linux', identity: 'Linux' },
		{ string: navigator.platform, subString: 'X11', identity: 'Unix' }
	]
};
BrowserDetect.init();
