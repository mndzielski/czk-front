<template>
  <info-panel :title="title" :img="img">
    <h3>W sytuacji zagrożenia powodziowego:</h3>
    <ul>
      <li>słuchaj komunikatów lokalnych stacji radiowych i telewizyjnych,</li>
      <li>jeśli to możliwe, wyślij dzieci i osoby starsze w bezpieczne miejsce, np. do znajomych czy rodziny,</li>
      <li>upewnij się, że wszyscy członkowie rodziny, zwłaszcza dzieci, wiedzą co robić, ustal sposób kontaktu i ewakuacji,</li>
      <li>naucz najbliższych członków rodziny odłączania źródeł energii, gazu i wody,</li>
      <li>miejsca przeznaczone do spania i wartościowe przedmioty przenieś na górne kondygnacje budynku,</li>
      <li>złóż w bezpiecznym miejscu lekarstwa, dowody tożsamości, kosztowności, pieniądze, dokumenty dotyczące nieruchomości i gruntów, dokumentację działalności gospodarczej i polisy ubezpieczeniowe,</li>
      <li>zgromadź w domu niezbędną ilość żywności o przedłużonej trwałości, wodę, przygotuj też odpowiednią odzież, latarki, koce i środki higieniczne,</li>
      <li>dbaj, aby telefon komórkowy był zawsze w pełni naładowany,</li>
      <li>pojazdy odprowadź w miejsce niezagrożone powodzią,</li>
      <li>zabezpiecz budynek i przygotuj worki z piaskiem,</li>
      <li>zaraz po ogłoszeniu alarmu powodziowego rozważ ewakuację zwierząt – jest ona zawsze dużo trudniejsza i zajmuje dużo czasu, a sprzęt pływający, którym dysponuje straż pożarna i wojsko często nie nadaje się do ewakuacji dużych zwierząt,</li>
      <li>przygotuj zwierzęta hodowlane do ewakuacji, porozmawiaj z sąsiadami o wzajemnej pomocy przy załadunku,</li>
      <li>paszę dla zwierząt przenieś w niezagrożone zalaniem miejsce,</li>
      <li>zabezpiecz substancje niebezpieczne, takie jak pestycydy, środki owadobójcze, farby, lakiery, rozpuszczalniki i inne środki chemiczne,</li>
      <li>zabezpiecz zbiorniki z olejem, paliwem itp.,</li>
      <li>jeśli masz sprzęt pływający, utrzymuj go w sprawności (pontony, łodzie itp.) i używaj wyłącznie w razie zagrożenia życia,</li>
      <li>przygotuj się do ewakuacji.</li>
    </ul>
    <p>Pamiętaj, że pozostawanie na zalanym terenie to ogromne ryzyko; oprócz bezpośredniego zagrożenia utonięciem, musisz liczyć się z narażeniem na choroby zakaźne, brakiem prądu, wody i kanalizacji. W razie konieczności możesz na czas nie uzyskać pomocy medycznej.</p>
    <br/>
    <h3>W trakcie powodzi:</h3>
    <ul>
      <li>wyłącz instalację elektryczną i gazową oraz zabezpiecz sieć kanalizacyjną lub szambo,</li>
      <li>w razie zagrożenia życia lub zdrowia dzwoń na numer alarmowy
        <a href="tel:112">112</a>,</li>
      <li>w przypadku niebezpieczeństwa natychmiast przejdź na wyżej położone tereny,</li>
      <li>jeśli masz telefon komórkowy, miej go zawsze przy sobie i zadbaj, aby bateria była naładowana,</li>
      <li>ustaw radioodbiornik zasilany bateriami na częstotliwość lokalnej stacji radiowej, aby słuchać najnowszych informacji o sytuacji i sposobach postępowania,</li>
      <li>przygotuj się do ewentualnej ewakuacji, pamiętając o tym, że osoby dorosłe powinny mieć przy sobie nie więcej niż 50 kg bagażu (do 20 kg na osobę),</li>
      <li>miej przy sobie apteczkę pierwszej pomocy i niezbędne, używane przez domowników leki, zapas jedzenia i wody pitnej, ciepłe ubrania, śpiwory i koce (zgromadzone w górnych partiach domu lub mieszkania),</li>
      <li>nie używaj wody ze studni ani wody gruntowej, ponieważ może być skażona.</li>
    </ul>
    <br/>

    <h3>
      <strong>Ewakuacja:</strong>
    </h3>
    <ul>
      <li>w przypadku nakazu opuszczenia domu, wydanego przez miejscowe władze (starosta, wójt, burmistrz, prezydent miasta) lub służby, zrób to natychmiast,</li>
      <li>stosuj się do poleceń wydawanych przez prowadzących ewakuację,</li>
      <li>przed opuszczeniem domu, dzieciom znajdującym się pod Twoją opieką przypnij do ubrań karteczkę z imieniem i nazwiskiem oraz danymi kontaktowymi opiekunów,</li>
      <li>pamiętaj, aby zabrać ze sobą przygotowane wcześniej rzeczy (niezbędne leki, ważne dokumenty, kosztowności, pieniądze, telefon komórkowy itp.) – bagaż nie może przekraczać w sumie 50 kg (do 20 kg na osobę),</li>
      <li>zarejestruj się w punkcie ewidencyjnym&nbsp;– w ten sposób łatwiej odnajdzie cię rodzina.</li>
    </ul>
  </info-panel>
</template>

<style scoped src="static/style/panel.css"></style>

<script>
export default {
  data() {
    return {
      img: "/static/threats/flood.jpg",
      title: "Powodzie"
    };
  }
};
</script>
