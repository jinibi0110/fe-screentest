<template>
  <div>
    <CustomersTable />
  </div>
</template>

<script>
import CustomersTable from "../components/Table/CustomersTable.vue";

export default {
  layout: "Navbar",
  components: {
    CustomersTable
  }
};
</script>
