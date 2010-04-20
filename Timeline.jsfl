(function(dx){
	function ExtensibleTimeline(timeline,options){
		if(timeline && timeline instanceof Timeline){
			this.$=timeline;
		}else if(timeline && timeline.$ && timeline.$ instanceof Timeline){
			this.$=timeline.$;
		}else{
			this.$=new Timeline();
		}
		this.cache=new dx.Object({numCubicSegments:new dx.Array()});
		dx.Object.apply(this,[options]);
		return this;
	}
	ExtensibleTimeline.prototype={
		__proto__:dx.Object.prototype,
		$:Timeline,
		type:ExtensibleTimeline,
		//built in methods
		addMotionGuide:function(){return this.$.addMotionGuide();},
		addNewLayer:function(name,layerType,bAddAbove){return this.$.addNewLayer(name,layerType,bAddAbove);},
		clearFrames:function(startFrameIndex,endFrameIndex){return this.$.clearFrames(startFrameIndex,endFrameIndex);},
		clearKeyframes:function(startFrameIndex,endFrameIndex){return this.$.clearKeyframes(startFrameIndex,endFrameIndex);},
		convertToBlankKeyframes:function(startFrameIndex,endFrameIndex){return this.$.convertToBlankKeyframes(startFrameIndex,endFrameIndex);},
		convertToKeyframes:function(startFrameIndex,endFrameIndex){return this.$.convertToKeyframes(startFrameIndex,endFrameIndex);},
		copyFrames:function(startFrameIndex,endFrameIndex){return this.$.copyFrames(startFrameIndex,endFrameIndex);},
		copyMotion:function(){return this.$.copyMotion();},
		copyMotionAsAS3:function(){return this.$.copyMotionAsAS3();},
		createMotionTween:function(startFrameIndex,endFrameIndex){return this.$.createMotionTween(startFrameIndex,endFrameIndex);},
		createMotionObject:function(){return this.$.createMotionObject()},
		cutFrames:function(startFrameIndex,endFrameIndex){return this.$.cutFrames(startFrameIndex,endFrameIndex);},
		deleteLayer:function(index){return this.$.deleteLayer(index);},
		expandFolder:function(bExpand,bRecurseNestedParents,index){return this.$.expandFolder(bExpand,bRecurseNestedParents,index);},
		findLayerIndex:function(name){return this.$.findLayerIndex(name);},
		getFrameProperty:function(property,startFrameIndex,endFrameIndex){return this.$.getFrameProperty(property,startFrameIndex,endFrameIndex);},
		getGuidelines:function(){return this.$.getGuidelines();},
		getLayerProperty:function(property){return this.$.getLayerProperty(property);},
		getSelectedFrames:function(){return this.$.getSelectedFrames();},
		getSelectedLayers:function(){return this.$.getSelectedLayers();},
		insertBlankKeyframe:function(frameNumIndex){return this.$.insertBlankKeyframe(frameNumIndex);},
		insertFrames:function(numFrames,bAllLayers,frameNumIndex){return this.$.insertFrames(numFrames,bAllLayers,frameNumIndex);},
		insertKeyframe:function(frameNumIndex){return this.$.insertKeyframe(frameNumIndex);},
		pasteFrames:function(startFrameIndex,endFrameIndex){return this.$.pasteFrames(startFrameIndex,endFrameIndex);},
		pasteMotion:function(){return this.$.pasteMotion();},
		removeFrames:function(startFrameIndex,endFrameIndex){return this.$.removeFrames(startFrameIndex,endFrameIndex);},
		removeMotionObject:function(){return this.$.removeMotionObject();},
		reorderLayer:function(layerToMove,layerToPutItBy,bAddBefore){return this.$.reorderLayer(layerToMove,layerToPutItBy,bAddBefore);},
		reverseFrames:function(startFrameIndex,endFrameIndex){return this.$.reverseFrames(startFrameIndex,endFrameIndex);},
		selectAllFrames:function(){return this.$.selectAllFrames();},
		setFrameProperty:function(property,value,startFrameIndex,endFrameIndex){return this.$.setFrameProperty(property,value,startFrameIndex,endFrameIndex);},
		setGuidelines:function(xmlString){return this.$.setGuidelines(xmlString);},
		setLayerProperty:function(property,value,layersToChange){return this.$.setLayerProperty(property,value,layersToChange);},
		setSelectedFrames:function(startFrameIndex,endFrameIndex,bReplaceCurrentSelection,selectionList){return this.$.setSelectedFrames();},
		setSelectedLayers:function(index,bReplaceCurrentSelection){return this.$.setSelectedLayers(index,bReplaceCurrentSelection);},
		showLayerMasking:function(layer){return this.$.showLayerMasking(layer);},
		startPlayback:function(){return this.$.startPlayback();},
		stopPlayback:function(){return this.$.stopPlayback();},
		//built-in properties
		get currentFrame(){return this.$.currentFrame;},
		set currentFrame(s){this.$.currentFrame=s;},
		get currentFrames(){return this.getFrames({position:this.currentFrame});},
		set currentFrames(s){},		
		get currentLayer(){return this.$.currentLayer;},
		set currentLayer(s){this.$.currentLayer=s;},
		get frameCount(){return this.$.frameCount;},
		set frameCount(s){this.$.frameCount=s;},
		get layerCount(){return this.$.layerCount;},
		get layers(){
			var inputLayers=this.$.layers;
			var layers=new dx.Array();
			for(var i=0;i<inputLayers.length;i++){
				layers.push(new dx.Layer(inputLayers[i],{timeline:this}));
			}
			return layers;
		},
		get name(){return this.$.name;},
		set name(s){this.$.name=s;},
		get libraryItem(){return this.$.libraryItem;},
		set libraryItem(s){this.$.libraryItem=s;},
		//methods
		getKeyframes:function(options){
			var settings=new dx.Object({
				includeHiddenLayers:dx.includeHiddenLayers,
				selected:false
			});
			settings.extend(options);
			var sel={};
			if(settings.selected){
				var s=this.getSelectedFrames();
				for(var i=0;i<s.length;i+=3){
					if(!sel[String(s[i])]){
						sel[String(s[i])]=[];
					}
					for(var ii=s[i+1];ii<s[i+2];ii++){
						sel[String(s[i])].push(ii);
					}
				}
			}
			var k=new dx.Array();
			var layers=this.layers;
			for(var l=0;l<layers.length;l++){
				if(
					(!settings.selected || sel[String(l)]) &&
					(layers[l].visible || settings.includeHiddenLayers)
				){
					var frames=layers[l].frames;
					for(var f=0;f<frames.length;f++){
						if(!settings.selected || sel[String(l)].indexOf(f)>-1){
							if(
								f==frames[f].startFrame || 
								(selected && k.indexOf(frames[frames[f].startFrame])<0)
							){
								k.push(new dx.Frame(frames[frames[f].startFrame]));
							}
						}
					}
				}
			}
			return k;	
		},
		getElements:function(options){
			var settings=new dx.Object({
				includeHiddenLayers:dx.includeHiddenLayers,
				frame:null
			});
			settings.extend(options);
			var e=new dx.Selection();
			var frames=(
				settings.frame?
				this.getFrames({position:settings.frame,includeHiddenLayers:settings.includeHiddenLayers}):
				this.getKeyframes({includeHiddenLayers:settings.includeHiddenLayers})
			);
			for(var k=0;k<frames.length;k++){
				e=e.concat(frames[k].elements);
			}
			return e;
		},
		getFrames:function(options){
			var settings=new dx.Object({
				position:null,
				includeHiddenLayers:dx.includeHiddenLayers
			});
			settings.extend(options);
			var f=new dx.Array();
			var layers=this.layers;
			for(var l=0;l<layers.length;l++){
				if((layers[l].visible || settings.includeHiddenLayers)){
					if(settings.position!==null && layers[l].frameCount>settings.position){
						f.push(layers[l].frames[settings.position]);	
					}else{
						f=f.concat(layers[l].frames);
					}
				}
			}
			return f;		
		},
		//getter properties
		get elements(){
			return this.getElements();
		},
		set elements(){},
		get frames(){
			return this.getFrames();
		},
		get keyframes(){
			return this.getKeyframes({selected:false});
		},
		clone:function(rlist){
			return dx.Object.prototype.clone.call(this,rlist);
		},
		getSVG:function(options){
			dx.sel.clear();
			var settings=new dx.Object({
				frame:this.currentFrame,
				selected:false,
				degree:2,
				includeHiddenLayers:dx.includeHiddenLayers,
				root:true,
				profile:'basic',
				version:'1.1',
				x:'0',
 				y:'0',
				width:String(dx.doc.width),
				height:String(dx.doc.height),
				id:String(dx.doc.name.stripExtension().camelCase()),
				matrix:dx.doc.viewMatrix//{a:1,b:0,c:0,d:1,tx:0,tx:0}
			});
			settings.extend(options);
			var xmlString=(
				'<svg version="'+settings.version+'" baseProfile="'+settings.profile+'" '+
				'id="'+settings.id+'" '+
				'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+
				'x="'+settings.x+'px" y="'+settings.y+'px" width="'+settings.width+'px" height="'+settings.height+'px" '+
				'viewBox="'+settings.x+' '+settings.y+' '+settings.width+' '+settings.height+'" '+
				'xml:space="preserve" >\n</svg>'
			);
			var xml=new XML(xmlString);
			var elements;
			if(settings.selected){
				elements=dx.sel.byFrame().reverse();
			}else{
				elements=this.getElements({
					frame:settings.frame,
					includeHiddenLayers:settings.includeHiddenLayers
				}).byFrame().reverse();
			}
			for(var i=0;i<elements.length;i++){
				if(elements[i] && elements[i].length>0){
					var layer=new XML('<g id="'+elements[i][0].layer.name.camelCase()+'" />');
					for(var n=0;n<elements[i].length;n++){
						if(elements[i][n].getSVG){
							var element=elements[i][n].getSVG({degree:settings.degree,matrix:settings.matrix});
							layer.appendChild(element);
						}
					}
					xml.appendChild(layer);
				}
			}
			var docString='<?xml version="1.0" encoding="utf-8"?>\n';
			return docString+xml.toXMLString();
		},
		numCubicSegments:function(options){
			var settings=new dx.Object({
				frame:this.currentFrame,
				includeHiddenLayers:dx.includeHiddenLayers,
			});
			settings.extend(options);
			if(settings.frame && this.cache.numCubicSegments.length>settings.frame){
				return this.cache.numCubicSegments[settings.frame];
			}
			var elements=this.getElements({
				frame:settings.frame,
				includeHiddenLayers:settings.includeHiddenLayers
			}).expand();
			var numCubicSegments=0;
			for(var i=0;i<elements.length;i++){
				if(elements[i] instanceof dx.Shape){
					var ncs=elements[i].numCubicSegments();
					numCubicSegments+=ncs||0;
				}//else if(elements[i] instanceof dx.SymbolInstance){
				//	numCubicSegments+=
				//}
			}
			if(settings.frame){
				this.cache.numCubicSegments[settings.frame]=num;
				return num;
			}else{
				return num;
			}
		}
	}
	dx.extend({Timeline:ExtensibleTimeline});
})(dx);