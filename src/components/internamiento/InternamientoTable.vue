<template>
    <v-card>
      <v-card-text>
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="internments"
            class="elevation-1"
            :search="search"
            :loading="loading"
            :sort-by="[{ key: 'paciente.nombres', order: 'asc' }]"
            loading-text="Cargando... Espere por favor"
          >
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                @input="handleSearch"
              ></v-text-field>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { authLoginApi } from '@/api/InternamientoService.js';
  
  // Datos reactivos
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
  { title: 'codigo', align: 'start', key: 'id_internamiento' },
    { title: 'Habitación', align: 'start', key: 'numero_habitacion' },
    { title: 'Cama', key: 'cama_asignada' },
    { title: 'Fecha de Ingreso', key: 'fecha_ingreso' },
    { title: 'Nombre del paciente', key: 'paciente.nombres' },
    { title: 'Apellidos del paciente', key: 'paciente.apellidos' },
    { title: 'Teléfono del paciente', key: 'paciente.telefono' },
    { title: 'F. de nacimiento', key: 'fecha_nacimiento' },
  ]);
  const internments = ref([]);
  
  // Funciones
  const fetchInternments = async () => {
    loading.value = true;
    try {
      const response = await authLoginApi();
      internments.value = response.data.data.map(internment => ({
        id_internamiento: internment.id_internamiento,
        numero_habitacion: internment.numero_habitacion,
        cama_asignada: internment.cama_asignada,
        fecha_ingreso: new Date(internment.fecha_ingreso).toLocaleDateString(),
        paciente: internment.paciente,
        fecha_nacimiento:  new Date(internment.paciente.fecha_nacimiento).toLocaleDateString(),
      }));
    } catch (error) {
      console.error('Error fetching internments:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const handleSearch = () => {
    loading.value = true;
    setTimeout(async () => {
      await fetchInternments();
      loading.value = false;
    }, 500);
  };
  
  // Ejecutar fetchInternments al montar el componente
  onMounted(() => {
    fetchInternments();
  });
  </script>
  
  <style scoped>
  .table-container {
    max-height: 700px;
    overflow-y: auto;
  }
  </style>
  