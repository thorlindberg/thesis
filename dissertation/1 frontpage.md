<p align="center">
<b style="font-size: 1.515em">
Type-Extensible Object Notation: JSON with Syntax for Types
</b>
</p>

<p align="center">
Master's Thesis for Master of Science in Information Technology
</p>

<p align="center">
Compiled on {"date":"m-d-y"}. Character count {"count":"char"}.
</p>

<br>

<p align="center">
Thor Wessel Lindberg
<br>
IT University of Copenhagen
<br>
Student no.: 17858
</p>

<br>

<b><i>Abstract—</i></b>Object-oriented programming enables the construction of typed objects modeled on their real-world counterparts. In a distributed and heterogeneous computing system these typed objects are transmitted between programming languages, which necessitates their encoding and consequent decoding through an intermediary data interchange format. Intermediaries such as the JavaScript Object Notation (JSON) were designed for universality and dynamically typed languages, and as such are weakly and implicit typed. As a consequence the use of JSON necessitates strong and aggressive validation processes, to guard against hypothetical software errors and consequent crashes. This report explores this problem area, and presents a proposal for a Type-Extensible Object Notation (TXON) superset format of JSON. In contrast to previous work towards stronger and explicitly typed intermediaries, the TXON format conforms to the JSON specification and as such maintains its universality. The TXON format is paired with a TXON.js validation library written in JavaScript, which is the result of a test-driven development process. The TXON.js library was developed to substitute a TypeScript validation process, and the results of its evaluation indicate that it is capable of declaring, instantiating, and checking typed values of an object.

<b><i>Referat—</i></b>Objekt-orienteret programmering har gjort det muligt at konstruere typede objekter som er modeleret på deres modparter i den virkelige verden. I et distribueret og heterogent computer system sendes typede objekter mellem programmerings sprog, hvilket nødvendiggøre kodning og konsekvent afkodning gennem et mellemled data udvekling format. JavaScript Object Notation (JSON) er et mellemled designet til universalitet og dynamisk typede sprog, og er derfor svagt og implicit typedet. Konsekvent nødvendiggøre brug af JSON en stærk og aggressiv valideringsproces, som vagt mod hypotetiske software fejl og konsekvente nedbrud. Denne rapport udforsker dette problemområde, og præsenterer et forslag for et Type-Udvidet Objekt Noterering (TXON) superset format af JSON. I kontrast til tidligere arbejde mod stærkere og mere eksplicitte typede mellemled, tilpasser TXON formatet sig til JSON specificeringen og bevare hermed dens universalitet. TXON formatet parres med et TXON.js validerings bibliotek skrevet i JavaScript, som er resultatet af en test-drevet udviklingsproces. TXON.js biblioteket blev udviklet for at erstatte en TypeScript valideringsproces, og resultaterne indikerer at biblioteket understøtter deklaration, instansiering, og tjek af typede værdier i et objekt.

{"break":true}