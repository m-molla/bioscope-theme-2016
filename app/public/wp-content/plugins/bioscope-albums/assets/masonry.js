(function(){
    'use strict';

    const initialized = new WeakMap();

    function read(grid,name,fallback){
        const n=parseFloat(getComputedStyle(grid).getPropertyValue(name));
        return Number.isFinite(n)?n:fallback;
    }

    function columns(grid){
        const w=grid.clientWidth;
        if(w<=600)return Math.max(1,read(grid,'--ba-mobile-columns',1));
        if(w<=900)return Math.max(1,read(grid,'--ba-tablet-columns',2));
        return Math.max(1,read(grid,'--ba-columns',3));
    }

    function gap(grid){
        const w=grid.clientWidth;
        if(w<=600)return read(grid,'--ba-mobile-gap',16);
        if(w<=900)return read(grid,'--ba-tablet-gap',20);
        return read(grid,'--ba-gap',24);
    }

    function layout(grid){
        const cards=Array.from(grid.children).filter(card=>card.classList.contains('bioscope-albums__card'));
        if(!cards.length||!grid.clientWidth)return;

        const count=columns(grid);
        const spacing=gap(grid);
        const cardWidth=(grid.clientWidth-spacing*(count-1))/count;
        const heights=Array(count).fill(0);

        grid.classList.add('is-masonry-ready');
        cards.forEach(card=>{
            card.style.width=cardWidth+'px';
            card.style.left='0px';
            card.style.top='0px';
        });
        cards.forEach((card,index)=>{
            const column=index%count;
            card.style.left=(column*(cardWidth+spacing))+'px';
            card.style.top=heights[column]+'px';
            heights[column]+=card.getBoundingClientRect().height+spacing;
        });
        grid.style.height=Math.max(0,Math.max.apply(null,heights)-spacing)+'px';
    }

    function init(root){
        const grid=root.querySelector('.bioscope-albums__grid');
        if(!grid)return;

        const existingUpdate=initialized.get(grid);
        if(existingUpdate){
            existingUpdate();
            return;
        }

        let frame=0;
        const refresh=()=>{
            cancelAnimationFrame(frame);
            frame=requestAnimationFrame(()=>layout(grid));
        };
        const update=()=>{
            layout(grid);
            refresh();
        };
        const observeImages=node=>{
            if(node.nodeType!==1)return;
            const images=[];
            if(node.matches('img'))images.push(node);
            images.push(...node.querySelectorAll('img'));
            images.forEach(img=>{
                if(img.dataset.masonryObserved)return;
                img.dataset.masonryObserved='1';
                img.addEventListener('load',refresh);
                img.addEventListener('error',refresh);
            });
            if(node.matches('.bioscope-albums__card'))resizeObserver?.observe(node);
            node.querySelectorAll('.bioscope-albums__card').forEach(card=>resizeObserver?.observe(card));
        };

        const resizeObserver='ResizeObserver'in window?new ResizeObserver(refresh):null;
        initialized.set(grid,update);
        resizeObserver?.observe(grid);
        observeImages(grid);

        const mutations=new MutationObserver(records=>{
            records.forEach(record=>record.addedNodes.forEach(observeImages));
            update();
        });
        mutations.observe(grid,{childList:true,subtree:true});

        if(!resizeObserver)window.addEventListener('resize',refresh);
        if(document.fonts&&document.fonts.ready)document.fonts.ready.then(refresh);
        update();
    }

    function start(){
        document.querySelectorAll('.bioscope-albums').forEach(init);
    }

    const mutations=new MutationObserver(records=>{
        records.forEach(record=>record.addedNodes.forEach(node=>{
            if(node.nodeType!==1)return;
            if(node.matches('.bioscope-albums'))init(node);
            node.querySelectorAll('.bioscope-albums').forEach(init);
        }));
    });
    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded',()=>{
            start();
            mutations.observe(document.documentElement,{childList:true,subtree:true});
        });
    }else{
        start();
        mutations.observe(document.documentElement,{childList:true,subtree:true});
    }
    window.addEventListener('load',start);
})();
