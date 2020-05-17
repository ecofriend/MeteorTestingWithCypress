<template>
  <div>
    <label>Enter list title</label>
    <input type="text" data-test="listTitle" v-model="listValue" />
    <button data-test="submitTitle" @click="submitListTitle">Submit</button>
    <h2>{{ listTitle }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return { listValue: "", listTitle: "" };
  },
  methods: {
    submitListTitle() {
      this.listTitle = this.listValue;
      console.log(this.listTitle);

      this.listValue = "";
    }
  }
};
</script>

<style></style>
