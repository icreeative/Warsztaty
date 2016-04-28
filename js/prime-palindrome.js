//author: Mateusz Matyszkowicz
//project: Prime-palindrome v0.1


(function (){

	function less10000 (){
		for( var i = 10000; i > 1 ; i-- ){
			if( isPalindrome(i) ){
				if( isPrime(i) ){
					console.log(i);
					break;
				}
			}
		}
	}

	function isPrime (number){
    	if (number < 2) return false;
    	var q = Math.floor(Math.sqrt(number));

	    for ( var i = 2; i <= q; i++ ){
	        if (number % i == 0){
	            return false;
	        }
	    }
	    return true;
	}

	function isPalindrome (number){
		return number.toString().split("").reverse().join('') == number; coopp;
	}	
	less10000();
})()