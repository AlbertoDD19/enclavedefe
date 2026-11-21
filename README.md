# En Clave de Fe

**La fe se conversa.** Un mazo digital de preguntas, dinámicas y pequeñas propuestas para compartir, descubrir y vivir la fe.

## Colección actual

- 200 cartas: 100 preguntas generales y 100 preguntas de colecciones temáticas.
- 20 categorías en total, con 10 cartas por categoría.
- Colecciones temáticas: Adviento, Navidad, Cuaresma, Semana Santa y Pascua, Espíritu Santo y Pentecostés, Sacramentos, Confirmación, Vocación y proyecto de vida, Perdón y reconciliación, María y los santos.
- Cada carta contiene una pregunta principal, una pregunta para profundizar y una referencia bíblica relacionada.
- Selección aleatoria sin repetir cartas hasta completar la ronda.
- Favoritos guardados en el navegador, carta del día y modo grupo a pantalla completa.
- Compartir preguntas e imprimir la carta actual.
- Diseño adaptable a móviles, tabletas y ordenadores.

## Publicar con GitHub Pages

1. En el repositorio, entra en **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Selecciona la rama principal y la carpeta **/(root)**.
4. Guarda los cambios. GitHub Pages publicará la web en unos minutos.

## Añadir cartas

- Las preguntas generales están en `js/cards.js`.
- Las colecciones temáticas están en `js/thematic-cards.js`.

Cada carta tiene una pregunta principal, una pregunta para profundizar y una referencia bíblica. Al añadir una colección, utiliza un identificador único para su categoría y sus cartas.

Las referencias son orientativas; conviene consultar el texto en una traducción bíblica católica y leer el contexto del pasaje.

## Privacidad y uso responsable

Los favoritos se guardan únicamente en el almacenamiento local del navegador. No se envían a ningún servidor. La aplicación no requiere cuenta ni recopila respuestas personales.

Nadie tiene que responder a una pregunta ni compartir algo que no quiera. Se puede pasar una carta, escuchar en silencio o proponer otra. Las preguntas están pensadas para abrir conversaciones, no para juzgar ni forzar confidencias.

## Estructura

```
index.html
css/styles.css
js/app.js
js/cards.js
js/thematic-cards.js
README.md
```

Proyecto estático: HTML, CSS y JavaScript, sin dependencias de servidor.
