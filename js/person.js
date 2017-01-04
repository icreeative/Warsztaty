var Person = (function(){
    var tasks = [
        { name: "Compl1", complete: false },
        { name: "Compl2", complete: false },
        { name: "Compl3", complete: false },
        { name: "Compl4", complete: true },
        { name: "Compl5", complete: true },
        { name: "Compl6", complete: true }
    ];

	//Funkcja usuwająca i zwracająca ostatni task z listy.
	removeTask = function( id){
         return tasks.splice(id,1);
	};

	//Wypisuje zadania w zależności od wybranego statusu 0 - unfinished, 1 - completed
	getFinishedTasks = function (){
		return tasks.filter(task => task.complete)
	}

    getAllTasks = function(){
        return tasks;
    }

    return{
        finishedTasks: getFinishedTasks,
        removeTask: removeTask,
        allTasks: getAllTasks
    }
	//Testowanie 
})();

var P = Person;
P.removeTask(0);
console.log(P.finishedTasks());

//console.log(P.allTasks());
