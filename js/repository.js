(function(window){
    window.repository ={
         images : [],
         fetchImages: function(params,callback){
            $.getJSON( "../images.json", function( data ) {
//                var items = [];
                $.each( data.children, function( key, val, index ) {
                    var imgId = generateImageId(key);
                    repository.images.push({
                        id: imgId,
                        path : val.path,
                        size:val.size,
                        tags: val.tags
                    });
  //                  items.push( "<div data-imageId='"+imgId+"' class=\"item\"><img src='" + val.path + "'/><p>"+val.size+"</p>"+formatTags(val.tags)+"</div>" );
                });
                callback();

            });
        
            // $( "<ul/>", {
            //         html: items.join( "" )
            //         }).appendTo( "#sourceContainer" );

            // });
        }
    }
})(window)