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
	
	var slideStep = 0;
	
	var incentivos = [];

	//setup();
	
	var	lopCont = 0;
	var inCount = 0;
		
	next4incs.on('change', (newVal, oldVal) => {
		if (newVal)
		{
			lopCont = 0;
			incentivos = [];
			newVal.forEach(element => {
				incentivos.push(element);
			});
		}
	});
	
	setTimeout(() => {
		donateTotal.on('change', (newVal, oldVal) => {
			if (newVal)
			{
				var donateDiv = document.getElementById("donate"); 
				if(donateDiv) donateDiv.innerHTML = newVal;
			}
		});

		next4runs.on('change', (newVal, oldVal) => {
			if (newVal != oldVal)
			{
				setRuns(newVal);
			}
		});
		
		loop();

	}, 2600);
	
	function loop() { 
		var nextRuns = document.getElementById("nextRuns"); 
		var nextIncs = document.getElementById("nextIncs"); 
		var nextRunsAlert = document.getElementById("nextRunsAlert"); 
		var nextIncsAlert = document.getElementById("nextIncsAlert"); 
		if (nextRuns) nextRuns.style.display = "none";
		if (nextIncs) nextIncs.style.display = "none";
		if (nextRunsAlert) nextRunsAlert.style.display = "none";
		if (nextIncsAlert) nextIncsAlert.style.display = "none";
		switch (lopCont) { 
			case 0:
			if (nextRunsAlert) nextRunsAlert.style.display = "flex";
				timer = 5000;
				lopCont = 1;
				setTimeout(() => {
					loop();
				}, timer);	
				break;
			case 1:
			if (nextRuns) nextRuns.style.display = "flex";
				timer = 15000;
				lopCont = 2;
				if (incentivos.length == 0) { 
					lopCont = 0;
				}
				setTimeout(() => {
					loop();
				}, timer);
				break;	
			case 2:
				if (nextIncsAlert) nextIncsAlert.style.display = "flex";
				timer = 5000;
				lopCont = 3;
				setTimeout(() => {
					loop();
				}, timer);
				break;
			case 3:
				if (nextIncs) nextIncs.style.display = "flex";
				loopIncs()	
			break;
				
		}
	}
	function loopIncs() { 
		document.getElementById("incBox1").style.display = "none";
		document.getElementById("incBox2").style.display = "none";
		document.getElementById("incBox3").style.display = "none";
		document.getElementById("incBox4").style.display = "none";
		loadIncs(inCount)
	}
	
	function loadIncs(count) { 	
		for (var i = 0; i < incentivos.length; i++){
			if (i == count) {
				if (incentivos[i].type == "Arc") {
					document.getElementById("incBox1").style.display = "inline-block";
					var incGame = document.getElementById("incGame1");
					var incname = document.getElementById("incName1");
					var incVal = document.getElementById("incVal1");
					incGame.innerHTML = incentivos[i].game;
					incname.innerHTML = incentivos[i].name;
					if (incVal) incVal.innerHTML = (incentivos[i].valueA ? incentivos[i].valueA : "0") + " / " + incentivos[i].valueB;
				}
				if (incentivos[i].type == "Mod") {
					var box = 1
					document.getElementById("incBox1").style.display = "inline-block";
					var incGame = document.getElementById("incGame1");
					var Incname = document.getElementById("incName1");
					var incVal = document.getElementById("incVal1");
					incGame.innerHTML = incentivos[i].game;
					Incname.innerHTML = incentivos[i].name;
					if (incVal) incVal.innerHTML = "";
					box += 1;
					for (var j = 0; j < incentivos[i].options.length; j++) {
						if (incentivos[i].options[j].name != "") {
							document.getElementById("incBox" + box).style.display = "inline-block";
							var incGame2 = document.getElementById("incGame" + box);
							var incname2 = document.getElementById("incName" + box);
							var incVal2 = document.getElementById("incVal" + box);
							incGame2.innerHTML = incentivos[i].options[j].name;
							incname2.innerHTML = "";
							if (incVal2) incVal2.innerHTML = (incentivos[i].options[j].valueA ? incentivos[i].options[j].valueA : "0");
							box += 1;
						}
					}
				}
				if (i == incentivos.length - 1) {
					inCount = 0;
					lopCont = 0;
					loop();
				} else {
					inCount += 1;
					setTimeout(() => {
						loopIncs();
					}, 6000);
				}
			}
		}
	}



	
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
		for (var i = 0; i < 4; i++){
			var nextBox = document.getElementById("nextBox" + (i + 1));
			if (nextBox) nextBox.style.display = "inline-block";

			if (value[i]) {
				var nextRunName = document.getElementById("nextRunName" + (i + 1));
				var nextRunCat = document.getElementById("nextRunCat" + (i + 1));
				nextRunName ? nextRunName.innerHTML = value[i].game.includes("Jogo Extra") ? value[i].game.substring(0, 12) : value[i].game : null;
				nextRunCat ? nextRunCat.innerHTML = value[i].game.includes("Jogo Extra") ? "Categoria Extra" : value[i].category: null; 
			} else { 
				if (nextBox) nextBox.style.display = "none";
			}
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



