// Lexical binding
// El enlace léxico se refiere al como una funcion puede acceder a variables que se encuentran en el mismo lugar donde fueron definidas, independeientemente de donde sean llamadas.

function funcionExterna() {
  const variableInterna = "Hola";

  function funcionInterna() {
    // La funcion interna tiene acceso a las variables donde es definida. 
    console.log(variableInterna);
  }

  funcionInterna();
}

funcionExterna();


const functionalCharacter = {
  name: "Uncle Ben",
  messageWithTraditionalFunction: function (message) {
    console.log(`Hola! Soyl ${this.name}. ${message}`)
  },
  // Las arrow functions no vinculan su propio this al del objeto donde es creada
  messageWithArrowFunction: (message) => {
    console.log(`Hola! Soyl ${this.name}. ${message}`)
  }
}

functionalCharacter.messageWithTraditionalFunction("Tradicional")
functionalCharacter.messageWithArrowFunction("Arrow")