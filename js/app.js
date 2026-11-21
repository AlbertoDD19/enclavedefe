(() => {
  const cards = window.FE_CARDS || [];
  const $ = (id) => document.getElementById(id);
  const state = { category: "all", current: null, used: new Set(), favorites: new Set(JSON.parse(localStorage.getItem("ecf-favorites") || "[]")), reflectionOpen: false };
  const specials = {
    silencio:{category:"CARTA ESPECIAL · SILENCIO",question:"Regalad al grupo un minuto de silencio. No hay que conseguir nada ni encontrar palabras. Simplemente, parad y haced espacio.",reflection:"Al terminar, quien quiera puede compartir qué ha sentido o qué pensamiento se lleva. También está bien guardar silencio.",bible:"Salmo 46, 11",type:"DINÁMICA"},
    gratitud:{category:"CARTA ESPECIAL · GRATITUD",question:"Piensa en algo pequeño que hoy haya sido un regalo. Compártelo con el grupo y explica por qué lo agradeces.",reflection:"Escuchad las razones de los demás sin compararlas. Cada historia merece su espacio.",bible:"1 Tesalonicenses 5, 18",type:"DINÁMICA"},
    accion:{category:"CARTA ESPECIAL · ACCIÓN",question:"Elegid juntos un gesto concreto de cuidado, servicio o reconciliación que podáis realizar durante esta semana.",reflection:"Que sea sencillo, posible y compartido. Ponedle un día y pensad cómo podéis animaros mutuamente.",bible:"Santiago 2, 17",type:"RETO"}
  };
  const categoryNames = [...new Set(cards.map(c=>c.category))];
  const categoryContainer = $("categories");
  categoryNames.forEach(name => {
    const button=document.createElement("button");
    button.className="category-chip"; button.dataset.category=cards.find(c=>c.category===name).slug; button.textContent=name;
    categoryContainer.appendChild(button);
  });
  $("deckTotal").textContent=cards.length+" cartas";
  function available(){return cards.filter(c=>state.category==="all"||c.slug===state.category);}
  function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2200);}
  function updateFavoriteButton(){const active=state.current&&state.favorites.has(state.current.id);$("favoriteBtn").classList.toggle("is-favorite",!!active);$("favoriteBtn").innerHTML=active?"♥ <span>Guardada</span>":"♡ <span>Guardar</span>";}
  function render(card,animate=true){
    state.current=card; state.reflectionOpen=false;
    const paper=$("questionCard");
    if(animate){paper.classList.add("is-changing");setTimeout(()=>{paint();paper.classList.remove("is-changing");},140);}else paint();
    function paint(){
      $("cardCategory").textContent=card.category.toLocaleUpperCase("es");
      $("cardQuestion").textContent=card.question;
      $("cardType").textContent=card.type==="pregunta"?"PREGUNTA PARA COMPARTIR":card.type;
      const index=cards.findIndex(c=>c.id===card.id);
      $("cardNumber").textContent=index>=0?String(index+1).padStart(2,"0")+" / "+cards.length:"✳ ESPECIAL";
      $("reflectionText").textContent=card.reflection||"Dejad que cada persona comparta hasta donde quiera. Escuchar sin juzgar también forma parte del camino.";
      $("scriptureText").textContent=card.bible||"";
      $("scriptureBlock").hidden=!card.bible;
      $("reflectionContent").hidden=true;
      $("deepenBtn").setAttribute("aria-expanded","false");
      updateFavoriteButton();
      $("groupCategory").textContent=card.category.toLocaleUpperCase("es");
      $("groupQuestion").textContent=card.question;
    }
  }
  function draw(){
    let pool=available();
    if(!pool.length){toast("No hay cartas en esta categoría.");return;}
    let candidates=pool.filter(c=>!state.used.has(c.id));
    if(!candidates.length){state.used.clear();candidates=pool;toast("¡Mazo completo! Empezamos una nueva ronda.");}
    const card=candidates[Math.floor(Math.random()*candidates.length)];
    state.used.add(card.id);render(card);
  }
  function setCategory(category){
    state.category=category;state.used.clear();
    document.querySelectorAll(".category-chip").forEach(b=>b.classList.toggle("active",b.dataset.category===category));
    $("deckTotal").textContent=available().length+" cartas";
    draw();
  }
  categoryContainer.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b)setCategory(b.dataset.category);});
  $("nextBtn").addEventListener("click",draw);
  $("deepenBtn").addEventListener("click",()=>{
    state.reflectionOpen=!state.reflectionOpen;
    $("reflectionContent").hidden=!state.reflectionOpen;
    $("deepenBtn").setAttribute("aria-expanded",String(state.reflectionOpen));
  });
  function saveFavorites(){localStorage.setItem("ecf-favorites",JSON.stringify([...state.favorites]));$("favCount").textContent=state.favorites.size;updateFavoriteButton();}
  $("favoriteBtn").addEventListener("click",()=>{
    if(!state.current)return;
    if(state.favorites.has(state.current.id)){state.favorites.delete(state.current.id);toast("Carta eliminada de favoritas.");}
    else{state.favorites.add(state.current.id);toast("Carta guardada en favoritas.");}
    saveFavorites();
  });
  $("favCount").textContent=state.favorites.size;
  function openFavorites(){
    const list=$("favoritesList");list.innerHTML="";
    const saved=cards.filter(c=>state.favorites.has(c.id));
    if(!saved.length){list.innerHTML='<p class="empty-state">Todavía no has guardado ninguna carta. Cuando una pregunta te guste, guárdala con el corazón.</p>';}
    saved.forEach(c=>{
      const row=document.createElement("div");row.className="favorite-item";
      const p=document.createElement("p");p.textContent=c.question;
      const remove=document.createElement("button");remove.textContent="♥";remove.title="Quitar de favoritas";
      remove.addEventListener("click",()=>{state.favorites.delete(c.id);saveFavorites();openFavorites();});
      const show=document.createElement("button");show.textContent="↗";show.title="Ver carta";
      show.addEventListener("click",()=>{$("favoritesModal").hidden=true;setCategory("all");render(c);});
      row.append(p,show,remove);list.appendChild(row);
    });
    $("favoritesModal").hidden=false;
  }
  $("favoritesBtn").addEventListener("click",openFavorites);
  $("closeFavorites").addEventListener("click",()=>$("favoritesModal").hidden=true);
  $("favoritesModal").addEventListener("click",e=>{if(e.target===$("favoritesModal"))$("favoritesModal").hidden=true;});
  $("shareBtn").addEventListener("click",async()=>{
    if(!state.current)return;
    const text=state.current.question+"\n\n"+state.current.category+" · En Clave de Fe";
    if(navigator.share){try{await navigator.share({title:"En Clave de Fe",text});}catch(e){}}
    else if(navigator.clipboard){await navigator.clipboard.writeText(text);toast("Pregunta copiada para compartir.");}
    else toast("Puedes copiar la pregunta de la carta.");
  });
  $("printBtn").addEventListener("click",()=>window.print());
  $("dailyBtn").addEventListener("click",()=>{
    const today=new Date();const key=Number(today.getFullYear()+String(today.getMonth()+1).padStart(2,"0")+String(today.getDate()).padStart(2,"0"));
    const card=cards[key%cards.length];setCategory("all");render(card);toast("Esta es tu carta para hoy.");
  });
  $("groupBtn").addEventListener("click",()=>{$("groupOverlay").hidden=false;document.body.style.overflow="hidden";});
  function closeGroup(){$("groupOverlay").hidden=true;document.body.style.overflow="";}
  $("closeGroup").addEventListener("click",closeGroup);
  $("groupNext").addEventListener("click",draw);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeGroup();$("favoritesModal").hidden=true;}});
  document.querySelectorAll(".special-card").forEach(button=>button.addEventListener("click",()=>{
    const card=specials[button.dataset.type];render({...card,id:"special-"+button.dataset.type});
    $("questionCard").scrollIntoView({behavior:"smooth",block:"center"});
  }));
  render(cards[0],false);
  saveFavorites();
})();