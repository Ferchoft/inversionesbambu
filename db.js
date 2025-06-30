// Este archivo simula una base de datos simple con funciones de ayuda
// En una aplicación real, esto se conectaría a una base de datos real o API

// Función para inicializar datos de ejemplo (usada en desarrollo)
function initializeSampleData() {
    // Empleados de ejemplo
    const sampleEmployees = [
        { id: 'emp1', name: 'Juan Pérez', idNumber: '12345678', area: 'cutting', startDate: '2023-01-15' },
        { id: 'emp2', name: 'María Gómez', idNumber: '87654321', area: 'sewing', startDate: '2023-02-20' },
        { id: 'emp3', name: 'Carlos Rodríguez', idNumber: '45678912', area: 'painting', startDate: '2023-03-10' }
    ];
    
    // Materiales de ejemplo
    const sampleInventory = [
        { id: 'mat1', name: 'Cuero vacuno', type: 'cuero', quantity: 150, unit: 'metros' },
        { id: 'mat2', name: 'Suela de goma', type: 'suela', quantity: 200, unit: 'unidades' },
        { id: 'mat3', name: 'Hilo poliéster', type: 'hilo', quantity: 50, unit: 'metros' }
    ];
    
    // Producción de ejemplo
    const today = new Date().toISOString().split('T')[0];
    const sampleProduction = [
        { id: 'prod1', date: today, employeeId: 'emp1', model: 'FOR ONE', area: 'cutting', quantity: 10, unitPrice: 1400, totalValue: 14000 },
        { id: 'prod2', date: today, employeeId: 'emp2', model: 'FOR ONE', area: 'sewing', quantity: 8, unitPrice: 3000, totalValue: 24000 },
        { id: 'prod3', date: today, employeeId: 'emp3', model: 'FOR ONE', area: 'painting', quantity: 5, unitPrice: 800, totalValue: 4000 }
    ];
    
    // Medidas de material de ejemplo
    const sampleMeasures = [
        { model: 'FOR ONE', material: 'Cuero vacuno', amount: 0.5, unit: 'metros' },
        { model: 'FOR ONE', material: 'Suela de goma', amount: 1, unit: 'unidades' }
    ];
    
    return {
        employees: sampleEmployees,
        inventory: sampleInventory,
        production: sampleProduction,
        materialMeasures: sampleMeasures
    };
}

// Nota: En esta implementación, las funciones principales de "base de datos"
// están en script.js porque estamos usando localStorage directamente.
// En una aplicación más compleja, separaríamos la lógica de persistencia.