<template>
  <div class="w-screen">
    <h1 class="text-center">Geocoder</h1>
    <div class="w-6 mx-auto" style="margin-bottom: 100px;">
      <div class="mb-1 flex justify-content-center align-items-center">
        <p-input-text @keyup.enter="findByQuery" v-model="query" v-if="!isCoordinates" type="text" placeholder="Поиск по названию" class="w-full"/>
        <div v-else class="w-full flex justify-content-between">
          <p-input-text @keyup.enter="findByCoordinates" v-model="longitude" type="text" placeholder="longitude" class="w-full mr-2"/>
          <p-input-text @keyup.enter="findByCoordinates" v-model="latitude" type="text" placeholder="latitude" class="w-full"/>
        </div>
        <p-button @click="search" class="ml-2" icon="pi pi-search" severity="info"/>
      </div>
      <div class="flex align-items-center">
        <p-checkbox v-model="isCoordinates" :binary="true" inputId="coordinates" value="coordinates"></p-checkbox>
        <label class="ml-2" for="coordinates">Поиск по координатам</label>
      </div>
    </div>
    <hello-world class="mx-auto" ref="globe"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {

  components: {
    HelloWorld
  },
  data() {
    return {
      isCoordinates: false,
      query: "",
      longitude: "",
      latitude: "",
    };
  },
  methods: {
    async findByQuery() {
      let response = await fetch(`http://localhost/geocoder/search?query=${this.query}`);
      let data = await response.json();
      this.$refs["globe"].setAddress(data.address, data.latitude, data.longitude)
    },
    async findByCoordinates() {
      if (!this.longitude || !this.latitude) {
        return true;
      }
      let response = await fetch(`http://localhost/geocoder/reverse?latitude=${this.latitude}&longitude=${this.longitude}`);
      let data = await response.json();
      this.$refs["globe"].setAddress(data.address, data.latitude, data.longitude)
    },
    search() {
      if (this.isCoordinates) {
        this.findByCoordinates()
      } else {
        this.findByQuery()
      }
    }
  },
}
</script>
<style>

</style>
