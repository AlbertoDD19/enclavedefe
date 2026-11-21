# En Clave de Fe

**La fe se conversa.** Un mazo digital de preguntas, dinámicas y pequeñas propuestas para compartir, descubrir y vivir la fe.

## Qué incluye

- 100 cartas originales distribuidas en 10 categorías.
- Selección aleatoria sin repetir cartas hasta completar la ronda.
- Pregunta complementaria para profundizar y referencia bíblica relacionada.
- Cartas especiales: silencio, gratitud y acción.
- Favoritos guardados en el navegador.
- Carta del día.
- Modo grupo a pantalla completa.
- Compartir preguntas e imprimir la carta actual.
- Diseño adaptable a móviles, tabletas y ordenadores.

## Publicar con GitHub Pages

1. En el repositorio, entra en **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Selecciona la rama principal y la carpeta **/(root)**.
4. Guarda los cambios. GitHub Pages publicará la web en unos minutos.

## Añadir cartas

Edita `js/cards.js`. Cada grupo contiene una categoría y una lista de cartas. Cada carta tiene:

- Pregunta principal.
- Pregunta para profundizar.
- Referencia bíblica para buscar y leer.

Las referencias son orientativas; conviene consultar el texto en una traducción bíblica católica y leer el contexto del pasaje.

## Privacidad

Los favoritos se guardan únicamente en el almacenamiento local del navegador. No se envían a ningún servidor. La aplicación no requiere cuenta ni recopila respuestas personales.

## Uso responsable en grupos

Nadie tiene que responder a una pregunta ni compartir algo que no quiera. Se puede pasar una carta, escuchar en silencio o proponer otra. Las preguntas están pensadas para abrir conversaciones, no para juzgar ni forzar confidencias.

## Estructura

```
index.html
css/styles.css
js/app.js
js/cards.js
README.md
```

Proyecto estático: HTML, CSS y JavaScript, sin dependencias de servidor.
