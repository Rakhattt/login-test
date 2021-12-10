<template>
    <div>
        <h4>Вы успешно вошли,поздравляем!</h4>
<!--        <button @click="backRegistration" class="further w-50"></button>-->
    </div>
</template>
<script>
  export default {
      methods: {
          backRegistration () {
              this.$router.push('/registration')
          }
      }
  }
</script>
<style>

</style>
