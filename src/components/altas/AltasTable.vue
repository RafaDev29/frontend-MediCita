<template>
    <v-card>
      <v-card-text>
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="altas"
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
  import { listAltasApi } from '@/api/AltaService';
  
  // Datos reactivos
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'Codico', align: 'start', key: 'id_alta' },
    { title: 'Fecha de alta', key: 'fecha_alta' },
    { title: 'Hora de alta', key: 'hora_alta' },
    { title: 'Número de habitación', key: 'numero_habitacion' },
    { title: 'Cama asignada', key: 'cama_asignada' },
    { title: 'Fecha de ingreso', key: 'fecha_ingreso' },
    { title: 'Nombre del Doctor', key: 'doctor_names' },
    { title: 'Apellido del Doctor', key: 'doctor_last_names' },
  ]);
  const altas = ref([]);
  
  // Funciones
  const fetchInternments = async () => {
    loading.value = true;
    try { 
      const response = await listAltasApi();
      altas.value = response.data.data.map(alta => ({
        id_alta: alta.id_alta,
        fecha_alta:new Date(alta.fecha_alta).toLocaleDateString(),
        hora_alta: alta.hora_alta,
        numero_habitacion: alta.numero_habitacion,
        cama_asignada: alta.cama_asignada,
        fecha_ingreso: new Date(alta.fecha_ingreso).toLocaleDateString(),
        doctor_names: alta.doctor_names,
        doctor_last_names: alta.doctor_last_names,
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
  