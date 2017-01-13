(function(assortmentPlanPoc){
    assortmentPlanPoc.filter ={
         handleSelect:function(tag){
            if(tag ==="all"){
                $(".chosenItem").removeClass("filtered");
                return;
            }
            var idsNotMatchningTag = assortmentPlanPoc.repository.images.filter(function(im){
                return im.tags===undefined || im.tags.indexOf(tag)===-1
                })
                .map(function(i){
                    return i.id
                }); 
            
            idsNotMatchningTag.forEach(function(id){
                $("[data-imageid='chosen"+id+"']").addClass("filtered");
            })
        },
        loadFilters: function(){
            var addedTags = [];
            assortmentPlanPoc.repository.images.filter(function(x){return x.tags!==undefined}).forEach(function(image){
                image.tags.filter(function(t){return addedTags.indexOf(t)==-1; }).forEach(function(tag){
                    addedTags.push(tag);
                    $("#filterSelect").append($('<option>', {value:tag, text:tag}));
                });
            });
        }
    }
})(assortmentPlanPoc)