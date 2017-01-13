(function(assortmentPlanPoc){
    assortmentPlanPoc.repository ={
         images : [],
         chosenItems: [],
         fetchImages: function(params,callback){
            var _this = this;
            _this.images = [];
            $.getJSON( "../images.json", function( data ) {
                $.each( data.children, function( key, val, index ) {
                    _this.images.push({
                        id: val.name,
                        path : val.path,
                        size:val.size,
                        tags: val.tags
                    });
                });
                callback();
            });
        },
        loadPlan:function(callback){
             var _this = this;
            _this.chosenItems = [];
            $.getJSON( "../savedPlan.json", function( data ) {
                $.each( data.children, function( key, val, index ) {
                    _this.chosenItems.push({
                        id: val.id,
                        pos : val.pos,
                        page: val.page
                    });
                });
                callback();
            });
        },
        updateChosenItem:function(params){
            var chosenItem= this.getChosenItem(params.id); 
            chosenItem.pos.x = params.pos.x;
            chosenItem.pos.y = params.pos.y;
            console.log("chosenItems",_this.repository.chosenItems);

        },
        getChosenItem: function(id){
            return this.chosenItems.filter(function(item){return item.id===id})[0];
        }
    }
})(assortmentPlanPoc)