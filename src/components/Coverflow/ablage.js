 /* 
                items.addEventListener('click',
        
                    scrollMiddleWare(.25)((scroll) => {
                        items.style.left = `${scroll.abs.x}px`;
        
                    }));
        
        
                scrollable.addEventListener('wheel',
        
                    scrollMiddleWare(.25)((scroll) => {
                       
                        items.style.left = `${scroll.abs.x}px`;
        
                    }));
        
        
        
                scrollable.addEventListener('mousemove',
        
        
                    scrollMiddleWare(.89)((scroll) => {
                        //console.log(abs.x, window.innerWidth)
        
        
        
                    
                        items.style.left = `${scroll.abs.x}px`;
        
                        // CALC WINDOW PROS
                        let WindowMiddle = window.innerWidth * 0.5;
                        let itemWidth = ~~itemsArr[0].offsetWidth;
                        let startRight = ~~WindowMiddle + itemWidth * 0.05
                        let endLeft = ~~WindowMiddle - itemWidth
                        let offset = ~~itemWidth * 0.20 //DELETE AFTER FLIPPER FIX
        
                        //FILTER ELEMENTS TO LEFT RIGHT AND MIDDLE
                        let MiddleItem = itemsArr.filter(items => {
                            return items.getBoundingClientRect().x <= startRight + 2 && items.getBoundingClientRect().x >= endLeft - 2
                        });
        
                        let leftItems = itemsArr.filter(items => items.getBoundingClientRect().x < endLeft - offset)
                        let rightItems = itemsArr.filter(items => items.getBoundingClientRect().x > startRight + offset)
        
        
        
                        MiddleItem.map(MiddleItem => {
                            //MIDDLE rotatey(0deg)//                  
                            MiddleItem.style.zIndex = '100';
        
                            MiddleItem.classList.remove(classes.Right);
                            MiddleItem.classList.remove(classes.Left);
                            MiddleItem.classList.add(classes.Middle); //ADD MIDDLE CLASS
        
                        });
        
                        leftItems.map((Leftitem, index) => {
                            //LEFT rotatey(20deg)//
        
                            const Zindex = 50 + ((index + 2) * 1);
        
                            Leftitem.style.zIndex = `${Zindex}`;
        
                            Leftitem.classList.remove(classes.Middle);
                            Leftitem.classList.remove(classes.Right);
                            Leftitem.classList.add(classes.Left); //ADD LEFT CLASS                   
        
                            if (Leftitem.children[0].classList.contains(classes.ClickedFront) &&
                                Leftitem.children[1].classList.contains(classes.ClickedBack)) {
        
                                Leftitem.children[0].classList.remove(classes.ClickedFront)
                                Leftitem.children[1].classList.remove(classes.ClickedBack)
                                return;
                            }
        
        
                        });
        
        
                        rightItems.map((Rightitem, index) => {
                            //RIGHT rotateY(-20deg)//
        
                            const Zindex = 50 - ((index + 2) * 1);
        
                            Rightitem.style.zIndex = `${Zindex}`;
        
        
                            Rightitem.classList.remove(classes.Middle);
                            Rightitem.classList.remove(classes.Left);
                            Rightitem.classList.add(classes.Right); //ADD RIGHT CLASS
        
                            if (Rightitem.children[0].classList.contains(classes.ClickedFront) &&
                                Rightitem.children[1].classList.contains(classes.ClickedBack)) {
        
                                Rightitem.children[0].classList.remove(classes.ClickedFront)
                                Rightitem.children[1].classList.remove(classes.ClickedBack)
                                return
                            }
        
                        });
        
        
        
        
        
                    })); */



                    const scrollMiddleWare = (inertia = 0.8) => {

                        /*  const scrollable = document.getElementById("Coverflow")
                         const items = document.getElementById("items")
                         let itemsArr = []
                         Array.from(items.children).forEach(item => itemsArr.push(item))
                         itemsArr.map(item => item) */
                     
                         let delta = {
                             x: null,
                         }
                         let abs = {
                             x: 0,
                             y: 0,
                         }
                     
                         return function onScroll(callback) {
                     
                             function notify() {
                                 abs.x += delta.x;
                                 callback({ abs, delta });
                             }
                     
                             let requestId;
                     
                             function start() {
                                 requestId = requestAnimationFrame(update);
                             }
                     
                             function update() {
                                 delta.x *= inertia;
                                 notify();
                                 start();
                             }
                     
                             function stop() {
                                 cancelAnimationFrame(requestId);
                                 requestId = null;
                             }
                     
                             let prevEvent;
                     
                             return function eventHandler(event) {
                     
                                 event.preventDefault();
                                 //console.log(event)
                     
                     
                                 if (prevEvent && event.buttons === 1 || event.type === 'wheel') {
                     
                                    /*  let itemWidth = ~~itemsArr[0].offsetWidth;       */     
                                   
                     
                                     if (event.type !== 'wheel') {
                                         delta.x = event.clientX - prevEvent.clientX;
                                         //console.log(delta.x)
                                     }
                                     else { //WHEEL EVENT
                                         delta.x = event.wheelDeltaY > 0 ? - itemWidth * 0.1 : + itemWidth * 0.1;
                                         items.classList.add(classes.WheelAnimation)
                                         //console.log(delta.x)
                                     }
                     
                                     stop();
                                     notify();
                                     setTimeout(() => items.classList.remove(classes.WheelAnimation), 100)
                                 }
                     
                                 if (prevEvent && event.type === 'click') {
                                     items.classList.add(classes.DbClickAnimation)
                                     let scrollTo = abs.x - event.target.getBoundingClientRect().x + (window.innerWidth * 0.5 - event.target.getBoundingClientRect().width * 0.5)
                                     abs.x = scrollTo;
                                     stop();
                                     notify();
                                     setTimeout(() => items.classList.remove(classes.DbClickAnimation), 600)
                                 }
                     
                                 if (requestId === null && event.buttons === 0) {
                                     start();
                                 }
                                 prevEvent = event;
                             }
                         }
                     }
                     