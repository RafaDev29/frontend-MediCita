<template>
    <v-card>
      <v-card-text>
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="pacientes"
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
  import { listPacienteApi } from '@/api/PacienteService';
  
  // Datos reactivos
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
  { title: 'Codigo de paciente', align: 'start', key: 'id_paciente' },
    { title: 'Nombre', align: 'start', key: 'nombres' },
    { title: 'Apellido', key: 'apellidos' },
    { title: 'Dirección', key: 'apellidos' },
    { title: 'distrito', key: 'distrito' },
    { title: 'provincia', key: 'provincia' },
    { title: 'departamento', key: 'departamento' },
    { title: 'Fecha de nacimiento', key: 'fecha_nacimiento' },
    { title: 'Telefono', key: 'telefono' },
  
  ]);
  const pacientes = ref([]);
  
  // Funciones
  const fetchInternments = async () => {
    loading.value = true;
    try {
      const response = await listPacienteApi();
      pacientes.value = response.data.data.map(paciente => ({
        id_paciente : paciente.id_paciente,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        direccion: paciente.direccion,
        distrito : paciente.distrito,
        provincia : paciente.provincia,
        departamento : paciente.departamento,
        codigo_postal : paciente.codigo_postal,
        fecha_nacimiento:new Date( paciente.fecha_nacimiento).toLocaleDateString(),
        telefono: paciente.telefono,

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
  