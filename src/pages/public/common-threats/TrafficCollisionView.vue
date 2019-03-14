<template>
  <info-panel :title="title" :img="img">
    <p>
      Zabezpiecz miejsce zdarzenia:
    </p>
    <ul>
      <li>zastaw miejsce wypadku oraz osoby udzielające pomocy bryłą swojego pojazdu, który musi mieć włączone światła awaryjne i postojowe (w warunkach nocnych konieczne są włączone światła mijania, to one oświetlą miejsce wypadku),</li>
      <li>w odpowiedniej odległości ustaw trójkąty ostrzegawcze (własny lub z pojazdów poszkodowanych),</li>
      <li>wykorzystaj światło ostrzegawcze latarki podręcznej,</li>
      <li>przy pomocy telefonu komórkowego (połączenie z numerami alarmowymi 998,997,999,112 jest bezpłatne ) lub radia CB wezwij służby ratownicze, policję, jeżeli nie możesz spełnić powyższego warunku, spróbuj zatrzymać inne pojazdy bo sam możesz nie być skuteczny w działaniu,</li>
      <li>jeżeli nie masz szans na pomoc innych, nie trać czasu zacznij działać sam, najważniejsze dla rannych bez pulsu i oddechu są pierwsze 4 minuty.</li>
    </ul>
    <br/>

    <p>
      Zbliżając się do pojazdów, które uległy wypadkowi:
    </p>
    <ul>
      <li>weź ze swojego pojazdu gaśnicę,</li>
      <li>weź ze swojego pojazdu apteczkę,</li>
      <li>weź ze swojego pojazdu narzędzie, którym będziesz mógł zbić szybę lub pomoże ci w otwarciu drzwi,</li>
      <li>weź ze swojego pojazdu nóż do cięcia pasów bezpieczeństwa lub inne ostre narzędzie, które może go zastąpić (scyzoryk, nóż myśliwski, itp.)</li>
      <li>oceń, czy pojazd nie ulegnie niekontrolowanemu niebezpiecznemu ruchowi lub przemieszczeniu,</li>
      <li>sprawdź czy z pojazdu (-ów) nie wycieka lub nie ulatnia się medium napędowe,</li>
      <li>zachowaj szczególną ostrożność,</li>
      <li>spróbuj zatrzymać inne pojazdy bo sam możesz nie być skuteczny w działaniu, jeżeli nie masz szans na pomoc innych nie trać czasu działaj sam.</li>
    </ul>

    <br/>
    <p>
      Wykonaj następujące czynności jeżeli jesteś przy pojazdach:
    </p>
    <ul>
      <li>sprawdź, które drzwi otwierają się i ułatwi to kontakt z poszkodowanymi,</li>
      <li>jeżeli drzwi nie dają się otworzyć, zbij szybę, w taki sposób, aby nie powodować dodatkowych urazów u poszkodowanych,</li>
      <li>zbijając szyby zachowaj szczególną ostrożność - pamiętaj, że szkło hartowane (najczęściej szyby boczne ) rozpada się na małe ostre kawałki, natomiast szyby klejone (zawsze szyba przednia i w większości przypadków tylna ) pękają, ale pozostają zwykle w jednym elemencie,</li>
      <li>dostań się do środka pojazdu, wyjmij kluczyki ze stacyjki, ale zostaw je w samochodzie,</li>
      <li>oceń czy dalsze czynności ratownicze na pewno nie zagrażają twojemu zdrowiu i życiu, w przypadku jeśli samochód stanie w płomieniach, użyj dostępnej Ci gaśnicy samochodowej - nie obawiaj się zbiornik paliwa nie eksploduje,</li>
      <li>jeśli stwierdzisz u poszkodowanych brak oznak pulsu i oddechu przystąp do ożywiania,</li>
      <li>najskuteczniejsze działania przedmedyczne wykonasz z dala od uszkodzonych pojazdów ewakuując poszkodowanych. Nie rób tego jednak, jeżeli nie umiesz zrobić tego prawidłowo, ponieważ możesz pogłębić urazy, a nawet spowodować śmierć poszkodowanego.</li>
    </ul>
    <br/>

    <p>
      Zaalarmuj służby ratownicze, a w przypadku gdy:
    </p>
    <ul>
      <li>samochód nie jest narażony na niekontrolowany ruch lub przemieszczenie,</li>
      <li>nie ma wycieków paliwa,</li>
      <li>odłączona jest instalacja elektryczna pojazdu,</li>
      <li>miejsce zdarzenia jest odpowiednio zabezpieczone,</li>
      <li>poszkodowani dają oznaki życia, ale są uwięzieni w pojeździe, - przystąp do udzielania im pierwszej pomocy (opatrzenia ran, tamowania krwotoków, ustabilizowania kręgosłupa i kończyn). Kontroluj oddech i czynności serca poszkodowanych, okryj ich kocem lub odzieżą w celu uniknięcia pogłębienia wstrząsu. Zostań przy poszkodowanych do czasu przybycia ratowników.</li>
    </ul>
    Pamiętaj aby wszystkie czynności wykonywać z rozwagą, bez niepotrzebnych emocji i dodatkowych zniszczeń, do czasu aż przybędą specjalistyczne służby ratownicze. Pamiętaj, że Ty również możesz się znaleźć w podobnej sytuacji.
  </info-panel>
</template>

<style scoped src="static/style/panel.css"></style>

<script>
export default {
  data() {
    return {
      img: "/static/threats/traffic-collision.jpg",
      title: "Wypadki drogowe"
    };
  }
};
</script>
