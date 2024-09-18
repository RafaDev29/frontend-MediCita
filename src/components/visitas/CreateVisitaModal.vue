<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear nuevo Medico</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Campo para el ID del paciente -->
        <v-text-field
          v-model="names"
          label="Nombre"
          required
        ></v-text-field>

        <!-- Campo para el Número de Habitación -->
        <v-text-field
          v-model="lastNames"
          label="Apellidos"
          required
        ></v-text-field>

        <!-- Campo para la Cama Asignada -->
        <v-text-field
          v-model="phone"
          label="Telefono"
          required
        ></v-text-field>

        <!-- Campo para la Fecha de Admisión -->
        <v-text-field
          v-model="specialty"
          label="Especialidad"
    
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue" text @click="$emit('close')">Cancelar</v-btn>
      <v-btn color="blue" text @click="submitInternamiento">Guardar</v-btn>
    </v-card-actions>

    <!-- Diálogo de Carga -->
    <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
      <v-card color="blue">
        <v-card-text>
          Procesando...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { createDoctorApi } from '@/api/DoctorService';
import Swal from 'sweetalert2';

export default {
  setup(_, { emit }) {
    const names = ref('');
    const lastNames = ref('');
    const phone = ref('');
    const specialty = ref('');
    const dialogLoader = ref(false); // Estado del diálogo de carga

    const submitInternamiento = async () => {
      if (names.value && lastNames.value && phone.value && specialty.value) {
        const payload = {
          names: names.value,
          lastNames:lastNames.value,
          phone: phone.value,
          specialty:specialty.value
        };

        // Mostrar diálogo de carga
        dialogLoader.value = true;

        try {
          const response = await createDoctorApi(payload);

          emit('close'); // Cerrar el modal antes de mostrar el mensaje
          dialogLoader.value = false; // Ocultar el diálogo de carga

          // Mostrar mensaje de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Internamiento Creado',
            text: response.data.message,
            confirmButtonText: 'OK',
          });

        } catch (error) {
          emit('close'); // Cerrar el modal antes de mostrar el mensaje
          dialogLoader.value = false; // Ocultar el diálogo de carga

          // Mostrar mensaje de error con SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Hubo un error al crear el internamiento',
            confirmButtonText: 'OK',
          });
        }
      } else {
        console.log('Formulario incompleto');
      }
    };

    return {
      names,
      lastNames,
      specialty,
      phone,
      dialogLoader,
      submitInternamiento,
    };
  },
};
</script>
