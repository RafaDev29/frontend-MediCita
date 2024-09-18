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
  import { listVisitaApi } from '@/api/VisitaService';
  
  // Datos reactivos
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'Codigo de visita', align: 'start', key: 'id_visita' },
    { title: 'fecha de visita', key: 'fecha_visita' },
    { title: 'hora de visita', key: 'hora_visita' },
    { title: 'Número de habitación', key: 'numero_habitacion' },
    { title: 'Cama asiganada', key: 'cama_asignada' },
    { title: 'Fecha de ingreso', key: 'fecha_ingreso' },
    { title: 'Nombre del doctor', key: 'doctor_names' },
    { title: 'Apellido del doctor', key: 'doctor_last_names' },
   
  ]);
  const doctors = ref([]);
  
  const fetchInternments = async () => {
    loading.value = true;
    try {
      const response = await listVisitaApi();
      doctors.value = response.data.data.map(doctor => ({
        id_visita: doctor.id_visita,
        fecha_visita: new Date(doctor.fecha_visita).toLocaleDateString(),
        hora_visita: doctor.hora_visita,
        numero_habitacion: doctor.numero_habitacion,
        cama_asignada: doctor.cama_asignada,
        fecha_ingreso :new Date(doctor.fecha_ingreso).toLocaleDateString(),
        doctor_names : doctor.doctor_names,
        doctor_last_names : doctor.doctor_last_names

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
  