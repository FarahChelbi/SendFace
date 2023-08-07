var personLogin;
//  user's name 

  microsoftTeams.getContext(function(context) {
    
  var userDisplayName = context.userDisplayName || '';
  //var firstName = '';
  var firstName;

  if (userDisplayName) {
    // Si le nom d'affichage de l'utilisateur est disponible, récupérez le prénom en utilisant le premier mot du nom d'affichage
    firstName = userDisplayName.split(" ")[0]; 
   
  } else {
    // Si le nom d'affichage n'est pas disponible, récupérez le prénom à partir de l'adresse e-mail ou de l'identifiant principal de l'utilisateur
    var email = context.userPrincipalName || context.loginHint || '';
    firstName = email.split('@')[0];
  }
  personLogin = firstName;

  document.getElementById("username").innerHTML = "Bonjour " + firstName.toLocaleUpperCase();

});


// selection of the image to show or hide the list of texts
function toggleList(image) {
  var textLists = document.querySelectorAll('.text-list'); // Sélectionner tous les éléments de classe text-list

  // Parcourir tous les éléments de classe text-list
  textLists.forEach(function(textList) {
    // Vérifier si l'élément textList est celui associé à l'image cliquée
    if (textList.previousElementSibling === image) {
      // Afficher ou masquer l'élément textList en fonction de son état actuel
      textList.classList.toggle('show');
    } else {
      // Masquer tous les autres éléments text-list
      textList.classList.remove('show');
    }
  });
}
// passage de div1 vers div2

        function replaceDiv(item) {
      document.getElementById("div1").classList.add("hidden");
      document.getElementById("div2").classList.remove("hidden");

      const textId = item.id;
      var imageId;
      var srcValue;
      var imageTitle;
      
      if(textId=="content1" || textId=="content2"){
        var imageElement = document.getElementById('content');
        srcValue = imageElement.src;
        imageTitle = "Bien";
      }
      else if(textId == "neutre1" || textId == "neutre2" || textId == "neutre3"){
        var imageElement = document.getElementById('neutre');
        srcValue = imageElement.src;
        imageTitle = "Neutre";
      }
      else if(textId == "sad1" || textId == "sad2" || textId == "sad3" || textId == "sad4" || textId == "sad5" || textId == "sad6"){
        var imageElement = document.getElementById('sad');
        srcValue = imageElement.src;
        imageTitle = "Pas trop";
      }

      const selectedImageElement = document.getElementById("selectedImage");
      selectedImageElement.src = srcValue;
      selectedImageElement.title = imageTitle;
  
      const selectedTextElement = document.getElementById("selectedText");
      selectedTextElement.textContent = item.textContent;
      
    }
    // pour afficher div1 
    function showDiv1() {
      document.getElementById("div1").classList.remove("hidden");
      document.getElementById("div2").classList.add("hidden");
    }

// ******* cette fonction est pour la validations des zones de textes
    function limitTextarea(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }
  

function replaceDiv2(item) {
      document.getElementById("div2").classList.add("hidden");
      document.getElementById("div2-2").classList.remove("hidden");
}

// event listner on the button Valider and storing data
document.getElementById('testButton').addEventListener('click', function() {

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const textManager = document.getElementById("managerMessage").value;
  const feedbackText = document.getElementById("feedbackText").value;

  const selectedImageTitle = document.getElementById("selectedImage").title;
  const selectedText = document.getElementById("selectedText").textContent;


  const currentDate = new Date();
  const Month = currentDate.getMonth();
  const currentMonth = monthNames[Month];
  const currentYear = currentDate.getFullYear();
  
  const jour = currentDate.getDate();
const mois = currentDate.getMonth() + 1;
const annee = currentDate.getFullYear();
const heure = currentDate.getHours();
const minutes = currentDate.getMinutes();
const secondes = currentDate.getSeconds();

const dateEtHeureFormatees = `${jour}-${mois}-${annee} ${heure}:${minutes}:${secondes}`;
  const timestamp = currentDate.getTime();

  const data = {
    date: dateEtHeureFormatees,
    manager: textManager,
    feedback: feedbackText,
    month: currentMonth,
    year: currentYear,
    time: timestamp,
    person: personLogin,
    selectedImageTitle: selectedImageTitle, 
    selectedText: selectedText

  };

  axios.post('http://localhost:5000/store_data', data)
    .then(response => {
      console.log(response.data);
      // Traitez la réponse du backend ici
    })
    .catch(error => {
      console.error(error);
      // Traitez les erreurs de requête ici
    });
});

