<template>
  <div>
    <Navbar/>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  name: 'default-layout',
  components: {
    Navbar
  }
}
</script>
