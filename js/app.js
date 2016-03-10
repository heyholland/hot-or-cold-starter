$(document).ready(function () {

    /* Global Variables */
    var secretNumber = generateRandomNumber(1, 100);

    var oldGuess = 0;

    //set the maximum number of guesses
    var counter = 30;
    $('#count').text(counter);

    //New Game function
    function newGame() {
        document.location.reload(true);
    }

    //Random Number Generator
    function generateRandomNumber(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    //Function to count the number of guesses
    function showGuessCounter(counter) {
        $('#count').text(counter);
    }

    //Displays history of guesses
    function guessHistory(guessedNumber) {
        $('#guessList').append('<li>' + guessedNumber + '</li>');
    }

    //Validates number, otherwise "Not A Number"
    function validation(guessNumber) {
        //console.log("Guessed Number: " + guessedNumber);

        //make sure it is a number rather than not a number
        if (isNaN(guessedNumber)) {
            alert('You must enter a number!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; //prevents from looping and doing anything else
        }

        //if the guessNumber is less than 1 OR || more than 100
        else if ((guessedNumber < 1) || (guessedNumber > 100)) {
            alert('Please guess a number between 1 to 100!');
            //reset the guess value to blank
            $('#userGuess').val('');
            return false; //prevents from looping and doing anything else
        }

        //if the number of counter guesses is smaller than 0 it ends the game
        if (counter <= 0) {
            $('#feedback').text('Game Over!');
            document.getElementById("userGuess").disabled = true;
            document.getElementbyId("guessButton").disabled = true;
            alert('The secret number was ' + secretNumber + '! Better luck next time!');
        }
    }

    //Function to provide hot warm cold feedback to user
    function guessFeedback(secretNumber, guessedNumber) {
        //shows the absolute value for difference between secret number and guessed number
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('Ice Cold!');
        } else if (difference >= 30 && difference <= 49) {
            $('#feedback').text('Cold!');
        } else if (difference >= 20 && difference <= 29) {
            $('#feedback').text('Warm!');
        } else if (difference >= 10 && difference <= 19) {
            $('#feedback').text('Hot!');
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Very Hot!');
        } else {
            $('#feedback').text('You got it! Well done!');
            document.getElementById("userGuess").disabled = true;
            document.getElementbyId("guessButton").disabled = true;
        }
    }

    // Function to provide relative feedback to the user
    function relativeFeedback(secretNumber, oldGuess, newGuess) {
        var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
        var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
        if (newDiff > oldDiff) {
            $('#relative-feedback').text('You are colder than the last guess!');
        } else if (newDiff === oldDiff) {
            $('#relative-feedback').text('You are as far as your previous guess!');
        } else {
            $('#relative-feedback').text('You are hotter than the last guess!');
        }
    }


    /* Function usage */

    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {
        //gets value that user added in the input box
        var guessedNumber = $('#userGuess').val();

        //guessedNumber is stored in the newGuess variable too and adds to "Hotter" or "Colder" functionality
        var newGuess = guessedNumber;

        //runs validation on guessedNumbers
        validation(guessedNumber);

        //if the user has more than 1 guess in the guess history
        if ((oldGuess! == 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
            //caller for relative feedback function defined above
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }

    });

    $(document).on('keypress', function (e) {
        //on enter
        if (e.which == 13) { //what's the 13 for?
            //if the page refreshes when you submit the form, default action will not be triggered
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10); //10 is for...?
            var newGuess = guessedNumber;

            //validate all numbers
            validation(guessedNumber);

            //just repeating the same relative feedback variable as 'click' function and applying it to a 'keypress' too
            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) { //why single paranthesis?
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            //re-update the old guess with new value
            oldGuess = newGuess;
        }
    });

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });
});
