import Swal from "sweetalert2";



export function formatDate(iso: string) {
    if (iso == null) return 'N/A'
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}




export function toLocalDatetimeInputString(utcISOString: string) {
    const date = new Date(utcISOString); // e.g., "2025-05-25T19:00:00.000Z"
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
}

//--------------------------------------------------

const bootstrapStyle = {
    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'

}

export function showError(message: string) {
    Swal.fire({
        title: 'Something went wrong!',
        confirmButtonText: 'Ok',
        text: message,
        icon: 'error',
        customClass: bootstrapStyle
    })
}

export function showSuccess(message: string) {
    Swal.fire({
        title: "Successful :)",
        confirmButtonText: 'Ok',
        text: message,
        icon: "success",
        customClass: bootstrapStyle
    })
}

export function showConfirm(message: string, callback: Function) {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: "question",
        customClass: bootstrapStyle
    }).then(result => {
        if (result.isConfirmed) {
            callback()
            Swal.fire({
                title: "Successful",
                confirmButtonText: 'Ok',
                icon: "success",
                customClass: bootstrapStyle
            })
        }
    })
}