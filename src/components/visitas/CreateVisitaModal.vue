<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear nuevo Medico</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Campo para el ID del paciente -->
        <v-text-field
          v-model="internmentId"
          label="Codigo de internamiento"
          required
        ></v-text-field>

        <!-- Campo para el Número de Habitación -->
        <v-text-field
          v-model="doctorId"
          label="Codigo del Doctor"
          type="number"
          required
        ></v-text-field>

        <!-- Campo para la Cama Asignada -->
        <v-text-field
          v-model="visitDate"
          label="Fecha de visita"
          required
          type="date"
        ></v-text-field>

        <!-- Campo para la Fecha de Admisión -->
        <v-text-field
          v-model="visitTime"
          label="Hora de visita"
        type="time"
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
import { createVisitaApi } from '@/api/VisitaService';
import Swal from 'sweetalert2';

export default {
  setup(_, { emit }) {
    const internmentId = ref();
    const doctorId = ref();
    const visitDate = ref('');
    const visitTime = ref('');
    const dialogLoader = ref(false); // Estado del diálogo de carga

    const submitInternamiento = async () => {
      if (internmentId.value && doctorId.value && visitDate.value && visitTime.value) {
        const payload = {
          internmentId: Number(internmentId.value),
          doctorId:Number(doctorId.value),
          visitDate: visitDate.value,
          visitTime:visitTime.value
        };

        dialogLoader.value = true;

        try {
          const response = await createVisitaApi(payload);

          emit('close'); // Cerrar el modal antes de mostrar el mensaje
          dialogLoader.value = false; // Ocultar el diálogo de carga

          // Mostrar mensaje de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Visita Creada',
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
      internmentId,
      doctorId,
      visitDate,
      visitTime,
      dialogLoader,
      submitInternamiento,
    };
  },
};
</script>
