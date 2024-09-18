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
    { title: 'Codigo de visita', align: 'start', key: 'id_visita' },
    { title: 'fecha de visita', key: 'apellidos' },
    { title: 'hora de visita', key: 'especialidad' },
    { title: 'Número de habitación', key: 'telefono' },
    { title: 'Cama asiganada', key: 'telefono' },
    { title: 'Fecha de ingreso', key: 'telefono' },
    { title: 'Nombre del doctor', key: 'telefono' },
    { title: 'Apellido del doctor', key: 'telefono' },
   
  ]);
  const doctors = ref([]);
  
  // Funciones
  const fetchInternments = async () => {
    loading.value = true;
    try {
      const response = await listDoctorApi();
      doctors.value = response.data.data.map(doctor => ({
        id_visita: doctor.id_visita,
        fecha_visita: doctor.fecha_visita,
        hora_visita: doctor.hora_visita,
        numero_habitacion: doctor.numero_habitacion,
        cama_asignada: doctor.cama_asignada,
        fecha_ingreso : doctor.fecha_ingreso,
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
  