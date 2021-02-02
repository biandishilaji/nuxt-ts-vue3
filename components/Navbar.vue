<template>
  <div>
    <a href="#" @click.prevent="logout">Deslogar</a>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    // ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    logout() {
      this.$store.dispatch('account_auth/logout')
        .then(response => {

        })
        .catch(error => {

        })
    },
  }
}
</script>
