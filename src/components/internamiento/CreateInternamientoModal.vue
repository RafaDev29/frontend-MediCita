<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear nuevo internamiento</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Campo para el ID del paciente -->
        <v-text-field
          v-model="patientId"
          label="ID del Paciente"
          required
        ></v-text-field>

        <!-- Campo para el Número de Habitación -->
        <v-text-field
          v-model="roomNumber"
          label="Número de Habitación"
          required
        ></v-text-field>

        <!-- Campo para la Cama Asignada -->
        <v-text-field
          v-model="assignedBed"
          label="Cama Asignada"
          required
        ></v-text-field>

        <!-- Campo para la Fecha de Admisión -->
        <v-text-field
          v-model="admissionDate"
          label="Fecha de Admisión"
          type="datetime-local"
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
import { createInternadoApi } from '@/api/InternamientoService';
import Swal from 'sweetalert2';

export default {
  setup(_, { emit }) {
    const patientId = ref('');
    const roomNumber = ref('');
    const assignedBed = ref('');
    const admissionDate = ref('');
    const dialogLoader = ref(false); // Estado del diálogo de carga

    const submitInternamiento = async () => {
      if (patientId.value && roomNumber.value && assignedBed.value && admissionDate.value) {
        const payload = {
          patientId: patientId.value,
          roomNumber: Number(roomNumber.value),
          assignedBed: assignedBed.value,
          admissionDate: new Date(admissionDate.value).toISOString(), // Convertir a formato ISO 8601
        };

        // Mostrar diálogo de carga
        dialogLoader.value = true;

        try {
          const response = await createInternadoApi(payload);

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
      patientId,
      roomNumber,
      assignedBed,
      admissionDate,
      dialogLoader,
      submitInternamiento,
    };
  },
};
</script>
