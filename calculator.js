
		function onoff(functions){
			//spacebar
			document.onkeydown =function(event) {
				if(event.keyCode === 32){					
					event.preventDefault(); //prevent other key getting entered
					if(document.querySelector("#display").disabled==true){
						document.querySelector("#display").disabled=false;
						document.querySelector("#display").value ="0";
					}
					else {
						document.querySelector("#display").disabled=true;
						document.querySelector("#display").value ="OFF";
					}
				}
				equation=[]; //empty equation
				number=""; 
			}

				//onoff button
			functions[0].onclick = function() {
				if(document.querySelector("#display").disabled==true){
						document.querySelector("#display").disabled=false;
						document.querySelector("#display").value ="0";
					}
				else {
					document.querySelector("#display").disabled=true;
					document.querySelector("#display").value ="OFF";
				}
				equation =[];//reset equation
				number="";
			}
		}
		
	
	
		function clear(functions) {
			//AC button
			functions[1].onclick = function() {
				if(document.getElementById("display").disabled==false){
					equation =[];
					number="";
					document.getElementById("display").value ="0";
				}
			}
		}

		function compute() {
			if(isNaN(equation[equation.length-1]) == false) {
								
				left=equation[0];
				operator=equation[1];
				right=equation[2];
				for(var i=1; i<equation.length;i+=2){
					operator=equation[i];
					right=equation[i+1];
					if (operator === "+") {
							result=left+right;
					}
					else if (operator === "-") {
						result=left-right;
					}
					else if (operator === "x"){
							result=left*right;
					}
					else if (operator === "/") {
							if(right ==0 ||right=="0"){
								document.getElementById("display").value = "infinity";

							}
							else {
								result=left/right;
							}
					}
					left=result; //so we can compute multiple operations
				}//end for loop
				if (!isNaN(result)){
					document.getElementById("display").value = result;
				}

				equation=[];
			}//end if statement
		}

		function display(numbers) {
			for(var i=0;i<numbers.length;i++){
				numbers[i].onclick = function(){
					if(document.getElementById("display").disabled==false){
						if(this.innerHTML=="." || !isNaN(this.innerHTML) ){
							number += this.innerHTML;
							//deletes leading zero
							if( number.length ==1 && number.charAt(0)=="0"){
								number ="";
							}
							else {						
								document.getElementById("display").value =number;
							}	
						}
						else { //operations
							if(number !=""){
								var numFloat = parseFloat(number); 
								equation.push(numFloat);
							}
							number="";
							if(this.innerHTML != "=") {
								equation.push(this.innerHTML);
							}
							
							while(equation[0] =="+" || equation[0] =="-" || equation[0] =="x" ||equation[0] =="/" ){
								equation.shift();
							}

							//erase two signs in a row
							if (isNaN(equation[equation.length -2])== true && isNaN(equation[equation.length -1])){
								equation[equation.length-2]=equation[equation.length-1];
								equation = equation.slice(0,-1);
							}
							//3 things in equation and = was pressed
							//this means we have 2 numbers and an operator
							if (equation.length>2 && this.innerHTML == "="  ) {
									compute();
							}
								
						}
					}
				}
			}
		}
		function main() {
			var result =0.0;
			var left="";
			var right="";
			var operator="";
			var number ="";
			var equation = [];
			var functions =document.querySelectorAll(".col-6"); //turns this into an array
			var numbers =document.querySelectorAll(".col-3"); //turns into an array
			onoff(functions);
			clear(functions);
			display(numbers);
		}
		main();
