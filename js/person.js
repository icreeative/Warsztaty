//author: Mateusz Matyszkowicz
//project: Person tasks

(function (){
	var Person = function(){};
	
	Person.prototype.task = [];

	//Funkca dokładająca na koniec tablicy task[] nowe obiekty.
	Person.prototype.addTask = function(name, status){
		var task = { 'name' : name, 'completed' : false | status};
		this.task.push(task);
	};

	//Funkcja usuwająca i zwracająca ostatni task z listy.
	Person.prototype.removeTask = function(){
		 return this.task.pop();
	};
	//Funkcjia umozliwaiająca zmiane statusu dla task
	Person.prototype.changeTaskStatus = function( taskID, status ){
		this.task[taskID].completed = status;
	}

	Person.prototype.displayTask = function (task){
		console.log(task.name + " is " + (task.completed ? 'completed' : 'unfinished'));
	}

	//Wysiwtla wszystkie obiekty z tablicy task.
	Person.prototype.showAllTask = function(){
		this.task.forEach(this.displayTask);
	}

	//Wypisuje zadania w zależności od wybranego statusu 0 - unfinished, 1 - completed
	Person.prototype.showTasks = function ( status ){
		if(status)
			this.task.filter(isCompleted).forEach(this.displayTask);
		else
			this.task.filter(isUnFinished).forEach(this.displayTask);
	}

	//Filtry dla Array.protoype.filter
	isCompleted = function(element){
		return  (element.completed == true);
	}

	isUnFinished = function(element){
		return (element.completed == false);
	}


	//Testowanie 
	var Mat = new Person();
	Mat.addTask("Task1", false);
	Mat.addTask("Task2", false);
	Mat.addTask("Task3", false);
	Mat.addTask("Task4", true);
	Mat.addTask("Task5", false);
	Mat.addTask("Task6", true);
	Mat.changeTaskStatus(0, 1);
	Mat.showTasks(true);
})()