<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div class="name"></div>
        <div class="date"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
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
        <div style="color: rgb(175, 175, 175)">
            https://github.com/thorlindberg/thesis
        </div>
        <div class="author">
        </div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div class="name"></div>
        <div class="date"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="width: 45%">
            <div style="font-size: 2em">
                Lorem Ipsum
            </div>
            <br>
            Phasellus aliquet convallis arcu in aliquam. Pellentesque lectus orci, vulputate a blandit eget, pretium vel lectus. Aenean ultricies augue at elit rhoncus, quis hendrerit erat egestas. Sed sit amet efficitur sem. Pellentesque euismod, odio eu imperdiet facilisis, mi tortor mattis arcu, a tincidunt sem mauris id est. Maecenas sollicitudin eros ut bibendum sagittis. Suspendisse mattis, risus et luctus lacinia, nisl neque dictum nibh, non hendrerit orci libero non nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed volutpat, ex a sodales semper, turpis mauris accumsan erat, quis malesuada tellus mi non augue. In ultrices dictum dui, quis lacinia mauris hendrerit ac. Donec malesuada viverra elementum. Cras erat turpis, euismod eu tempus vel, cursus non neque. Sed semper tellus bibendum mi consectetur aliquet.
            <br><br>
            In ultrices dictum dui, quis lacinia mauris hendrerit ac. Donec malesuada viverra elementum. Cras erat turpis, euismod eu tempus vel, cursus non neque. Sed semper tellus bibendum mi consectetur aliquet. Suspendisse interdum auctor turpis sed ultrices. Vestibulum sollicitudin nisi at tellus dictum auctor vel sit amet tellus.
        </div>
        <img style="width: 45%" src="
            http://www.plantuml.com/plantuml/svg/FSjH2i8m3CRnzvoY5nXUO8oX0rzy4Zn0MBivJ9kIfiWGxsvWctdw_Zz8NnH5QoI0jkXAeOEHi9HXmLamkWyukpEEhwjmJVx2nE9KC9MC4fB25zhJ_WaJisieJDfqpjSOrvljJMMPdt--M-nUyu6Fl8ddTpfii0rzI1Rq0m00
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(175, 175, 175)">
            Source
        </div>
        <div class="author">
        </div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div class="name"></div>
        <div class="date"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <img src="
            http://www.plantuml.com/plantuml/svg/TOx1YeCm48RlynG3UzPz0Lb4XJqjx2iCEYkooQHaaeEqldlJr5eiTauXyt_p_RK6yY5Q0r1fc0r_0VQ6LBk9HayMpz1G___jNPIXTSPv39v4J-HP0YnGVQuOP0mRKcvlBm0XoodOCmg7SeZMplZHvKbdCKsvfR6w50N-ibSdUVN372OPqJs_3v1739PNtPzpMRAfo_iLpDWcUjDW1nvKIRezcEDHelAmYg1cIRov0W00
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(175, 175, 175)">
            Source
        </div>
        <div class="author">
        </div>
    </div>
</div>

<script>

    var dates = document.querySelectorAll(".date");
    for (var i = 0; i < dates.length; i++) {
        dates[i].style.color = "rgb(175, 175, 175)"
        dates[i].innerHTML = `Compiled on ${new Date().toLocaleString('en-US', {month: 'long'})} ${new Date().getDate()}. ${new Date().getFullYear()}`
    }

    var names = document.querySelectorAll(".name");
    for (var i = 0; i < names.length; i++) {
        names[i].style.color = "rgb(175, 175, 175)"
        names[i].innerHTML = "Master's Thesis for Master's in Information Technology"
    }

    var authors = document.querySelectorAll(".author");
    for (var i = 0; i < authors.length; i++) {
        authors[i].style.color = "rgb(175, 175, 175)"
        authors[i].innerHTML = "Authored by Thor Wessel Lindberg"
    }

</script>