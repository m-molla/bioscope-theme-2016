(function(wp){
    const {registerBlockType}=wp.blocks, {InspectorControls}=wp.blockEditor, {PanelBody,RangeControl,ToggleControl,TextControl,Notice}=wp.components, {createElement:el}=wp.element, ServerSideRender=wp.serverSideRender;
    registerBlockType('bioscope/albums',{
        edit:function({attributes:a,setAttributes}){
            const set=(key)=>(value)=>setAttributes({[key]:value});
            const range=(label,key,min,max)=>el(RangeControl,{label,value:a[key],min,max,onChange:set(key)});
            const toggle=(label,key)=>el(ToggleControl,{label,checked:!!a[key],onChange:set(key)});
            return el(wp.element.Fragment,{},
                el(InspectorControls,{},
                    el(PanelBody,{title:'Query',initialOpen:true},
                        el(TextControl,{label:'Category slug (optional)',value:a.category,onChange:set('category'),help:'Leave blank to include all categories.'}),
                        el(RangeControl,{label:'Posts to display',value:a.postsPerPage,min:1,max:100,onChange:set('postsPerPage')}),
                        el(Notice,{status:'info',isDismissible:false},'Posts follow Posts → Reorder Posts (menu order).')
                    ),
                    el(PanelBody,{title:'Responsive Layout',initialOpen:true},range('Desktop columns','desktopColumns',1,6),range('Tablet columns','tabletColumns',1,4),range('Mobile columns','mobileColumns',1,2),range('Desktop gap (px)','gap',0,100),range('Tablet gap (px)','tabletGap',0,100),range('Mobile gap (px)','mobileGap',0,100)),
                    el(PanelBody,{title:'Featured Images',initialOpen:true},el(Notice,{status:'info',isDismissible:false},'Set a featured image height (px) for each post in its Bioscope Album Image Height panel. Mobile uses a consistent responsive height; desktop uses the saved height or the image natural ratio.')),
                    el(PanelBody,{title:'Card Design',initialOpen:false},range('Card radius (px)','cardRadius',0,40),range('Image radius (px)','imageRadius',0,40),toggle('Show title','showTitle'),toggle('Show category / occasion','showOccasion'),toggle('Show photo count','showCount'),toggle('Show Open Album link','showOpenLink'),el(TextControl,{label:'Empty message',value:a.emptyMessage,onChange:set('emptyMessage')}))
                ),
                el('div',{className:'bioscope-albums-block-editor'},el(ServerSideRender,{block:'bioscope/albums',attributes:a}))
            );
        },
        save:function(){return null;}
    });
})(window.wp);
