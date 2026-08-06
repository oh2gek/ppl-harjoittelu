# Changelog

Kaikki merkittävät muutokset PPL-harjoittelu -projektiin, uusin ensin.

## [V4.2.13] — 2026-08-06

### Lisätty
- **Evästeitä ei käytetä -maininta**: Lisätty selkeä huomautus siitä, että sovellus ei käytä evästeitä (cookies) eikä seurantateknologioita, kolmeen paikkaan: aloitusnäkymän huomautusmodaaliin (`maybeShowDisclaimer`), käyttöehtomodaaliin (`showTerms`, uusi kohta 8) ja Ohjeet-ja-käyttöehdot-sivun (`renderInstructions`) käyttöehto- ja yleiskuvausosioihin. Kaikkialla korostetaan, että data tallennetaan vain selaimen `localStorage`-muistiin.

## [V4.2.12] — 2026-08-06

### Poistettu
- **Trafi-koesimulaatio**: Poistettu turha ohjeteksti "Valitse vastaus ja paina "Seuraava". Et näe oikeaa vastausta vielä – kaikki tulokset paljastuvat lopussa." kysymysnäkymästä.

## [V4.2.11] — 2026-08-06

### Muutettu
- **Trafi-koesimulaatio – kysymysjärjestys**: Poistettu koko kokeen läpi tapahtuva moduulien välinen sekoitus (`shuffle(allQuestions)`). Kysymykset käydään nyt aina moduuli kerrallaan, valittujen moduulien järjestyksessä (010→090), kunkin moduulin sisällä satunnaisessa järjestyksessä. Lisätty uusi välinäyttö (`renderExamModuleIntro`) joka kertoo selkeästi minkä moduulin osakoe on alkamassa ("Osakoe X / Y", moduulin tunnus ja nimi, kysymysmäärä). Kysymysnäkymän otsikko näyttää nyt myös moduulikohtaisen etenemisen (esim. "3 / 20") kokonaisedistymisen lisäksi.

## [V4.2.10] — 2026-08-06

### Lisätty
- **Selaa kysymyspankkia**: Uusi etusivun painike (`renderBrowsePicker`), jolla pääsee valitsemaan moduulin ja selaamaan sen kysymykset oikeine vastauksineen ja selityksineen vastaamatta niihin. Selausnäkymässä (`startBrowse`) kysymykset näytetään alkuperäisessä numerojärjestyksessä, oikea vastausvaihtoehto on korostettu suoraan vihreällä, ja navigointi tapahtuu "Edellinen"/"Seuraava"-painikkeilla. Kuvakysymyksissä näytetään myös liitekuva ja PDF-linkki.

## [V4.2.9] — 2026-08-02

### Muutettu
- **data/060.json**: Kaikki `needsReview: true` -liput asetettu `false`:ksi — moduulin 060 (Lentosuunnistus) kysymykset on käyty läpi kokonaisuudessaan.

## [V4.2.6] — 2026-07-21

### Korjattu
- **data/030.json Q030-0043**: `statement`-kentästä puuttui kuvaviittaus "(Katso LAPL/PPL 030-04)", jonka takia kysymystä ei tunnistettu kuvakysymykseksi eikä liitekuva näkynyt. Palautettu viittaus vahvistettuna PDF-lähteestä (`PPL030FIN 11102018.pdf`, sivu 9).

## [V4.2.5] — 2026-07-21

### Korjattu
- **data/080.json Q080-0050**: Vastausavain korjattu D → B. Kysymys koskee koneen pituusvakavuutta, kun CG on nostovoimakeskiön edessä ja nokka kääntyy häiriön vuoksi alas. Kohtauskulman pienentyessä koko koneesta korkeusvakaimen (CG:n takana sijaitsevan) alaspäin vaikuttava voima kasvaa, ei vähene — tämä lisääntynyt alaspaine synnyttää palauttavan nokka-ylös-momentin. Oikea vastaus on siis B ("enemmän alaspäin vaikuttavaa voimaa"), ei D.

## [V4.2.4] — 2026-07-21

### Korjattu
- **data/060.json Q060-0170**: Vastausvaihtoehto D ("Graiviatioksi") sisälsi virheellisesti mukaan liimautunutta liitesivujen otsikkotekstiä ("NAVIGATION Appendix LAPL/PPL 060-01-2015..." jne.) PDF-poiminnasta. Poistettu ylimääräinen teksti, vahvistettu alkuperäinen sanamuoto lähteestä (`32089-PPL060FIN.pdf`, sivu 28).

## [V4.2.3] — 2026-07-15

### Korjattu
- **data/030.json Q030-0057**: `statement`-kenttä oli katkaistu ja siitä puuttui kuvaviittaus. Palautettu alkuperäinen teksti PDF-lähteestä (`PPL030FIN 11102018.pdf`, sivu 11) vahvistettuna: "Mitä nopeuksista A, B, C tai D tulisi lentää suurimman toiminta-ajan saavuttamiseksi? (Katso LAPL/PPL 030-05)". Puuttuva "(Katso LAPL/PPL 030-05)" -viittaus esti kysymystä tunnistumasta kuvakysymykseksi (`isPictureQuestion`/`imageRefFor`), jolloin liitekuva ei näkynyt.

## [V4.2.2] — 2026-07-07

### Muutettu
- **Aggressiivisempi tasainen kattavuus (pickQuestions)**: Neliöllinen bonus (`gap * gap`, cap 50) korvaa lineaarisen bonuksen (`gap`, cap 4). Kysymykset jotka ovat jääneet selvästi jälkeen saavat eksponentiaalisesti enemmän painoa. Virhebonus laskettu cap 3:een (aiemmin 4). Yhteisbonus cap nostettu 60:een (aiemmin 6). Tämä pakottaa harvoin nähdyt kysymykset mukaan paljon aiempaa aggressiivisemmin, mutta sallii silti virheiden pienen painotuksen.

## [V4.1.28] — 2026-07-05

### Korjattu
- **Kuvakysymysten tunnistus**: `isPictureQuestion` ei tunnistanut kysymystä 020-0029 kuvakysymykseksi, koska statementissa oli muoto "Liitteessä (LAPL/PPL..." jota regex ei matchannut. Lisätty uusi pattern `/\bliitte(essä|en) \(?lapl\/ppl/` tunnistamaan myös tämä muoto.
- **data/090.json Q090-0080**: Korjattu vastausavain `D` → `A`. Kuvan kirjain A osoittaa asematasoa (APRON), ei kiitotietä.

## [V4.1.22] — 2026-07-02

### Muutettu
- **Kysymysten painotus (seenCount)**: Lisätty `seenCount`-seuranta localStorageen. Joka kerta kun kysymys näytetään (normaaliharjoitus, kertaus tai koesimulaatio), se tallentuu moduulikohtaiseen `seenCount`-laskuriin.
- **Painotettu valinta kaikissa harjoitustilojassa (paitsi Trafi)**: `pickQuestions` painottaa nyt sekä vähän nähtyjä kysymyksiä (bonus 4→0 näkemiskertojen mukaan) että väärin vastattuja (bonus 0→4 virhemäärien mukaan). Yhteisbonus on katkaistu maksimiin 6 ylimääräistä kopiota. Painotus on dynaaminen: lasketaan `gap = maxSeen - thisSeen`, josta tulee bonus 0–4. Väärin vastattuihin lisätään virhebonus 0–4. Yhteisbonus katkaistu 6:een. Kun yhtä kysymystä on näytetty enemmän, sen paino laskee automaattisesti ja vähemmän nähtyjen nousee.
- **Trafi-koesimulaatio**: Säilyy puhtaana satunnaisvalintana (`{ random: true }`) — ei käytä `seenCount`- eikä `errorHistory`-painotusta kysymysten valinnassa. Näkemiset kuitenkin tallentuvat tilastointia varten.
- **"Kertaa virheet" -toiminto**: Yhdistää nyt sekä virhehistorian että vähän nähtyjen kysymysten painotuksen, jotta kertaus ei toista vain samoja kysymyksiä vaan tuo myös aiemmin vähemmän harjoiteltuja mukaan.

## [V4.1.19] — 2026-07-01

### Muutettu
- **Disclaimer (Tärkeä huomautus)**: Muutettu näkymään vain kerran päivässä aiemman "kerran ja sitten ei koskaan" -toiminnan sijaan. `DISCLAIMER_KEY` tallentaa nyt päivämäärän (`YYYY-MM-DD`), ja jos sama päivämäärä on jo tallennettu, modaali ohitetaan. Seuraavana päivänä disclaimer näytetään uudelleen.

## [V4.1.17] — 2026-07-01

### Korjattu
- **data/010.json Q010-0074**: Korjattu vastausavain `A` → `C`. EASA SERA.210(b) ja NCO.OP.135 vaativat turvavyöt kytkettyinä koko lennon ajan, ei vain nousun ja laskun aikana. Selitys päivitetty vastaamaan säädöstä.

## [V4.1.16] — 2026-06-30

### Muutettu
- **Kuvien upotus kumottu**: Poistettu PNG-kuvien base64-upotus `PPL-harjoittelu.html`:stä. Kuvat viitataan jälleen tiedostopolun kautta (`PNG/PPL XXX-XX.png`). Yhden tiedoston build pysyy pienempänä. Kuvien näyttäminen vaatii edelleen sovelluksen avaamisen palvelimen kautta tai erillisen PNG-kansion olemassaolon samassa hakemistossa.

## [V4.1.14] — 2026-06-30

### Lisätty
- **PWA-tuki**: Lisätty `manifest.json` ja Apple PWA meta-tagit (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`). Build-skripti upottaa manifestin base64-data-URI:ksi `PPL-harjoittelu.html`:ään. Sovellus voidaan nyt lisätä iOS:n ja iPadOS:n kotinäytölle. Lisätty myös `apple-touch-icon` (SVG-lentokone-ikoni).
- **Uusi logo**: Luotu selkeä lentokone-logo manifestiin ja Apple-touch-iconiin.

## [V4.1.11] — 2026-06-30

### Muutettu
- **Changelog-näkymä**: Siirretty "Changelog"-linkki päänäytöstä Ohjeet-sivun loppuun. Linkki avaa muutoshistorian suoraan sovelluksessa. `build_single_html.py` lukee `CHANGELOG.md`:n, muuntaa sen yksinkertaiseksi HTML:ksi ja upottaa `CHANGELOG_HTML`-muuttujaan `app.js`:n alkuun. Näkymä on vieritettävä ja toimii offline-tilassa.

## [V4.1.10] — 2026-06-30

### Lisätty
- **Changelog-näkymä**: Lisätty "Changelog"-nappi, joka avaa muutoshistorian suoraan sovelluksessa. `build_single_html.py` lukee `CHANGELOG.md`:n, muuntaa sen yksinkertaiseksi HTML:ksi ja upottaa `CHANGELOG_HTML`-muuttujaan `app.js`:n alkuun. Näkymä on vieritettävä ja toimii offline-tilassa.

## [V4.1.9] — 2026-06-30

### Muutettu
- **data/060.json Q108–Q112 (060-07)**: Päivitetty selitykset opettavaisemmiksi. Vastaukset pysyvät samoina, mutta jokaiseen selitykseen lisätty selkeä VOR-instrumenttilogiikka: OBS 180° ja miten TO/FROM/Neutral-lippu sekä neulan suunta määräytyvät lentokoneen radiaalista (radiaali 90°–270° = TO, 270°–360°/0°–90° = FROM, 090°/270° = Neutral). Perusteluissa nyt avattu miksi neula on vasemmalla/oikealla ja miksi tietty lentokone vastaa näyttöä.

## [V4.1.8] — 2026-06-30

### Korjattu
- **data/060.json Q108–Q112 (060-07)**: Korjattu VOR-kuvan 060-07 tulkinta. OBS = 180°. Lentokoneet 1 ja 3 ovat 270-radiaalilla, 2 noin 225-radiaalilla, 5 noin 150-radiaalilla, 6 noin 060-radiaalilla, 7 090-radiaalilla, 8 noin 130-radiaalilla. Oikeat vastaukset päivitetty: Q108 → D (lentokone 2, näyttö V = FROM vasemmalla), Q109 → B (lentokoneet 1 ja 3, näyttö X = Neutral vasemmalla), Q110 → C (lentokone 6, näyttö U = TO oikealla), Q111 → C (lentokone 8 = näyttö W), Q112 → C (lentokone 5 = W, lentokone 7 = Z). Selitykset päivitetty.

## [V4.1.7] — 2026-06-30

### Korjattu
- **data/060.json Q085–Q100 (060-06)**: Korjattu kiinteäkorttisen ADF/RBI-kuvan 060-06 tulkinta. Kuva on kiinteäkorttinen (ei pyöriväkorttinen): 0° on aina ylhäällä ja neulan kärki näyttää suoraan RB:n. QDM = MH + RB, MH = QDM − RB. Oikeat vastaukset päivitetty: Q85 → D (135°), Q86 → A (315°), Q87 → A (090°), Q88 → A (180°), Q95 → D (185°), Q96 → B (035°), Q97 → D (165°), Q98 → B (195°), Q99 → D (120°), Q100 → A (360°). Selitykset päivitetty kaavoineen.

## [V4.1.6] — 2026-06-30

### Korjattu
- **data/060.json Q083–Q094 (060-05)**: Korjattu ADF-kuvan 060-05 tulkinta kaikissa seitsemässä kysymyksessä. Vanha tulkinta oletti virheellisesti kiinteäkorttisen ADF:n; kuvassa on pyöriväkorttinen ADF (SET-nuppi + pyörivä kortti). Kortin yläreuna = MH, neulan kärki = QDM. Suhteellinen suuntima RB = QDM − MH. Oikeat vastaukset päivitetty: Q83 → C (240°), Q84 → C (235° likimäärin), Q89 → D (210°), Q90 → B (190°), Q91 → D (220°), Q92 → B (295°), Q94 → D (030°). Selitykset päivitetty laskukaavoineen.

## [V4.1.5] — 2026-06-30

### Korjattu
- **data/060.json**: Korjattu vialliset kuvaviittaukset kysymyksissä **Q108**, **Q109** ja **Q110**. Viittaus `(Katso LAPL/PPL 060- 07)` sisälsi ylimääräisen välilyönnin ennen numeroa, jolloin `imageRefFor()`-regex ei tunnistanut kuvaa. Korjattu muotoon `060-07`.

## [V4.1.4] — 2026-06-29

### Korjattu
- **data/030.json Q030-0147**: Korjattu vastausavain `B` → `C`. EASA Part-NCO NCO.OP.125 ja AMC1 NCO.OP.125 Fuel and oil supply -ohjeen mukaisesti päivä-VFR-lennolla kiinteäsiipisellä lentokoneella varapolttoaineen määrä on 30 minuuttia (ei 45 minuuttia). Päivitetty myös selitys viittaamaan nykyisiin määräyksiin.

## [V4.1.3] — 2026-06-29

### Korjattu
- **data/010.json Q010-0023**: Korjattu vastausavain `C` → `D`. Kysymyksessä lentäjä on jo saanut erityis-VFR-selvityksen lähialueelle saapumiseen, ja ennen rajan ylittämistä radio lakkaa toimimasta. Koska selvitys on jo annettu, radiovika ei automaattisesti mitätöi sitä, vaan lentäjän tulee jatkaa määränpäähän noudattaen viimeistä saatua selvitystä. Vaihtoehto C olisi oikea vain, jos selvitystä ei olisi vielä annettu.

## [V4.1.2] — 2026-06-27

### Korjattu
- **data/050.json**: Lisätty puuttuvat kuvaviittaukset kysymyksiin **Q93** ja **Q94**. Molemmat kysymykset viittaavat SWC-karttaan, mutta niistä puuttui `(Liite LAPL/PPL 050-XX)` -merkintä. Q93 → `050-01`, Q94 → `050-02`.

## [V4.1.1] — 2026-06-27

### Korjattu
- **`renderStats()`**: Tilastot-nappi ei toiminut, koska `examSection`-taulukko välitettiin sisäkkäisenä lapsena `el()`-funktiolle. `appendChild` ei hyväksy taulukkoa, joten funktio heitti `TypeError`:n. Korjattu rakentamalla `cardChildren`-taulukko tasaisesti (flat) ja lisäämällä koesimulaatio-osan elementit yksitellen.

## [V4.1.0] — 2026-06-27

### Lisätty
- **Trafi-koesimulaatio – moduulivalinta**: Koesimulaation alussa voidaan nyt valita, mitkä moduulit sisällytetään kokeeseen. Jokaisesta moduulista näkyy kysymysmäärä. Valittavissa "Kaikki moduulit" tai yksittäiset moduulit.
- **Koesimulaatiotilastot**: Tilastot-sivulla on nyt oma kohta "🎯 Koesimulaatiot", joka näyttää läpäistyjen ja hylättyjen koesimulaatioiden määrän sekä yksityiskohtaiset tulokset viimeisimmistä kokeista (aika, pisteet, moduulikohtaiset tulokset).
- **Ohjeet-sivu**: Uusi kattava ohjesivu (`renderInstructions`), johon pääsee yläpalkin "Ohjeet" -napista. Sisältää käyttöehdot, sovelluksen yleiskuvauksen, ohjeet kaikkiin toimintoihin (harjoitukset, koesimulaatio, virheiden kertaus, kuvakysymykset, tilastot) sekä vinkkejä tehokkaaseen harjoitteluun.

### Muutettu
- **Etusivu**: "Ohjeet ja käyttöehdot" -kortti poistettu etusivun toimintovalikosta; ohjesivulle pääsee jatkossa vain yläpalkin "Ohjeet" -napista.
- **Ohjeet-sivu**: Moduulit kuvataan nyt oikeilla UI-nimillä (Ilmailun säädökset, Lentokoneen yleistuntemus, Suoritusarvot ja lennonsuunnittelu, Ihmisen suorituskyky, Sääoppi, Lentosuunnistus, Lentotoiminta, Lennonteoria, Radiopuhelinliikenne). Poistettu lause PNG-kuvien saatavuudesta.
- **`renderPictureTest()`**: Takaisin-nappi kuvakysymysten välissä palauttaa nyt moduulivalintaan (aiemmin etusivulle).

## [V4.0.13] — 2026-06-27

### Muutettu
- **`renderPictureTest()`**: Kuvakysymysten selaus muutettu moduulikohtaiseksi. Avattaessa näytetään ensin moduulivalinta, jossa jokaisessa näkyy kuvakysymysten määrä. Mahdollista valita yksittäinen moduuli tai "Kaikki moduulit". Navigointi kysymysten välillä palauttaa takaisin moduulivalintaan.

## [V4.0.12] — 2026-06-27

### Korjattu
- **data/060.json**: Korjattu jäljelle jääneitä virheitä moduulissa 060:
  - Kysymykset **30–40**: päivitetty PDF:n `32089-PPL060FIN.pdf` mukaisiksi (liitekysymykset 060-01, mittakaavakysymykset, NM-määritelmät).
  - **Q16**: `correctIndex` muutettu `1` → `3` (D).
  - **Q24**: `correctIndex` muutettu `2` → `0` (A).
  - **Q79**: `correctIndex` muutettu `1` → `0` (A).
  - **Q82**: NDB-taajuusvaihtoehdot olivat sekoittuneet ADF-suuntimien kanssa.
  - **Q103**: VOR-kysymyksen vaihtoehdot A ja B olivat katkenneet kahdelle riville.
  - **Q105**: `correctIndex` muutettu `0` → `1` (B).
  - **Q113, Q114, Q120**: DME- ja GPS-kysymysten vaihtoehdot olivat katkenneet PDF-rivityksen takia.
  - **Q156**: `correctIndex` muutettu `3` → `2` (C).
  - **Q170**: Poistettu appendix-teksti lopusta.
- **`isPictureQuestion()`**: lisätty tunnistus `"liitettä lapl/ppl"`-muodolle (moduuli 060, kysymykset 30–35 ja 44). Aiemmin vain `"liite lapl/ppl"` tunnistui.

## [V4.0.9] — 2026-06-27

### Korjattu
- **data/060.json**: 38 kysymystä (numerot **83–122**) olivat placeholder-muodossa ("(katso liite)") vaikka PDF:ssä `32089-PPL060FIN.pdf` niissä on oikeat tekstit ja vaihtoehdot. Päivitetty kaikkien kysymysten väittämät ja vaihtoehdot vastaamaan PDF:ää. Mukana ADF-liitekysymykset (060-05, 060-06), VOR-kuvakysymykset (060-07), DME-kysymykset ja GPS-kysymykset.

## [V4.0.8] — 2026-06-27

### Korjattu
- **`isPictureQuestion()`**: lisätty tunnistus `"liitteen kuvaan"`-muodolle (moduuli 060, kysymykset 83–90).
- **`imageRefFor()`**: regex tukee nyt `LAPL/PPL XXX-NN-YYYY`-muotoisia viitteitä (esim. **060-0030** `LAPL/PPL 060-01-2015`). Aiemmin ylimääräinen `-2015` esti kuvan tunnistamisen.

## [V4.0.7] — 2026-06-12

### Korjattu
- **`imageRefFor()`**: regex ei tunnistanut `PPL(A)`-muotoisia kuvaviitteitä (esim. **020-0047** `PPL(A) 020-03` ja **010-138** `PPL(A) 010-04`). Lisätty `PPL\s*\(A\)` vaihtoehto `LAPL/PPL`-rinnalle.

## [V4.0.5] — 2026-06-12

### Korjattu
- **`isPictureQuestion()`**: substring-haku `"kuva "` tunnisti virheellisesti sanan "Jatkuva" kuvaviitteeksi (esim. kysymys **050-0144**). Korjattu käyttämään regex-sanarajoja (`\b`), jolloin "kuva" täytyy olla itsenäinen sana.

## [V4.0.4] — 2026-06-08

### Korjattu
- **data/050.json**:
  - Kysymys **050-0046**: oikea vastaus vaihdettu **B → D** (lennettäessä idästä länteen kohti vuoristoa). Selitys päivitetty lee-puoli-ajatteluun.
  - Kysymys **050-0099**: selitys päivitetty kuvaamaan, miksei B ole täysin riittävä vastaus (säämuutoksetkin edellyttävät ATIS-päivitystä). Merkitty edelleen `needsReview: true` / `confidence: "low"`, koska vaihtoehdoissa ei ole yhdistelmävaihtoehtoa.

## [V4.0.3] — 2026-06-08

### Korjattu
- **data/050.json**: Kysymys 050-091 – kuva PPL 050-03 on ukkosmerkki (sääkartassa cumulonimbus), ei vuoristoaaltoja. Oikea vastaus vaihdettu **D → A**.

## [V4.0.2] — 2026-06-08

### Korjattu
- `imageRefFor()`: yksinumeroiset kuvaviitteet (esim. `090-1`) nollatäytetään oikein (`090-01`), jotta PNG-tiedosto löytyy. Korjaa esim. kysymyksen 090-080 kuvan näkymättömyyden.

## [V4.0.1] — 2026-06-08

### Muutettu
- **Versiohyppy 3.x → 4.0.1**: kuvakysymysten käyttökokemus on vakioitu pysyväksi ominaisuudeksi.
- Kuvakysymysten selaus poistettu "testi"-statusksesta – nimi on "Kuvakysymykset" (ei enää `[TESTI]`).
- Kuvakysymykset esitetään aina **satunnaisessa järjestyksessä** (`shuffle`).
- Ominaisuus jää nice-to-have -toiminnoksi; ei tilastointia tai integroidu muuhun harjoitteluun.

### Korjattu
- **data/010.json**: Kysymykset 010-132, 010-133 ja 010-134 – PAPI-valokysymysten oikeat vastaukset korjattu.

## [V3.1.17] — 2026-06-08

### Korjattu
- **data/010.json**: Kysymykset 010-132, 010-133 ja 010-134 – PAPI-valokysymysten oikeat vastaukset korjattu ja selitykset päivitetty.
  - **010-132** (kuva A, neljä punaista valoa): oikea vastaus on **B** – liukupolun alapuolella.
  - **010-133** (kuva C, neljä valkoista valoa): oikea vastaus on **C** – liukupolun yläpuolella.
  - **010-134** (kuva B, kaksi valkoista + kaksi punaista): oikea vastaus on **A** – liukupolun keskellä.

## [V3.1.16] — 2026-06-08

### Muutettu
- Kuva siirretty kortin alimmaksi elementiksi (vastauspalautteen ja navigointinappien alle).
- Kuva keskitetty vaakasuunnassa (`margin: 12px auto 0`).

## [V3.1.15] — 2026-06-08

### Muutettu
- Kuvakysymykset: kuvat näytetään nyt suoraan kortissa monivalintavaihtoehtojen alapuolella — ei erillistä ponnahdusikkunaa.
- Poistettu `showImage()`-modaali, raahauslogiikka ja siihen liittyvät CSS-tyylit (`.img-btn`, `.image-modal`, `.image-backdrop`).

## [V3.1.14] — 2026-06-08

### Korjattu
- Kuvamodaalin tausta varmasti läpinäkyväksi inline styleillä (`style="background:transparent;pointer-events:none;"` backdrop-elementissä ja `pointer-events:auto;` modaalissa). Näin kysymys ja vastausvaihtoehdot näkyvät täysin selvästi taustalla eikä mikään CSS-sääntö voi ylikirjoittaa.

## [V3.1.13] — 2026-06-08

### Korjattu
- Kuvamodaalin tausta oli edelleen sumea: `.modal-backdrop` -määrittely tuli CSS:ssä `.image-backdrop`:n jälkeen ja ylikirjoitti `background: transparent` -arvon. Korjattu nostamalla `.image-backdrop` -specificiteettiä käyttämällä `.modal-backdrop.image-backdrop` -valitsinta.

## [V3.1.12] — 2026-06-08

### Korjattu
- Kuvamodaali ei avautunut: `document.click`-kuuntelija lisättiin liian aikaisin, jolloin avaava napsautus itsessään sulki modaalin. Korjattu lisäämällä `setTimeout(…, 0)` ennen kuuntelijan rekisteröintiä.

## [V3.1.11] — 2026-06-08

### Muutettu
- Kuvamodaalin tausta muutettu läpinäkyväksi (`.image-backdrop` ilman sumennusta) — kysymys ja vastausvaihtoehdot näkyvät selvästi taustalla.
- Kuvamodaali sulkeutuu klikkaamalla sen ulkopuolelle (mm. vastausvaihtoehtoihin) — vastaus aktivoituu ensin, sitten modaali sulkeutuu.

## [V3.1.10] — 2026-06-08

### Lisätty
- Testiympäristöön (`[TESTI] Kuvakysymykset`) lisätty monivalintavaihtoehdot A–D, joilla voi myös vastata kuvakysymyksiin.
- Palaute ja selitys näytetään testiympäristössä vastauksen jälkeen, kuten tavallisessa harjoituksessa.
- Kuvamodaali (`showImage`) muutettu raahattavaksi: pidä hiiren nappi pohjassa otsikossa ja vedä. Näin kuvan voi siirtää sivuun ja tarkastella vastausvaihtoehtoja taustalla.

## [V3.1.9] — 2026-06-08

### Lisätty
- Kuvakysymyksiin erillinen "🖼️ Avaa kuva" -nappi, joka avaa kuvan ponnahdusikkunassa (`showImage`) samalla tekniikalla kuin disclaimer-modali.
- `imageRefFor()` -funktio, joka parsii kuvaviitteen (`LAPL/PPL 010-03`) kysymyksen tekstistä ja muodostaa polun `PNG/PPL 010-03.png`.
- Väliaikainen `[TESTI] Kuvakysymykset` -nappi etusivulla, jolla voi selata kaikki kuvakysymykset läpi ja testata kuvien näyttäminen.
- PNG-kuvakansio kopioitu projektiin (`PNG/`).

### Muutettu
- PDF-linkkien tekstistä poistettu "(uusi välilehti)" — toiminto säilyy ennallaan.
- `.image-modal` -tyyli laajemmalla max-width: 900px.

## [V3.1.8] — 2026-06-08

### Muutettu
- Laajennettu ja tiukennettu käyttöehdot (`LISENSSI.md` ja `showTerms`-modaali): lisätty kielto lisensoinnille, jakelumallille, kolmannen osapuolen upottamiselle, automaatiolle (botit/robotit) ja selkeä hyväksyntävaatimus.
- Poistettu tekijän nimi käyttöehdoista.
- Lisätty ICAO ilmailuviranomaisten luetteloon (Traficom, EASA, ICAO).
- Pienennetty käyttöehtojen modaalin fonttikokoa (`.terms-modal` 0.85rem, otsikko 1.15rem).

## [V3.1.7] — 2026-06-08

### Lisätty
- Lisätty `LISENSSI.md` -tiedosto projektin lisenssiehtoineen.
- Lisätty käyttöehdot-modaali (`showTerms`) disclaimer-näkymään ja etusivun footeriin.
- Lisätty CSS-tyylit `.terms-link` -linkille.
- Lisätty `CHANGELOG.md` versiohistorian seurantaan.

## [V3.1.6] — 2026-06-08

### Lisätty
- Kopioitu lähde-PDF:t (`PPL010FIN`–`PPL090FIN`) projektin `pdf/`-kansioon.
- Lisätty PDF-linkki kuvakysymyksiin (`isPictureQuestion`, `pdfLinkFor`) — näytetään harjoituksessa ja koesimulaatiossa.
- Lisätty `.pdf-link` -tyylit `styles.css`:ään.

### Siivottu
- Poistettu `reports/`- ja `review/`-kansiot.
- Poistettu `tools/answers/`-kansio (vanhat väärät vastausavain tiedostot).
- Poistettu väliaikaiset `_fix*.py` -skriptit.

## [V3.1.5] — 2026-06-08

### Muutettu
- Lisätty automaattinen versionumeron kasvatus `tools/build_single_html.py` -build-skriptiin.
- Lisätty versiotiedon näyttö etusivun footeriin (`#app-version`).
- Poistettu info-bannerin teksti "PDF-aineistot jäsennetty".

### Korjattu
- Korjattu kysymys `020-0058`: päivitetty sovellus vastaamaan JSON-datan mukaista oikeaa vastausta.
- Tarkistettu data-integriteetti: sovellus käyttää vain `data/*.json` -tiedostoja.

## [V3.1.0] — 2026-06-08

### Lisätty
- Versiointijärjestelmä (`APP_VERSION` muuttuja `src/app.js`:ssä), alkaen V3.1.0.

### Korjattu
- Moduuli 070: korjattu kysymykset `070-0029`, `070-0059`, `070-0008` (vastaukset, selitykset, confidence).
- Moduuli 090: korjattu useita kysymyksiä (`090-0121`, `090-0125`, `090-0026`, `090-0027`, `090-0066`, `090-0132`, `090-0074`, `090-0054`, `090-0058`, `090-0064`, `090-0076`, `090-0083`, `090-0084`, `090-0126`) vastaamaan Traficom GEN T1-10 ja ICAO Doc 9432 -lähteitä.

---

## [V3.0.0-beta.9] — 2026-06 (ensi julkaisua edeltävä viimeistely)

### Lisätty
- Kattava kysymysdatan tarkistus- ja korjausprosessi (`validate.py`, `import_review.py`, `export_review.py`).
- Monikierroksinen data-review: moduulit 010–090 käyty läpi manuaalisesti ja korjattu virheellisiä vastauksia.
- `apply_answers.py` -työkalu JSON-datan korjaamiseen eräajona.

## [V3.0.0-beta.8] — 2026-05 (offline-build ja työkalut)

### Lisätty
- `build_single_html.py` — yhden tiedoston offline-version rakentaminen (upottaa CSS, JS ja JSON:t HTML:ään).
- `validate.py` — automaattinen validointi: puuttuvat kentät, tyhjät selitykset, `correctIndex`-rajat.
- `extract_pdfs.py` — PDF-kysymyspankeista (PPL010FIN–PPL090FIN) tekstin ja vastausvaihtoehtojen purku.
- `tools/answers/` -välituotokset moduulikohtaisten vastausavainten hallintaan.
- `_compact.py` -työkalu data/-kansion JSON-tiedostojen minifointiin.

### Muutettu
- Kysymysdata siirretty erillisiksi JSON-tiedostoiksi `data/`-kansioon (moduuli kohti).

## [V3.0.0-beta.7] — 2026-05 (UI:n viimeistely ja teemat)

### Lisätty
- Tumman ja vaalean teeman välillä vaihtaminen (headerin kuu/aurinko-nappi).
- `localStorage`-pohjainen teeman tallennus (`THEME_KEY`).
- Ilmailuteemaan sopiva värimaailma (tumman sininen tausta, cyan/emerald/violet/accent-värit moduuleille).
- Taustakuva (`Taustakuva ISO.png`) ja blur-overlay.
- Moduulinappien värikooodaus (säädökset = cyan, lentomekaniikka = violet, jne.).
- Statistiikkakortit etusivulle (kokonaiskysymykset, läpäisyraja, viimeisin aktiviteetti, progressi).
- Info-banneri selityksellä harjoituksen rakenteesta.

### Muutettu
- Koko UI-komponentit rakennetaan ohjelmallisesti `app.js`:ssä `el()`-funktiolla — ei enää staattista HTML:ää sisällölle.

## [V3.0.0-beta.6] — 2026-05 (Traficom-koesimulaatio)

### Lisätty
- **Trafi-koesimulaatio** — 20 kysymystä satunnaisesti kaikista 9 moduulista, kuten oikeassa kokeessa.
- Tulossivu moduulikohtaisella erittelyllä (oikein/väärin prosentit moduuleittain).
- Väärin menneiden kysymysten listaus lopussa selityksineen.
- Simulaatio-tila ei näytä oikeita vastauksia kesken harjoituksen (vasta lopussa).

## [V3.0.0-beta.5] — 2026-04 (tulosten tallennus ja virhehistoria)

### Lisätty
- `localStorage`-pohjainen tulosten ja virhehistorian tallennus (`STORAGE_KEY`).
- **Kertaa virheet** — harjoitustila, joka painottaa aiemmin väärin vastattuja kysymyksiä (`errorHistory`).
- Viimeisin tulos, paras tulos ja harjoituskertojen määrä näkyvät moduulinapeissa.
- Nollaa tulokset -toiminto (tyhjentää `localStorage`).

## [V3.0.0-beta.4] — 2026-04 (interaktiivinen harjoitus)

### Lisätty
- Monivalintakysymysten interaktiivinen vastaus: A–D-napit, heti palaute (oikein/väärin).
- Oikean vastauksen korostus (vihreä) ja oman virheellisen valinnan korostus (punainen).
- Selityksen näyttäminen jokaisen vastauksen jälkeen.
- Kysymysten satunnaisvalinta 20 kpl / harjoitus (`pickQuestions`, `shuffle`).
- Edistymispalkki (progress bar) kysymysten välillä.
- Tulossivu: yhteenveto, oikeiden/väärien määrä, läpäisyraja (75 %).

## [V3.0.0-beta.3] — 2026-04 (perus-UI ja navigaatio)

### Lisätty
- Yksisivuinen sovellus (SPA): etusivu, moduulinäkymä, tulosnäkymä ilman sivunlatausta.
- Moduulivalintaruudukko (010–090) kuvakkeineen ja kysymysmäärineen.
- Header ja footer.
- Responsiivinen asettelu (toimii sekä desktopilla että iPadilla).
- `el()`-apufunktio DOM-elementtien ohjelmalliseen luontiin.

## [V3.0.0-beta.2] — 2026-04 (datakäsittelyn perusta)

### Lisätty
- Python-työkalut PDF:stä tekstin ja kysymys-vastausparien erotteluun.
- Alustava JSON-rakenne kysymyksille: `id`, `statement`, `options[]`, `correctIndex`, `explanation`, `source`, `page`, `confidence`, `needsReview`.
- Manuaalinen data-annotointi: selitysten kirjoittaminen ja lähteiden (PDF-sivu) merkitseminen.
- Kysymysten numerointi alkuperäisen PPL-pankin mukaisesti (`number`).

## [V3.0.0-beta.1] — 2026-04 (projektin aloitus)

### Lisätty
- Projektin perustaminen: `index.html`, `src/app.js`, `src/styles.css`.
- Traficomin PPL-kysymyspankeista (`PPL010FIN 11102018.pdf` – `PPL090FIN 11102018.pdf`) kysymysten tunnistus.
- Suunnittelu: offline-toimiva selainsovellus, ei palvelinta, ei kirjautumista.
- Päämäärä: replikoida PPL-teoriakokeen monivalintakokemus (20 kysymystä, A–D, heti palaute).
