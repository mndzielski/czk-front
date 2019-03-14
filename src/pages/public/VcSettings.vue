<template>
    <div>
        <vc-section-header title="Ustawienia">
            <div>W tej sekcji możesz zmienić swoje ustawienia. Ustawienia będą dotyczyć tylko
                tej przeglądarki.
            </div>
        </vc-section-header>

        <vc-section-headline title="Moje województwa">
            <p>W tej sekcji możesz ustawić województwa z których chcesz otrzymywać
                powiadomienia.</p>
            <v-switch
                    style="margin-top: 0px;"
                    label="wszystkie"
                    v-model="checkAllProvinces"
                    hide-details
            ></v-switch>
            <v-switch
                    style="margin-top: 0px;"
                    v-for="(item, index) in administrativeDivisions"
                    :key="index"
                    :label="item.NAME | lowercase"
                    :value="item.PROVINCE"
                    v-model="checkedProvinces"
                    multiple
                    hide-details
            >
            </v-switch>
        </vc-section-headline>
    </div>
</template>

<script>
    import {AdministrativeDivisions} from "@/assets/AdministrativeDivisions";

    var LocalStorageManager = {
        get: function (key, defaultValue) {
            var item = localStorage.getItem(key);
            var val = JSON.parse(item === undefined ? null : item);
            return val !== null ? val : defaultValue;
        },
        set: function (key, val) {
            if (val) localStorage.setItem(key, JSON.stringify(val));
        }
    };

    export default {
        data: function () {
            return {
                administrativeDivisions: AdministrativeDivisions.getNames(),
                checkedProvinces: LocalStorageManager.get(
                    "checkedProvinces",
                    AdministrativeDivisions.getProvinces()
                )
            };
        },
        computed: {
            checkAllProvinces: {
                get: function () {
                    if (this.checkedProvinces.length !== 0) LocalStorageManager.set("checkedProvinces", this.checkedProvinces);
                    return !!this.administrativeDivisions
                        ? this.checkedProvinces.length === this.administrativeDivisions.length
                        : false;
                },
                set: function (newValue) {
                    this.checkedProvinces =
                        newValue === true ? AdministrativeDivisions.getProvinces() : [];
                }
            }
        }
    };
</script>

