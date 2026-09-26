<template>
  <div class="linear-loading-indeterminate">
    <div class="bar"></div>
  </div>
</template>

<style lang="css" scoped>
.linear-loading-indeterminate {
  display: block;
  position: relative;
  width: 100%;
  height: 2px;
  background-color: var(--secondary-6);
  overflow: hidden;
  border-radius: 20px;
}

.linear-loading-indeterminate .bar {
  width: 50%;
  height: 100%;
  background: var(--secondary-32);
  border-radius: 20px;
  animation: indeterminateAnim 1.7s ease-in-out infinite;
}

@keyframes indeterminateAnim {
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(-200%);
  }
}
</style>
