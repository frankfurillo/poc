(function(assortmentPlanPoc){
    assortmentPlanPoc.interactions ={
            draggedSource:null,
            selection:null,
            draggingChosenItem:false,
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
                    if(_this.selection!=null){

                          _this.selection = null;
                    }
                });

                $("#destinationContainer").mousedown(function(e){
                    console.log(e.offsetX);

                    if(_this.draggingChosenItem){
                        console.log("mDown2");
                        return;
                    }
                    //to be continued. Starting to do multiselect drag and drop.
                    _this.selection = {startX:e.offsetX, startY:e.offsetY};
                    $(".selection")[0].style.left=e.offsetX;
                    $(".selection")[0].style.top=e.offsetY;
                    $(".selection")[0].style.width=1;
                    $(".selection")[0].style.height=1;
                    
                });
                $("#destinationContainer").mousemove(function(e){
                    e.preventDefault();
                    if(_this.selection!=null && _this.draggingChosenItem===false){
                        if(e.offsetX === -1){
                            return;
                        }
                        if(_this.isValidMove(e.offsetX,_this.selection.startX, e.offsetY, _this.selection.startY)){
                            $(".selection").removeClass("hide");
        
                            if(e.offsetX <  _this.selection.startX){
                                $(".selection")[0].style.width=((e.offsetX - _this.selection.startX) * -1) - 5 ;
                                $(".selection")[0].style.left=(e.offsetX) + 5 ;
                            }
                            else{
                                $(".selection")[0].style.width=(e.offsetX - _this.selection.startX) - 5 ;
                            }
                            if(e.offsetY <  _this.selection.startY){
                                $(".selection")[0].style.height=((e.offsetY - _this.selection.startY) * -1) - 5 ;
                                $(".selection")[0].style.top=(e.offsetY) + 5 ;
                            }
                            else{
                                $(".selection")[0].style.height=(e.offsetY - _this.selection.startY) - 5 ;
                            }
                                                
                       }
                    }
                    else if(_this.draggingChosenItem){
                        console.log("hideit");
                        _this.selection = null;
                        $(".selection").addClass("hide");
                        
                    }
                });
            },
            isValidMove:function(offsetX,startX,offsetY,startY){
                var delta = 10;
                var xIsValid = this.toPositive(offsetX -startX) > 10;
                var yIsValid = this.toPositive(offsetY - startY) > 10;
                return xIsValid && yIsValid;
            },
            toPositive:function(val){
                return (val<0) ? val * -1: val;
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
                onstart: this.dragStartListener,
                onmove: this.dragMoveListener,
                onend:this.dragEndListener
            })
             .resizable({
                    preserveAspectRatio: true,
                    edges: { left: true, right: true, bottom: true, top: true }
                })
                .on('resizemove', function (event) {
                    var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0),
                        y = (parseFloat(target.getAttribute('data-y')) || 0);

                    // update the element's style
                    target.style.width  = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                   // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
                });
                
            ;
           
         },

        dragStartListener: function(event){
            console.log("mDown3");
            draggingChosenItem = true;
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
                draggingChosenItem = false;
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
            _this.draggingChosenItem = true;

        }

    }

})(assortmentPlanPoc)

