# PPL-harjoittelu

Offline-toimiva, selainpohjainen harjoitusohjelma Traficomin PPL-teoriakokeiden
kysymysten harjoitteluun. Ei vaadi internet-yhteyttä, kirjautumista tai
palvelinta. Toimii myös iPadilla.

## Mikä tämä on

Interaktiivinen harjoitussivu, jossa voit valita PPL-teoriakokeen moduulin ja
vastata 20 satunnaisesti valittuun **monivalintakysymykseen** (vaihtoehdot
A–D), aivan kuten Traficomin alkuperäisessä kysymyspankissa. Jokaisen
vastauksen jälkeen näytetään välittömästi palaute, oikea vastaus ja
selitys. Lopussa näytetään tulossivu sekä lista väärin menneistä
kysymyksistä.

Kysymykset on poimittu suoraan Traficomin PDF-kysymyspankeista
(`PPL010FIN…PPL090FIN`).

Tulokset tallentuvat selaimen `localStorage`:een, joten alkuvalikossa näkyy
viimeisin tulos, paras tulos ja tehtyjen harjoitusten määrä per moduuli. Mukana
on myös **Kertaa virheet** -tila.

## Moduulit

- 010 – Ilmailun säädökset
- 020 – Lentokoneen yleistuntemus
- 030 – Suoritusarvot ja lennonsuunnittelu
- 040 – Ihmisen suorituskyky
- 050 – Sääoppi
- 060 – Lentosuunnistus
- 070 – Lentotoiminta
- 080 – Lennonteoria
- 090 – Radiopuhelinliikenne

## Kansiorakenne

```
ppl-harjoittelu/
  index.html              # Kehitysversio (lukee data/-kansiosta)
  PPL-harjoittelu.html    # Yhden tiedoston offline-versio (jakeluun)
  src/
    app.js
    styles.css
  data/
    010.json ... 090.json # Kysymysdata moduuleittain
  tools/
    extract_pdfs.py       # PDF -> JSON -muunnin
    build_single_html.py  # Rakentaa yhden tiedoston offline-version
    validate.py           # Tuottaa validointiraportin
  reports/
    validation_report.html
  README.md
```

## Käyttö

### Tapa 1 – Yhden tiedoston offline-versio (suositus jakeluun)

Avaa `PPL-harjoittelu.html` selaimessa (Chrome, Edge, Safari, iPad).
Tämä yksi tiedosto sisältää kaiken: käyttöliittymän, tyylit, JavaScriptin ja
kysymysdatan. Voit kopioida sen muistitikulle, lähettää sähköpostilla tai
viedä palvelimelle – mitään asennusta ei tarvita.

### Tapa 2 – Kehitysversio

Useimmat selaimet estävät paikallisten JSON-tiedostojen lukemisen
`file://`-protokollalla, joten käytä yksinkertaista paikallista palvelinta:

```powershell
cd ppl-harjoittelu
python -m http.server 8000
```

Avaa sitten `http://localhost:8000/` selaimessa.

### Palvelimelle vienti

Riittää, että kopioit joko `PPL-harjoittelu.html` -tiedoston tai koko kansion
mihin tahansa staattiselle web-palvelimelle (Nginx, Apache, GitHub Pages,
Netlify, IIS, ...). Mitään palvelinpuolen logiikkaa ei tarvita.

## PDF:ien muuntaminen kysymysdataksi

Alkuperäiset PDF-tiedostot (Traficomin kysymyspankit) ovat projektin juuressa,
ei tässä kansiossa. Muunnos tehdään työkalulla `tools/extract_pdfs.py`.

### Riippuvuudet

```powershell
pip install pdfplumber
```

### Aja muunnin

```powershell
cd ppl-harjoittelu
python tools/extract_pdfs.py --pdf-dir ".." --out-dir "data"
```

Komento:

1. etsii moduulikohtaiset PDF:t (`PPL010FIN*.pdf`, `PPL020FIN*.pdf`, ...)
2. lukee tekstin
3. tunnistaa väittämät heuristisesti
4. antaa jokaiselle yksilöllisen ID:n (`010-0001`, ...)
5. arvioi tekoälyttömästi todennäköisen oikean vastauksen ja selityksen
   placeholderina – **kaikki AI:n / heuristiikan tuottamat vastaukset on
   merkitty `needsReview: true`**.
6. kirjoittaa tulokset tiedostoihin `data/0X0.json`.

> **Tärkeää:** Älä luota AI:n / heuristiikan tuottamiin oikeisiin vastauksiin
> sellaisinaan. Ilmailun teoriakoulutus vaatii ihmisen tarkistuksen.

## Vastausten tarkistaminen käsin – suositeltu työnkulku

PDF:t eivät sisällä vastausavainta, joten kaikkien 1217 kysymyksen oikea
vastaus täytyy täyttää käsin. Helpoin tapa on käyttää **review-tiedostoa**:

```powershell
py tools/export_review.py        # luo review/answers.md
# muokkaa review/answers.md (Oikea: + Selitys: jokaiselle kysymykselle)
py tools/import_review.py        # päivittää data/0X0.json
py tools/build_single_html.py    # päivittää PPL-harjoittelu.html
```

`review/answers.md` sisältää kaikki kysymykset peräkkäin tässä muodossa:

```markdown
### 010-0001 · #1 · sivu 2

**Väittämä:** Mitä seuraavista dokumenteista ei ole vaatimuksena …?

- A. Rekisteröimistodistus
- B. Miehistön syntymätodistus
- C. Lentokelpoisuustodistus
- D. Miehistön lupakirja

**Oikea:** B

**Selitys:** Syntymätodistusta ei vaadita lennolla – ICAO Annex 6 listaa …
```

Muokkaa **vain** rivit `**Oikea:** X` (kirjain A/B/C/D) ja `**Selitys:** …`.
Älä koske `**Väittämä:**`-riviin tai vaihtoehtoihin – ne tulevat suoraan
PDF:stä. Jos jätät kysymyksen koskematta (Selitys: `(täytä selitys)`), se
pysyy entisellään tilassa `needsReview: true`. Kun molemmat kentät on
täytetty, `import_review.py` merkitsee kysymyksen automaattisesti
tarkistetuksi (`needsReview: false`, `confidence: "high"`).

Jos haluat toimia suoraan JSON-tiedostoissa, voit muokata myös
`data/0X0.json` -tiedostoja. Jokainen kysymys on muotoa:

```json
{
  "id": "010-0001",
  "module": "010",
  "moduleName": "Ilmailun säädökset",
  "number": 1,
  "statement": "Mitä seuraavista dokumenteista ei ole vaatimuksena ...?",
  "options": [
    "A. Rekisteröimistodistus",
    "B. Miehistön syntymätodistus",
    "C. Lentokelpoisuustodistus",
    "D. Miehistön lupakirja"
  ],
  "correctIndex": 1,
  "explanation": "B on oikein, koska ...",
  "source": "PPL010FIN 11102018.pdf",
  "page": 2,
  "confidence": "high",
  "needsReview": false
}
```

Tarkista `correctIndex` (0=A, 1=B, 2=C, 3=D) ja kirjoita `explanation`.
Kun olet varma, vaihda `needsReview: false` ja `confidence: "high"`.
Käyttöliittymä näyttää pienen huomautuksen, jos kysymys on edelleen
tarkistamaton. PDF:t eivät sisällä vastausavainta, joten extractor
asettaa väliaikaisesti `correctIndex: 0` ja merkitsee
`needsReview: true, confidence: "low"`.

Kun olet muokannut JSON-tiedostoja, **rakenna yhden tiedoston versio uudelleen**:

```powershell
python tools/build_single_html.py
```

## Validointiraportti

```powershell
python tools/validate.py
```

Tuottaa tiedoston `reports/validation_report.html`, joka listaa:

- kysymykset ilman oikeaa vastausta
- kysymykset ilman selitystä
- kysymykset, joiden `confidence` on `"low"`
- kysymykset, joissa `needsReview: true`
- mahdolliset duplikaatit
- epäilyttävän lyhyet kysymykset
- moduulit, joissa on alle 20 kysymystä

## Yhden tiedoston offline-version rakentaminen

```powershell
python tools/build_single_html.py
```

Skripti yhdistää `index.html`, `src/styles.css`, `src/app.js` ja kaikki
`data/*.json` yhdeksi tiedostoksi `PPL-harjoittelu.html`.

## Datan muokkaaminen käsin

Voit lisätä, muokata tai poistaa kysymyksiä suoraan `data/0X0.json`
-tiedostoissa. Pidä JSON kelvollisena (UTF-8, suluittain). Aja sen jälkeen
`tools/validate.py` ja tarvittaessa `tools/build_single_html.py`.

## Tietosuoja

Ohjelma ei lähetä mitään tietoa internetiin. Kaikki harjoitustulokset
tallentuvat ainoastaan paikallisesti selaimen `localStorage`-tilaan.
