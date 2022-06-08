<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Master's Thesis for Master's in Information Technology
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <div style="
            font-size: 3em;
            line-height: 1.5em;
        ">
            Type-Extensible Object Notation:
            <br>
            JSON with Syntax for Types
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            https://github.com/thorlindberg/thesis
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Grammatical Notation of the TXON Proposal
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <div style="width: 45%">
            <div style="font-size: 2em">
                Test-Driven Development
            </div>
            <br><br>
            Development driven by testing has implications not only for the approach to implementation, but also the structure of the code itself and the overall practices surrounding projects. As each feature needs to be developed on a foundation of demonstrable necessity, the process must be divided into small enough steps for testing to be possible. The testing of a smaller component in a large codebase is referred to as `unit tests`, as each component becomes a testable `unit`. They provide a clear and measurable success criteria, which ensures that the requirements for a project are met with confidence. {"cite":"beck2003testdriven"} popularised TDD and his rules for writing unit tests are:
            <br><br>
            - Execution time should be short, resulting in fast testing.
            - Tests should be executed in isolation from each other, resulting in unordered tests.
            - Use production data when applicable, and ensure data is readable and understandable.
            - Each test should represent a component of a larger overall goal with the project.
        </div>
        <img style="width: 45%" src="
            http://www.plantuml.com/plantuml/svg/ZOzFIyH03CNl-HJv02xUPLdM_oT1zBXu29tG3fqcPP8gY-ntTrgAKgoBSvlaz_BUsvjJzg5B0DP6wIbJXoaA-x5drEoD0cpDZubtK6dNgx3uNQHw13y1oxkXgdtCEaYurQGPFPDOkLJ0QVyjc_arpKSJdQVj2KwmlPmTuNMCXviSwyOtEppWTGX8w6oERx3yucOYNWP1RtWQMe5-JMRkYLf6AcNT4sFLaDHSbbTuUA2OYcwTMBUXcgAicCtpdmRt4aQBPpAxmC3ldBJlM1pDjRU_qowApWVEsFspuJdrckCoSgNYKGOkGM3F4eOkVG40
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            A recursive test-driven development cycle.
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Grammatical Notation of the TXON Proposal
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <div style="width: 45%">
            <div style="font-size: 2em">
                Grammatical Notation
            </div>
            <br><br>
            This project contributes to existing implementations of the JSON specification by proposing a grammar for explicit and extensible typing of values. This proposal is phrased as the <code>Type-Extensibe Object Notation</code> (TXON) which is a format that conforms completely to the JSON specification, and as such it maintains full compatibility with existing JSON encoders and decoders. The TXON format is paired with the <code>TXON.js</code> library written in JavaScript, to validate the functional implementation and its use in a data structure, by checking conformance to its embedded type system.
            <br><br>
            A TXON data structure must contain an "init" and "data" property to be validated, but this is not expected to cause issue as JSON structures typically branch from a "data" property at the root node. As such the format is extensibly adding information on types, while maintaining as much of the original structure as possible.
        </div>
        <div style="width: 45%">
            <img style="height: 45%" src="
                http://www.plantuml.com/plantuml/svg/RP112i8m44NtSueXQy6DAobILF02Nc1ieeqsIPbCaIAzkqbQHC79vcV-VtoOEWgn3Aw3MTrZy01LbB4pEyY_ewKRayCNO9ezDOyJXy7hG-W2ep3vs1CRByNtGPib-Y_-RAsOuaumGRLUUc0cLEvJsyGhJK95uTSe5xoqQRrP_UwrYGtRNcp1rRarMA8OhkX6l5XEs0UP83-eZTUvi8XqWJS0
            ">
            <img style="height: 45%" src="
                http://www.plantuml.com/plantuml/svg/TP51JiD034NtFeKrwmeshAeALO341RY0cp5aeB4ZZok8KEvEPrf57PKw6qVlVxrOsMOdyy-i0h39Fktv4ShRIw8Fem5_0O_pHDtNg-b1uhFkrT2D98zaB5wvQEHpzB_uTv-SAvrXXitzsGEdHl0VbR0-zaEIv7N3Ymbo67PiTv6S6xW4Eig5X475-z3m6PPj1KiXajErvxR0fx6GvajMrx6JVuqF3IhYHiEvipHwgbU7jvwn5b7VSPXmb-poY1dA0rkMMFxB7m00
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Comparison of a TXON data structure and JSON data structure.
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Grammatical Notation of the TXON Proposal
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <img src="
            http://www.plantuml.com/plantuml/svg/pLJ1JiCm3BtdAwPmhU28X2Oq0H8tJjpO3gR9ja3YL8a3cr3_dMMj8hIvWvv6fLPf_9ptdcjt5Wa29MT5jtgB7eMOHjfQVIlosuE1LG0t-HAJtNK7zVjZy0dLlRS-J2W0nWQ2Hjh7qIlTGpduvzgGBj6rMQtjxgQImMTTB9UglbO5quhksOhfLQzKT2V8kJHeo80rKOUvb3S_ZfQqRNJPERrR8a_W-6XFbp5x7fcBzPpFgdYiCsXSSXcAoRtgC0Y4pT-0IYyXMSh03x1faBa9lj61jeoFCLx6-ndlYVV5Gjjgw9lK43iVBmKnN1CMiX17RE84jzGRqXYDHxR4fPoNN4Vnklv9HvspneVpNecUMm71uMmRZ0HOwoD51SDtEe8hBbdjV1EsrQyaNLfaYyHdZP0uGYel-LmY1Di6J7nHVl9Yfb7bMTWlahFV
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            http://www.plantuml.com/
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Implementation
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <div style="width: 45%">
            <div style="font-size: 2em">
                Data Structure
            </div>
            <br><br>
            Phasellus aliquet convallis arcu in aliquam. Pellentesque lectus orci, vulputate a blandit eget, pretium vel lectus. Aenean ultricies augue at elit rhoncus, quis hendrerit erat egestas. Sed sit amet efficitur sem. Pellentesque euismod, odio eu imperdiet facilisis, mi tortor mattis arcu, a tincidunt sem mauris id est. Maecenas sollicitudin eros ut bibendum sagittis. Suspendisse mattis, risus et luctus lacinia, nisl neque dictum nibh, non hendrerit orci libero non nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed volutpat, ex a sodales semper, turpis mauris accumsan erat, quis malesuada tellus mi non augue.
            <br><br>
            In ultrices dictum dui, quis lacinia mauris hendrerit ac. Donec malesuada viverra elementum. Cras erat turpis, euismod eu tempus vel, cursus non neque. Sed semper tellus bibendum mi consectetur aliquet. Suspendisse interdum auctor turpis sed ultrices. Vestibulum sollicitudin nisi at tellus dictum auctor vel sit amet tellus.
        </div>
        <img style="width: 45%" src="
            http://www.plantuml.com/plantuml/svg/xLPVQzi-57tNfp3wlOOsTkFyI2cZQyj6wIXbO-nXxE76lhNLofAHhhfb8zzhx_jYyv_8gzCu2u5jBpKas3hdtdkEE22TMW93hf2iVRkpMZ5sOcaXyGMhlou4P0QAu1iBgkSCallNHZkLdckfJK06b2t1eA86Lph55NKJ_NCk23iq5rakgn_vYe6g_svlPzNJSPQi_L-oayELKjPsu92c1gtbnm6_-l5zZYg71pKApYHcAHJs0U-26H-rt2G7a-6D5ehgWe--_veQdcYbC25j-godx7uLb908Mjn_gAecHwC1bkzzcTQQGpx0eqM93INSGhY60kikBy-7sZo04Q384x_o9xJbQ2-3yNWtWz5l3KOx6BpOrU2N3GPxAv_wVRX8c_vN48x7V0qhT8gojJ48-y70sTCTVGxMSx3cqTPW3S9-yFmF1cizCdzrHnUUjpKEuV_n_idwvvdPs-5EqKgEjaPh4FRw4ju_OVqWNclhdwZS8zefCejslb_CjRDuxOevcXhmvsshCuxzbtsheH0gUwCJ8A5L1P9nsC7li12bcqkHh2El73c3_LK99CYbs8mucCwcit3YeTM0onHLHLgfBS6GGiCxaifyWp0wYAVJyIHQOGeAtEnVbwYYIONTWhHUIfbhzSX_61rDOkunaTJQtnjPGpbHQOyF3qK16Huu8pkQjWJoN3ToUFJhjE6ctRIRLdsNmNKxbWmYUVZHzOUp9MEdgDBcfbU_k4B-1000
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Data sample from GitLab provided to me by the company.
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Implementation
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <div style="width: 45%">
            <div style="font-size: 2em">
                Relational Types
            </div>
            <br><br>
            Phasellus aliquet convallis arcu in aliquam. Pellentesque lectus orci, vulputate a blandit eget, pretium vel lectus. Aenean ultricies augue at elit rhoncus, quis hendrerit erat egestas. Sed sit amet efficitur sem. Pellentesque euismod, odio eu imperdiet facilisis, mi tortor mattis arcu, a tincidunt sem mauris id est. Maecenas sollicitudin eros ut bibendum sagittis. Suspendisse mattis, risus et luctus lacinia, nisl neque dictum nibh, non hendrerit orci libero non nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed volutpat, ex a sodales semper, turpis mauris accumsan erat, quis malesuada tellus mi non augue.
            <br><br>
            In ultrices dictum dui, quis lacinia mauris hendrerit ac. Donec malesuada viverra elementum. Cras erat turpis, euismod eu tempus vel, cursus non neque. Sed semper tellus bibendum mi consectetur aliquet. Suspendisse interdum auctor turpis sed ultrices. Vestibulum sollicitudin nisi at tellus dictum auctor vel sit amet tellus.
        </div>
        <img style="width: 45%" src="
            http://www.plantuml.com/plantuml/svg/tLF1IiH03BtdAygS5xnBAOiAuaMyUOvjw8uxJKecHOlqtztf5kb0mRteONjAyjxBItdCFXgg3Ls0S_KUXG7AQ6EW2bBtuB5Lx8elA4xV7TR7HvM1cti9eeKfSknHYMt6MHfQg5lqZuCtcj499YXl5XyuAvnz2hlRbTvvzfPDvccG6irdt1LQ7r1RUX7F5ayCXweukemtxM13qYV9zaxVf4tHr7FhTXkUmaorYLxYc0akyLlHdoK76X_xWEFJB_SnTfGBZw-fvw5x8qrzx8dMI_Bh8Q-Mlt5AOGu2mn_5LgwIgVu_m_9dLbrrd301x8cR-VcdOkZ2Dm00
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Current and alternative implementation of relational type declarations.
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            System architecture using TypeScript on GitLab
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <img src="
            http://www.plantuml.com/plantuml/svg/ZLBHRjim37pNL_07XFr0O7HhqQx0XXLOjfSW3upD95nbIQFe1S7GVn_Yr9CZnq1U38X7ykxekqkAebthZ4clx2CAjk3OanuZGH3T1sCMIO-EAbE7DWPFNXyOTwV6lmO0u1FMhqyIEj_S1nS4LD2dY49UUtmhsD9xxxN-mvwLUlIj__wdkN7cpIm-l2iqPwvxntbyzJ56npKg1myl4axAM_OxUFPAiiMQrbbcJqI-6L6ldZqheuC65I6fTBLsGkk1VI1zOls2cu5qUOpqlHQE2d_GSTFJhy_OptE1cd9bNlR8GXjCDAnxGCNJUmssYxQ2rIDxTFFp8y_3YX-997iUf30Tu6jeo8sFq1V69_Ys-KMrZfWoz7cvV06XtnqbdPPJ33wDRrNA0EjegxQwb39-W1NUxVkMShReizLKQR5hOUtLdaa9R1CEtbQbmSjdrdPBoegZPEjJGURw3yuZnNtD3VpPqboYvu1iSoxNPWOOuZeV-LbecCtPD-QEVDErxXy0
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            http://www.plantuml.com/
        </i>
        <div class="date"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            System architecture using the TXON.js library
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        padding: 1.5cm;
    ">
        <img src="
            http://www.plantuml.com/plantuml/svg/ZLBHRjim37pNL_07XFr0O7HhqQx0XXLOjfSW3upD95nbIQFe1S7GVn_Yr9CZnq1U38X7ykxekqkAebthZ4clx2CAjk3OanuZGH3T1sCMIO-EAbE7DWPFNXyOTwV6lmO0u1FMhqyIEj_S1nS4LD2dY49UUtmhsD9xxxN-mvwLUlIj__wdkN7cpIm-l2iqPwvxntbyzJ56npKg1myl4axAM_OxUFPAiiMQrbbcJqI-6L6ldZqheuC65I6fTBLsGkk1VI1zOls2cu5qUOpqlHQE2d_GSTFJhy_OptE1cd9bNlR8GXjCDAnxGCNJUmssYxQ2rIDxTFFp8y_3YX-997iUf30Tu6jeo8sFq1V69_Ys-KMrZfWoz7cvV06XtnqbdPPJ33wDRrNA0EjegxQwb39-W1NUxVkMShReizLKQR5hOUtLdaa9R1CEtbQbmSjdrdPBoegZPEjJGURw3yuZnNtD3VpPqboYvu1iSoxNPWOOuZeV-LbecCtPD-QEVDErxXy0
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            http://www.plantuml.com/
        </i>
        <div class="date"></div>
    </div>
</div>

<script>

    var names = document.querySelectorAll(".name");
    for (var i = 0; i < names.length; i++) {
        names[i].style.color = "rgb(195, 195, 195)"
        names[i].innerHTML = "Type-Extensible Object Notation: JSON with Syntax for Types"
    }

    var dates = document.querySelectorAll(".date");
    for (var i = 0; i < dates.length; i++) {
        dates[i].style.color = "rgb(195, 195, 195)"
        dates[i].innerHTML = `${new Date().toLocaleString('en-US', {month: 'long'})} ${new Date().getDate()}. ${new Date().getFullYear()}`
    }

</script>