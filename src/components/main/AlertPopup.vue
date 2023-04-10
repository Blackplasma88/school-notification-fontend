<template>
  <div
    v-if="openClose"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Alert</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="openCloseFunction()"
          ></button>
        </div>
        <div class="modal-body">
          <slot> </slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="'btn btn-' + variant"
            @click="openCloseFunction()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <button
      type="button"
      :class="'btn btn-' + variant"
      @click="openCloseFunction()"
    >
      Open
    </button>
  </div>
</template>

<script>
export default {
  name: "AlertPopup",
  props: {
    visible: Boolean,
    variant: String,
  },
  data() {
    return {
      openClose: this.visible,
    };
  },
  methods: {
    openCloseFunction() {
      this.openClose = !this.openClose;
    },
  },
  watch: {
    visible: function (newVal, val) {
      this.openClose = newVal;
      console.log("newVal: " + newVal + "==" + val);
    },
  },
};
</script>

<style></style>
