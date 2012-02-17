stopReloading = false;
nextPageNumber = -1;

function loadNewPosts()
{
    stopReloading = true;
    
//    var loadingDiv = $("<div id='infiniLoader'>Loading...</div>");
//    loadingDiv.css("position","absolute");
//    loadingDiv.css("top", (($(window).height() - loadingDiv.outerHeight()) / 2) + $(window).scrollTop() + "px");
//    loadingDiv.css("left", (($(window).width() - loadingDiv.outerWidth()) / 2) + $(window).scrollLeft() + "px");
//    
//    $("<body>").append(loadingDiv);
	
	var pageURL = window.location.href;
	var pieces = pageURL.split('/');
	var forumID = pieces[7];
	
	if( nextPageNumber == -1 )
	{	
		if( pieces[pieces.length-3] === "cat_id" )
		{
			nextPageNumber = 2;
		} 
		else
		{
			nextPageNumber = Number(pieces[pieces.length-2]) + 1;
		}
	}
	else
	{
		nextPageNumber++;
	}
	
	var nextURL = "http://www.newschoolers.com/ns/forums/forumthreads/cat_id/" + forumID + "/page/" + nextPageNumber + "/";
	
	var posts = $('.fr');
    var lastPost = posts[posts.length-1];
    
	$.ajax({
	  url: nextURL,
	  context: document.body,
	  success: function(response){
	  	console.log("Finished loading page " + nextPageNumber );
	  	stopReloading = false;
	  	console.log(response);
	  	$(response).find(".fr").insertAfter(lastPost);
	  	
	 }
});
    
    
}

function turnOnInfiniscroll()
{	
	$(window).scroll(function(){
	    if  ($(window).scrollTop() >= $(".forum").height()){
	    	
			if( !stopReloading )
			{
	          loadNewPosts();
			}
		
	    }
	});	
}

 
function getAnswer(theMessageEvent) 
{
    if (theMessageEvent.name === "infiniscroll")
    {
		if( !theMessageEvent.message )
		{
			$(window).scroll(function(){});
		}
		else
		{
			turnOnInfiniscroll();
		}
    }
}

function removeSignatures()
{
	$(".sig").remove();
}

if (window.top === window) 
{

   // The parent frame is the top-level frame, not an iframe.

    // All non-iframe code goes before the closing brace.
turnOnInfiniscroll();
removeSignatures();
safari.self.addEventListener("message", getAnswer, false);

}

