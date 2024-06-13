<script setup lang="ts">
  function handleClick() {
    if (document.documentElement.getAttribute('data-mode') != 'dark')
      document.documentElement.setAttribute('data-mode', 'dark');
    else
      document.documentElement.setAttribute('data-mode', 'white');
  }
</script>

<template>
  <div class="toggle_button">
    <input id="language-toggle" class="toggle_input" type='checkbox' @click="handleClick"/>
    <label for="language-toggle" class="toggle_label" />
  </div>
</template>

<style>
.toggle_button {
  position: relative;
  width: 40px;
  height: 20px;
  margin: auto 10px;
}

.toggle_input {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.toggle_label {
  position: relative;
  display: block;
  width: 40px;
  height: 20px;
  background: var(--vt-c-text-dark-2);
  border-radius: 40px;
  transition: 0.4s;
  box-sizing: border-box;
}

.toggle_label:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: var(--vt-c-white-soft);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}

.toggle_input:checked + .toggle_label {
  background-color: var(--vt-c-red);
}

.toggle_input:checked + .toggle_label:after {
  left: 20px;
}

</style>