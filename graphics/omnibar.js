	var speedcontrolBundle = 'nodecg-speedcontrol';
	var omnibar = document.getElementById('omnibar'); 
	
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	
	var next4runs = nodecg.Replicant('next4runs');
	var next4incs = nodecg.Replicant('next4incs');
	
	var donateTotal = nodecg.Replicant('donateTotal');
	
	var runsHtml = "";
	var incsHtml = "";
	var donateHtml = "";	

	var oldDonate = 0;
	
	var slideStep= 0;

	setup();
	
	next4runs.on('change', (newVal, oldVal) => {
		if (newVal)
		{
			setRuns(newVal);
			update();
		}
	});
	
	next4incs.on('change', (newVal, oldVal) => {
		if (newVal)
		{
			setIncs(newVal);
			update();
		}
	});
	
	donateTotal.on('change', (newVal, oldVal) => {
		if (newVal)
		{
			setDonate(newVal);
			update();
		}
	});
	
	function setup(){
		
		var html = "";
			html += "<div id = 'omniLogos'>";
				html += "<div id = 'bratLogo'></div>";
				html += "<div id = 'helpedLogo'></div>";
			html += "</div>";
			
			
		html += "<div id='runsaseguir' class='show0' "+(slideStep!=0? "style='display:none;'":"" )+">A Seguir</div>";
		fitty('#runsaseguir',{minSize: 17,maxSize: 25,multiLine: true});
		html += "<div id='nextRuns' class='show1' "+(slideStep!=1? "style='display:none;'":"" )+">";
		html += runsHtml;
		html += "</div>";
		
		html += "<div id='nextIncs'>";
		for(var i = 0 ; i < 11 ; i++){
			html += "<div id='Inc"+i+"' class = 'nextInc show"+(i+2)+" ' "+(slideStep!=(i+2)? "style='display:none;' ":"" )+"></div>";
			console.log("<div id='Inc"+i+"' class = 'nextInc show"+(i+2)+" ' "+(slideStep!=(i+2)? "style='display:none;' ":"" )+"></div>");
		}
		//html += incsHtml;
		html += "</div>";
		
		html += "<div id='donate'>";
			html += "<div class = 'donateRS'>R$</div>";
			html += "<div class = 'donateVal'></div>";
		html += "</div>";
		
		omnibar.innerHTML = html;

		slide(slideStep);
	}
	
	function update(){
		fitty.fitAll();
		var nextRuns = document.getElementById('nextRuns'); 
		var nextIncs = document.getElementById('nextIncs'); 
		nextRuns.innerHTML = runsHtml;
		//nextIncs.innerHTML = incsHtml;
		fitty('.nextRunName',{minSize: 17,maxSize: 25,multiLine: true});
		
	}
	
	function setRuns(value){
		runsHtml = "";
		for(var i = 0 ; i < value.length ; i++){
			runsHtml += "<div class = 'nextRun'>";
				runsHtml += "<div class = 'nextRunName'>" + value[i].game + "</div>";
				runsHtml += "<div class = 'nextRunCat'>" + value[i].category + "</div>";
			runsHtml += "</div>";
			runsHtml += "<div class = 'nextRunSpacer'></div>";
		}
		
	}
	
	function setIncs(value){
		var count = 0;
		for(var i = 0 ; i < value.length ; i++){

			incsHtml = "";

			var IncN = document.getElementById('Inc'+i); 
			if(IncN){
			IncN.innerHTML = "";
				if(value[i].type == 'Arc'){
					
					incsHtml += "<div class = 'IncData'>";
						incsHtml += "<div class = 'Incname'>" + value[i].name + "</div>";
						incsHtml += "<div class = 'IncGame'>" + value[i].game + "</div>";
					incsHtml += "</div>";
					incsHtml += "<div class = 'nextRunSpacer'></div>";
					incsHtml += "<div class = 'IncValues'>";
						incsHtml += "<div class = 'valorA'>R$" + value[i].valueA + "</div>";
						incsHtml += "<div class = 'valorSep'> / </div>";
						incsHtml += "<div class = 'valorB'>R$" + value[i].valueB + "</div>";
					incsHtml += "</div>";
					
				}else{
					
					incsHtml += "<div class = 'IncData'>";
						incsHtml += "<div class = 'Incname'>" + value[i].name + "</div>";
						incsHtml += "<div class = 'IncGame'>" + value[i].game + "</div>";
					incsHtml += "</div>";
					incsHtml += "<div class = 'nextRunSpacer'></div>";
					incsHtml += "<div class = 'IncOptions'>";
						for(var j = 0 ; j < value[i].options.length ; j++){
							if(value[i].options[j].name != ""){
								incsHtml += "<div class = 'IncOpt' style='width:"+(800/value[i].options.length)+"px'>" ;
									incsHtml += "<div class = 'Incname'>" + value[i].options[j].name + "</div>";
									incsHtml += "<div class = 'Incval'>" + value[i].options[j].value + "</div>";
								incsHtml += "</div>";
							}
						}
					incsHtml += "</div>";
				}
				
				IncN.innerHTML = incsHtml;
			}
			count = i;
		}

		for(var i = count+1 ; i < 11 ; i++){
			var IncN = document.getElementById('Inc'+i); 
			if(IncN){
				IncN.innerHTML = "";
			}
		}



	}
	
	function setDonate(value){
		var dinheiro = oldDonate;

		var newValue = {
			valor: dinheiro
		}

		var logEl = document.querySelector('.donateVal');
		if(logEl){
			anime({
				targets: newValue, 
				valor: value,
				easing: 'linear',
				round: 100,
				update: function(){
					logEl.innerHTML = JSON.stringify(newValue).replace(/"/g,'').replace('{valor:','').replace('}','');  
				}
			});
	
			oldDonate = value;
		}
	}

	function animateInOut(classe, dir){

		if (dir == 1) {
			anime({
				targets: classe,
				translateX: 1000,
				opacity: '0%',
				delay: anime.stagger(175),
				direction: 'reverse',
				easing: 'easeOutQuad'
			});
		}

		else if (dir == 0) {
			anime({
				targets: classe,
				translateX: 1000,
				opacity: '0%',
				delay: anime.stagger(175),
				easing: 'easeInQuad'
			});
		}
	}

	function slide(id){
		slideStep = id;
		fitty.fitAll();
		var next = id+1;
		var el = document.querySelector('.show'+(next));
		if(!el){
			next=0;
		}else{
			if(el.innerHTML == ""){
				next=0;
			}
		}

		var oel = document.querySelector('.show'+id);
		var nel = document.querySelector('.show'+next);
		oel.style.display = 'none';
		/*anime({
			targets: oel,
			translateX: 1000,
			direction: 'reverse',
			easing: 'easeOutQuad'
		});*/
		nel.style.display = 'block';
		anime({
			targets: nel,
			translateX: 1000,
			easing: 'linear',
			direction: 'reverse'
		});

		setTimeout(function(){
			slide(next);
		},5000);
	}



