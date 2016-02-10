// define DOM elements
var userHand = document.getElementById("userHand"),
		userMove = document.getElementById("userMove"),
		computerHand = document.getElementById("computerHand"),
		computerMove = document.getElementById("computerMove");

// define inital class names of player hands
var userChoiceDefaultClass = userMove.className,
		computerChoiceDefaultClass = computerMove.className;

// define inital length of variable class names of player hands
var userChoiceClassLength = userMove.className.length,
		computerChoiceClassLength = computerMove.className.length;

// function to play a round of the game 
// fired when user chooses move (e)
var playGame = function(e) {
	// update active button class
	var allButtons = document.getElementsByTagName("button"),
			activeButton = document.getElementById(e);
	for (i = 0; i < allButtons.length; i++) {
		newClass = allButtons[i].className.replace(" active-button","");;
		allButtons[i].className = newClass;
	}
	activeButton.className += " active-button";

	// define DOM elements
	var userScore = document.getElementById("userScore"),
			computerScore = document.getElementById("computerScore"),
			roundCounter = document.getElementById("roundCounter"),
			roundResult = document.getElementById("roundResult");

	// reset player hands
	userMove.className = userChoiceDefaultClass;
	computerMove.className = computerChoiceDefaultClass;

	// reset round result
	roundResult.innerHTML = "&nbsp;";

	// define player moves
	var userChoice = e,
			computerChoice = createComputerMove(Math.random());

	// define round activity
	var round = {
		number: trackRound(),
		move : {
			user: e,
			computer: computerChoice,
		},
		winner: findWinner(userChoice, computerChoice),
		result: translateResult(findWinner(userChoice, computerChoice)),
		score: {
			user: userScore.innerHTML,
			computer: computerScore.innerHTML,
		},
	}
	console.log(round);

	// increase round counter
	roundCounter.innerHTML = "Round " + round.number;

	// update user hand
	// userMove.innerHTML = "You chose " + round.move.user;
	userMove.classList.add("choice--" + userChoice);
	
	// update computer hand
	// computerMove.innerHTML = "The computer chose " + round.move.computer;
	computerMove.classList.add("choice--" + computerChoice);
	addShake();
	setTimeout(function(){
		resetHands();
		
		// show result and recalculate score
		roundResult.innerHTML = round.result;
		if (round.winner === "user") {
			userScore.innerHTML = keepScore(round.score.user, 1);
		} 
		else if (round.winner === "computer") {
			computerScore.innerHTML = keepScore(round.score.computer, 1);
		}
	}, 650);
}

var resetHands = function() {
	userMove.classList.remove("shaking");
	computerMove.classList.remove("shaking");
}

var addShake = function() {
	userMove.classList.add("shaking");
	computerMove.classList.add("shaking");
}

// Generate random computer choice
var createComputerMove = function(randomNum) {
	var numberObj;
	if (randomNum < 0.34) {
		numberObj = "rock";
	} else if (randomNum <= 0.67) {
		numberObj = "paper";
	} else if (randomNum > 0.67) {
		numberObj = "scissor";
	}
	return numberObj;
}

// Determine the winner
var findWinner = function(userChoice, computerChoice) {
  if (userChoice === computerChoice){
    return "tie";
  } 
  else if (userChoice === "rock") {
    if (computerChoice === "scissor") {
      return "user";
    } else {
      return "computer";
    }
  } 
  else if (userChoice === "paper") {
    if (computerChoice === "rock") {
      return "user";
    } else {
      return "computer";
    }
  } 
  else if (userChoice === "scissor") {
    if (computerChoice === "rock") {
      return "computer";
    } else {
      return "user";
    }
  }
}

// Translate game result to text
var translateResult = function(feedback) {
	if (feedback === "user") {
		return "You win!";
	} 
	else if (feedback === "computer") {
		return "You lose!";
	} 
	else if (feedback === "tie") {
		return "It's a tie!";
	}
}

// Keep track of how many rounds are played
var trackRound = function() {
	var roundNum = roundCounter.innerHTML;
	if (roundCounter.innerHTML === "First Round") {
		roundNum = "1";
	} else {
		roundNum = roundNum.substr(5);
		roundNum++;
	}
	return roundNum;
}

// Increase score of winner
var keepScore = function(score, inc) {
	return parseInt(score) + inc;
	// console.log(parseInt(score) + inc);
}

var waitSeconds = function(iMilliSeconds) {
  var counter= 0, 
    start = new Date().getTime(), 
    end = 0;
  while (counter < iMilliSeconds) {
    end = new Date().getTime();
    counter = end - start;
  }
}
