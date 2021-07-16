<template>
  <div>
    <div class="body">
      <div>
        <b-navbar class="navbar"> </b-navbar>
      </div>

      <div class="content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style>
.navbar {
  background-color: #fff;
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0px;
  top: 0px;
  box-shadow: 9px 6px 24px -2px rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

html {
  background-color: #f2f5fa;
}

.body {
  background-color: #f2f5fa;
  height: 100vh;
}

.content {
  border: 1px red;
  height: fit-content;
  width: 100%;
  margin-top: 100px;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
