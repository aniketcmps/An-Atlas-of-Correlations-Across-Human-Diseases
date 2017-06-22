
$(document).ready(function(){
	var selectedTab =0;
	var allLi_selection = $('#selectionContent ul li');
	$('#selectionContent ul li').on("click",function(){
		allLi_selection.removeClass("check");
		$(this).addClass("check");
		selectedTab = $('#selectionContent ul li.check').index();
		changeImage(selectedTab);
		changeContext(selectedTab)
		var myfile = $(this).attr("data-file");
		plotBar(myfile,'#topfivesvg');
		var myfile1 = $(this).attr("data-file1");
		plotNetwork(myfile1,"#networksvg");
		$("#displayLine").html("");
		$("#displayMembers").html("");
	})

	$('#selectionContent ul li:eq(0)').addClass("check");

	$('#ImagesClass ul li').hide();
	$('#ImagesClass ul li:eq(0)').show();

	$('#ContextClass ul li').hide();
	$('#ContextClass ul li:eq(0)').show();

	function changeImage(selectedTab){
		$('#ImagesClass ul li').hide();
		$('#ImagesClass ul li:eq('+selectedTab+')').show();
	}

	function changeContext(selectedTab){
		$('#ContextClass ul li').hide();
		$('#ContextClass ul li:eq('+selectedTab+')').show();
	}
	plotBar('data/bar/skeletal_count.csv','#topfivesvg	');
	plotNetwork("data/network/skeleton.json","#networksvg");
});


function bigImg(x) {
   x.style.height = "17px";
	 x.style.width = "17px";
};

function normalImg(x) {
    x.style.height = "10px";
    x.style.width = "10px";
};
