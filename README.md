# PPL-harjoittelu

Selainpohjainen harjoitusohjelma Traficomin PPL/LAPL-teoriakokeiden
kysymysten harjoitteluun. Ei vaadi kirjautumista eikä asennusta. Toimii
myös iPadilla.

## Käyttöehdot

1. Tämä sovellus on tarkoitettu ainoastaan yksityiseen, ei-kaupalliseen
   henkilökohtaiseen käyttöön ja itseopiskeluun PPL-teoriakokeeseen
   valmistautumista varten.
2. Kaupallinen käyttö, myynti, vuokraus, lisensointi, jakelumalliin
   perustuva hyödyntäminen tai muu taloudellisen hyödyn tavoittelu on
   ehdottomasti kielletty ilman etukäteen saatua nimenomaista kirjallista
   lupaa.
3. Sovellusta tai sen sisältöä ei saa julkaista, levittää tai upottaa osana
   kolmannen osapuolen palvelua, mukaan lukien sovelluskaupat (App Store,
   Google Play, Microsoft Store), verkkoalustat ja oppimisjärjestelmät.
4. Kysymykset ja vastaukset on poimittu julkisista Traficomin
   PPL-kysymyspankeista. Niiden tekijänoikeudet ja immateriaalioikeudet
   kuuluvat alkuperäisille haltijoille. Käyttäjällä ei ole oikeutta väittää
   omakseen, muokata kaupallisiin tarkoituksiin tai edelleen levittää
   kysymyspankin sisältöä.
5. Sovellus tarjotaan "sellaisenaan" ilman minkäänlaisia takuita. Tekijä ei
   vastaa virheellisistä vastauksista, tiedon puutteellisuudesta,
   mahdollisista vahingoista, välittömistä tai välillisistä menetyksistä tai
   muista sovelluksen käyttöön liittyvistä seurauksista.
6. Sovellus **EI** ole virallinen oppimateriaali eikä hyväksytty lähteiden
   korvaaja. Käytä aina ilmailuviranomaisten (Traficom, EASA, ICAO) virallisia
   julkaisuja, lentokoulun materiaaleja ja kouluttajien opastusta.
7. Sovellusta ei saa käyttää automatisoiduissa järjestelmissä, bottien,
   robottien tai vastaavien työkalujen kautta ilman lupaa.
8. Sovellus ei käytä evästeitä (cookies) eikä muita seurantateknologioita.
   Kaikki tallennettava tieto (tilastot, harjoitushistoria, teema-asetus,
   kokeiden tulokset) säilytetään ainoastaan käyttäjän oman selaimen
   paikallisessa muistissa (`localStorage`), eikä sitä lähetetä palvelimelle
   tai kolmansille osapuolille.
9. Käyttämällä tätä sovellusta hyväksyt nämä ehdot. Mikäli et hyväksy
   ehtoja, sinun on lopetettava sovelluksen käyttö välittömästi.

## Sovelluksen yleiskuvaus

PPL-harjoittelu on selainsovellus yksityislentäjän lupakirjan (PPL, LAPL)
teoriakokeisiin valmistautumiseen. Sovellus ei lähetä tietoja internetiin
eikä käytä evästeitä – kaikki tulokset tallentuvat vain tämän selaimen
paikalliseen muistiin (`localStorage`).

Sovellus sisältää kysymyksiä yhdeksästä moduulista. Jokaiseen kysymykseen on
neljä vaihtoehtoa (A–D) ja useimpiin liittyy selitys.

## Käyttöönotto

Avaa `PPL-harjoittelu.html` selaimessa (Chrome, Edge, Safari, iPad). Tämä
yksi tiedosto sisältää kaiken – käyttöliittymän, tyylit ja kysymysdatan.
Voit kopioida sen muistitikulle, lähettää sähköpostilla tai avata suoraan
paikallisesti. Mitään asennusta, kirjautumista tai internet-yhteyttä ei
tarvita.

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

## 1. Moduuliharjoitukset

Etusivulla näet kaikki moduulit. Klikkaamalla moduulia aloitat 20 kysymyksen
harjoituksen.

- Harjoituksessa näet heti, onko vastaus oikein vai väärin.
- Selitys aukeaa automaattisesti oikean vastauksen yhteyteen.
- Väärin vastatut kysymykset kertyvät virhehistoriaan.
- Tulokset tallentuvat automaattisesti ja vaikuttavat tilastoihin.

Läpäisyraja on 75 % (15/20 oikein). Moduulin nimen alla näkyy viimeisin
tuloksesi ja paras tuloksesi prosentteina.

### Miten kysymykset valitaan ja priorisoidaan

Harjoituksen 20 kysymystä eivät ole täysin satunnaisia, vaan valinta
priorisoi kysymyksiä seuraavassa järjestyksessä:

1. **Kysymykset, joita et ole vielä koskaan nähnyt** kyseisessä moduulissa,
   otetaan mukaan aina ensin. Näin koko kysymyspankki käydään läpi ennen
   kuin mikään kysymys toistuu, riippumatta pankin koosta.
2. Jos kaikki kysymykset on jo nähty tai ne eivät riitä täyttämään
   harjoitusta, loput kysymykset valitaan painotetulla arvonnalla, joka
   suosii voimakkaasti:
   - kysymyksiä, joita on nähty **harvemmin** kuin muita (mitä suurempi ero
     eniten nähtyyn kysymykseen, sitä moninkertaisesti todennäköisemmin
     kysymys valikoituu), ja
   - kysymyksiä, **joihin on aiemmin vastattu väärin** – jokainen
     virhevastaus kasvattaa kysymyksen todennäköisyyttä tulla uudelleen
     kysytyksi.
3. Lopuksi valittujen kysymysten **esitysjärjestys sekoitetaan**, jotta
   ensimmäistä kertaa nähtävät kysymykset eivät ole aina harjoituksen
   alussa.

Sama logiikka koskee myös "Kertaa virheet" -tilaa: painotus kohdistuu
automaattisesti vähiten nähtyihin ja useimmin väärin vastattuihin
kysymyksiin, jotta harjoittelu keskittyy heikkoihin kohtiin eikä toista
tarpeettomasti jo hyvin osattuja kysymyksiä. Sen sijaan All in One ja
"Selaa kysymyspankkia" käyvät kysymykset läpi kiinteässä
kysymysnumerojärjestyksessä, eivät painotetusti.

## 2. Trafi-koesimulaatio

Koesimulaatio jäljittelee virallista PPL-teoriakoetta. Voit valita, mitkä
moduulit sisällytät kokeeseen. Jokaisesta valitusta moduulista arvotaan 20
kysymystä.

- Kokeen aikana et näe oikeaa vastausta tai selitystä – vastaukset
  paljastuvat vasta lopussa.
- Kaikkien valittujen moduulien on oltava läpäisty (≥ 75 %), jotta koko
  koesarja katsotaan läpäistyksi.
- Tulokset tallentuvat Tilastot-sivun kohtaan "Koesimulaatiot".
- Voit keskeyttää kokeen, mutta keskeytetyltä kokeelta ei tallenneta tulosta.

## 3. Kertaa virheet

Tämä toiminto nostaa esiin kysymykset, joihin olet vastannut väärin
aiemmissa harjoituksissa. Virhehistoria kertyy automaattisesti jokaisen
harjoituksen ja koesimulaation jälkeen.

Kertaus painottaa sekä useimmin väärin vastattuja kysymyksiä että aiemmin
harvemmin nähtyjä kysymyksiä. Näin harjoittelu pysyy monipuolisena eikä
toista vain samoja kysymyksiä.

## 4. Kuvakysymykset

Kuvakysymyksissä näytetään liitteenä olevat kuvat (esim. sääkartat,
lentokenttäkaaviot, radiokuviot). Voit selata kuvakysymyksiä moduuli
kerrallaan.

Jos kuva ei lataudu, kysymyksen yhteydessä on linkki avata kuva
alkuperäisestä PDF-tiedostosta. Kuvakysymykset esitetään aina järjestyksessä
(moduuli kerrallaan, kysymysnumeron mukaan).

## 5. Selaa kysymyspankkia

Tämä toiminto näyttää valitsemasi moduulin kaikki kysymykset alkuperäisessä
numerojärjestyksessä ilman vastaamista – oikea vastaus on korostettu
suoraan vihreällä. Sopii nopeaan kertaukseen ennen harjoitusta.

Selaus ei vaikuta tilastoihin, virhehistoriaan eikä kysymysten painotukseen,
koska mihinkään ei vastata.

## 6. All in One

All in One käy valitun moduulin kaikki kysymykset läpi järjestyksessä
alusta loppuun samalla tekniikalla kuin normaalissa harjoituksessa: valitset
vastauksen A–D ja saat heti palautteen ja selityksen.

- Etenemä (mihin kysymykseen jäit) tallentuu automaattisesti
  moduulikohtaisesti, niin voit jatkaa myöhemmin.
- Moduulivalinnassa näet etenemispalkin ja voit jatkaa siitä mihin jäit, tai
  painaa "↺ Alusta" aloittaaksesi moduulin alusta.
- Väärin vastatut kysymykset kertyvät virhehistoriaan ja nähdyt kysymykset
  vaikuttavat kysymysten painotukseen samalla tavalla kuin tavallisissa
  harjoituksissa.
- Kun kaikki moduulin kysymykset on käyty läpi, näet yhteenvedon tuloksesta
  ja väärin menneistä kysymyksistä.

## 7. Tilastot

Tilastot-sivulla näet:

- Jokaisen moduulin harjoitusmäärän, viimeisimmän ja parhaan tuloksen.
- Koesimulaatiohistorian: läpäistyjen ja hylättyjen kokeiden määrän sekä
  yksityiskohtaiset tulokset viimeisimmistä kokeista.
- Aikaleimat suhteellisessa muodossa ("tunti sitten", "eilen" jne.).

## 8. Nollaa tulokset

"Nollaa tulokset" -toiminto tyhjentää kaikki harjoitustulokset,
virhehistorian, koesimulaatiohistorian ja All in One -etenemän pysyvästi.
Tätä toimintoa ei voi perua.

Huom: tietojen nollaus vaikuttaa vain tähän selaimeen.

## 9. Ulkoasu ja teema

Yläpalkin kuvakkeista voit vaihtaa tumman ja vaalean teeman välillä. Valinta
tallentuu selaimen muistiin.

## Vinkkejä tehokkaaseen harjoitteluun

- Aloita yhdestä moduulista kerrallaan ja yritä saada tasaisesti ≥ 75 %
  tuloksia ennen seuraavaan siirtymistä.
- Käytä "Kertaa virheet" -toimintoa säännöllisesti – se vahvistaa heikkoja
  kohtia.
- Tee koesimulaatioita vasta, kun olet harjoitellut kaikki moduulit läpi.
- Tarkista kuvakysymykset erikseen, jos et ole varma kuvien sisällöstä.
- Älä luota pelkästään sovellukseen – lue myös viralliset oppikirjat ja kysy
  kouluttajalta.

## Tietosuoja

Ohjelma ei lähetä mitään tietoa internetiin. Kaikki harjoitustulokset
tallentuvat ainoastaan paikallisesti selaimen `localStorage`-tilaan.

## Muutosloki

Katso sovelluksen kaikki versiomuutokset ja sisältökorjaukset tiedostosta
[`CHANGELOG.md`](./CHANGELOG.md).
