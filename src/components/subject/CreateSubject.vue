<template>
  <div
    class="modal fade"
    id="createSubject"
    tabindex="-1"
    aria-labelledby="createSubjectLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createSubjectLabel">
            Create Subject
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">content to add</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-success">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateSubject",
};
</script>

<style></style>
