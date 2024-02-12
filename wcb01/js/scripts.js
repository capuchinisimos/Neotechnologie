	// JavaScript Document

	// Autorise que les chiffres
	// <input name="TELEPHONE" type="text" id="TELEPHONE" onKeyUp="ValidSaisieNombre(this)" />
	function ValidSaisieNombre(champ){
	   var chiffres = new RegExp("[0-9]"); //var chiffres = new RegExp("[0-9\.\,]");
	   var verif;
	   //var points = 0; /* Supprimer cette ligne */
	   for(i=0; i<champ.value.length; i++)
	   {
		  verif = chiffres.test(champ.value.charAt(i));
      
		  //if(champ.value.charAt(i) == "." || champ.value.charAt(i) == ","){points++;} /* Supprimer cette ligne */
		  //if(points > 1){verif = false; points = 1;} /* Supprimer cette ligne */
		  if(verif == false){champ.value = champ.value.substr(0,i) + champ.value.substr(i+1,champ.value.length-i+1); i--;}
	   }
	}


	// Verification champs avant post du formulaire
	// onSubmit="return check(this);" pour les popups
    function check(form) {
        //Validation de numéro de téléphone par les différents regexp de différentes langues
        var bValidation = false;
        var messageErreur = "";
        var regexpCount = _phoneRegexpValidators.length;
        for(i = 0; i < regexpCount; i++) {
            regElt = _phoneRegexpValidators[i];

            if(i == 0) bValidation = regElt.test(form.TELEPHONE.value);
            else bValidation = bValidation && regElt.test(form.TELEPHONE.value);
            
            if (!bValidation){
                messageErreur += msgError;
                break;
            }
        }

        if (messageErreur != "") {
            alert(messageErreur);
            return false;
        }
        
        if (isZeroToBeRemoved && form.TELEPHONE.value.substring(0,1) == "0"){
            form.TELEPHONE.value = form.TELEPHONE.value.substring(1);
        }
        
        return true;
    }