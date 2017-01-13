(function(window,$){
    $("document").ready(function(d){
        assortmentPlanPoc.init();
    });  
    window.assortmentPlanPoc ={
        _this:null,
        init:function(){
            _this = this;
            _this.repository.fetchImages(null,_this.onImagesLoaded);
           // _this.initDestinationContainer();
        },
        
        onImagesLoaded:function(){
            _this.createSourceItems();
            _this.interactions.attachHandlers(); 
            _this.filter.loadFilters();
        },
        
        onDraggedSourceRelease: function(e){
            var id= _this.interactions.draggedSource.attr("data-imageId");
            _this.repository.chosenItems.push({id:id,pos:{x:e.offsetX,y:e.offsetY}});
            _this.createItem({
                pos: {x: e.offsetX, y: e.offsetY},
                id: id
            },e.target);
        },

        onFakeLoad:function(e){
            _this.repository.loadPlan(this.onPlanLoaded);
            _this.interactions.enableInteract();

        },
        
        onPlanLoaded : function(){
                _this.repository.chosenItems.forEach(function(item){
                    var destinationParentElement = $("#page" + item.page)[0]; 
                    _this.createItem({
                        id: item.id,
                        pos: item.pos
                    },
                    destinationParentElement);
                })
        },
        createSourceItems:function(){
            var items = [];
            _this.repository.images.forEach(function(image){
                items.push( "<div data-imageId='"+image.id+"' class=\"item\"><img src='" + image.path + "'/><p>"+image.size+"</p>"+_this.formatTags(image.tags)+"</div>" );
            });
            $( "<ul/>", {
                html: items.join( "" )
                }).appendTo( "#sourceContainer" );
        },

        createItem:function(params,parentElement){
            var id = params.id;
            var image = _this.repository.images.filter(function(x){return x.id===id})[0];
            if(image===undefined){
                return;
            }
            var theNewDiv = "<div class='draggable chosenItem item' data-id='"+id+"' data-imageId='"+_this.generateChosenImageId(id)+"' data-x='"+params.pos.x+"' data-y='"+params.pos.y+"' style='transform:translate("+params.pos.x+"px,"+params.pos.y+"px); left:0;top:0;'><img src='"+image.path+"'/><p>"+image.size+"</p>"+_this.formatTags(image.tags)+"</div>";
            $(parentElement).append(theNewDiv);
        },
        generateChosenImageId:function(key){
            return "chosen"+key;
        },

        formatTags:function(tags){
            var tagsFormatted = "";
            if(tags!==undefined){
                tagsFormatted = tags.map(function(tag){ return "<p>"+tag +"</p>"; }).join("");
            }
            return tagsFormatted;
        }
    }
})(window, $);



