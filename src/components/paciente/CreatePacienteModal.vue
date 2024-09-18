<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear nuevo Paciente</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Campo para el Nombre del paciente -->
        <v-text-field
          v-model="nombres"
          label="Nombres"
          required
        ></v-text-field>

        <!-- Campo para los Apellidos del paciente -->
        <v-text-field
          v-model="apellidos"
          label="Apellidos"
          required
        ></v-text-field>

        <!-- Campo para la Dirección del paciente -->
        <v-text-field
          v-model="direccion"
          label="Dirección"
          required
        ></v-text-field>

        <!-- Campo para el Distrito del paciente -->
        <v-text-field
          v-model="distrito"
          label="Distrito"
          required
        ></v-text-field>

        <!-- Campo para la Provincia del paciente -->
        <v-text-field
          v-model="provincia"
          label="Provincia"
          required
        ></v-text-field>

        <!-- Campo para el Departamento del paciente -->
        <v-text-field
          v-model="departamento"
          label="Departamento"
          required
        ></v-text-field>

        <!-- Campo para el Código Postal del paciente -->
        <v-text-field
          v-model="codigo_postal"
          label="Código Postal"
          required
        ></v-text-field>

        <!-- Campo para el Teléfono del paciente -->
        <v-text-field
          v-model="telefono"
          label="Teléfono"
          required
        ></v-text-field>

        <!-- Campo para la Fecha de Nacimiento del paciente -->
        <v-text-field
          v-model="fecha_nacimiento"
          label="Fecha de Nacimiento"
          required
          type="date"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue" text @click="$emit('close')">Cancelar</v-btn>
      <v-btn color="blue" text @click="submitPaciente">Guardar</v-btn>
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
import { createPacienteApi } from '@/api/PacienteService'; // Asegúrate de que el servicio es correcto
import Swal from 'sweetalert2';

export default {
  setup(_, { emit }) {
    const nombres = ref('');
    const apellidos = ref('');
    const direccion = ref('');
    const distrito = ref('');
    const provincia = ref('');
    const departamento = ref('');
    const codigo_postal = ref('');
    const telefono = ref('');
    const fecha_nacimiento = ref('');
    const dialogLoader = ref(false); // Estado del diálogo de carga

    const submitPaciente = async () => {
      if (nombres.value && apellidos.value && direccion.value && distrito.value && provincia.value && departamento.value && codigo_postal.value && telefono.value && fecha_nacimiento.value) {
        const payload = {
          nombres: nombres.value,
          apellidos: apellidos.value,
          direccion: direccion.value,
          distrito: distrito.value,
          provincia: provincia.value,
          departamento: departamento.value,
          codigo_postal: codigo_postal.value,
          telefono: telefono.value,
          fecha_nacimiento: fecha_nacimiento.value,
        };

        // Mostrar diálogo de carga
        dialogLoader.value = true;

        try {
          const response = await createPacienteApi(payload);

          emit('close'); // Cerrar el modal antes de mostrar el mensaje
          dialogLoader.value = false; // Ocultar el diálogo de carga

          // Mostrar mensaje de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Paciente Creado',
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
            text: error.response?.data?.message || 'Hubo un error al crear el paciente',
            confirmButtonText: 'OK',
          });
        }
      } else {
        console.log('Formulario incompleto');
      }
    };

    return {
      dialogLoader,
      submitPaciente,
      nombres,
      apellidos,
      direccion,
      distrito,
      provincia,
      departamento,
      codigo_postal,
      telefono,
      fecha_nacimiento
    };
  },
};
</script>
