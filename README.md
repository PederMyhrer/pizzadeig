# Pizzadeig

Napolitansk pizzadeig med poolish: en kalkulator som skalerer oppskriften og en side med fremgangsmåten steg for steg.

**Bruk den her:** https://pedermyhrer.github.io/pizzadeig/

| Side | Innhold |
|---|---|
| `index.html` | Forside med tidsplan og grunnoppskrift |
| `kalkulator.html` | Velg antall pizzaer, ballvekt og hydrering. Tar også imot `?n=6` i lenken |
| `fremgangsmate.html` | Fra poolish til ferdige deigballer |
| `style.css` | Felles stil, fonter og farger |
| `pizza.js` | Tegner margheritaen på canvas |

## Utgangspunktet

Oppskriften gir 3 pizzaer på cirka 250 g.

| Poolish | | Hoveddeig | |
|---|---|---|---|
| Vann | 300 g | Hele poolishen | |
| Mel | 300 g | Mel | 135 g |
| Gjær | 5 g | Salt | 15 g |
| Honning | 5 g | | |

## Slik regnes det

Poolishen er like mye vann som mel, og alt vannet i deigen ligger i den. Derfor er andelen mel i poolishen alltid lik hydreringen (69 % i originalen). Salt, gjær og honning følger totalt mel som bakerprosent: 3,45 %, 1,15 % og 1,15 %.

## Personvern

Ingen informasjonskapsler, ingen sporing og ingen eksterne ressurser. Fontene ligger i repoet, og alt regnes ut i nettleseren. GitHub Pages logger besøkendes IP-adresser av sikkerhetshensyn, se [GitHubs personvernerklæring](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Lisens

Koden er lisensiert under [MIT](LICENSE). Skriftene i `fonts/` (Abril Fatface, Caveat, Courier Prime og Figtree) er lisensiert under SIL Open Font License 1.1, med lisenstekst i samme mappe.
