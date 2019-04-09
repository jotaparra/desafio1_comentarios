firebase.initializeApp({
    apiKey: "AIzaSyDOKz6XbS4DPp7WUjBTcO0G3R3kv70pw6Y",
    authDomain: "seccioncomentarios-97cf3.firebaseapp.com",
    projectId: "seccioncomentarios-97cf3",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//AGREGAR DATOS. Código de firestore
//Creamos una función 'guardar' para que cada vez que apretamos el botón, guarde la información y no lo haga automático como lo estaba haciendo cada vez que recargabamos la página
function guardar(){
    let comment = document.getElementById('comment').value; 
    db.collection("users").add({   //add: agrega un ID automático a nuestro 'users'
        comment: comment,
    })
    .then(function(docRef) {     //en esta parte se ejecuta la parte del exito
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('comment').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

//LEER DOCUMENTOS
let tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {  //Para obtener actualizaciones en tiempo real, reemplazamos get() por onSnapshot()
    //vamos a limpiar la tabla para que empiece desde 0
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().comment}`);
        //pintar datos
        tabla.innerHTML += `<tr>
        <td>${doc.data().comment}</td>
        <td><button class='btn btn-danger' onclick='eliminar("${doc.id}")'>Eliminar</button></td>
        </tr>`
    });
});

//BORRAR DOCUMENTOS
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}




