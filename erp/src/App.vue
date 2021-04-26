<template>
  <div id="app">
    <ac-frame ref="frames" v-if="$route.name != null && $route.meta.needLogin !== false"></ac-frame>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
