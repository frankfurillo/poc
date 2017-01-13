(function(assortmentPlanPoc){
    assortmentPlanPoc.interactions ={
            draggedSource:null,
            attachHandlers: function(){
                var _this = this;
                $(".item").mousedown(function(e){
                    e.preventDefault();
                    _this.draggedSource = $(this);
                });
                $("body").mouseup(function(e){
                    _this.draggedSource = null;
                });

                $("#filterSelect").on("change",function(e){
                    var tag = $(this).val();
                    assortmentPlanPoc.filter.handleSelect(tag);
                });
                $("#fakeLoad").on("click",function(e){
                    assortmentPlanPoc.onFakeLoad(e);
                });
                $("#destinationContainer").mouseup(function(e){
                    if(_this.draggedSource!==null){
                        assortmentPlanPoc.onDraggedSourceRelease(e);
                        _this.enableInteract();
                    }
                });

            },



        enableInteract : function enableInteract(){

        interact('.draggable')  
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,
                // call this function on every dragmove event
                onmove: this.dragMoveListener,
                onend:this.dragEndListener
            });
            },

    dragEndListener : function(event) {
        var target = event.target;
        _this.repository.updateChosenItem({
                id:target.getAttribute("data-id"),
                pos:{
                    x:target.getAttribute('data-x'),
                    y:target.getAttribute('data-y')
                 }
            });
    },

    dragMoveListener : function(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

    }

    }

})(assortmentPlanPoc)

