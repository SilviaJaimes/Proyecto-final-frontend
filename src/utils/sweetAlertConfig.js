import Swal from 'sweetalert2';

// Configuración personalizada de SweetAlert2
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// Alerta de éxito
export const showSuccess = (message, title = '¡Éxito!') => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    confirmButtonColor: '#0891b2',
    timer: 2000,
    timerProgressBar: true
  });
};

// Alerta de error
export const showError = (message, title = 'Error') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    confirmButtonColor: '#0891b2'
  });
};

// Alerta de confirmación
export const showConfirm = (message, title = '¿Estás seguro?') => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  });
};

// Toast de éxito
export const toastSuccess = (message) => {
  return Toast.fire({
    icon: 'success',
    title: message
  });
};

// Toast de error
export const toastError = (message) => {
  return Toast.fire({
    icon: 'error',
    title: message
  });
};