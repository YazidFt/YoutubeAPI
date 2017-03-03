
$(function(){

$('#searchFrom').submit(function(e){
      e.preventDefault();
  });

})


var listOfItems = [];
var index;

function SeekResults(idx) {

	  listOfItems=[]; index=0;

    $('#res').html('');

    query = $('#query').val();

    $.get("https://www.googleapis.com/youtube/v3/search",

    	    { part: 'snippet, id',
    	    	q: query,
    	    	type: 'video',
            maxResults: 50,
    	    	key: 'AIzaSyAopm4t8M3M7dN-1p15bRWI7IIaKCa0hNQ'
    	    },

    	    
    	  function(data){
                 
              $.each(data.items, function(i, item){
              	      
                  var obj = {};

                  obj['url'] = "https://www.youtube.com/watch?v=" + item.id.videoId ;
                  obj['title'] = item.snippet.title ; 
              	  obj['imgThumbnail'] = item.snippet.thumbnails.high.url;

              	  listOfItems.push(obj);

                });
                  
                  idx = index;
                  out = getOut(idx);
 
    	          }  
    	     );
}


function display_next(idx){
    
     if(idx==50){idx=-1;}
 
     idx = idx + 1;
     index = idx;

     $('#res').html('');
     out = getOut(idx);
   }



function display_prev(idx){
  
     if(idx==0){

     }else{
     
     idx = idx - 1;
     index = idx;
    
     $('#res').html('');
     out = getOut(idx);

     }

  }


 function getOut(idx){
       

        out      =       '<div  class="col-sm-8 col-md-4 col-md-offset-3 col-lg-6" ><img src="'+ listOfItems[idx]['imgThumbnail'] +'" />' +

                         '<h4>'+ listOfItems[idx]['title']+'</h4>' +

                         '<p><a href="'+ listOfItems[idx]['url']+'">Link to the video</a></p>' +

                         '<button id="prev" class="btn btn-success" onclick="display_prev('+ idx +');">prev</button>' + 

                         '<button id="next" class="btn btn-success" onclick="display_next('+ idx + ');">next</button></div>'

                         $('#res').append(out);
                }






