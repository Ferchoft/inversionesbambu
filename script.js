// Variables globales
let currentCurrency = 'COP';
let exchangeRates = {
    USD: 4000, // 1 USD = 4000 COP
    VES: 36    // 1 USD = 36 VES
};

// Datos iniciales
let employees = [];
let production = [];
let payments = [];
let inventory = [];
let materialMeasures = [];
let models = [];
let materialTypes = [];
let priceCategories = {
    cutting: [],
    sewing: [],
    painting: []
};

// Elementos del DOM
const currencySelect = document.getElementById('currency-select');
const currentRateSpan = document.getElementById('current-rate');
const contentSections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('nav a');
const searchInput = document.getElementById('global-search');
const searchBtn = document.getElementById('search-btn');

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    setupEventListeners();
    updateUI();
});

function loadInitialData() {
    const savedData = localStorage.getItem('inversionesBambuData');
    if (savedData) {
        const data = JSON.parse(savedData);
        employees = data.employees || [];
        production = data.production || [];
        payments = data.payments || [];
        inventory = data.inventory || [];
        materialMeasures = data.materialMeasures || [];
        models = data.models || [];
        materialTypes = data.materialTypes || [];
        priceCategories = data.priceCategories || {
            cutting: [],
            sewing: [],
            painting: []
        };
        currentCurrency = data.settings?.currency || 'COP';
        exchangeRates = data.settings?.exchangeRates || {
            USD: 4000,
            VES: 36
        };
    } else {
        loadInitialModels();
        loadInitialMaterialTypes();
        loadInitialPriceCategories();
        
        // Datos de ejemplo para demostración
        employees = [
            { id: generateId(), name: 'Ejemplo Empleado', idNumber: '123456789', area: 'cutting', startDate: '2023-01-01' }
        ];
        
        inventory = [
            { id: generateId(), name: 'Cuero vacuno', type: 'cuero', quantity: 100, unit: 'metros' },
            { id: generateId(), name: 'Suela de goma', type: 'suela', quantity: 200, unit: 'unidades' }
        ];
        
        materialMeasures = [
            { model: 'FOR ONE', material: 'Cuero vacuno', amount: 0.5, unit: 'metros' },
            { model: 'FOR ONE', material: 'Suela de goma', amount: 1, unit: 'unidades' }
        ];
        
        saveData(); // Guardar datos iniciales
    }
}

function updateModelsByArea(area) {
    const modelSelector = document.getElementById('production-model');
    modelSelector.innerHTML = '<option value="">Seleccione un modelo</option>';
    
    let modelsForArea = [];
    
    switch(area) {
        case 'cutting':
            modelsForArea = priceCategories.cutting.map(item => item.model);
            break;
        case 'sewing':
            modelsForArea = priceCategories.sewing.map(item => item.model);
            break;
        case 'painting':
            modelsForArea = [...new Set(priceCategories.painting.map(item => item.model))]; // Eliminar duplicados
            break;
        case 'assembly':
        case 'quality':
            // Para armado y control de calidad, mostrar todos los modelos
            modelsForArea = models;
            break;
        default:
            modelsForArea = [];
    }
    
    // Eliminar duplicados y ordenar alfabéticamente
    modelsForArea = [...new Set(modelsForArea)].sort();
    
    // Llenar el selector
    modelsForArea.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelector.appendChild(option);
    });
}

function loadInitialModels() {
    models = [
        'FOR ONE', 'RETRO 03', 'RETRO 01', 'RETRO 04', 'RETRO 11', 'RETRO 13', 
        'CLARK', 'HUGO BOSS B-24', 'VELEZ CASUAL B-25', 'TOMMY ORILLO B-27', 
        'ADIDAS CAMPUS', 'TIMBERLAND SIMBOLO', 'JORDAN 23', 'SCKETCHER S-01', 
        'SCKETCHER S-02', 'NIKE TIRAS NUEVO V2K', 'CIERRE MAGICO', 
        'CIERRE MAGICO WHITE', 'CAT RIATA', 'ADIDAS SAMBA', 'ADIDAS HUECO', 
        'ADIDAS ORDONELA', 'PUMA P-03 P-02', 'RETRO 06 ANILLOS', 
        'CATERPILA CASUAL COCIDO B-19', 'CATERPILA GANCHO Y APLIQUE', 
        'CATERPILA BOTA ALTA', 'CAT BOY', 'CAT CLICLA', 'NIKE DUNK', 'KEEN', 
        'CAT RIATA', 'CAT REFLECTIVO', 'CAT ELADILLO', 'CAT POLICIA', 
        'UNDER ARMOUN POLICIA', 'TIMBERLAND ELADILLO', '530', 'AMIRI D-17', 
        'TOMY CASUAL 2 TIRAS B-31', 'ADIDAS GAZELLE A-17', 'CATERPILA B-05', 
        'TIMBERLAND ALTO B-17', 'CATERPILA B-07', 'ADIDAS A-02 SWAROSKI', 
        'CATERPILA CLICLA B-02', 'TIMBERLAND BRAHMA', 
        'HUGO BOSS (MOLDURA DIESEL) B-34', 'TIMBERLAND CIERRE B-20'
    ];
}

function loadInitialMaterialTypes() {
    materialTypes = [
        'cuero', 'suela', 'hilo', 'adhesivo', 'tela', 'forro', 'tintas', 'otros'
    ];
}

function loadInitialPriceCategories() {
    // Precios de cortada
    priceCategories.cutting = [
        { model: 'FOR ONE', price: 1400 },
        { model: 'RETRO 03', price: 1700 },
        { model: 'RETRO 01', price: 1800 },
        { model: 'RETRO 04', price: 1600 },
        { model: 'RETRO 11', price: 1400 },
        { model: 'RETRO 13', price: 1400 },
        { model: 'CLARK', price: 1300 },
        { model: 'HUGO BOSS B-24', price: 1600 },
        { model: 'VELEZ CASUAL B-25', price: 1300 },
        { model: 'TOMMY ORILLO B-27', price: 1300 },
        { model: 'ADIDAS CAMPUS', price: 1300 },
        { model: 'TIMBERLAND SIMBOLO', price: 1500 },
        { model: 'JORDAN 23', price: 1600 },
        { model: 'SCKETCHER S-01', price: 1600 },
        { model: 'SCKETCHER S-02', price: 1600 },
        { model: 'NIKE TIRAS NUEVO V2K', price: 2000 },
        { model: 'CIERRE MAGICO', price: 1800 },
        { model: 'CIERRE MAGICO WHITE', price: 1800 },
        { model: 'CAT RIATA', price: 2000 },
        { model: 'ADIDAS SAMBA', price: 1400 },
        { model: 'ADIDAS HUECO', price: 1400 },
        { model: 'ADIDAS ORDONELA', price: 1500 },
        { model: 'PUMA P-03 P-02', price: 1300 },
        { model: 'RETRO 06 ANILLOS', price: 1600 },
        { model: 'CATERPILA CASUAL COCIDO B-19', price: 1600 },
        { model: 'CATERPILA GANCHO Y APLIQUE', price: 2000 },
        { model: 'CATERPILA BOTA ALTA', price: 3000 },
        { model: 'CAT BOY', price: 2000 },
        { model: 'CAT CLICLA', price: 1500 },
        { model: 'NIKE DUNK', price: 1500 },
        { model: 'KEEN', price: 2000 },
        { model: 'CAT RIATA', price: 2000 },
        { model: 'CAT REFLECTIVO', price: 2000 },
        { model: 'CAT ELADILLO', price: 2000 },
        { model: 'CAT POLICIA', price: 2000 },
        { model: 'UNDER ARMOUN POLICIA', price: 2000 },
        { model: 'TIMBERLAND ELADILLO', price: 2000 },
        { model: '530', price: 2000 },
        { model: 'AMIRI D-17', price: 1600 },
        { model: 'TOMY CASUAL 2 TIRAS B-31', price: 1500 },
        { model: 'ADIDAS GAZELLE A-17', price: 1400 },
        { model: 'CATERPILA B-05', price: 1500 },
        { model: 'TIMBERLAND ALTO B-17', price: 1700 },
        { model: 'CATERPILA B-07', price: 1700 },
        { model: 'ADIDAS A-02 SWAROSKI', price: 1300 },
        { model: 'CATERPILA CLICLA B-02', price: 1500 },
        { model: 'TIMBERLAND BRAHMA', price: 2000 },
        { model: 'HUGO BOSS (MOLDURA DIESEL) B-34', price: 1500 },
        { model: 'TIMBERLAND CIERRE B-20', price: 2000 }
    ];

    // Precios de costura
    priceCategories.sewing = [
        { model: 'RETRO 01 N-15', price: 3800 },
        { model: 'RETRO 11', price: 4000 },
        { model: 'CIERRE MAGICO', price: 4000 },
        { model: 'CIERRE MAGICO WHITE', price: 4000 },
        { model: 'ADIDAS CAMPUS', price: 3000 },
        { model: 'CAT RIATA', price: 5000 },
        { model: 'RETRO 04', price: 3800 },
        { model: 'HUGO BOSS B-24', price: 3400 },
        { model: 'CLARK', price: 3400 },
        { model: 'TIMBERLAND SIMBOLO', price: 3700 },
        { model: 'FOR ONE', price: 3000 },
        { model: 'NIKE TIRAS NUEVO V2K', price: 4000 },
        { model: 'JORDAN 23', price: 4000 },
        { model: 'TOMMY VIVO', price: 3400 },
        { model: 'ADIDAS SAMBA', price: 3000 },
        { model: 'ADIDAS ORDONELA', price: 3700 },
        { model: 'ADIDAS HUECOS', price: 3800 },
        { model: 'RETRO 06 ANILLOS', price: 4500 },
        { model: 'RETRO 03', price: 3800 },
        { model: 'TOMY VIEJO', price: 3200 },
        { model: 'TOMY ORILLO B-28', price: 3200 },
        { model: 'RETRO 13', price: 3800 },
        { model: 'TOMY DEPORTIVO', price: 3200 },
        { model: 'CATERPILA CASUAL B-19', price: 3300 },
        { model: 'CAT BOTA ALTA', price: 7000 },
        { model: 'CAT REFLECTIVO', price: 5000 },
        { model: 'CATERPILA RIATA', price: 5000 },
        { model: 'CAT GANCHO Y APLIQUE', price: 6000 },
        { model: 'CAT BOY', price: 5000 },
        { model: 'NIKE DUNK', price: 3000 },
        { model: 'UNDER ARMOUN', price: 5000 },
        { model: 'CATERPILA ELADILLO B-33', price: 5000 },
        { model: 'TIMBERLAND ELADILLO B-32', price: 5000 },
        { model: 'AMIRI', price: 4000 },
        { model: 'NB 530', price: 5000 },
        { model: 'SCKITCHER S-01', price: 4000 },
        { model: 'SCKITCHER S-02', price: 4000 },
        { model: 'CATERPILA CLICLA', price: 4000 },
        { model: 'CATERPILA POLICIA B-16', price: 6000 },
        { model: 'CATERPILA B-05', price: 3200 },
        { model: 'KEEN', price: 5000 },
        { model: 'VELEZ CASUAL', price: 3400 },
        { model: 'TIMBERLAND CORTE ALTO B-17', price: 4000 },
        { model: 'ADIDAS A-02', price: 3000 },
        { model: 'CATERPILA B-07', price: 4000 },
        { model: 'TIMBERLAND CIERRE B-20', price: 6000 }
    ];

    // Precios de pintada
    priceCategories.painting = [
        { model: 'RETRO 01', variant: 'UN COLOR', price: 800 },
        { model: 'RETRO 01', variant: 'DOS COLORES', price: 1200 },
        { model: 'AIR LINEA', variant: '', price: 300 },
        { model: 'RETRO 04', variant: '4 COLORES', price: 1300 },
        { model: 'RETRO 04', variant: '3 COLORES', price: 1000 },
        { model: 'RETRO 04', variant: '2 COLORES', price: 1000 },
        { model: 'RETRO 03', variant: '', price: 1000 },
        { model: 'RETRO 03', variant: '04 COLORES', price: 1300 },
        { model: 'JORDAN 23', variant: 'DOS COLORES', price: 1500 },
        { model: 'JORDAN 23', variant: 'KIDS', price: 1200 },
        { model: 'JORDAN 23', variant: 'TALON', price: 700 },
        { model: 'TOMMY', variant: '', price: 450 },
        { model: 'ADIDAS CAUCHOS', variant: '', price: 1000 },
        { model: 'ADIDAS ORDONELA', variant: '', price: 700 },
        { model: 'ADIDAS HUECOS', variant: '', price: 700 },
        { model: 'RETRO 06 ANILLOS', variant: '', price: 1200 },
        { model: 'RETRO 13', variant: 'DOS COLORES', price: 1200 },
        { model: 'RETRO 13', variant: 'UN COLORES', price: 700 },
        { model: 'RETRO 13', variant: 'PUNTA', price: 500 },
        { model: 'CAT BOTA ALTA', variant: '', price: 800 },
        { model: 'CAT REFLECTIVO', variant: '', price: 800 },
        { model: 'CATERPILA RIATA', variant: '', price: 800 },
        { model: 'NIKE TIRAS NUEVO', variant: '', price: 900 },
        { model: 'NIKE TIRAS SUELA NUEVA', variant: '', price: 1100 },
        { model: 'FOR ONE', variant: 'UN COLOR', price: 800 },
        { model: 'FOR ONE', variant: 'DOS COLORES', price: 1200 },
        { model: 'NIKE DUNK', variant: '', price: 800 },
        { model: 'ANUEL', variant: '', price: 800 },
        { model: 'NB FASHION', variant: '', price: 450 },
        { model: 'CAT CIERRE B-20', variant: '', price: 800 }
    ];
}

function setupEventListeners() {
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            updateSectionUI(sectionId);
        });
    });

    // Selector de moneda
    currencySelect.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updateExchangeRateDisplay();
        updateUI();
        saveData();
    });

    // Botón de búsqueda
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Configurar eventos para cada sección
    setupEmployeesSection();
    setupProductionSection();
    setupPaymentsSection();
    setupInventorySection();
    setupMaterialCalcSection();
    setupCategoriesSection();
    setupReportsSection();
    setupSettingsSection();
}

function setupEmployeesSection() {
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const employeeForm = document.getElementById('employee-form');
    const employeeModal = document.getElementById('employee-modal');
    const closeEmployeeModal = employeeModal.querySelector('.close-btn');
    
    addEmployeeBtn.addEventListener('click', () => {
        document.getElementById('employee-modal-title').textContent = 'Agregar Nuevo Empleado';
        document.getElementById('employee-id').value = '';
        employeeForm.reset();
        employeeModal.style.display = 'flex';
    });
    
    closeEmployeeModal.addEventListener('click', () => {
        employeeModal.style.display = 'none';
    });
    
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('employee-id').value;
        const name = document.getElementById('employee-name').value;
        const idNumber = document.getElementById('employee-id-number').value;
        const area = document.getElementById('employee-area').value;
        const startDate = document.getElementById('employee-start-date').value;
        
        if (id) {
            // Editar empleado existente
            const index = employees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                employees[index] = { id, name, idNumber, area, startDate };
            }
        } else {
            // Agregar nuevo empleado
            const newId = generateId();
            employees.push({
                id: newId,
                name,
                idNumber,
                area,
                startDate
            });
        }
        
        updateEmployeesTable();
        employeeModal.style.display = 'none';
        saveData();
    });
}

function setupProductionSection() {
    const saveProductionBtn = document.getElementById('save-production-btn');
    const productionDate = document.getElementById('production-date');
    const areaSelector = document.getElementById('production-area');
    
    // Establecer fecha predeterminada a hoy
    const today = new Date().toISOString().split('T')[0];
    productionDate.value = today;
    
    // Event listener para cambios en el área
    areaSelector.addEventListener('change', function() {
        updateModelsByArea(this.value);
    });
    
    saveProductionBtn.addEventListener('click', () => {
        const date = productionDate.value;
        const employeeId = document.getElementById('production-employee').value;
        const model = document.getElementById('production-model').value;
        const area = document.getElementById('production-area').value;
        const quantity = parseInt(document.getElementById('production-quantity').value);
        
        if (!employeeId || !model || !area || !quantity) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        // Calcular el valor basado en el área y modelo
        let unitPrice = 0;
        if (area === 'cutting') {
            const priceObj = priceCategories.cutting.find(p => p.model === model);
            unitPrice = priceObj ? priceObj.price : 0;
        } else if (area === 'sewing') {
            const priceObj = priceCategories.sewing.find(p => p.model === model);
            unitPrice = priceObj ? priceObj.price : 0;
        } else if (area === 'painting') {
            const priceObj = priceCategories.painting.find(p => p.model === model);
            unitPrice = priceObj ? priceObj.price : 0;
        }
        
        const totalValue = unitPrice * quantity;
        
        // Crear nuevo registro de producción
        const newProduction = {
            id: generateId(),
            date,
            employeeId,
            model,
            area,
            quantity,
            unitPrice,
            totalValue
        };
        
        production.push(newProduction);
        
        // Actualizar inventario (consumir materiales)
        updateInventoryForProduction(model, quantity);
        
        // Guardar y actualizar UI
        saveData();
        updateProductionTable();
        updateInventoryTable();
        
        // Actualizar pagos automáticamente
        updatePaymentsForNewProduction(newProduction);
        
        // Mostrar mensaje de éxito
        const employee = employees.find(e => e.id === employeeId);
        alert(`Producción registrada exitosamente:\n\nEmpleado: ${employee.name}\nModelo: ${model}\nCantidad: ${quantity}\nValor: ${formatCurrency(totalValue)}`);
        
        // Limpiar campo de cantidad
        document.getElementById('production-quantity').value = '';
    });
}

function updatePaymentsForNewProduction(productionRecord) {
    const recordDate = new Date(productionRecord.date);
    
    // Actualizar pagos semanales
    const weeklyPayments = calculateWeeklyPayments();
    document.getElementById('weekly-payments').textContent = formatCurrency(weeklyPayments);
    
    // Actualizar pagos mensuales
    const monthlyPayments = calculateMonthlyPayments();
    
    // Buscar si ya existe un pago para este empleado en este período
    const existingPayment = payments.find(p => {
        const [startDateStr, endDateStr] = p.period.split(' - ');
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        return p.employeeId === productionRecord.employeeId && 
               recordDate >= startDate && 
               recordDate <= endDate;
    });
    
    if (existingPayment) {
        // Actualizar pago existente
        const productionRecords = getProductionForPeriod(
            new Date(existingPayment.period.split(' - ')[0]),
            new Date(existingPayment.period.split(' - ')[1])
        ).filter(r => r.employeeId === productionRecord.employeeId);
        
        existingPayment.totalProduction = productionRecords.reduce((sum, r) => sum + r.quantity, 0);
        existingPayment.totalPayment = productionRecords.reduce((sum, r) => sum + r.totalValue, 0);
    } else {
        // Crear nuevo pago si no existe
        const paymentPeriod = getCurrentPaymentPeriod('week');
        const paymentsData = calculatePayments(paymentPeriod.startDate, paymentPeriod.endDate);
        payments = paymentsData;
    }
    
    updatePaymentsTable(payments);
}

function setupPaymentsSection() {
    const paymentPeriod = document.getElementById('payment-period');
    const calculatePaymentsBtn = document.getElementById('calculate-payments-btn');
    const refreshPaymentsBtn = document.getElementById('refresh-payments-btn');
    
    paymentPeriod.addEventListener('change', (e) => {
        const customDateRange = document.getElementById('payment-custom-range');
        if (e.target.value === 'custom') {
            customDateRange.style.display = 'block';
        } else {
            customDateRange.style.display = 'none';
        }
    });
    
    calculatePaymentsBtn.addEventListener('click', () => {
        const period = paymentPeriod.value;
        let startDate, endDate;
        
        if (period === 'today') {
            const today = new Date();
            startDate = new Date(today);
            endDate = new Date(today);
        } else if (period === 'week') {
            const paymentPeriod = getCurrentPaymentPeriod('week');
            startDate = paymentPeriod.startDate;
            endDate = paymentPeriod.endDate;
        } else if (period === 'month') {
            const paymentPeriod = getCurrentPaymentPeriod('month');
            startDate = paymentPeriod.startDate;
            endDate = paymentPeriod.endDate;
        } else if (period === 'year') {
            const paymentPeriod = getCurrentPaymentPeriod('year');
            startDate = paymentPeriod.startDate;
            endDate = paymentPeriod.endDate;
        } else if (period === 'custom') {
            startDate = new Date(document.getElementById('payment-start-date').value);
            endDate = new Date(document.getElementById('payment-end-date').value);
            
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                alert('Por favor seleccione fechas válidas');
                return;
            }
        } else { // 'all'
            // Si hay registros de producción, usar el rango completo
            if (production.length > 0) {
                const dates = production.map(p => new Date(p.date));
                startDate = new Date(Math.min(...dates));
                endDate = new Date(Math.max(...dates));
            } else {
                startDate = new Date();
                endDate = new Date();
            }
        }
        
        // Calcular pagos
        const paymentsData = calculatePayments(startDate, endDate);
        
        // Guardar los pagos calculados
        payments = paymentsData;
        saveData();
        
        // Actualizar tabla de pagos
        updatePaymentsTable(paymentsData);
    });
    
    refreshPaymentsBtn.addEventListener('click', () => {
        updatePaymentsTable(payments);
    });
}

function getCurrentPaymentPeriod(periodType) {
    const today = new Date();
    let startDate, endDate;
    
    if (periodType === 'week') {
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(today.setDate(diff));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
    } else if (periodType === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (periodType === 'year') {
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
    }
    
    return { startDate, endDate };
}

function setupInventorySection() {
    const addMaterialBtn = document.getElementById('add-material-btn');
    const materialForm = document.getElementById('material-form');
    const materialModal = document.getElementById('material-modal');
    const closeMaterialModal = materialModal.querySelector('.close-btn');
    
    addMaterialBtn.addEventListener('click', () => {
        document.getElementById('material-modal-title').textContent = 'Agregar Nuevo Material';
        document.getElementById('material-id').value = '';
        materialForm.reset();
        materialModal.style.display = 'flex';
    });
    
    closeMaterialModal.addEventListener('click', () => {
        materialModal.style.display = 'none';
    });
    
    materialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('material-id').value;
        const name = document.getElementById('material-name').value;
        const type = document.getElementById('material-type').value;
        const quantity = parseFloat(document.getElementById('material-quantity').value);
        const unit = document.getElementById('material-unit').value;
        
        if (id) {
            // Editar material existente
            const index = inventory.findIndex(mat => mat.id === id);
            if (index !== -1) {
                inventory[index] = { id, name, type, quantity, unit };
            }
        } else {
            // Agregar nuevo material
            const newId = generateId();
            inventory.push({
                id: newId,
                name,
                type,
                quantity,
                unit
            });
        }
        
        updateInventoryTable();
        materialModal.style.display = 'none';
        saveData();
    });
}

function setupMaterialCalcSection() {
    const calculateMaterialBtn = document.getElementById('calculate-material-btn');
    const saveMeasureBtn = document.getElementById('save-measure-btn');
    
    // Crear contenedores si no existen
    const calcResultsDiv = document.querySelector('.calc-results');
    if (!document.getElementById('calc-results-container')) {
        const container = document.createElement('div');
        container.id = 'calc-results-container';
        calcResultsDiv.appendChild(container);
    }
    
    const measuresDiv = document.querySelector('.material-measures');
    if (!document.getElementById('measures-list-container')) {
        const container = document.createElement('div');
        container.id = 'measures-list-container';
        measuresDiv.appendChild(container);
    }
    
    updateModelSelectors();
    updateMaterialSelectors();
    updateMeasuresList();
    
    calculateMaterialBtn.addEventListener('click', () => {
        const model = document.getElementById('calc-model').value;
        const material = document.getElementById('calc-material').value;
        const pairs = parseInt(document.getElementById('calc-pairs').value) || 1;
        
        if (!model || !material) {
            alert('Por favor seleccione modelo y material');
            return;
        }
        
        const measure = materialMeasures.find(m => 
            m.model === model && m.material === material
        );
        
        const container = document.getElementById('calc-results-container');
        
        if (measure) {
            const totalAmount = measure.amount * pairs;
            const materialInInventory = inventory.find(item => item.name === material);
            const available = materialInInventory ? materialInInventory.quantity : 0;
            const canProduce = Math.floor(available / measure.amount);
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result-item';
            resultDiv.innerHTML = `
                <h4>Cálculo realizado el ${new Date().toLocaleString()}</h4>
                <p><strong>Modelo:</strong> ${model}</p>
                <p><strong>Material:</strong> ${material}</p>
                <p><strong>Pares a producir:</strong> ${pairs}</p>
                <p><strong>Material necesario:</strong> ${totalAmount.toFixed(2)} ${measure.unit}</p>
                <p><strong>Disponible en inventario:</strong> ${available.toFixed(2)} ${measure.unit}</p>
                <p><strong>Pares producibles:</strong> ${canProduce}</p>
                <hr>
            `;
            container.appendChild(resultDiv);
        } else {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result-item';
            resultDiv.innerHTML = `
                <p>No se encontraron medidas registradas para ${model} con ${material}</p>
                <p>Por favor registre las medidas necesarias</p>
            `;
            container.appendChild(resultDiv);
        }
    });
    
    saveMeasureBtn.addEventListener('click', () => {
        const model = document.getElementById('new-measure-model').value;
        const material = document.getElementById('new-measure-material').value;
        const amount = parseFloat(document.getElementById('new-measure-amount').value);
        const unit = document.getElementById('new-measure-unit').value;
        
        if (!model || !material || !amount) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        const existingIndex = materialMeasures.findIndex(m => 
            m.model === model && m.material === material
        );
        
        if (existingIndex !== -1) {
            materialMeasures[existingIndex] = { model, material, amount, unit };
        } else {
            materialMeasures.push({ model, material, amount, unit });
        }
        
        saveData();
        alert('Medida guardada correctamente');
        updateMeasuresList();
        
        // Actualizar la calculadora con los nuevos datos
        document.getElementById('calc-model').value = model;
        document.getElementById('calc-material').value = material;
        document.getElementById('calc-pairs').value = 1;
    });
}

function updateMeasuresList() {
    const container = document.getElementById('measures-list-container');
    if (!container) return;
    
    container.innerHTML = '<h3>Medidas Registradas</h3>';
    
    if (materialMeasures.length === 0) {
        container.innerHTML += '<p>No hay medidas registradas</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Modelo</th>
                <th>Material</th>
                <th>Cantidad/Par</th>
                <th>Unidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    materialMeasures.forEach((measure, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${measure.model}</td>
            <td>${measure.material}</td>
            <td>${measure.amount}</td>
            <td>${measure.unit}</td>
            <td class="actions-cell">
                <button class="edit-measure" data-index="${index}">Editar</button>
                <button class="delete-measure" data-index="${index}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    container.appendChild(table);
    
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-measure').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            editMeasure(index);
        });
    });
    
    document.querySelectorAll('.delete-measure').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            deleteMeasure(index);
        });
    });
}

function editMeasure(index) {
    const measure = materialMeasures[index];
    if (!measure) return;
    
    document.getElementById('new-measure-model').value = measure.model;
    document.getElementById('new-measure-material').value = measure.material;
    document.getElementById('new-measure-amount').value = measure.amount;
    document.getElementById('new-measure-unit').value = measure.unit;
    
    // Desplazar la vista a la sección de medidas
    document.getElementById('material-calc').scrollIntoView();
}

function deleteMeasure(index) {
    if (confirm('¿Está seguro que desea eliminar esta medida?')) {
        materialMeasures.splice(index, 1);
        saveData();
        updateMeasuresList();
    }
}

function setupCategoriesSection() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const addCuttingPriceBtn = document.getElementById('add-cutting-price-btn');
    const addSewingPriceBtn = document.getElementById('add-sewing-price-btn');
    const addPaintingPriceBtn = document.getElementById('add-painting-price-btn');
    const priceForm = document.getElementById('price-form');
    const priceModal = document.getElementById('price-modal');
    const closePriceModal = priceModal.querySelector('.close-btn');
    
    // Manejar pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            
            // Actualizar botones de pestaña
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mostrar contenido correspondiente
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
    
    // Botones para agregar precios
    addCuttingPriceBtn.addEventListener('click', () => {
        openPriceModal('cutting');
    });
    
    addSewingPriceBtn.addEventListener('click', () => {
        openPriceModal('sewing');
    });
    
    addPaintingPriceBtn.addEventListener('click', () => {
        openPriceModal('painting');
    });
    
    closePriceModal.addEventListener('click', () => {
        priceModal.style.display = 'none';
    });
    
    priceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('price-id').value;
        const area = document.getElementById('price-area').value;
        const model = document.getElementById('price-model').value;
        const variant = area === 'painting' ? document.getElementById('price-variant').value : '';
        const amount = parseFloat(document.getElementById('price-amount').value);
        
        if (!model || !amount) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        if (id) {
            // Editar precio existente
            const priceObj = { model, price: amount };
            if (area === 'painting') {
                priceObj.variant = variant;
            }
            
            const index = priceCategories[area].findIndex(p => {
                if (area === 'painting') {
                    return p.model === model && p.variant === variant;
                } else {
                    return p.model === model;
                }
            });
            
            if (index !== -1) {
                priceCategories[area][index] = priceObj;
            }
        } else {
            // Agregar nuevo precio
            const newPrice = { model, price: amount };
            if (area === 'painting') {
                newPrice.variant = variant;
            }
            priceCategories[area].push(newPrice);
        }
        
        updatePriceTables();
        priceModal.style.display = 'none';
        saveData();
    });
}

function setupReportsSection() {
    const reportType = document.getElementById('report-type');
    const reportPeriod = document.getElementById('report-period');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const exportReportBtn = document.getElementById('export-report-btn');
    
    reportPeriod.addEventListener('change', (e) => {
        const reportCustomRange = document.getElementById('report-custom-range');
        if (e.target.value === 'custom') {
            reportCustomRange.style.display = 'block';
        } else {
            reportCustomRange.style.display = 'none';
        }
    });
    
    generateReportBtn.addEventListener('click', () => {
        const type = reportType.value;
        const period = reportPeriod.value;
        let startDate, endDate;
        
        const today = new Date();
        
        if (period === 'daily') {
            startDate = new Date();
            endDate = new Date();
        } else if (period === 'weekly') {
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1);
            startDate = new Date(today.setDate(diff));
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
        } else if (period === 'monthly') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        } else if (period === 'yearly') {
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31);
        } else if (period === 'custom') {
            startDate = new Date(document.getElementById('report-start-date').value);
            endDate = new Date(document.getElementById('report-end-date').value);
            
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                alert('Por favor seleccione fechas válidas');
                return;
            }
        }
        
        generateReport(type, startDate, endDate);
    });
    
    exportReportBtn.addEventListener('click', () => {
        exportToExcel();
    });
}

function setupSettingsSection() {
    const saveRatesBtn = document.getElementById('save-rates-btn');
    const exportDataBtn = document.getElementById('export-data-btn');
    const importDataBtn = document.getElementById('import-data-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    
    // Cargar valores actuales
    document.getElementById('usd-rate').value = exchangeRates.USD;
    document.getElementById('ves-rate').value = exchangeRates.VES;
    document.getElementById('default-currency').value = currentCurrency;
    
    saveRatesBtn.addEventListener('click', () => {
        const usdRate = parseFloat(document.getElementById('usd-rate').value);
        const vesRate = parseFloat(document.getElementById('ves-rate').value);
        
        if (isNaN(usdRate) || isNaN(vesRate)) {
            alert('Por favor ingrese tasas de cambio válidas');
            return;
        }
        
        exchangeRates = {
            USD: usdRate,
            VES: vesRate
        };
        
        updateExchangeRateDisplay();
        saveData();
        alert('Tasas de cambio actualizadas');
    });
    
    exportDataBtn.addEventListener('click', () => {
        exportAllData();
    });
    
    importDataBtn.addEventListener('click', () => {
        const fileInput = document.getElementById('import-data');
        if (fileInput.files.length === 0) {
            alert('Por favor seleccione un archivo');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (confirm('¿Está seguro que desea importar estos datos? Se sobrescribirán los datos actuales.')) {
                    employees = data.employees || [];
                    production = data.production || [];
                    payments = data.payments || [];
                    inventory = data.inventory || [];
                    materialMeasures = data.materialMeasures || [];
                    models = data.models || [];
                    materialTypes = data.materialTypes || [];
                    priceCategories = data.priceCategories || {
                        cutting: [],
                        sewing: [],
                        painting: []
                    };
                    currentCurrency = data.settings?.currency || 'COP';
                    exchangeRates = data.settings?.exchangeRates || {
                        USD: 4000,
                        VES: 36
                    };
                    
                    // Actualizar UI
                    updateUI();
                    saveData();
                    alert('Datos importados correctamente');
                }
            } catch (error) {
                alert('Error al importar datos: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    });
    
    saveSettingsBtn.addEventListener('click', () => {
        const defaultCurrency = document.getElementById('default-currency').value;
        currentCurrency = defaultCurrency;
        currencySelect.value = defaultCurrency;
        
        updateExchangeRateDisplay();
        saveData();
        alert('Configuración guardada');
    });
}

function openPriceModal(area) {
    const modal = document.getElementById('price-modal');
    const title = document.getElementById('price-modal-title');
    const priceAreaInput = document.getElementById('price-area');
    const priceIdInput = document.getElementById('price-id');
    const modelSelect = document.getElementById('price-model');
    const variantContainer = document.getElementById('price-variant-container');
    const variantInput = document.getElementById('price-variant');
    const amountInput = document.getElementById('price-amount');
    
    // Configurar modal según el área
    priceAreaInput.value = area;
    priceIdInput.value = '';
    
    if (area === 'cutting') {
        title.textContent = 'Agregar Precio de Cortada';
        variantContainer.style.display = 'none';
    } else if (area === 'sewing') {
        title.textContent = 'Agregar Precio de Costura';
        variantContainer.style.display = 'none';
    } else if (area === 'painting') {
        title.textContent = 'Agregar Precio de Pintada';
        variantContainer.style.display = 'block';
    }
    
    // Llenar selector de modelos
    modelSelect.innerHTML = '';
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
    
    // Limpiar otros campos
    variantInput.value = '';
    amountInput.value = '';
    
    modal.style.display = 'flex';
}

function updateModelSelectors() {
    const selectors = [
        document.getElementById('production-model'),
        document.getElementById('calc-model'),
        document.getElementById('new-measure-model'),
        document.getElementById('price-model')
    ];
    
    selectors.forEach(select => {
        if (select) {
            select.innerHTML = '';
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                select.appendChild(option);
            });
        }
    });
}

function updateMaterialSelectors() {
    const selectors = [
        document.getElementById('calc-material'),
        document.getElementById('new-measure-material')
    ];
    
    selectors.forEach(select => {
        if (select) {
            select.innerHTML = '';
            inventory.forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = `${item.name} (${item.type})`;
                select.appendChild(option);
            });
        }
    });
}

function updateEmployeesTable() {
    const tableBody = document.querySelector('#employees-table tbody');
    tableBody.innerHTML = '';
    
    employees.forEach(employee => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.idNumber}</td>
            <td>${translateArea(employee.area)}</td>
            <td class="actions-cell">
                <button class="edit-employee" data-id="${employee.id}">Editar</button>
                <button class="delete-employee" data-id="${employee.id}">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editEmployee(id);
        });
    });
    
    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteEmployee(id);
        });
    });
    
    // Actualizar selector de empleados en producción
    fillEmployeeSelector();
}

function updateProductionTable() {
    const tableBody = document.querySelector('#production-table tbody');
    tableBody.innerHTML = '';
    
    // Ordenar producción por fecha (más reciente primero)
    const sortedProduction = [...production].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedProduction.forEach(record => {
        const employee = employees.find(e => e.id === record.employeeId);
        const employeeName = employee ? employee.name : 'Desconocido';
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(record.date)}</td>
            <td>${employeeName}</td>
            <td>${record.model}</td>
            <td>${translateArea(record.area)}</td>
            <td>${record.quantity}</td>
            <td>${formatCurrency(record.totalValue)}</td>
            <td class="actions-cell">
                <button class="delete-production" data-id="${record.id}">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    document.querySelectorAll('.delete-production').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteProductionRecord(id);
        });
    });
}

function updatePaymentsTable(paymentsData) {
    const tableBody = document.querySelector('#payments-table tbody');
    tableBody.innerHTML = '';
    
    paymentsData.forEach(payment => {
        const employee = employees.find(e => e.id === payment.employeeId);
        if (!employee) return;
        
        const row = document.createElement('tr');
        row.className = payment.paid ? 'payment-paid' : 'payment-pending';
        
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${payment.period}</td>
            <td>${payment.totalProduction} pares</td>
            <td>${formatCurrency(payment.totalPayment)}</td>
            <td>
                <select class="payment-status" data-id="${payment.id}">
                    <option value="pending" ${!payment.paid ? 'selected' : ''}>Pendiente</option>
                    <option value="paid" ${payment.paid ? 'selected' : ''}>Pagado</option>
                </select>
            </td>
            <td>${payment.paid ? formatDate(payment.paymentDate) : '-'}</td>
            <td class="actions-cell">
                <button class="view-payment-details" data-id="${payment.id}">Ver Detalles</button>
                <button class="delete-payment" data-id="${payment.id}">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Agregar eventos a los selectores de estado
    document.querySelectorAll('.payment-status').forEach(select => {
        select.addEventListener('change', (e) => {
            const paymentId = e.target.getAttribute('data-id');
            const status = e.target.value;
            updatePaymentStatus(paymentId, status);
        });
    });
    
    document.querySelectorAll('.view-payment-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const paymentId = e.target.getAttribute('data-id');
            showPaymentDetails(paymentId);
        });
    });
    
    document.querySelectorAll('.delete-payment').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const paymentId = e.target.getAttribute('data-id');
            deletePayment(paymentId);
        });
    });
}

function updatePaymentStatus(paymentId, status) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;
    
    payment.paid = status === 'paid';
    if (payment.paid) {
        payment.paymentDate = new Date().toISOString().split('T')[0];
    } else {
        payment.paymentDate = null;
    }
    
    saveData();
    updatePaymentsTable(payments);
}

function deletePayment(paymentId) {
    if (confirm('¿Está seguro que desea eliminar este pago?')) {
        payments = payments.filter(p => p.id !== paymentId);
        saveData();
        updatePaymentsTable(payments);
    }
}

function updateInventoryTable() {
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML = '';
    
    inventory.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.quantity.toFixed(2)}</td>
            <td>${item.unit}</td>
            <td class="actions-cell">
                <button class="edit-material" data-id="${item.id}">Editar</button>
                <button class="delete-material" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    document.querySelectorAll('.edit-material').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editMaterial(id);
        });
    });
    
    document.querySelectorAll('.delete-material').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteMaterial(id);
        });
    });
    
    updateMaterialSelectors();
}

function updatePriceTables() {
    // Tabla de precios de cortada
    const cuttingTableBody = document.querySelector('#cutting-prices-table tbody');
    cuttingTableBody.innerHTML = '';
    
    priceCategories.cutting.forEach(price => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${price.model}</td>
            <td>${formatCurrency(price.price)}</td>
            <td class="actions-cell">
                <button class="edit-price" data-area="cutting" data-model="${price.model}">Editar</button>
                <button class="delete-price" data-area="cutting" data-model="${price.model}">Eliminar</button>
            </td>
        `;
        
        cuttingTableBody.appendChild(row);
    });
    
    // Tabla de precios de costura
    const sewingTableBody = document.querySelector('#sewing-prices-table tbody');
    sewingTableBody.innerHTML = '';
    
    priceCategories.sewing.forEach(price => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${price.model}</td>
            <td>${formatCurrency(price.price)}</td>
            <td class="actions-cell">
                <button class="edit-price" data-area="sewing" data-model="${price.model}">Editar</button>
                <button class="delete-price" data-area="sewing" data-model="${price.model}">Eliminar</button>
            </td>
        `;
        
        sewingTableBody.appendChild(row);
    });
    
    // Tabla de precios de pintada
    const paintingTableBody = document.querySelector('#painting-prices-table tbody');
    paintingTableBody.innerHTML = '';
    
    priceCategories.painting.forEach(price => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${price.model}</td>
            <td>${price.variant || '-'}</td>
            <td>${formatCurrency(price.price)}</td>
            <td class="actions-cell">
                <button class="edit-price" data-area="painting" data-model="${price.model}" data-variant="${price.variant || ''}">Editar</button>
                <button class="delete-price" data-area="painting" data-model="${price.model}" data-variant="${price.variant || ''}">Eliminar</button>
            </td>
        `;
        
        paintingTableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-price').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const area = e.target.getAttribute('data-area');
            const model = e.target.getAttribute('data-model');
            const variant = e.target.getAttribute('data-variant');
            editPrice(area, model, variant);
        });
    });
    
    document.querySelectorAll('.delete-price').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const area = e.target.getAttribute('data-area');
            const model = e.target.getAttribute('data-model');
            const variant = e.target.getAttribute('data-variant');
            deletePrice(area, model, variant);
        });
    });
}

function updateSectionUI(sectionId) {
    switch (sectionId) {
        case 'employees':
            updateEmployeesTable();
            break;
        case 'production':
            updateProductionTable();
            fillEmployeeSelector();
            fillModelSelector();
            fillAreaSelector();
            break;
        case 'payments':
            updatePaymentsTable(payments);
            break;
        case 'inventory':
            updateInventoryTable();
            break;
        case 'material-calc':
            updateModelSelectors();
            updateMaterialSelectors();
            updateMeasuresList();
            break;
        case 'categories':
            updatePriceTables();
            break;
        case 'reports':
            // No necesita actualización inmediata
            break;
        case 'settings':
            // No necesita actualización inmediata
            break;
        default:
            updateDashboardStats();
            break;
    }
}

function updateDashboardStats() {
    // Producción de hoy
    const today = new Date().toISOString().split('T')[0];
    const todayProduction = production.filter(p => p.date === today)
                                     .reduce((sum, p) => sum + p.quantity, 0);
    document.getElementById('today-production').textContent = `${todayProduction} pares`;
    
    // Pagos semanales
    const weeklyPayments = calculateWeeklyPayments();
    document.getElementById('weekly-payments').textContent = formatCurrency(weeklyPayments);
    
    // Estado del inventario
    const lowStockItems = inventory.filter(item => {
        // Considerar bajo stock si queda menos del 10% de un material
        const totalUsed = materialMeasures
            .filter(m => m.material === item.name)
            .reduce((sum, m) => sum + m.amount, 0);
        
        return totalUsed > 0 && (item.quantity / totalUsed) < 10;
    }).length;
    
    document.getElementById('inventory-status').textContent = 
        `${inventory.length} materiales (${lowStockItems} con bajo stock)`;
}

function updateExchangeRateDisplay() {
    if (currentCurrency === 'COP') {
        currentRateSpan.textContent = `Tasa: 1 USD = ${exchangeRates.USD} COP`;
    } else if (currentCurrency === 'VES') {
        currentRateSpan.textContent = `Tasa: 1 USD = ${exchangeRates.VES} VES`;
    } else {
        currentRateSpan.textContent = `Tasa: 1 USD = ${exchangeRates.USD} COP, 1 USD = ${exchangeRates.VES} VES`;
    }
}

function updateUI() {
    updateEmployeesTable();
    updateProductionTable();
    updatePaymentsTable(payments);
    updateInventoryTable();
    updatePriceTables();
    updateDashboardStats();
    updateMeasuresList();
}

function fillEmployeeSelector() {
    const selector = document.getElementById('production-employee');
    selector.innerHTML = '';
    
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.name} (${translateArea(employee.area)})`;
        selector.appendChild(option);
    });
}

function fillModelSelector() {
    const selector = document.getElementById('production-model');
    selector.innerHTML = '<option value="">Seleccione un modelo</option>';
    
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        selector.appendChild(option);
    });
}

function fillAreaSelector() {
    const selector = document.getElementById('production-area');
    selector.innerHTML = '';
    
    const areas = [
        { value: 'cutting', label: 'Cortada' },
        { value: 'sewing', label: 'Costura' },
        { value: 'painting', label: 'Pintada' },
        { value: 'assembly', label: 'Armado' },
        { value: 'quality', label: 'Control de Calidad' }
    ];
    
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area.value;
        option.textContent = area.label;
        selector.appendChild(option);
    });
}

function calculatePayments(startDate, endDate) {
    const paymentsData = [];
    
    // Agrupar producción por empleado en el período
    const productionByEmployee = {};
    
    production.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= startDate && recordDate <= endDate) {
            if (!productionByEmployee[record.employeeId]) {
                productionByEmployee[record.employeeId] = [];
            }
            productionByEmployee[record.employeeId].push(record);
        }
    });
    
    // Calcular pagos para cada empleado
    for (const employeeId in productionByEmployee) {
        const records = productionByEmployee[employeeId];
        const totalProduction = records.reduce((sum, r) => sum + r.quantity, 0);
        const totalPayment = records.reduce((sum, r) => sum + r.totalValue, 0);
        
        // Buscar si ya existe un pago para este empleado en este período
        const existingPayment = payments.find(p => 
            p.employeeId === employeeId && 
            p.period === `${formatDate(startDate)} - ${formatDate(endDate)}`
        );
        
        paymentsData.push({
            id: existingPayment?.id || generateId(),
            employeeId,
            period: `${formatDate(startDate)} - ${formatDate(endDate)}`,
            totalProduction,
            totalPayment,
            paid: existingPayment?.paid || false,
            paymentDate: existingPayment?.paymentDate || null
        });
    }
    
    return paymentsData;
}

function calculateWeeklyPayments() {
    const paymentPeriod = getCurrentPaymentPeriod('week');
    const paymentsData = calculatePayments(paymentPeriod.startDate, paymentPeriod.endDate);
    return paymentsData.reduce((sum, p) => sum + p.totalPayment, 0);
}

function calculateMonthlyPayments() {
    const paymentPeriod = getCurrentPaymentPeriod('month');
    const paymentsData = calculatePayments(paymentPeriod.startDate, paymentPeriod.endDate);
    return paymentsData.reduce((sum, p) => sum + p.totalPayment, 0);
}

function getProductionForPeriod(startDate, endDate) {
    return production.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
    });
}

function generateReport(type, startDate, endDate) {
    const reportTableBody = document.querySelector('#report-table tbody');
    reportTableBody.innerHTML = '';
    
    // Filtrar producción por el período
    const filteredProduction = production.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
    });
    
    if (type === 'production') {
        generateProductionReport(filteredProduction, startDate, endDate);
    } else if (type === 'payments') {
        generatePaymentsReport(filteredProduction, startDate, endDate);
    } else if (type === 'inventory') {
        generateInventoryReport(startDate, endDate);
    }
}

function generateProductionReport(productionData, startDate, endDate) {
    const reportTableBody = document.querySelector('#report-table tbody');
    
    // Agrupar por fecha y modelo
    const reportData = {};
    
    productionData.forEach(record => {
        if (!reportData[record.date]) {
            reportData[record.date] = {};
        }
        
        if (!reportData[record.date][record.model]) {
            reportData[record.date][record.model] = {
                quantity: 0,
                totalValue: 0,
                areas: {}
            };
        }
        
        reportData[record.date][record.model].quantity += record.quantity;
        reportData[record.date][record.model].totalValue += record.totalValue;
        
        if (!reportData[record.date][record.model].areas[record.area]) {
            reportData[record.date][record.model].areas[record.area] = 0;
        }
        reportData[record.date][record.model].areas[record.area] += record.quantity;
    });
    
    // Generar filas del reporte
    for (const date in reportData) {
        for (const model in reportData[date]) {
            const data = reportData[date][model];
            const areasText = Object.keys(data.areas).map(area => 
                `${translateArea(area)}: ${data.areas[area]}`
            ).join(', ');
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(date)}</td>
                <td>${model}</td>
                <td>${data.quantity}</td>
                <td>${formatCurrency(data.totalValue)}</td>
                <td>${areasText}</td>
            `;
            reportTableBody.appendChild(row);
        }
    }
    
    // Actualizar gráfico (simulado)
    updateReportChart(productionData, 'Producción');
}

function generatePaymentsReport(productionData, startDate, endDate) {
    const reportTableBody = document.querySelector('#report-table tbody');
    
    // Agrupar pagos por empleado
    const paymentsByEmployee = {};
    
    payments.forEach(payment => {
        const [paymentStart, paymentEnd] = payment.period.split(' - ');
        const paymentStartDate = new Date(paymentStart);
        const paymentEndDate = new Date(paymentEnd);
        
        if (paymentStartDate >= startDate && paymentEndDate <= endDate) {
            const employee = employees.find(e => e.id === payment.employeeId);
            if (employee) {
                if (!paymentsByEmployee[employee.name]) {
                    paymentsByEmployee[employee.name] = {
                        totalPayment: 0,
                        totalProduction: 0,
                        periods: []
                    };
                }
                
                paymentsByEmployee[employee.name].totalPayment += payment.totalPayment;
                paymentsByEmployee[employee.name].totalProduction += payment.totalProduction;
                paymentsByEmployee[employee.name].periods.push(payment.period);
            }
        }
    });
    
    // Generar filas del reporte
    for (const employee in paymentsByEmployee) {
        const data = paymentsByEmployee[employee];
        const periodsText = data.periods.join(', ');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee}</td>
            <td>${periodsText}</td>
            <td>${data.totalProduction}</td>
            <td>${formatCurrency(data.totalPayment)}</td>
        `;
        reportTableBody.appendChild(row);
    }
    
    // Actualizar gráfico (simulado)
    updateReportChart(payments, 'Pagos');
}

function generateInventoryReport(startDate, endDate) {
    const reportTableBody = document.querySelector('#report-table tbody');
    
    // Calcular materiales utilizados en el período
    const materialsUsed = {};
    const productionInPeriod = production.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
    });
    
    productionInPeriod.forEach(record => {
        const measures = materialMeasures.filter(m => m.model === record.model);
        measures.forEach(measure => {
            if (!materialsUsed[measure.material]) {
                materialsUsed[measure.material] = 0;
            }
            materialsUsed[measure.material] += measure.amount * record.quantity;
        });
    });
    
    // Generar filas del reporte
    for (const material in materialsUsed) {
        const inventoryItem = inventory.find(item => item.name === material);
        const currentStock = inventoryItem ? inventoryItem.quantity : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${material}</td>
            <td>${materialsUsed[material].toFixed(2)}</td>
            <td>${currentStock.toFixed(2)}</td>
            <td>${inventoryItem ? inventoryItem.unit : 'N/A'}</td>
        `;
        reportTableBody.appendChild(row);
    }
    
    // Actualizar gráfico (simulado)
    updateReportChart(materialsUsed, 'Inventario');
}

function updateReportChart(data, type) {
    const chartDiv = document.getElementById('report-chart');
    chartDiv.innerHTML = `
        <h4>Gráfico de ${type}</h4>
        <p>Este es un gráfico simulado. En una implementación real se usaría una librería como Chart.js</p>
        <div style="width: 100%; height: 200px; background: #f0f0f0; display: flex; justify-content: center; align-items: center;">
            [Gráfico de ${type}]
        </div>
    `;
}

function exportToExcel() {
    // Crear un string con los datos en formato CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Encabezados
    csvContent += "Fecha,Producción Total,Pago Total,Materiales Usados\n";
    
    // Datos
    const rows = document.querySelectorAll('#report-table tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];
        
        cells.forEach(cell => {
            rowData.push(cell.textContent.replace(',', ';'));
        });
        
        csvContent += rowData.join(',') + "\n";
    });
    
    // Crear enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reporte_inversiones_bambu_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportAllData() {
    const data = {
        employees,
        production,
        payments,
        inventory,
        materialMeasures,
        models,
        materialTypes,
        priceCategories,
        settings: {
            currency: currentCurrency,
            exchangeRates
        }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = `inversiones_bambu_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;
    
    // Buscar en empleados
    const employeeResults = employees.filter(emp => 
        emp.name.toLowerCase().includes(query) || 
        emp.idNumber.toLowerCase().includes(query)
    );
    
    // Buscar en modelos
    const modelResults = models.filter(model => 
        model.toLowerCase().includes(query)
    );
    
    // Buscar en materiales
    const materialResults = inventory.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.type.toLowerCase().includes(query)
    );
    
    // Mostrar resultados (implementación simplificada)
    alert(`Resultados de búsqueda:\n\nEmpleados: ${employeeResults.length}\nModelos: ${modelResults.length}\nMateriales: ${materialResults.length}`);
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;
    
    const modal = document.getElementById('employee-modal');
    document.getElementById('employee-modal-title').textContent = 'Editar Empleado';
    document.getElementById('employee-id').value = employee.id;
    document.getElementById('employee-name').value = employee.name;
    document.getElementById('employee-id-number').value = employee.idNumber;
    document.getElementById('employee-area').value = employee.area;
    document.getElementById('employee-start-date').value = employee.startDate;
    
    modal.style.display = 'flex';
}

function deleteEmployee(id) {
    if (confirm('¿Está seguro que desea eliminar este empleado?')) {
        employees = employees.filter(emp => emp.id !== id);
        updateEmployeesTable();
        saveData();
    }
}

function editMaterial(id) {
    const material = inventory.find(mat => mat.id === id);
    if (!material) return;
    
    const modal = document.getElementById('material-modal');
    document.getElementById('material-modal-title').textContent = 'Editar Material';
    document.getElementById('material-id').value = material.id;
    document.getElementById('material-name').value = material.name;
    document.getElementById('material-type').value = material.type;
    document.getElementById('material-quantity').value = material.quantity;
    document.getElementById('material-unit').value = material.unit;
    
    modal.style.display = 'flex';
}

function deleteMaterial(id) {
    if (confirm('¿Está seguro que desea eliminar este material?')) {
        inventory = inventory.filter(mat => mat.id !== id);
        updateInventoryTable();
        saveData();
    }
}

function deleteProductionRecord(id) {
    if (confirm('¿Está seguro que desea eliminar este registro de producción?')) {
        production = production.filter(prod => prod.id !== id);
        updateProductionTable();
        saveData();
    }
}

function editPrice(area, model, variant = '') {
    let priceObj;
    
    if (area === 'painting') {
        priceObj = priceCategories[area].find(p => p.model === model && p.variant === variant);
    } else {
        priceObj = priceCategories[area].find(p => p.model === model);
    }
    
    if (!priceObj) return;
    
    const modal = document.getElementById('price-modal');
    document.getElementById('price-id').value = generateId(); // Temporal
    document.getElementById('price-area').value = area;
    document.getElementById('price-model').value = model;
    
    if (area === 'painting') {
        document.getElementById('price-variant').value = variant || '';
        document.getElementById('price-variant-container').style.display = 'block';
    } else {
        document.getElementById('price-variant-container').style.display = 'none';
    }
    
    document.getElementById('price-amount').value = priceObj.price;
    
    // Configurar título según el área
    let title = '';
    if (area === 'cutting') title = 'Editar Precio de Cortada';
    else if (area === 'sewing') title = 'Editar Precio de Costura';
    else if (area === 'painting') title = 'Editar Precio de Pintada';
    
    document.getElementById('price-modal-title').textContent = title;
    modal.style.display = 'flex';
}

function deletePrice(area, model, variant = '') {
    if (confirm('¿Está seguro que desea eliminar este precio?')) {
        if (area === 'painting') {
            priceCategories[area] = priceCategories[area].filter(p => 
                !(p.model === model && p.variant === variant)
            );
        } else {
            priceCategories[area] = priceCategories[area].filter(p => p.model !== model);
        }
        
        updatePriceTables();
        saveData();
    }
}

function showPaymentDetails(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;
    
    const employee = employees.find(e => e.id === payment.employeeId);
    if (!employee) return;
    
    const modal = document.getElementById('payment-details-modal');
    const detailsTableBody = document.querySelector('#payment-details-table tbody');
    
    // Configurar información básica
    document.getElementById('payment-employee-name').textContent = employee.name;
    document.getElementById('payment-period-details').textContent = payment.period;
    document.getElementById('payment-total-amount').textContent = formatCurrency(payment.totalPayment);
    
    // Llenar tabla de detalles
    detailsTableBody.innerHTML = '';
    
    // Obtener registros de producción para este pago
    const [startDateStr, endDateStr] = payment.period.split(' - ');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    const productionRecords = production.filter(record => {
        const recordDate = new Date(record.date);
        return record.employeeId === payment.employeeId && 
               recordDate >= startDate && 
               recordDate <= endDate;
    });
    
    productionRecords.forEach(record => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(record.date)}</td>
            <td>${record.model}</td>
            <td>${translateArea(record.area)}</td>
            <td>${record.quantity}</td>
            <td>${formatCurrency(record.unitPrice)}</td>
            <td>${formatCurrency(record.totalValue)}</td>
        `;
        
        detailsTableBody.appendChild(row);
    });
    
    // Actualizar botones de acciones
    const printBtn = document.getElementById('print-payment-btn');
    const markPaidBtn = document.getElementById('mark-paid-btn');
    
    printBtn.onclick = () => generatePaymentTicket(paymentId);
    markPaidBtn.onclick = () => {
        updatePaymentStatus(paymentId, 'paid');
        modal.style.display = 'none';
    };
    
    modal.style.display = 'flex';
}

function generatePaymentTicket(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;

    const employee = employees.find(e => e.id === payment.employeeId);
    if (!employee) return;

    // Obtener registros de producción para este pago
    const [startDateStr, endDateStr] = payment.period.split(' - ');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    const productionRecords = production.filter(record => {
        const recordDate = new Date(record.date);
        return record.employeeId === payment.employeeId && 
               recordDate >= startDate && 
               recordDate <= endDate;
    });

    // Calcular el total de unidades (ya viene en payment.totalProduction pero lo recalculamos por seguridad)
    const totalUnits = payment.totalProduction; // Usamos directamente el valor ya calculado

    // Crear contenido del ticket
    let ticketContent = `
        <div class="payment-ticket">
            <h2>INVERSIONES BAMBÚ</h2>
            <p>Sistema de Gestión de Producción</p>
            <hr>
            <h3>COMPROBANTE DE PAGO</h3>
            <hr>
            <div class="ticket-info">
                <p><strong>Empleado:</strong> ${employee.name}</p>
                <p><strong>Cédula:</strong> ${employee.idNumber}</p>
                <p><strong>Área:</strong> ${translateArea(employee.area)}</p>
                <p><strong>Periodo:</strong> ${payment.period}</p>
                <p><strong>Unidades totales:</strong> ${totalUnits} pares</p> <!-- Aquí se muestra el total de producción -->
                <p><strong>Fecha de pago:</strong> ${new Date().toLocaleDateString('es-CO')}</p>
            </div>
            <hr>
            <table class="ticket-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Modelo</th>
                        <th>Área</th>
                        <th>Cantidad</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Agregar filas de producción
    productionRecords.forEach(record => {
        ticketContent += `
            <tr>
                <td>${formatDate(record.date)}</td>
                <td>${record.model}</td>
                <td>${translateArea(record.area)}</td>
                <td>${record.quantity}</td>
                <td>${formatCurrency(record.totalValue)}</td>
            </tr>
        `;
    });

    ticketContent += `
                </tbody>
            </table>
            <hr>
            <div class="ticket-total">
                <p><strong>Total a pagar:</strong> ${formatCurrency(payment.totalPayment)}</p>
            </div>
            <div class="ticket-footer">
                <p>Firma empleado: _________________________</p>
                <p>Firma responsable: _________________________</p>
            </div>
        </div>
        <div class="ticket-actions">
            <button onclick="printPaymentTicket('${paymentId}')">Imprimir</button>
            <button onclick="downloadPaymentTicket('${paymentId}')">Descargar PDF</button>
            <button onclick="sharePaymentTicket('${paymentId}')">Compartir</button>
        </div>
    `;

    // Mostrar en modal
    const modal = document.getElementById('payment-ticket-modal');
    const content = modal.querySelector('.modal-content');
    content.innerHTML = ticketContent;
    modal.style.display = 'flex';
}

function printPaymentTicket(paymentId) {
    const printWindow = window.open('', '_blank');
    const payment = payments.find(p => p.id === paymentId);
    const employee = employees.find(e => e.id === payment.employeeId);
    
    // Obtener registros de producción para calcular el total de unidades
    const [startDateStr, endDateStr] = payment.period.split(' - ');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    const productionRecords = production.filter(record => {
        const recordDate = new Date(record.date);
        return record.employeeId === payment.employeeId && 
               recordDate >= startDate && 
               recordDate <= endDate;
    });
    
    const totalUnits = productionRecords.reduce((sum, record) => sum + record.quantity, 0);

    const printContent = `
        <html>
            <head>
                <title>Comprobante de Pago - ${employee.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    .payment-ticket { max-width: 600px; margin: 0 auto; border: 1px solid #000; padding: 20px; }
                    h2, h3 { text-align: center; margin: 5px 0; }
                    hr { border: 0; border-top: 1px solid #000; margin: 10px 0; }
                    .ticket-info p { margin: 5px 0; }
                    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                    th, td { border: 1px solid #000; padding: 5px; text-align: left; }
                    .ticket-total { text-align: right; font-size: 1.2em; margin-top: 10px; }
                    .ticket-footer { margin-top: 30px; display: flex; justify-content: space-between; }
                    @media print { 
                        .ticket-actions { display: none; } 
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="payment-ticket">
                    <h2>INVERSIONES BAMBÚ</h2>
                    <p>Sistema de Gestión de Producción</p>
                    <hr>
                    <h3>COMPROBANTE DE PAGO</h3>
                    <hr>
                    <div class="ticket-info">
                        <p><strong>Empleado:</strong> ${employee.name}</p>
                        <p><strong>Cédula:</strong> ${employee.idNumber}</p>
                        <p><strong>Área:</strong> ${translateArea(employee.area)}</p>
                        <p><strong>Periodo:</strong> ${payment.period}</p>
                        <p><strong>Unidades totales:</strong> ${totalUnits}</p>
                        <p><strong>Fecha de pago:</strong> ${new Date().toLocaleDateString('es-CO')}</p>
                    </div>
                    <hr>
                    <table class="ticket-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Modelo</th>
                                <th>Área</th>
                                <th>Cantidad</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productionRecords.map(record => `
                                <tr>
                                    <td>${formatDate(record.date)}</td>
                                    <td>${record.model}</td>
                                    <td>${translateArea(record.area)}</td>
                                    <td>${record.quantity}</td>
                                    <td>${formatCurrency(record.totalValue)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <hr>
                    <div class="ticket-total">
                        <p><strong>Total a pagar:</strong> ${formatCurrency(payment.totalPayment)}</p>
                    </div>
                    <div class="ticket-footer">
                        <p>Firma empleado: _________________________</p>
                        <p>Firma responsable: _________________________</p>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 200);
                    };
                </script>
            </body>
        </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
}

function downloadPaymentTicket(paymentId) {
    alert('Función de descarga PDF se implementaría con una librería como jsPDF');
    // Implementación real requeriría jsPDF o similar
}

function sharePaymentTicket(paymentId) {
    if (navigator.share) {
        const payment = payments.find(p => p.id === paymentId);
        const employee = employees.find(e => e.id === payment.employeeId);
        
        navigator.share({
            title: `Comprobante de Pago - ${employee.name}`,
            text: `Detalles de pago para ${employee.name} por ${formatCurrency(payment.totalPayment)}`,
            url: window.location.href
        }).catch(err => {
            console.error('Error al compartir:', err);
            alert('No se pudo compartir el comprobante');
        });
    } else {
        alert('La función de compartir no está disponible en este navegador');
    }
}

function saveData() {
    const data = {
        employees,
        production,
        payments,
        inventory,
        materialMeasures,
        models,
        materialTypes,
        priceCategories,
        settings: {
            currency: currentCurrency,
            exchangeRates
        }
    };
    
    localStorage.setItem('inversionesBambuData', JSON.stringify(data));
    
    // Actualizar estadísticas en tiempo real
    updateDashboardStats();
}

function formatCurrency(amount) {
    // Convertir de COP a la moneda seleccionada
    let convertedAmount = amount;
    let symbol = '$'; // Predeterminado a COP
    
    if (currentCurrency === 'USD') {
        convertedAmount = amount / exchangeRates.USD;
        symbol = 'USD $';
    } else if (currentCurrency === 'VES') {
        convertedAmount = (amount / exchangeRates.USD) * exchangeRates.VES;
        symbol = 'Bs.';
    }
    
    // Formatear número con separadores de miles
    return `${symbol} ${convertedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO');
}

function translateArea(area) {
    const translations = {
        'cutting': 'Cortada',
        'sewing': 'Costura',
        'painting': 'Pintada',
        'assembly': 'Armado',
        'quality': 'Control de Calidad'
    };
    
    return translations[area] || area;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateInventoryForProduction(model, quantity) {
    // Buscar todas las medidas de material para este modelo
    const measures = materialMeasures.filter(m => m.model === model);
    
    measures.forEach(measure => {
        // Buscar el material en el inventario
        const material = inventory.find(item => item.name === measure.material);
        if (material) {
            // Calcular cantidad consumida
            const consumed = measure.amount * quantity;
            material.quantity -= consumed;
            
            // Asegurarse de que no sea negativo
            if (material.quantity < 0) material.quantity = 0;
        }
    });
}

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});