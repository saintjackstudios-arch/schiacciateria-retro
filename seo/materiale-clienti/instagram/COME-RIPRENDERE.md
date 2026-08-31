# Come riprendere la raccolta dei post

**Stato al 31/08/2026: 79 post su 227.** Dal 16/03/2026 al 29/08/2026.
Mancano i **148 precedenti al 16 marzo**.

## Perché ci si è fermati

Instagram lascia passare una settantina di post e poi risponde a vuoto. Non è un
errore nostro: è un limite di frequenza sull'account che sta chiamando. Provato
tre volte, con pause fino a sei secondi fra una richiesta e l'altra: dopo il
primo lotto, **zero**.

⛔ **Marco non ha l'accesso all'account**, quindi l'esportazione ufficiale di
Instagram — che sarebbe la strada giusta — per ora non è percorribile.

## Il comando per riprovare

Il limite si sblocca da solo col tempo. Non c'è modo di sapere quanto: si
riprova, e se torna zero si aspetta ancora.

```bash
cd /tmp && gallery-dl --cookies-from-browser chrome -j -v --sleep-request 4 "https://www.instagram.com/schiacciateria_retro_trieste/posts/" > ig-nuovo.json 2> ig-nuovo.err
```

- `--cookies-from-browser chrome` fa uscire **una** richiesta del portachiavi
  macOS: si clicca **Consenti**, mai *Sempre*.
- `-v` serve perché, se gallery-dl si interrompe a metà, stampa il **cursore**
  con cui riprendere da quel punto (`-o cursor=…`). Al primo giro non è uscito
  perché il programma pensava di aver finito.
- Se il file esce **vuoto**, il limite è ancora attivo. Non insistere: ritentare
  a distanza di ore, non di minuti.

## Come unire il risultato

I post già presi stanno in `post-instagram-tutti.md`, ognuno col suo link
`instagram.com/p/CODICE/`. Per non duplicare, si confrontano i codici:

```python
import json, io, re
nuovi = json.load(io.open('ig-nuovo.json'))
codici_nuovi = {e[2]['shortcode'] for e in nuovi
                if isinstance(e, list) and len(e) >= 3 and isinstance(e[2], dict)
                and e[2].get('shortcode')}
gia = set(re.findall(r'instagram\.com/p/([A-Za-z0-9_-]+)/',
                     io.open('post-instagram-tutti.md').read()))
print('davvero nuovi:', len(codici_nuovi - gia))
```

## ⚠️ Due cose da sapere

1. **`gallery-dl` salta alcuni caroselli.** Al primo giro ne ha persi sei, fra
   cui quello che elencava i gusti del Giro Ignorante. Se un post che ci
   aspettiamo non c'è, si prende a mano dall'interfaccia.
2. **Quando arrivano nuovi post, vanno rilette anche le conclusioni.** I fatti
   in `fatti-estratti.md` sono ricavati da 79 post: con 227 alcune cose
   cambieranno, e in particolare compariranno le informazioni che oggi mancano
   del tutto — anno di apertura, com'è nata l'idea, le birre alla spina, i
   prezzi, i fornitori, l'impasto e il forno.
