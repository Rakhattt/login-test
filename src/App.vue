<template>
  <div id="app">
    <header>
      <div class="container">
        <ul class="nav">
          <router-link v-for="link in reference" :key="link.title" tag="li" :to="link.url"><a v-text="link.title"></a></router-link>
        </ul>
      </div>
    </header>
    <router-view/>
  </div>
</template>
<script>
  export default {
    computed: {
      reference () {
        return [
          { title: 'registration', url: '/' },
          { title: 'login', url: '/login' },
        ]
      }
    }
  }
</script>

<style lang="less">
</style>
