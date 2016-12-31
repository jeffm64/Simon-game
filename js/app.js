jQuery(document).ready(function() {
  
  //hides win and wrong sign by default
  $(".win").hide();
  $(".wrong").hide();
  
  //variables for player sequence and computer sequence
  var playerSequence = [];
  var cpuSequence = [];
  var colors = ["green", "red", "yellow", "blue"];
 
  //variable for playing the sequence in a timed rhythmn
  var sequenceNum = 0;
  
  //for activating/deactivating strict mode
  var strict = false;
  
  //for determining if user matched the computer's sequence
  var correctSequence;
  
  //if false then it's computer sequence, otherwise its the players turn
  var turn = false;
  
  //variable for the random number that equals to a random color each sequence
  var randomPick;
  
  //variable for the sequence rhythmn
  var timeInterval;
  
  //variables for adding rhythmn sequences to arrays
  var count = 1;
  var playerCount = 0;
  var cpuCount = 0;
  var greenCount = "g";
  var redCount = "r";
  var yellowCount = "y";
  var blueCount = "b"; 
  
  //functions for the effects the buttons do with a rhythmn
  function greenEffects() {
    //plays sound and lights up
    var audio1 = $(".green-sound")[0];
    audio1.play();
    $(".green").addClass("green-on");
    //if pressed on the players turn it starts memorizing their sequence
    if(turn === true) {
      playerCount++;
      playerSequence.push(playerCount + greenCount);
      sequenceMatch();
      if(correctSequence === true && playerCount === count) {
        count++;
        //if you beat 20 sequences you win and game resets
        if (count === 21) {
          $(".win").show();
          setTimeout(function() {
            reset();
            cpuSequencer();
          }, 1000);
        }
        $(".counter").text(count);
        cpuSequencer();
      }
    }
  };
  
  function redEffects() {
    //plays sound and lights up
    var audio2 = $(".red-sound")[0];
    audio2.play();
    $(".red").addClass("red-on");
    //if pressed on the players turn it starts memorizing their sequence
    if(turn === true) {
      playerCount++;
      playerSequence.push(playerCount + redCount);
      sequenceMatch();
      if(correctSequence === true && playerCount === count) {
        count++;
        //if you beat 20 sequences you win and game resets
        if (count === 21) {
          $(".win").show();
          setTimeout(function() {
            reset();
            cpuSequencer();
          }, 1000);
        }
        $(".counter").text(count);
        cpuSequencer();
      }
    }
    
  };
  
  function yellowEffects() {
    //plays sound and lights up
    var audio3 = $(".yellow-sound")[0];
    audio3.play();
    $(".yellow").addClass("yellow-on");
    //if pressed on the players turn it starts memorizing their sequence
    if(turn === true) {
      playerCount++;
      playerSequence.push(playerCount + yellowCount);
      sequenceMatch();
      if(correctSequence === true && playerCount === count) {
        count++;
        //if you beat 20 sequences you win and game resets
        if (count === 21) {
          $(".win").show();
          setTimeout(function() {
            reset();
            cpuSequencer();
          }, 1000);
        }
        $(".counter").text(count);
        cpuSequencer();
      }
    }
  };
  
  function blueEffects() {
    //plays sound and lights up
    var audio4 = $(".blue-sound")[0];
    audio4.play();
    $(".blue").addClass("blue-on");
    //if pressed on the players turn it starts memorizing their sequence
    if(turn === true) {
      playerCount++;
      playerSequence.push(playerCount + blueCount);
      sequenceMatch();
      if(correctSequence === true && playerCount === count) {
        count++;
        //if you beat 20 sequences you win and game resets
        if (count === 21) {
          $(".win").show();
          setTimeout(function() {
            reset();
            cpuSequencer();
          }, 1000);
        }
        $(".counter").text(count);
        cpuSequencer();
      }
    }
  };
  
  //resets the game
  function reset() {
    count = 1;
    playerCount = 0;
    cpuCount = 0;
    $(".counter").text(count);
    $(".win").hide();
    $(".wrong").hide();
    clearInterval(timeInterval);
    $(".btn").addClass("unclickable");
    sequenceNum = 0;
    turn = false;
    strict = false;
    $(".strict").removeClass("on");
    playerSequence = [];
    cpuSequence = [];
  };
  
  function sequence() {
      //every second it pushes coresponding button for the array, disallows player clicking until finished
      setTimeout(function() {
           $(".wrong").hide();
          }, 1000);
      turn = false;
      timeInterval = setInterval(function() {
        $(".btn").addClass("unclickable");
        if (cpuSequence[sequenceNum].slice(1) === "g") {
          greenEffects();
          setTimeout(function() {
           $(".btn").removeClass("green-on red-on yellow-on blue-on");
          }, 1400);
        }
        else if (cpuSequence[sequenceNum].slice(1) === "r") {
          redEffects();
          setTimeout(function() {
           $(".btn").removeClass("green-on red-on yellow-on blue-on");
          }, 1400);
        }
        else if (cpuSequence[sequenceNum].slice(1) === "y") {
          yellowEffects();
          setTimeout(function() {
           $(".btn").removeClass("green-on red-on yellow-on blue-on");
          }, 1400);
        }
        else if (cpuSequence[sequenceNum].slice(1) === "b") {
          blueEffects();
          setTimeout(function() {
           $(".btn").removeClass("green-on red-on yellow-on blue-on");
          }, 1400);
        }
        sequenceNum++;
        //when the sequence reaches current count, it stops and allows player button clicking
        if(sequenceNum === count) {
          setTimeout(function() {
           $(".btn").removeClass("unclickable");
          }, 1000);
          sequenceNum = 0;
          turn = true;
          clearInterval(timeInterval);
        }
      }, 1000);
      setTimeout(function() {
         $(".btn").removeClass("green-on red-on yellow-on blue-on");
       }, 1400);
    }
  
  //picks random colors, puts them in a sequence array, and shows sound and lights in proper rhythmn
  function cpuSequencer() {
    
    playerCount = 0;
    playerSequence = [];
    //picks buttons only up to what the current count is
    while(cpuCount < count) {
      //4 numbers represent the 4 colors
      randomPick = 1 + Math.floor(Math.random() * 4);
      for(let i = 0; i < colors.length; i++) {
        //picks random color, and if it has that class, activates that colors effect and sequence to the computer rhythmn
        if (randomPick === i+1) {
          randomPick = colors[i]
          if ($("." + randomPick).hasClass("green")) {
              cpuCount++
              cpuSequence.push(cpuCount + greenCount);
            
          }
          else if ($("." + randomPick).hasClass("red")) {
              cpuCount++
              cpuSequence.push(cpuCount + redCount);
          }
          else if ($("." + randomPick).hasClass("yellow")) {
              cpuCount++
              cpuSequence.push(cpuCount + yellowCount);
          }
          else if ($("." + randomPick).hasClass("blue")) {
              cpuCount++
              cpuSequence.push(cpuCount + blueCount);
          }
        } else {}
      }
      console.log(cpuSequence);
    }
    sequence();
    
  }//end of function
  
  function sequenceMatch() {
    

       //loopa through all sequences seeing if any user doesn't match with cpu
       for(let i = 0; i < playerSequence.length; i++) {
        correctSequence = false;
        if(playerSequence[i] !== cpuSequence[i]) {
          //if strict is off user sees sequence again and can retry, otherwise if it's on they fail and game resets
          if(strict === false) {
            $(".wrong").show();
            playerSequence = [];
            playerCount = 0;
            sequence();
            break;
          }
          else if(strict === true) {
            $(".wrong").show();
            $(".btn").removeClass("green-on red-on yellow-on blue-on");
            setTimeout(function() {
              reset();
              cpuSequencer();
            }, 1000);
          }
        }
        //if all user sequennces match cpu then it's set to true
        else {
          correctSequence = true;
        }
       }
  };
  
  //starts game or resets game if it's already started
  $(".start").click(function() {
    reset();
    $(".start").addClass("on");
    cpuSequencer();
    
  });
  
  //makes the game strict setting
  $(".strict").click(function() {
    $(".strict").toggleClass("on");
    if (strict === false) {
      strict = true;
    }
    else if (strict === true) {
      strict === false;
    }
  });
  
  //activates respectively clicked button, gives its effect and input to sequence
  $(".btn").mousedown(function() {
    if ($(this).hasClass("green")) {
      greenEffects();
    }
    else if ($(this).hasClass("red")) {
      redEffects();
    }
    else if ($(this).hasClass("yellow")) {
      yellowEffects();
    }
    else if ($(this).hasClass("blue")) {
      blueEffects();
    }
  });
  
  //removes light effect when you unlick the mouse
  $(".btn").mouseup(function() {
    $(this).removeClass("green-on red-on yellow-on blue-on");
  })  
  
  
});