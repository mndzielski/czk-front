<template>
  <div>
    <vc-section-header title="Numery alarmowe">
      <p>W tej sekcji zobaczysz numery alarmowe do służb ratunkowych:</p>

      <ul v-for="(emergencyNumber, index) in emergencyNumbers" :key="index" style="margin-left: 1rem;">
        <li v-text="emergencyNumber" class="my-1"></li>
      </ul>
    </vc-section-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emergencyNumbers: [
        "112 – centrum powiadamiania ratunkowego (jednolity ogólnoeuropejski numer alarmowy)",
        "981 – pogotowie drogowe",
        "983 – pogotowie weterynaryjne",
        "984 – WOPR",
        "985 – GOPR i TOPR",
        "986 – straż miejska (nie we wszystkich miastach)",
        "987 – centrum zarządzania kryzysowego",
        "991 – pogotowie energetyczne",
        "992 – pogotowie gazowe",
        "993 – pogotowie ciepłownicze",
        "994 – pogotowie wodno-kanalizacyjne",
        "995 – Komenda Główna Policji – system Child Alert",
        "996 – Centrum Antyterrorystyczne",
        "997 – policja",
        "998 – straż pożarna",
        "999 – pogotowie ratunkowe"
      ]
    };
  }
};
</script>
