stopReloading = false;
nextPageNumber = -1;

function loadNewPosts()
{
    stopReloading = true;
	
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


// Load Infiniscroll
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

turnOnInfiniscroll();


// Remove Signatures
function removeSignatures()
{
	$(".sig").remove();
}

removeSignatures();

