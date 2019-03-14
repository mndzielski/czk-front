<template>
  <vc-section-header
    title="Zaloguj się"
    :max-width="'500px'"
    style="margin: auto;"
  >
    <v-form
      v-model="form.valid"
      class="block mb-3"
      ref="form"
      lazy-validation
      autocomplete="off"
    >
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              solo
              v-model="email"
              name="username"
              :rules="[$rules.required, $rules.email]"
              label="Email"
              placeholder=" "
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              solo
              v-model="password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[$rules.required]"
              name="password"
              label="Hasło"
              placeholder=" "
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="handleSubmit"
                :disabled="form.login && !status.loggingIn"
                :loading="status.loggingIn"
                color="primary"
              >
                Zaloguj się
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </vc-section-header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        valid: false
      },
      email: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const { email, password } = this;
        this.login({ username: email, password });
      }
    }
  }
};
</script>