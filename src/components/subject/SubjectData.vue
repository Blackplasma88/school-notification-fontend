<template>
  <div>
    <div>
      {{ subject_code }}
      {{ subject_category }}
      {{ subject_name }}
      {{ credit }}
      {{ year }}
      {{ instructor[0] }}
      {{ instructor[1] }}
      {{ instructor[2] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectData",
  props: {
    id: {
      type: Number,
      required: true,
    },
    subject_code: {
      type: String,
      required: true,
    },
    subject_category: {
      type: String,
      required: true,
    },
    subject_name: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    instructor: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
