<template>
  <div>
    <div>
      {{ subject_id }}
      {{ category }}
      {{ name }}
      {{ credit }}
      {{ class_year }}
      {{ instructor }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectData",
  props: {
    id: {
      type: String,
      required: true,
    },
    subject_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    instructor: {
      type: Array,
    },
    class_year: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
