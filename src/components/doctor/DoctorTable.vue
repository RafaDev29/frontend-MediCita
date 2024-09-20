<template>
    <v-card>
      <v-card-text>
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="doctors"
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
  import { listDoctorApi } from '@/api/DoctorService';
  
  // Datos reactivos
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
  { title: 'Código de medico', align: 'start', key: 'id_medico' },
    { title: 'Nombre', align: 'start', key: 'nombres' },
    { title: 'Apellido', key: 'apellidos' },
    { title: 'Especialidad', key: 'especialidad' },
    { title: 'Telefono', key: 'telefono' },
  
  ]);
  const doctors = ref([]);
  
  // Funciones
  const fetchInternments = async () => {
    loading.value = true;
    try {
      const response = await listDoctorApi();
      doctors.value = response.data.data.map(doctor => ({
        id_medico: doctor.id_medico,
        nombres: doctor.nombres,
        apellidos: doctor.apellidos,
        especialidad: doctor.especialidad,
        telefono: doctor.telefono,

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
  