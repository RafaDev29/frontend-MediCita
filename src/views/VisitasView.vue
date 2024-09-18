<template>
    <div class="pt-0 mt-0 pb-10 ml-0 mr-0 min-w-max[100%]">
      <v-card-title class="d-flex justify-between">
        <h1 class="font-bold lg:text-2xl text-xl text-gray-400">VISITAS MEDICAS</h1>
  
        <!-- Botón para abrir el modal de crear internamiento -->
        <v-btn color="primary" class="white--text" @click="openCreateModal" style="margin-left: auto;">
          Crear +
        </v-btn>
      </v-card-title>
  
      <v-row>
        <v-col cols="12">
          <!-- Tabla de internamientos -->
          <VisitaTable />
        </v-col>
      </v-row>
  
      <!-- Modal para crear el internamiento -->
      <v-dialog v-model="showCreateModal" max-width="500px">
        <CreateVisitaModal @close="showCreateModal = false" />
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import VisitaTable from '@/components/visitas/VisitaTable.vue';
  import CreateVisitaModal from '@/components/visitas/CreateVisitaModal.vue';
  
  // Estado del modal para crear internamiento
  const showCreateModal = ref(false);
  
  // Función para abrir el modal
  const openCreateModal = () => {
    showCreateModal.value = true;
  };
  </script>
  