<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" class="nav-link">Create</router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" class="nav-link">Posts</router-link>
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>


<script>
export default {
  name: "app"
}
</script>

