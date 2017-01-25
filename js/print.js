 (function(assortmentPlanPoc) {
    assortmentPlanPoc.print = {
        a4 : [841.89, 595.28 ], // for a4 size paper height and width

        body:null,
        pageCount:0,
        renderPage:null,
        createPDF: function() {
            
            //this.body = $('#destinationContainer');
            //this.cache_width = this.body.width(),
            var _this = this;
            var doc = new jsPDF({
                unit: 'px',
                format: 'a4',
                orientation: 'landscape'
            });
            this.pageCount = $(".printablePage").length; 
            var currentPageIndex = 0;
            var pages = [$(".printablePage:eq(0)"),$(".printablePage:eq(1)")];
            var currentPage =$(".printablePage:eq(1)");
            

            _this.renderPage = function(page){
                _this.getCanvas(page).then(function(canvas) {
                    
                        var cache_width =page.width();
                        var img = canvas.toDataURL("image/png");
                        
                        doc.addImage(img, 'JPEG', 20, 20);
                        page.width(cache_width);
                        doc.addPage();
                        
                        
                        if(currentPageIndex < _this.pageCount-1){
                            currentPageIndex ++;
                            _this.renderPage(pages[currentPageIndex]);

                        }
                        else{
                            doc.save('techumber-html-to-pdf.pdf');
                        }
                });
                    
            }
            _this.renderPage(pages[0]);


            // $(".printablePage").each(function(page){
            //     _this.body =$(this);
                
            //     _this.getCanvas(_this.body).then(function(canvas) {
                    
            //         var cache_width = _this.body.width();
            //         var img = canvas.toDataURL("image/png");
                    
            //         doc.addImage(img, 'JPEG', 20, 20);
            //         _this.body.width(cache_width);
            //         if(currentPageIndex===_this.pageCount){
            //             doc.save('techumber-html-to-pdf.pdf');
            //         }
            //         doc.addPage();
            //         currentPageIndex ++;
            //     });

            // });


        },

            // create canvas object
        getCanvas: function(printElement) {
            printElement.width((this.a4[0] * 1.33333) - 80).css('max-width', 'none');
            return html2canvas(printElement, {
                imageTimeout: 1000,
                removeContainer: true
            });
        }

    }
  })(assortmentPlanPoc);