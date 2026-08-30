# TRIA — Specifiche tecniche Instagram

Ultima verifica delle fonti: **29 agosto 2026**.

Questo documento distingue sempre tre livelli:

- **Ufficiale · Organico**: requisito o indicazione pubblicata nell'Instagram Help Center per i contenuti normali.
- **Ufficiale · Ads**: requisito oppure raccomandazione pubblicata nella Meta Ads Guide, indicata come tale nel testo. È il riferimento per le inserzioni e una base prudente per contenuti che potrebbero essere sponsorizzati.
- **Kit TRIA · Best practice**: decisione interna di produzione. Non è una specifica ufficiale Instagram.

Le interfacce e i requisiti Meta cambiano nel tempo: prima di una campagna a pagamento, ricontrollare le pagine ufficiali collegate in fondo.

## Formati del kit

| Contenuto | Master modificabile | Export di pubblicazione | Rapporto | Stato della decisione |
| --- | ---: | ---: | ---: | --- |
| Post feed | 1440 × 1800 px | 1080 × 1350 px | 4:5 | Master coerente con Meta Ads; export organico scelto dal kit |
| Carousel immagini | 1440 × 1800 px per slide | 1080 × 1350 px per slide | 4:5 | Master coerente con Meta Ads; export organico scelto dal kit |
| Story | 1440 × 2560 px | 1080 × 1920 px | 9:16 | Master coerente con Meta Ads; export organico scelto dal kit |
| Reel | 1440 × 2560 px | 1080 × 1920 px | 9:16 | Master coerente con Meta Ads; export organico scelto dal kit |
| Avatar | 1080 × 1080 px | 1080 × 1080 px | 1:1 | **Best practice TRIA, non ufficiale** |

### Feed

**Ufficiale · Organico.** Instagram conserva le fotografie fino a 1080 px di larghezza quando rientrano nel rapporto supportato indicato nel suo Help Center. Il supporto organico non equivale alle raccomandazioni della pipeline pubblicitaria.

**Ufficiale · Ads.** La Meta Ads Guide corrente raccomanda per il feed immagini JPG o PNG in rapporto 4:5 a 1440 × 1800 px. Indica inoltre 30 MB come dimensione massima, 500 px come larghezza minima e una tolleranza dell'1% sul rapporto.

**Kit TRIA · Best practice.** Progettare a 1440 × 1800 px e consegnare l'export organico a 1080 × 1350 px. Mantenere testi, logo e soggetti importanti lontani dai bordi; Meta non pubblica una safe area numerica per il feed.

### Carousel

**Ufficiale · Ads.** La Meta Ads Guide ammette da 2 a 10 unità. Per caroselli composti soltanto da immagini indica il rapporto 4:5; per quelli che includono video indica attualmente 1:1. I formati elencati sono JPG/PNG per le immagini e MP4/MOV/GIF per i video; il minimo dichiarato è 1080 × 1080 px. I limiti pubblicati sono 30 MB per immagine, 4 GB per video e da 1 secondo a 2 minuti per ciascun video.

**Kit TRIA · Best practice.** I carousel editoriali saranno solo-immagine, tutti a 4:5 e con la stessa gabbia. Usare 1440 × 1800 px come master e 1080 × 1350 px come export. Non alternare rapporti all'interno dello stesso carousel. Numerazione, continuità grafica tra slide e margini interni sono regole del kit, non prescrizioni Meta.

### Stories

**Ufficiale · Ads.** Meta raccomanda 9:16 a 1440 × 2560 px. Per le immagini indica JPG/PNG e 30 MB massimi. Per i video indica MP4/MOV/GIF, H.264, pixel quadrati, frame rate fisso, scansione progressiva e audio AAC stereo ad almeno 128 kbps; sottotitoli e audio sono consigliati. La guida video dichiara da 1 secondo a 60 minuti e 4 GB massimi.

**Kit TRIA · Best practice.** Conservare il master a 1440 × 2560 px ed esportare a 1080 × 1920 px. Comporre sempre con l'overlay della safe area descritto sotto.

### Reels

**Ufficiale · Organico.** L'Instagram Help Center accetta Reel tra 1,91:1 e 9:16, con almeno 30 FPS e almeno 720 px di risoluzione. Indica inoltre 420 × 654 px, rapporto 1:1,55, come dimensione raccomandata per la cover.

**Ufficiale · Ads.** Meta raccomanda MP4/MOV, rapporto 9:16 e 1440 × 2560 px; H.264, pixel quadrati, frame rate fisso, scansione progressiva e AAC stereo ad almeno 128 kbps. I sottotitoli sono consigliati e l'audio è indicato come fortemente consigliato. La guida dichiara fino a 15 minuti e 4 GB massimi.

**Kit TRIA · Best practice.** Il Reel viene montato su master 1440 × 2560 px ed esportato a 1080 × 1920 px. La cover va progettata separatamente e verificata nelle anteprime dell'app; non si deve presumere che un frame leggibile a pieno schermo resti leggibile in tutte le miniature.

## Safe area verticale

**Ufficiale · Ads.** Le pagine Meta correnti per Stories e Reels raccomandano di lasciare senza testo, loghi o elementi chiave:

- il **14% superiore**;
- il **35% inferiore**;
- il **6% su ciascun lato**.

Queste percentuali riguardano l'interfaccia delle inserzioni. **Kit TRIA · Best practice:** applichiamo la stessa area, più prudente, anche ai contenuti organici per renderli riutilizzabili e ridurre sovrapposizioni con nome profilo, caption, pulsanti e call to action.

| Canvas | Alto da lasciare libero | Basso da lasciare libero | Ogni lato | Finestra centrale indicativa |
| --- | ---: | ---: | ---: | ---: |
| Master 1440 × 2560 | ≈ 359 px | 896 px | ≈ 87 px | x ≈ 87–1353; y ≈ 359–1664 |
| Export 1080 × 1920 | ≈ 269 px | 672 px | ≈ 65 px | x ≈ 65–1015; y ≈ 269–1248 |

I valori frazionari sono stati arrotondati verso l'interno dell'area sicura. L'overlay è una guida di composizione e non deve comparire nell'export finale.

Non usare come riferimento operativo i vecchi buffer simmetrici da 250 px: sono meno prudenti delle percentuali mostrate oggi nelle pagine ufficiali Meta.

## Avatar

Meta non pubblica attualmente una dimensione pixel ufficiale specifica per l'avatar Instagram. Il minimo 320 × 320 px presente nel Centro assistenza riguarda **Facebook**, non Instagram. Meta documenta la possibilità di sincronizzare la stessa foto profilo fra gli account, ma questo non trasforma 320 × 320 px in un requisito Instagram.

**Kit TRIA · Best practice, non ufficiale:**

- sorgente ed export PNG a 1080 × 1080 px;
- utilizzare il simbolo TRIA, non il lockup orizzontale completo;
- centrare il simbolo e contenerlo approssimativamente nel 70% del diametro;
- evitare dettagli sottili e testo secondario;
- verificare sia la maschera circolare sia la miniatura reale nell'app;
- non affidare informazioni essenziali al bordo, che verrà nascosto dal crop circolare.

## Export

### Immagini

**Kit TRIA · Best practice:**

- spazio colore sRGB;
- PNG per tipografia, forme nette, trasparenze e grafiche piatte;
- JPG ad alta qualità per contenuti prevalentemente fotografici;
- nessun profilo CMYK;
- esportare alla misura finale, senza aggiungere cornici per simulare un altro rapporto;
- controllare che l'overlay di safe area sia disattivato;
- conservare il master modificabile separato dall'export.

I limiti di peso ufficiali per le immagini Ads citate in questo documento sono 30 MB; il kit dovrebbe comunque produrre file sensibilmente più leggeri quando ciò non introduce artefatti visibili.

### Video

**Ufficiale · Ads:** H.264, pixel quadrati, frame rate fisso, scansione progressiva, AAC stereo ad almeno 128 kbps; MP4 o MOV per Reels. I limiti dichiarati sono 4 GB.

**Kit TRIA · Best practice:**

- contenitore MP4;
- video H.264, audio AAC stereo ≥128 kbps;
- 30 FPS come default, salvo una ragione produttiva esplicita;
- niente barre nere incorporate;
- sottotitoli verificati e leggibili dentro la safe area;
- frame iniziale e cover controllati separatamente;
- ascolto finale sia con audio sia senza audio.

## Naming convention

**Kit TRIA · Best practice, non ufficiale.** Esistono due namespace distinti. Gli asset canonici e riutilizzabili del kit mantengono un nome corto e stabile:

```text
tria-launch-{nn}-{slug}.png
tria-{tipo}-{slug}.svg
tria-{tipo}-{slug}.png
```

Esempi già presenti:

```text
tria-launch-01-manifesto.png
tria-instagram-avatar.png
tria-highlight-metodo.svg
```

I contenuti datati pronti per la pubblicazione usano invece data, pilastro, formato, indice e versione. Usare solo minuscole ASCII, trattini e numerazione a due cifre:

```text
tria-{yyyy-mm-dd}-{pilastro}-{slug}-{formato}-{indice}-v{nn}.{ext}
```

Esempi:

```text
tria-2026-09-02-insight-mvp-o-prodotto-feed-01-v01.png
tria-2026-09-05-lavori-playgroundai-carousel-03-v02.jpg
tria-2026-09-09-studio-business-product-tech-reel-01-v01.mp4
tria-2026-09-09-studio-avatar-mark-avatar-01-v01.png
```

Valori consigliati per `formato`: `feed`, `carousel`, `story`, `reel`, `reel-cover`, `avatar`. Non rinominare gli asset canonici a ogni utilizzo; duplicarli con il naming datato quando entrano in una pubblicazione specifica.

Per un carousel, tutte le slide condividono data, pilastro, slug e versione; cambia soltanto `indice` (`01`, `02`, …). Incrementare la versione quando cambia il contenuto approvato, non per ogni esportazione identica.

## Accessibilità e controllo qualità

Instagram permette di aggiungere o modificare il testo alternativo delle immagini. La Meta Ads Guide raccomanda inoltre i sottotitoli nei video Stories e Reels.

**Kit TRIA · Best practice:**

- scrivere un alt text specifico per ogni immagine e per ogni slide informativa;
- descrivere significato e informazioni utili, non l'estetica fine a sé stessa;
- riportare nella caption i dati essenziali presenti soltanto nella grafica;
- non comunicare uno stato usando esclusivamente il colore;
- mantenere contrasto alto e corpo del testo leggibile su uno schermo piccolo;
- limitare le righe, evitare testo a ridosso dei bordi e non inserire paragrafi dentro una slide;
- usare sottotitoli sincronizzati per ogni parlato e indicare i suoni rilevanti;
- assicurarsi che il contenuto sia comprensibile anche senza audio;
- usare maiuscole interne leggibili nei hashtag composti, per esempio `#TriaStudio`;
- evitare lampeggi rapidi e movimenti che rendano difficile leggere il messaggio;
- verificare manualmente anteprima feed, carousel, Story, Reel, cover e crop avatar prima della pubblicazione.

Checklist finale:

- [ ] Dimensioni e rapporto corretti
- [ ] Safe area rispettata e overlay rimosso
- [ ] Profilo sRGB e compressione controllata
- [ ] Logo e testi leggibili alla dimensione reale
- [ ] Alt text preparato per ogni immagine/slide
- [ ] Sottotitoli verificati per i video
- [ ] Cover Reel e avatar testati con i crop reali
- [ ] Naming conforme al namespace dell'asset e versione corretta quando richiesta
- [ ] File master ed export archiviati separatamente

## Fonti ufficiali

### Instagram Help Center · contenuti organici

- [Risoluzione delle foto condivise su Instagram](https://help.instagram.com/1631821640426723)
- [Dimensioni e rapporti dei Reel su Instagram](https://help.instagram.com/1038071743007909)
- [Modificare il testo alternativo di una foto su Instagram](https://help.instagram.com/503708446705527)
- [Sincronizzare le informazioni del profilo tra gli account Meta](https://www.facebook.com/help/instagram/451345223552070)

### Meta Ads Guide · inserzioni

- [Immagine nel Feed di Instagram](https://www.facebook.com/business/ads-guide/update/image/instagram-feed)
- [Carousel nel Feed di Instagram](https://www.facebook.com/business/ads-guide/update/carousel/instagram-feed/outcome-awareness)
- [Immagine nelle Stories di Instagram](https://www.facebook.com/business/ads-guide/update/image/instagram-story)
- [Video nelle Stories di Instagram](https://www.facebook.com/business/ads-guide/update/video/instagram-story)
- [Video nei Reels di Instagram](https://www.facebook.com/business/ads-guide/update/video/instagram-reels)
- [Indicazioni creative Meta per Reels](https://www.facebook.com/business/ads/facebook-instagram-reels-ads)

### Nota avatar

- [Dimensione minima della foto profilo Facebook](https://www.facebook.com/help/163248423739693) — fonte ufficiale, citata soltanto per chiarire che il valore 320 × 320 px riguarda Facebook e non costituisce una specifica Instagram.
