var welcomePage = "Welcome";
    var apiGalleryPage = "Aetna API Gallery";
    var forumPage = "Forum";
    var blogPage = "Blog";
    var wikiPage = "Wiki";
    var registerAppPage = "Register an Application";
    var devPortal = "Carepass Developer Portal";

	var modalWindow = '<div id="boxes">' +
	'<div id="2235Terms" class="window">' +
		'<h2>Supplemental Terms of Use for Fooducate</h2>' +
		'<p><strong>Requirements &amp; Restrictions</strong> <a class="info" href="/faq" title="Click to learn more about Requirements &amp; Restrictions"></a></p>' +
		'<ul>' +
			'<li>API Rate Limits: no </li>' +
			'<li>Brand Attribution Requirements: <strong>yes</strong><br />' +
				'<div class="container">You must include the URL returned in the API response on the same page in your app that includes the response result. The link should be presented as follows: "More from Fooducate"</div>' +
			'</li>' +
			'<li><span>Display and Usage Requirements</span>: no</li>' +
			'<li>Additional Display and Usage Requirements: <strong>yes</strong>' +
				'<div class="container">This API is intended to display results directly to the consumers of your application; You are not permitted to aggregate, store, or cache any information returned by this API.</div>' +
			'</li>' +
			'<li><span>Required Disclaimers:&nbsp;no</span></li>' +
			'<li><span>Additional Terms of Use Agreement</span>: no </li>' +
		'</ul>' +
		'<p>&nbsp;</p>' +
		'<div style="width:100%">'+
			'<div style="width:310px;margin:auto">'+
				'<input id="agree2235" type="submit" value="Agree" class="input-submit agree">'+
				'<input id="disagree2235" type="submit" value="Disagree" class="input-submit disagree">' +
    		'</div>'+
    	'</div>'+
    '</div>' +
    '<div id="2230Terms" class="window">' +
		'<h2>Supplemental Terms of Use for Retail Rx Pricing by GoodRx</h2>' +
		'<p><strong>Requirements &amp; Restrictions</strong> <a class="info" href="/faq" title="Click to learn more about Requirements &amp; Restrictions"></a></p>' +
		'<ul>' +
			'<li>API Rate Limits: no </li>' +
			'<li>Brand Attribution Requirements: <strong>yes</strong><br />' +
				'<div class="container">You must display the following logo and associated text on all pages in your app that include results from this API:<br /><br /><strong>information provided by</strong> <img src="https://developer.carepass.com/files/logo_GoodRx.png" /></div>' +
			'</li>' +
			'<li>Display and Usage Requirements: <strong>yes</strong>' +
				'<div class="container">You must include the URL returned in your API response on the same page in your app that includes the response result.  The URL should be presented as follows: <br /><br /> click here (URL) to find the pharmacy offering this price</div>' +
			'</li>' +
			'<li>Additional Display and Usage Restrictions: <strong>yes </strong>' +
				'<div class="container">This API is intended to display results directly to the user of your application.  You are not permitted to aggregate, store, or cache any information returned by this API.</div>' +
			'</li>' +
			'<li>Required Disclaimers: <strong>yes</strong>' +
				'<div class="container">You must include the following disclaimer on the bottom of any pages in your app that include results from this API.<br /><br /> This information is for informational purposes only and is not meant to be a substitute for professional medical advice, diagnosis or treatment. &nbsp;Neither GoodRx nor Aetna is offering advice regarding, recommending or endorsing any specific prescription drug, pharmacy or other information on the site. Neither GoodRx nor Aetna provides any warranty for any of the pricing data or other information. Please seek medical advice before starting, changing or terminating any medical treatment. Third party logos, trademarks, brand names and images contained on GoodRx.com are for demonstration purposes only and are owned by their respective rights holders, who are not affiliated with this Site.</div>' +
			'</li>' +
			'<li>Additional Terms of Use Agreement: no </li>' +
		'</ul>' +
		'<p>&nbsp;</p>' +
		'<div style="width:100%">'+
			'<div style="width:310px;margin:auto">'+
				'<input id="agree2230" type="submit" value="Agree" class="input-submit agree"><input id="disagree2230" type="submit" value="Disagree" class="input-submit disagree">' +
        	'</div>'+
    	'</div>'+
    '</div>' +
	'<div id="2233Terms" class="window">' +
		'<h2>Supplemental Terms of Use for De-identified Claims by Aetna API</h2>' +
		'<p><strong>Requirements &amp; Restrictions</strong> <a class="info" href="/faq" title="Click to learn more about Requirements &amp; Restrictions"></a></p>' +
		'<ul>' +
			'<li>API Rate Limits: no </li>' +
			'<li>Brand Attribution Requirements: <strong>yes</strong>' +
				'<div class="container">You must display the following text on all pages in your app that include results from this API.<br /><br /> <strong>information provided by: </strong>Aetna</div>' +
			'</li>' +
			'<li>Display and Usage Requirements: no</li>' +
			'<li>Additional Display and Usage Restrictions: <strong>yes</strong>' +
				'<div class="container">Data <span style="text-decoration: underline;">will not</span> be used to provide medical <span style="text-decoration: underline;">guidance</span>, including diagnosis or treatment.&nbsp;</div>' +
				'<div class="container">Data <span style="text-decoration: underline;">will not</span> be used to provide medical <span style="text-decoration: underline;">recommendation</span>, including diagnosis or treatment, to a user of your application.</div>' +
				'<div class="container">Data <span style="text-decoration: underline;">can</span> be used to provide a user with information and statistics.&nbsp;</div>' +
				'<div class="container">Please re-review the Developer Agreement, as agreed to upon registration, for additional and related data usage provisions.  The data available through this API, though de-identified, is considered very sensitive by Aetna and its customers, and we require that you treat it with the highest degree of care and security.</div>' +
			'</li>' +
			'<li>Required Disclaimers: no</li>' +
			'<li>Additional Terms of Use Agreement: no</li>' +
		'</ul>' +
		'<div style="width:100%">'+
			'<div style="width:310px;margin:auto">'+
				'<input id="agree2233" type="submit" value="Agree" class="input-submit agree"><input id="disagree2233" type="submit" value="Disagree" class="input-submit disagree">' +
        	'</div>'+
    	'</div>'+
    '</div>' +
	'<div id="2131Terms" class="window">' +
		'<h2>Supplemental Terms of Use for CarePass Sync APIs</h2>' +
		'<p><strong>Requirements &amp; Restrictions</strong> <a class="info" href="/faq" title="Click to learn more about Requirements &amp; Restrictions"></a></p>' +
		'<ul>' +
			'<li>API Rate Limits: no </li>' +
			'<li>Brand Attribution Requirements: <strong>yes</strong>' +
				'<div class="container">See the <a href="https://developer.carepass.com/ux_branding_guide" target="_blank">CarePass User Experience Branding Guide</a> for recommendations and requirements when integrating with the CarePass ecosystem via the CarePass Sync API</div>' +
			'</li>' +
			'<li>Display and Usage Requirements: <strong>yes</strong>' +
				'<div class="container">You agree to implement the CarePass Sync technology according to the <a href="https://developer.carepass.com/ux_branding_guide" target="_blank">CarePass User Experience Branding Guide</a>.<br />Please re-review the <a href="https://developer.carepass.com/terms" target="_blank">CarePass API Terms of Use</a> (sections 4 and 5.c), for data usage provisions</div>' +
			'</li>' +
			'<li>Additional Display and Usage Restrictions: <strong>yes</strong>' +
				'<div class="container">Your company and application will be reviewed to determine appropriate scope of access.  Scope is defined as the profiles from a user\'s CarePass Sync personal health cloud which you will be permitted to request permission from the user to access.  You will only be provided with the scope required to provide the user with the appropriate experience.  Aetna reserves all rights to determine the scope that will be provided to your application if your request is approved.</div>' +
			'</li>' +
			'<li>Required Disclaimers: no </li>' +
			'<li>Additional Terms of Use Agreement: no </li>' +
		'</ul>' +
		'<div style="width:100%">'+
			'<div style="width:310px;margin:auto;">'+
				'<input id="agree2131" type="submit" value="Agree" class="input-submit agree"><input id="disagree2131" type="submit" value="Disagree" class="input-submit disagree">' +
            	'</div>'+
    	'</div>'+
    '</div>' +
    '<div id="mask"></div>' +
'</div>';

$(function() {
	$("._username").text(mashery_info.username);

	//$member = $api->call('member.fetch', array(mashery_info.username));
	if(getPageName(welcomePage) == welcomePage){
		welcomePageSetUp();
	}
	if( (getPageName() == registerAppPage) ){
		registerPageSetUp();
	}

	tabbedBox();
	sideBar();

	//Temp
	/*$(".page-docs div#sub > ul > li > ul > li").children().hide();
	$(".page-docs div#sub > ul > li > ul > li.active").children().show();*/
});
function getPageName(){
	var pageTitle = $('title').html();
    if(pageTitle.indexOf(welcomePage) >=0){
	  return welcomePage;
	}
    if(pageTitle.indexOf(apiGalleryPage) >=0){
	  return apiGalleryPage;
	}
    if(pageTitle.indexOf(forumPage) >=0){
	  return forumPage;
	}
    if(pageTitle.indexOf(blogPage) >=0){
	  return blogPage;
	}
    if(pageTitle.indexOf(wikiPage) >=0){
	  return wikiPage;
	}
	if(pageTitle.indexOf(registerAppPage) >=0){
	  return registerAppPage;
	}
	if(pageTitle.indexOf(devPortal) >=0){
	  return devPortal;
	}
}
function welcomePageSetUp(){
  var headingNode;
  if(mashery_info.username){
    //handle heading
	headingNode = $('.welcomePg .heading') || $('.welcomePg .personalHeading');
	headingNode.removeClass('heading');
	headingNode.addClass('personalHeading');
	headingNode.html('<span class="_username">' + mashery_info.username + '</span>');

	//handle text under heading
	$('.welcomePg .welcomeText').html('<h4>Use the top or bottom navigation to begin your journey.  If you haven&rsquo;t already obtained API Keys, we suggest you start by browsing our APIs.</h4>');
	$('.welcomePg .welcomeText').append('If you need any support, we suggest cruising the Forums or sending us a note using the Contact Us link in the footer.  Happy building!');

	//handle title for buttons at bottom
	$('.features h4').html('As a registered developer, you have access to:');

	//handle apperance for buttons at the bottom
	$('.unreg').hide();
	$('.reg').show();

  }else{
    //handle heading
	headingNode = $('.welcomePg .personalHeading') || $('.welcomePg .heading');
	headingNode.removeClass('personalHeading');
	headingNode.addClass('heading');
	headingNode.empty();

	//handle text under heading
	$('.welcomePg .welcomeText').html('<h4>You have the next great idea.  We have the tools to help you transform it into the next breakthrough app.  It&rsquo;s time to make living a healthy life convenient for consumers.</h4>');
	$('.welcomePg .welcomeText').append('The CarePass Developer portal offers unique and powerful APIs from Aetna, HHS, and other innovators in the health and wellness community, plus all of the support you&rsquo;ll need to work with these APIs.  Check out our APIs and then register&hellip;it\'s free!');

	//handle title for buttons at bottom
	$('.features h4').html('As a registered developer, you&rsquo;ll gain access to:');

	//handle apperance for buttons at the bottom
	$('.unreg').show();
	$('.reg').hide();

  }
}

function registerPageSetUp(){
  $('body').append(modalWindow);

    var chkBoxDeIdentifiedClaimsAetna = $('#2233');
    var chkBoxGoodRx = $('#2230');
	var chkBoxCarepassSync = $('#2131');
	var chkBoxFooducate = $('#2235');

	chkBoxFooducate.click(function(e){
	   if(chkBoxFooducate.is(':checked')){
			showModal(e, chkBoxFooducate);
			return false;
	   }
	});

	chkBoxGoodRx.click(function(e){
	   if(chkBoxGoodRx.is(':checked')){
			showModal(e, chkBoxGoodRx);
			return false;
	   }
	});

	chkBoxDeIdentifiedClaimsAetna.click(function(e){
	   if(chkBoxDeIdentifiedClaimsAetna.is(':checked')){
			showModal(e, chkBoxDeIdentifiedClaimsAetna);
			return false;
	   }
	});
	chkBoxCarepassSync.click(function(e){
	   if(chkBoxCarepassSync.is(':checked')){
			showModal(e, chkBoxCarepassSync);
			return false;
	   }
	});

    //if close button is clicked
    $('.window .agree').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
		agreeId = $(e.target).attr('id');
		chkboxId = agreeId.substring(5);
		$('#' + chkboxId).prop("checked",true)
        $('#mask, .window').hide();
    });

    //if close button is clicked
    $('.window .disagree').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
		disagreeId = $(e.target).attr('id');
		chkboxId = disagreeId.substring(8);
		$('#' + chkboxId).prop("checked",false)
        $('#mask, .window').hide();
		return true;
    });
}
function showModal(e, forCheckbox) {
        //Cancel the link behavior
        e.preventDefault();
        //Get the A tag
        var id = '#' + forCheckbox.attr('id') + 'Terms';

        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});

        //transition effect
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow",0.8);

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        $(id).css('top',  winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);

        //transition effect
        $(id).fadeIn(2000);
    }
function tabbedBox(){
	//When a tab is clicked find corodinated page
	$(".tabbedContainer .tabs .tab").click(function(){
		$selected = $(this);
		$tabs = $(".tabbedContainer .tabs .tab");
		$pages = $(".tabbedContainer .tabContent .leaf");

		$newTab = $tabs.eq($selected.index());
		$newPage = $pages.eq($selected.index());

		//hide current page
			$(".tabbedContainer .tabs .tab").removeClass("selected");
			$(".tabbedContainer .tabContent .leaf").removeClass("selected");

			//display new selected page & it's tab
			$newTab.addClass("selected");
			$newPage.addClass("selected");

	});
}

function sideBar(){
	//Show only active menus
	$(".page-docs div#sub > ul  li.active > ul ").show();

	//Apply controls
	$(".page-docs div#sub > ul>li > ul>li").has("ul").addClass("accordion").prepend("<div class='control'></div>");

	//Toggle function
	$(".page-docs div#sub > ul > li > ul > .accordion .control").click(function(){
		var $control = $(this);
		var $accordion = $(this).parents(".accordion");
		$accordion.find("ul").slideToggle(function(){
			if($(this).css("display") == "none"){
				$control.removeClass("open");
				$control.addClass("closed");
			}
			else{
				$control.removeClass("closed");
				$control.addClass("open");
			}
		});
	});
}

function changeTab() {
    $selected = $(this);
    $tabs = $(".tabbedContainer .tabs .tab");
    $pages = $(".tabbedContainer .tabContent .leaf");

    // last tab / page should be sample apps  & sdks
    $newTab = $tabs.eq($tabs.last().index());
    $newPage = $pages.eq($tabs.last().index());

    //hide current page
    $(".tabbedContainer .tabs .tab").removeClass("selected");
    $(".tabbedContainer .tabContent .leaf").removeClass("selected");

    //display new selected page & it's tab
    $newTab.addClass("selected");
    $newPage.addClass("selected");
}