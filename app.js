"use strict"
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
     let userInput = prompt("Do you want to search by one Criteria or multiple Criterion?")
      if (userInput === "one"){
       searchResults = searchByCriteria(people);
      }
      else if (userInput === "multiple"){
      searchResults = searchByMulitpileTraits(people);
      }
      break;
      default:
    app(people); 
      break;
    }
  mainMenu(searchResults[0], people);
}
function searchByMulitpileTraits(people){
 let gender = prompt("What gender is the person you're looking for?");
 let occupation = prompt("What is the occupation of the person you're looking for?");
 let foundPerson = people.filter(function(person){
   if(person.gender == gender && person.occupation == occupation){
      return true;
    }
    else{
      return false;
    }
  })
   displayPeople(foundPerson)
    return foundPerson;
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
  let height = promptFor("what is their height?",chars);
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
  let occupation = promptFor("what is their occupation?",chars);
    let foundPerson = people.filter(function(person){
      if(person.occupation == occupation){
        return true;
      }
      else return false;
    })
    displayPeople(foundPerson)
    return foundPerson;
}
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
    displayPerson(person);
     break;
    case "family":
    let family = searchForFamily(person,people);
    displayFamily(family);
    break;
    case "descendants":
    let descendants =[];
    searchForChildren(people,person,descendants);
    displayPeople(descendants);
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
  return app(people);
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
  return foundPerson;
}
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayFamily(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " : " + person.relationship;
  }).join("\n"));
}
function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender: "  + person.gender + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "occupation :" + person.occupation + "\n";
  alert(personInfo);
}
function searchForFamily(foundPerson, people){ 
  let foundFamily = people.filter(function(person){
    if(person.currentSpouse === foundPerson.id){
      person.relationship ="Spouse";
      return true;
    }
    else if(person.id === foundPerson.parents[0]|| person.id === foundPerson.parents[1]){
      person.relationship = "Parent";
      return true;
    }
    else if(person.parents.length === 1){
      if(foundPerson.parents[0] === person.id || foundPerson.parents[0] === person.parents[0] || foundPerson.parents[0] === person.parents[1]){
       person.relationship ="Child";
        return true;
      }
    }
    else if(person.parents.length === 2){
      if(foundPerson.parents[0] === person.id || foundPerson.parents[1] === person.id || foundPerson.parents[0] === person.parents[0] || foundPerson.parents[0] === person.parents[1] || foundPerson.parents[1] === person.parents[0] || foundPerson.parents[1] === person.parents[1]){
        person.relationship = "Child";
        return true;
      }
    }
    else{
      return false;
    }
    
});
return foundFamily;
}
function searchForChildren(people, foundPerson, descendants) {
  let foundChildren = people.filter(function(person){
    if(foundPerson.id === person.parents[0]|| foundPerson.id === person.parents[1]) {
      return true; 
    }   
    else{
      return false;
    }
  });  
  if(foundChildren.length === 0) {
    return;
  }
  else {
    for(let i = 0; i < foundChildren.length; i++){
      descendants.push(foundChildren[i]);
      searchForChildren(people, foundChildren[i], descendants);
    }
  }
  return descendants;
}
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input){
  return true; 
}
