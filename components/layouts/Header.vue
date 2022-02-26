<template>
  <header class="ra-header">

    <SwitchLang/>
  </header>

</template>

<script>
import SwitchLang from '~/components/items/SwitchLang'

export default {
  name:       'Header',
  components: { SwitchLang }
}
</script>
