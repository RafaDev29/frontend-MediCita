<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear nueva Alta medica</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Campo para el ID del paciente -->
        <v-text-field
          v-model="internmentId"
          label="Codigo de internado"
          type="number"
          required
        ></v-text-field>

        <!-- Campo para el Número de Habitación -->
        <v-text-field
          v-model="dischargeDate"
          label="Fecha de alta"
          type="date"
          required
        ></v-text-field>

        <!-- Campo para la Cama Asignada -->
        <v-text-field
          v-model="dischargeTime"
          label="Hora de alta"
          type="time"
          required
        ></v-text-field>

        <!-- Campo para la Fecha de Admisión -->
        <v-text-field
          v-model="authorizingDoctorId"
          label="Codigo de doctor autorizado"
        type="number"
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
import { createAltasApi } from '@/api/AltaService';
import Swal from 'sweetalert2';

export default {
  setup(_, { emit }) {
    const internmentId = ref('');
    const dischargeDate = ref('');
    const dischargeTime = ref('');
    const authorizingDoctorId = ref('');
    const dialogLoader = ref(false); // Estado del diálogo de carga

    const submitInternamiento = async () => {
      if (internmentId.value && dischargeDate.value && dischargeTime.value && authorizingDoctorId.value) {
        const payload = {
          internmentId: Number(internmentId.value),
          dischargeDate:dischargeDate.value,
          dischargeTime: dischargeTime.value,
          authorizingDoctorId: Number(authorizingDoctorId.value)
        };

        // Mostrar diálogo de carga
        dialogLoader.value = true;

        try {
          const response = await createAltasApi(payload);

          emit('close'); 
          dialogLoader.value = false; 

          // Mostrar mensaje de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Alta Creado',
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
      dischargeDate,
      dischargeTime,
      authorizingDoctorId,
      dialogLoader,
      submitInternamiento,
    };
  },
};
</script>
