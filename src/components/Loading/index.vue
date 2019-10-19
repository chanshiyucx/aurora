<template>
  <div class="loading">
    <img :src="$config.loadingImg" alt />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  img {
    margin: 1rem auto;
    width: 1rem;
  }
}
</style>
