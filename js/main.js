$("document").ready(function(d){
    repository.fetchImages(null,onImagesLoaded);
    initDestinationContainer();
});


function onImagesLoaded(){
    createSourceItems();
    interactions.attachHandlers(); 
    filter.loadFilters();
}


function createSourceItems(){
    var items = [];
    repository.images.forEach(function(image){
         items.push( "<div data-imageId='"+image.id+"' class=\"item\"><img src='" + image.path + "'/><p>"+image.size+"</p>"+formatTags(image.tags)+"</div>" );
    });
    $( "<ul/>", {
        html: items.join( "" )
        }).appendTo( "#sourceContainer" );
}

function initDestinationContainer(){
    //cancel default dragg
    $("#destinationContainer").mouseup(function(e){
        if(interactions.draggedSource!==null){
            createItem(e);
            interactions.enableInteract();
        }
    });
}



function createItem( e){
    var image = repository.images.filter(function(x){return x.id===interactions.draggedSource.attr("data-imageId")})[0];
    var imageSource = interactions.draggedSource.find("img").attr("src");
        var theNewDiv = "<div class='draggable chosenItem item'  data-imageId='"+generateChosenImageId(image.id)+"' style='transform:translate("+e.offsetX+"px,"+e.offsetY+") left:0;top:0;'><img src='"+image.path+"'/><p>"+image.size+"</p>"+formatTags(image.tags)+"</div>";
        $(e.target).append(theNewDiv);
}

function generateImageId(key){
    return "image"+key;
}

function generateChosenImageId(key){
    return "chosen"+key;
}
function formatTags(tags){
    var tagsFormatted = "";
    if(tags!==undefined){
        tagsFormatted = tags.map(function(tag){ return "<p>"+tag +"</p>"; }).join("");
    }
    return tagsFormatted;
}


