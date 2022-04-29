/** tableau de données */
var produit = [
    {
    nom: 'Blouson Cuir Homme OSX',
    image: 'https://s1.rockagogostatic.com/ref/pls/pls15/blouson-cuir-mec-marque-osx-brando-jacket-pr.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.',
    prix: 225
    },
    {
    nom: 'POLO CINTRE SLIM FIT EN COTON BASIC Bleu',
    image: 'https://photos6.spartoo.com/photos/188/18830673/18830673_500_A.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.',
    prix: 75
    },
    {
    nom: 'Robe rose croisée à boucler',
    image: 'https://m1.quebecormedia.com/emp/emp/A1_2_1_d64e884e-d21e-41ab-8eb0-2baf6b656c00_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=802&h=1086&width=925&height=925',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.',
    prix: 50
    },
    {
    nom: 'Sneakers Adidas Original Homme',
    image: 'https://www.kiffoo.com/7220-large_default/basket-adidas-original-homme.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.',
    prix: 159
    },
    {
    nom: 'Pantalon jogging Nike Just Do It - Noir',
    image: 'https://api.vs.prod.footkorner.nbs-aws.com/img/600/744/resize/catalog/product/f/o/footkorner-pantalon-nike-just-do-it-cu4050-010-noir_1_.jpeg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.',
    prix: 27
    }
    ];

/*** affichage des produits **/
$.each(produit, function (index, value) { 
    let card = '<div class="col"><div class="card text-center">';
    card += '<img src="' + value.image + '" class="card-img-top">';
    card += '<div class="card-body">';
    card += '<h5 class="card-title">' + value.nom + '</h5>';
    card += '<p class="card-text">' + value.description + '</p>';
    card += '<p class="card-text"><span>' + value.prix + '</span> €</p>';
    card += '<a href="#" class="btn btn-info">ajouter au panier</a>'
    card += '</div></div></div>';
    $(".row").append(card);

});

/** affichage du panier. empêche le raffraichissement */
$("#monPanier").click(function (e) { 
    e.preventDefault();
});

/** tableau des produits ajoutés au panier */
/** si le produit existe déjà on ajoute 1 à la quantité, sinon on ajoute un nouveu produit */
var panier = new Array;
$(".container .card a").click(function (e) { 
    e.preventDefault();
    let nouveauProduit = true;
    let nomProduit = $(this).parent().children("h5").text();
    $.each(panier, function (index, value) { 
        if (value.nom == nomProduit) {
            value.quantite ++;
            nouveauProduit = false;
        }
    });
    if (nouveauProduit) {
        panier.push(
            {
                nom : $(this).parent().children("h5").text(),
                prix : parseFloat($(this).parent().children("p").children("span").text()),
                quantite : quantite = 1
            });
        }
});

/** affichage du panier */
$("#affichePanier").click(function (e) { 
    e.preventDefault();
    let total = 0;
    $.each(panier, function (index, value) { 
        total += parseFloat(value.prix*value.quantite); 
        let produit = '<div id="produit' + index +'" class="card d-flex my-3">' ;
        produit += '<div class="card-body">';
        produit += '<h5 class="card-title">' + value.nom + '</h5>';
        produit += '<p class="d-flex"><label for="quantite' + index + '">Quantité : </label><input type="number" id="quantite' + index + '" size="3" value=' + value.quantite + '></p>';
        produit += '<p class="card-text">Prix unitire : ' + value.prix + ' €</p>';
        produit += '<a href="#" id="supprimer' + index + '" class="btn btn-danger">Supprimer ce produit</a></div></div>';
        $("#monPanier .offcanvas-body").append(produit);
    });
    $("#monPanier h3 span").append(total);

    /** ajouter des quantité et mettre à jour le total */
    $.each(panier, function (index, value) { 
        $("#quantite" + index).change(function (e) { 
            total += value.prix;
            value.quantite++;
            $("#monPanier h3 span").html(total);
        });
    });
    
    /** suppression d'un produit du panier */
    $.each(panier, function (index, value) { 
        $("#supprimer" + index).click(function (e) { 
            e.preventDefault();
            total -= value.prix * value.quantite;
            $("#produit" + index).remove();
            value.quantite = 0;
            $("#monPanier h3 span").html(total);
        }); 
    });
});

/** effacer l'affichage du panier à la fermeture du offcanvas */
$(".offcanvas-end .btn-close").click(function (e) { 
    e.preventDefault();
    $("#monPanier h3 span").empty();
    $(".offcanvas-end .card").remove();
});
/**effacer l'affichage du panier en cliquant n'importe où dans la fenêtre en dehors du offcanvas
 * NE FONCTIONNE PAS
 */
$("div.offcanvas-backdrop.fade.show").click(function (e) { 
    e.preventDefault();
    $("#monPanier h3 span").empty();
    $(".offcanvas-end .card").remove();
});

/** effacer l'affichage du panier à la fermeture du offcanvas de gauche */
$(".offcanvas-body button[data-bs-target='#maCommande']").click(function (e) { 
    e.preventDefault();
    $("#monPanier h3 span").empty();
    $(".offcanvas-end .card").remove();
}); 


/** Validation du formulaire */
let champOk = [];
function verif(id, regex) {
    let test = regex.test($("#" + id).val());
    if ($("#" + id).val()  === "") {
        $("#" + id + "Vide").removeClass("d-none");
        $("#" + id + "Valide").addClass("d-none");
        $("#" + id + "Invalide").addClass("d-none");
        $("#" + id).addClass("inputInvalid");

    } else {
        $("#" + id + "Vide").addClass("d-none");
    }
    if (!test && $("#" + id).val()  !== "") {
        $("#" + id + "Invalide").removeClass("d-none");
        $("#" + id + "Valide").addClass("d-none");
        $("#" + id).addClass("inputInvalid");
        $("#" + id).removeClass("inputValid");
        return false;
    } else if (test) {
        $("#" + id + "Invalide").addClass("d-none");
        $("#" + id + "Valide").removeClass("d-none");
        $("#" + id).addClass("inputValid");
        $("#" + id).removeClass("inputInvalid");
        return true;
    }
}
/** vérifications des champs */
let champs = ["nom", "prenom", "email", "telephone", "adresse"]
$.each(champs, function (index, value) { 
     $("#" + value).keyup(function() {
        switch (value) {
            case "nom" : regex = /^[a-zA-Z'\-\ ]+$/
                break;
            case "prenom" : regex = /^[a-zA-Z'\-\ ]+$/
                break;    
            case "email": regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
                break;
            case "telephone": regex = /^(\d){10}$/
                break;
            case "adresse": regex = /^[0-9a-zA-Z'\-\ ]+$/
                break;
            default: 
                break;
        }
        verif(value, regex);
    });
});

// /* vérification nom */
// $("#nom").keyup(function () {
//     let regexnom = /^[a-zA-Z'\-\ ]+$/
//     verif("nom", regexnom);
// });


// /* vérification prénom */
// $("#prenom").keyup(function () {
//     let regexprenom = /^[a-zA-Z'\-\ ]+$/
//     verif("prenom", regexprenom);
// });

// /* vérification email */
// $("#email").keyup(function () {
//     let regexemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
//     verif("email", regexemail);
// });

// /* vérification téléphone numéro français */
// $("#telephone").keyup(function() {
//     let regextelephone = /^(\d){10}$/;
//     verif("telephone", regextelephone);
// });

// /* vérification adresse */
// $("#adresse").keyup(function () {
//     let regexadresse = /^[0-9a-zA-Z'\-\ ]+$/
//     verif("adresse", regexadresse);
// });

/** récupération des informations du formulaire et du panier pour les afficher dans la modal */
$("#maCommande button").click(function (e) { 
    e.preventDefault();
    // champOk.push(verif("nom", regexnom));
    // champOk.push(verif("prenom", regexprenom));
    // champOk.push(verif("email", regexemail));
    // champOk.push(verif("telephone", regextelephone));
    // champOk.push(verif("adresse", regexadresse));
    let formOk = true;
    $.each(champOk, function (index, value) { 
         formOk = formOk && value;
    });
    console.log(champOk);
    console.log(formOk);
    //if (formOk) {
        nom = $("#nom").val();
        prenom = $("#prenom").val();
        email = $("#email").val();
        telephone = $("#telephone").val();
        adresse = $("#adresse").val();
        mesInformations = '<p>Nom : <strong>' + nom + '</strong></p>';
        mesInformations += '<p>Prénom : <strong>' + prenom + '</strong></p>';
        mesInformations += '<p>N° téléphone : <strong>' + telephone + '</strong></p>';
        mesInformations += '<p>Email : <strong>' + email + '</strong></p>';
        mesInformations += '<p>Adresse : <strong>' + adresse + '</strong></p>';
        $("#mesInformations").html(mesInformations);
        let total = 0;
        $.each(panier, function (index, value) { 
            total += parseFloat(value.prix*value.quantite); 
            let produit = '<p><strong>' + value.nom + '</strong></p>';
            produit += '<div class="d-flex justify-content-between border-bottom"><p>Prix unitire : <strong>' + value.prix + ' €</strong></p>';
            produit += '<p>Quantité : <strong>' + value.quantite + '</strong></p></div>';
            $("#monPanierFinal").append(produit);
        });
        $("#totalAPayer").html("Total à payer : " + total + " €");
    //}
    
});

$("#remerciement button").click(function (e) { 
    //e.preventDefault();
    panier = [];
    $("#monPanier h3 span").empty();
    $(".offcanvas-end .card").remove();
});