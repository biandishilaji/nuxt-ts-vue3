<template>
  <h1>
    {{ loggedInUser.name }}
  </h1>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  middleware: ['auth'],
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>
