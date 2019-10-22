<template>
  <img class="loading" :src="$config.loadingImg" alt />
</template>

<style lang="scss" scoped>
.loading {
  @include pc-layout {
    margin: 100px auto;
    width: 100px;
  }
  @include sp-layout {
    margin: 150px auto;
    width: 80px;
  }
}
</style>
