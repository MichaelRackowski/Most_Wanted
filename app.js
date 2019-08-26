"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).

*/
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchByCriteria(people);
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
}

function searchByCriteria(people){

  let userInput = prompt("what would you like to search?[gender][eyecolor][dob][weight][height][occupation]")
  switch(userInput){
    case "gender":
    let gender = searchByGender(people);
    break;
    case "eyecolor":
     let  eyecolor = searchByEyeColor(people);
    break;
    case "dob":
     let dob = searchByDob(people);
    break;
    case "weight":
    let weight =  searchByWeight(people);
    break;
    case "height":
    let height = searchByHeight(people);
    break;
    case "occupation":
    let occupation =  searchByOccupation(people);
    break;
    default:
    window.alert("Please enter a corresponding Criterion.");
    searchByCriteria(people);
    return;

  }
  return app(people);
}

function searchByGender(people){
  let gender = promptFor("male or female?",chars);
   let foundPerson = people.filter(function(person){
   if(person.gender == gender){
      return true;
    }
    else{
      return false;
    }
  })
   displayPeople(foundPerson)
    return foundPerson;
}

function searchByEyeColor(people){
  let eyecolor = promptFor("What is their eyecolor?",chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor == eyecolor){
      return true;
    }
    else{
      return false;
    }
  })
    displayPeople(foundPerson)
   return foundPerson;
}

function searchByDob(people){
  let dob = promptFor("What is their Date of Birth?",chars);
  let foundPerson = people.filter(function(person){
    if(person.dob == dob){
      return true;
    }
    else{
      return false;
    }
  })
    displayPeople(foundPerson)
   return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("what is their weight?",chars);
    let foundPerson = people.filter(function(person){
      if(person.weight == weight){
        return true;
      }
      else{
        return false;
      }
    })
      displayPeople(foundPerson)
        return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("what is their height",chars);
    let foundPerson = people.filter(function(person){
      if(person.height == height){
        return true;
      }
      else return false;
    })
      displayPeople(foundPerson)
      return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("what is their occupation",chars);
    let foundPerson = people.filter(function(person){
      if(person.occupation == occupation){
        return true;
      }
      else return false;
    })
    displayPeople(foundPerson)
    return foundPerson;
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    let info = displayPerson(person);
     break;
    case "family":
    let family = searchForFamily(person,people);
    break;
    case "descendants":
    let descendants = 0
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender: "  + person.gender + "\n";
  personInfo += "eyecolor: " + person.eyecolor + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "occupation :" + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function searchForFamily(foundPerson, people){ 
  let foundFamily = people.filter(function(person){
    if(person.currentSpouse === foundPerson.id){
      return true;
    }
    else if(foundPerson.parents.length === 1){
      if(foundPerson.parents[0] === person.id || foundPerson.parents[0] === person.parents[0] || foundPerson.parents[0] === person.parents[1]){
        return true;
      }
    }
    else if(foundPerson.parents.length === 2){
      if(foundPerson.parents[0] === person.id || foundPerson.parents[1] === person.id || foundPerson.parents[0] === person.parents[0] || foundPerson.parents[0] === person.parents[1] || foundPerson.parents[1] === person.parents[0] || foundPerson.parents[1] === person.parents[1]){
        return true;
      }
    }
    else{
      return false;
    }
  })
 //alert(foundFamily);
 displayPeople(foundFamily);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
