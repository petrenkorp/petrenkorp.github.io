$(document).ready(function(){
	$(".writingLink").click(function(){
		$("#writingArticle").hide();
		$.get("articles/" + $(this).attr("id") + ".html", function(data){
			$("#writingArticle").html(data).fadeIn(1000);
		});
	});
});