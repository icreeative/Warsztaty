//author: Mateusz Matyszkowicz
//project: ATM Machine

(function(){
	//Bankomat
	var ATMMachine = function(){
		var cashLimit = 10;
		var inProcess = false;
		var readerInfo = [
			{ status : "Insert card", color : "#7A8288" },
			{ status : "Card in", color : "#62C462" },
			{ status :"Card out", color : "#EE5F5B" }
		];
		var card ;

		//funkcie i stany przypisane do przyciskow ( lewy panel )
		function functionToPanel(panel, func){
			if(Atm.inProcess){
				functionButton[panel].style.background = functionPanel[func].color;
				functionButton[panel].innerHTML = functionPanel[func].status;
				functionButton[panel].onclick = functionPanel[func].func;
			}
		}

		var functionPanel = [
			{  status : "APPLY", color : "#6DB8F5",func : function(){
				var pin = screenAtm.querySelector("input").value;
				if(Atm.card.getPin() == pin)
				{ // corect pin
					screenAtm.innerHTML = "What you need?";
					functionToPanel(0,3);
					functionToPanel(1,4);
					functionToPanel(2,5);
				}
				else{// incorect pin
					PKO.blockCard(Atm.card);
					cardOut("INCORECT PIN CARD BACK... BLOCKING");
				}
			}},
			{  status : "CARD BACK", color : "#EE5F5B", func : function(){
				if( Atm.inProcess ){
					//Operation finishing work of atm

					//Blowkowanie możliwości wciskania buttonow po wybraniu Card Back
					for( var i = 0; i < functionButton.length; i++ ){
						functionToPanel(i,2);
					}
					cardOut("Wait a bank system finish work")
					setTimeout(init, 2500);
				}	
			}},
			{	status : "", color : "none", func : null},
			{  status : "CURRENT BALANCE", color: "#7A8288", func : function(){
					screenAtm.innerHTML = "Account balance: " + Atm.card.getBalance();
					functionToPanel(0,0);
					functionToPanel(1,6);
					functionToPanel(2,2);
			}},
			{  status : "WITHDRAW MONEY", color: "#7A8288", func : function(){
					screenAtm.innerHTML = "Money: ";
					input = document.createElement("input");
					input.className += "input";
					screenAtm.appendChild(input);
					functionToPanel(0,0);
					functionToPanel(1,6);
					functionToPanel(2,2);
					functionButton[0].onclick = function(){
						value = isNumber(input.value) ? parseInt(input.value) : false;
						if( value )
							if( value <= Atm.card.getBalance() && value > 0 && value <= Atm.cashLimit){
								Atm.chargeAtm(-value);	
								Atm.card.setBalance(-value);
							}else{
								errMsg.innerHTML = "Nie masz wystarczajacych srodkow na koncie lub niedozwolona operacja";
							}
					}
			}},
			{  status : "CHARGE ACCOUNT", color: "#7A8288", func : function(){
					screenAtm.innerHTML = "Money: ";
					input = document.createElement("input");
					input.className += "input";
					screenAtm.appendChild(input);
					functionToPanel(0,0);
					functionToPanel(1,6);
					functionToPanel(2,2);
					functionButton[0].onclick = function(){
						var value = isNumber(input.value) ? parseInt(input.value) : false;;
						if( value )
							if (value > 0){
								Atm.chargeAtm(value);	
								Atm.card.setBalance(value);
							} 
							else errMsg.innerHTML = "Money coudn't be less than 0"
						else errMsg.innerHTML = "Wrong input";
					}
			}},
			{  status : "BACK", color: "#62C462", func : function(){
					errMsg.innerHTML = "";
					screenAtm.innerHTML = "";
					functionToPanel(0,3);
					functionToPanel(1,4);
					functionToPanel(2,5);
			}}
		];

		cardBlocked = function(){
			cardOut("Your card is blocked!");
		};

		cardOut = function( error ){
			cardReader.innerHTML = readerInfo[2].status;
			cardReader.style.background = readerInfo[2].color;
			screenAtm.innerHTML = error;
			setTimeout( init ,1500);
		}

		getPin = function(){
			functionToPanel(3,1);
			screenAtm.innerHTML = "Your PIN numbers<br />";
			input = document.createElement("input");
			input.className += "inputPin";
			input.setAttribute("maxlength", "4");
			screenAtm.appendChild(input);
			//Aktywacja przycisku APPLY
			functionToPanel(0,0);
		}

		return{
			readCard : function(card){	
				this.card = card;
				this.inProcess(1);
				cardReader.innerHTML = this.readerInfo[1].status;
				cardReader.style.background = this.readerInfo[1].color;
				if( card.getStatus() ) {
					getPin();
				}
				else{
					this.inProcess(0);
					cardBlocked();					
				}
			},
			chargeAtm : function(cash){
				this.cashLimit += cash;
				return this.cashLimit;
			},
			inProcess : function(status){
				inProcess = status;
				atmStatus.innerHTML = (!inProcess || this.card.getStatus()) ? "in process..." : "ready...";
				return inProcess;
			},
			readerInfo : readerInfo, 
			functionToPanel : functionToPanel,
			cashLimit : cashLimit
		}
	}

	//Karta bankomatowa
	var Card = function(id, pin, balance, state){
		var id = id;
		var balance = 0 | balance;
		var pin = pin;
		var status = state | false;

		return{
			getID : function(){
				return id;
			},
			getPin: function(){
				return pin;
			},
			getBalance : function(){
				return balance;
			},
			getStatus : function(){
				return status;
			},
			setBalance : function(cash){
				balance += cash;
			},
			setStatus : function(state){
				status = state;
			}
		}
	}

	//System bankowy
	var BankSystem = function(){
		var cardList = [];		
		return{
			addCard : function( card ){
				cardList.push(card);
				return card;
			},
			showCardList : function(){
				return cardList;
			},
			cardIn : function( card ){
				for( var i = 0; i < cardList.length; i++)
					if( cardList[i].id == card.getId())
					return true; 
			},
			blockCard : function(card){
				var c = cardList.indexOf(card);
				cardList[c].setStatus(false);
			},
			generateCard : function(){
				var generateId = Math.floor(Math.random()*10000000)+1;
				var generatePin = "".concat(Math.floor(Math.random()*10)).concat(Math.floor(Math.random()*10)).concat(Math.floor(Math.random()*10)).concat(Math.floor(Math.random()*10));
				return this.addCard( Card(generateId, generatePin, 0, true) );
			},
			addAtm : function(){
				return ATMMachine();
			}
		}
	}

	var PKO = BankSystem();

	var Card1 = PKO.generateCard();
	var Card2 = PKO.generateCard();
	var Card3 = PKO.generateCard();
		
	var Atm = PKO.addAtm();

	var cardReader = document.querySelector("#cardReader");
	var screenAtm = document.querySelector("#screenAtm");
	var errMsg = document.querySelector(".error-message");
	var atmSatus = document.querySelector("#atmStatus");
	var functionButton = document.querySelectorAll(".functionButton");
	var log = "";

	init = function(){
		//Resetowanie bocznego panelu to stanu początkowego
		for( var i = 0; i < functionButton.length; i++){
			Atm.functionToPanel(i,2);
		}
		screenAtm.innerHTML = "Insert your card";
		atmStatus.innerHTML = "ready..";
		cardReader.innerHTML = Atm.readerInfo[0].status;
		cardReader.style.backgroundColor = Atm.readerInfo[0].color;
		cardReader.onclick = cardReaderActive;
	}

	cardReaderActive =  function(){
		//Pin wlozonej karty wyswietlony w alercie
		alert(Card1.getPin());
		Card1.setBalance(4000); // Ustawienei stanu konta
		Atm.readCard(Card1);
		//blokowanie mozliwosci ponownego wcisiniecia
		cardReader.onclick = null;
	}

	isNumber = function(string){
		return !isNaN(parseFloat(string)) && isFinite(string);
	}
})();