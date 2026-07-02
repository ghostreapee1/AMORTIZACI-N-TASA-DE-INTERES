<!DOCTYPE html>
<html lang="es" class="h-full bg-slate-950 text-slate-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EngineFin - Generador de Código y Amortización de Intereses</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js para gráficos interactivos -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Lucide Icons para un diseño moderno -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f0f4ff',
                            100: '#e1e9ff',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a',
                            cyan: '#06b6d4',
                            emerald: '#10b981'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        /* Estilos personalizados para barras de desplazamiento y transiciones */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }
        .code-container pre {
            margin: 0;
            font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
        }
    </style>
</head>
<body class="h-full flex flex-col font-sans overflow-x-hidden">

    <!-- Navbar Principal -->
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-4">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="bg-gradient-to-tr from-brand-600 to-brand-cyan p-2.5 rounded-xl shadow-lg shadow-brand-500/20">
                    <i data-lucide="cpu" class="w-6 h-6 text-white"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-cyan bg-clip-text text-transparent">
                        EngineFin Suite
                    </h1>
                    <p class="text-xs text-slate-400">Automatización de Algoritmos Financieros v2.7</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-cyan border border-brand-500/20">
                    <span class="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                    Núcleo Activo
                </span>
            </div>
        </div>
    </header>

    <!-- Contenedor de Alertas / Toast Personalizado -->
    <div id="toast" class="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 pointer-events-none">
        <i data-lucide="check-circle" class="w-5 h-5"></i>
        <span id="toast-message" class="text-sm font-medium">¡Copiado al portapapeles con éxito!</span>
    </div>

    <!-- Contenido Principal -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Panel Izquierdo: Configuración e Inputs -->
        <section class="lg:col-span-4 flex flex-col gap-6">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div class="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                    <i data-lucide="sliders" class="w-5 h-5 text-brand-cyan"></i>
                    <h2 class="text-lg font-semibold text-slate-200">Parámetros Clave</h2>
                </div>

                <form id="financial-form" class="space-y-5" onsubmit="event.preventDefault();">
                    <!-- Valor del Activo (Principal) -->
                    <div>
                        <label for="asset-value" class="block text-sm font-medium text-slate-400 mb-1.5">
                            Valor del Activo / Principal
                        </label>
                        <div class="relative rounded-xl shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-slate-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" id="asset-value" value="50000" min="100" step="any"
                                class="block w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition"
                                placeholder="0.00">
                        </div>
                    </div>

                    <!-- Tasa de Interés -->
                    <div>
                        <label for="interest-rate" class="block text-sm font-medium text-slate-400 mb-1.5">
                            Tasa de Interés Anual (TNA)
                        </label>
                        <div class="relative rounded-xl shadow-sm">
                            <input type="number" id="interest-rate" value="12.5" min="0.01" max="100" step="any"
                                class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition"
                                placeholder="0.00">
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span class="text-slate-500 sm:text-sm">%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Plazo -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="term-value" class="block text-sm font-medium text-slate-400 mb-1.5">
                                Plazo / Período
                            </label>
                            <input type="number" id="term-value" value="12" min="1" step="1"
                                class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition"
                                placeholder="12">
                        </div>
                        <div>
                            <label for="term-unit" class="block text-sm font-medium text-slate-400 mb-1.5">
                                Unidad
                            </label>
                            <select id="term-unit"
                                class="block w-full px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition">
                                <option value="months" selected>Meses</option>
                                <option value="years">Años</option>
                            </select>
                        </div>
                    </div>

                    <!-- Sistema de Amortización -->
                    <div>
                        <label for="amortization-type" class="block text-sm font-medium text-slate-400 mb-1.5">
                            Sistema de Amortización
                        </label>
                        <select id="amortization-type"
                            class="block w-full px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition">
                            <option value="french" selected>Francés (Cuota Fija)</option>
                            <option value="german">Alemán (Amortización Fija)</option>
                            <option value="linear">Lineal (Cuota Constante / Interés Flat)</option>
                            <option value="regressive">Regresivo (Capital Decreciente / Suma de Dígitos)</option>
                        </select>
                        <p id="system-description" class="text-xs text-slate-500 mt-2 italic">
                            Cargando descripción...
                        </p>
                    </div>
                </form>
            </div>

            <!-- Panel Informativo Metodológico -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-brand-cyan">Lógica Algorítmica</h3>
                <div class="text-xs text-slate-400 space-y-3 leading-relaxed">
                    <p>
                        <strong class="text-slate-200">Sistema Francés:</strong> Aplica anualidades constantes. La cuota se calcula con la fórmula: <br>
                        <code class="text-brand-cyan bg-slate-950 px-1 py-0.5 rounded text-[10px]">C = P * [ i(1+i)^n ] / [ (1+i)^n - 1 ]</code>
                    </p>
                    <p>
                        <strong class="text-slate-200">Sistema Alemán:</strong> Cuota variable decreciente. La amortización del principal es constante: <br>
                        <code class="text-brand-cyan bg-slate-950 px-1 py-0.5 rounded text-[10px]">A = P / n</code>. Los intereses decrecen linealmente.
                    </p>
                    <p>
                        <strong class="text-slate-200">Sistema Lineal (Flat):</strong> Las cuotas de capital e intereses se mantienen constantes en todo el plazo. El interés se calcula siempre sobre el valor del activo inicial: <br>
                        <code class="text-brand-cyan bg-slate-950 px-1 py-0.5 rounded text-[10px]">C = (P / n) + (P * i)</code>
                    </p>
                    <p>
                        <strong class="text-slate-200">Sistema Regresivo (Suma de Dígitos):</strong> La cuota de amortización de capital disminuye linealmente en cada período. Se liquida más rápido el principal al inicio, reduciendo drásticamente los intereses acumulados: <br>
                        <code class="text-brand-cyan bg-slate-950 px-1 py-0.5 rounded text-[10px]">A_t = P * (n - t + 1) / [ n(n+1)/2 ]</code>
                    </p>
                </div>
            </div>
        </section>

        <!-- Panel Derecho: Resultados, Gráficas y Código Generado -->
        <section class="lg:col-span-8 flex flex-col gap-6">
            
            <!-- Grid de Tarjetas de Métricas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                    <div class="p-3 bg-brand-500/10 text-brand-cyan rounded-xl">
                        <i data-lucide="calculator" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-slate-400">Cuota Mensual Promedio</p>
                        <p id="metric-payment" class="text-lg font-bold text-white">$0.00</p>
                    </div>
                </div>

                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                    <div class="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <i data-lucide="trending-up" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-slate-400">Total Intereses</p>
                        <p id="metric-interest" class="text-lg font-bold text-white">$0.00</p>
                    </div>
                </div>

                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                    <div class="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                        <i data-lucide="shield-check" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-slate-400">Costo Total Devuelto</p>
                        <p id="metric-total" class="text-lg font-bold text-white">$0.00</p>
                    </div>
                </div>
            </div>

            <!-- Gráfico y Visualización -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <!-- Gráfico de Torta (Proporciones) -->
                <div class="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
                    <h3 class="text-sm font-semibold text-slate-400 mb-4 self-start">Distribución del Pago</h3>
                    <div class="relative w-44 h-44">
                        <canvas id="ratioChart"></canvas>
                    </div>
                </div>
                <!-- Gráfico de Columnas (Amortización Temporal) -->
                <div class="md:col-span-7 flex flex-col justify-center">
                    <h3 class="text-sm font-semibold text-slate-400 mb-4">Evolución de Saldos e Intereses</h3>
                    <div class="h-44 w-full">
                        <canvas id="trendChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Panel de Generación Automatizada de Código -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                <div class="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="terminal" class="w-5 h-5 text-emerald-400"></i>
                        <div>
                            <h3 class="font-semibold text-slate-200">Código Automatizado Generado</h3>
                            <p class="text-xs text-slate-500">Variables inyectadas dinámicamente según tus entradas</p>
                        </div>
                    </div>
                    <!-- Selector de Lenguaje -->
                    <div class="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs self-start sm:self-auto">
                        <button onclick="switchLanguage('javascript')" id="tab-javascript" class="px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white transition focus:outline-none">JavaScript</button>
                        <button onclick="switchLanguage('python')" id="tab-python" class="px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white transition focus:outline-none">Python</button>
                        <button onclick="switchLanguage('sql')" id="tab-sql" class="px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white transition focus:outline-none">SQL Script</button>
                        <button onclick="switchLanguage('json')" id="tab-json" class="px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white transition focus:outline-none">JSON Data</button>
                    </div>
                </div>
                
                <!-- Editor de Código -->
                <div class="relative bg-slate-950 p-6 code-container max-h-72 overflow-y-auto border-b border-slate-800">
                    <button onclick="copyCodeToClipboard()" class="absolute top-4 right-4 bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition active:scale-95">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        <span>Copiar Código</span>
                    </button>
                    <pre><code id="code-output" class="text-emerald-400 text-xs sm:text-sm">Generando algoritmos...</code></pre>
                </div>
                <div class="px-6 py-3.5 bg-slate-900/40 flex items-center justify-between text-xs text-slate-500">
                    <span class="flex items-center gap-1.5">
                        <i data-lucide="cpu" class="w-3.5 h-3.5 text-brand-cyan"></i>
                        Ejecución puramente local sin delays de backend.
                    </span>
                    <span>Syntax: <strong id="syntax-label">JavaScript</strong></span>
                </div>
            </div>

            <!-- Tabla de Amortización Detallada -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="table" class="w-5 h-5 text-brand-cyan"></i>
                        <h3 class="font-semibold text-slate-200">Cronograma de Pagos Completo</h3>
                    </div>
                    <span id="table-badge" class="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                        12 Períodos
                    </span>
                </div>
                
                <!-- Contenedor Responsive de Tabla -->
                <div class="overflow-x-auto rounded-xl border border-slate-800 max-h-80">
                    <table class="min-w-full divide-y divide-slate-800 text-sm">
                        <thead class="bg-slate-950 text-slate-400 sticky top-0 z-10">
                            <tr>
                                <th class="px-4 py-3 text-left font-medium">Período</th>
                                <th class="px-4 py-3 text-right font-medium">Cuota Total</th>
                                <th class="px-4 py-3 text-right font-medium">Capital (Amortizado)</th>
                                <th class="px-4 py-3 text-right font-medium">Interés</th>
                                <th class="px-4 py-3 text-right font-medium">Saldo Pendiente</th>
                            </tr>
                        </thead>
                        <tbody id="amortization-table-body" class="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
                            <!-- Inyectado mediante JS -->
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div class="max-w-7xl mx-auto px-4">
            <p>© 2026 EngineFin Suite. Diseñado por un Ingeniero de Sistemas y Científico de Datos Financieros.</p>
            <p class="mt-1 text-slate-600">Fórmulas estandarizadas internacionalmente para cálculos bancarios y simulación algorítmica.</p>
        </div>
    </footer>

    <!-- Script de Inicialización y Lógica Financiera -->
    <script>
        // Variables globales para manejo del estado
        let activeLanguage = 'javascript';
        let ratioChartInstance = null;
        let trendChartInstance = null;
        let calculationData = {
            principal: 0,
            annualRate: 0,
            periods: 0,
            type: 'french',
            schedule: [],
            totalPaid: 0,
            totalInterest: 0
        };

        // Textos descriptivos por sistema
        const systemDescriptions = {
            french: "Sistema Francés: Su principal característica es que las cuotas periódicas son constantes durante todo el plazo de amortización (salvo cambios de tasa). El componente de interés baja y el de capital sube en cada período.",
            german: "Sistema Alemán: La amortización del capital es fija y constante en cada período. Las cuotas iniciales son más altas y van disminuyendo linealmente a medida que decrece el saldo deudor.",
            linear: "Sistema Lineal (Flat Rate): El interés mensual se calcula de forma fija sobre el valor del activo inicial de manera constante. La cuota total es idéntica en cada período, y el capital se amortiza equitativamente.",
            regressive: "Sistema Regresivo (Suma de Dígitos): La amortización de capital es mayor al principio y disminuye linealmente. Esto reduce el saldo deudor a un ritmo muy veloz al inicio de la operación, ahorrando intereses de manera muy eficiente."
        };

        // Inicialización de la Aplicación en Window Load
        window.onload = function() {
            // Inicializar Iconos Lucide
            lucide.createIcons();
            
            // Vincular Listeners de entrada
            document.getElementById('asset-value').addEventListener('input', recalculateAll);
            document.getElementById('interest-rate').addEventListener('input', recalculateAll);
            document.getElementById('term-value').addEventListener('input', recalculateAll);
            document.getElementById('term-unit').addEventListener('change', recalculateAll);
            document.getElementById('amortization-type').addEventListener('change', function() {
                updateDescription();
                recalculateAll();
            });

            // Establecer lenguaje activo por defecto
            switchLanguage('javascript');

            // Primera corrida
            updateDescription();
            recalculateAll();
        };

        // Actualizar etiqueta explicativa del sistema
        function updateDescription() {
            const system = document.getElementById('amortization-type').value;
            document.getElementById('system-description').innerText = systemDescriptions[system];
        }

        // Motor de Cálculo Financiero
        function recalculateAll() {
            // Lectura limpia de inputs
            const rawAsset = parseFloat(document.getElementById('asset-value').value) || 0;
            const rawRate = parseFloat(document.getElementById('interest-rate').value) || 0;
            const termVal = parseInt(document.getElementById('term-value').value) || 1;
            const termUnit = document.getElementById('term-unit').value;
            const type = document.getElementById('amortization-type').value;

            // Homologar períodos a base mensual
            let totalPeriods = termVal;
            if (termUnit === 'years') {
                totalPeriods = termVal * 12;
            }

            // Normalizar tasas a base mensual para consistencia financiera
            const annualRateDecimal = rawRate / 100;
            const monthlyRate = annualRateDecimal / 12;

            calculationData.principal = rawAsset;
            calculationData.annualRate = annualRateDecimal;
            calculationData.periods = totalPeriods;
            calculationData.type = type;

            let schedule = [];
            let totalInterest = 0;
            let totalPaid = 0;
            let currentBalance = rawAsset;

            if (type === 'french') {
                // Cálculo de cuota fija mensual usando fórmula estándar
                let monthlyPayment = 0;
                if (monthlyRate > 0) {
                    monthlyPayment = rawAsset * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods)) / (Math.pow(1 + monthlyRate, totalPeriods) - 1);
                } else {
                    monthlyPayment = rawAsset / totalPeriods;
                }

                for (let i = 1; i <= totalPeriods; i++) {
                    let interest = currentBalance * monthlyRate;
                    let amortization = monthlyPayment - interest;
                    
                    // Ajuste de redondeo para la última cuota
                    if (i === totalPeriods) {
                        amortization = currentBalance;
                        monthlyPayment = amortization + interest;
                    }
                    
                    currentBalance -= amortization;
                    if (currentBalance < 0) currentBalance = 0;

                    schedule.push({
                        period: i,
                        payment: monthlyPayment,
                        amortization: amortization,
                        interest: interest,
                        remainingBalance: currentBalance
                    });

                    totalInterest += interest;
                    totalPaid += monthlyPayment;
                }

            } else if (type === 'german') {
                // Amortización fija de capital
                const constantAmortization = rawAsset / totalPeriods;

                for (let i = 1; i <= totalPeriods; i++) {
                    let interest = currentBalance * monthlyRate;
                    let amortization = constantAmortization;
                    let payment = amortization + interest;

                    if (i === totalPeriods) {
                        amortization = currentBalance;
                        payment = amortization + interest;
                    }

                    currentBalance -= amortization;
                    if (currentBalance < 0) currentBalance = 0;

                    schedule.push({
                        period: i,
                        payment: payment,
                        amortization: amortization,
                        interest: interest,
                        remainingBalance: currentBalance
                    });

                    totalInterest += interest;
                    totalPaid += payment;
                }

            } else if (type === 'linear') {
                // Sistema Lineal / Flat (Tanto amortización de principal como cuota de interés son constantes)
                const constantAmortization = rawAsset / totalPeriods;
                const constantInterest = rawAsset * monthlyRate;
                const constantPayment = constantAmortization + constantInterest;

                for (let i = 1; i <= totalPeriods; i++) {
                    let interest = constantInterest;
                    let amortization = constantAmortization;
                    let payment = constantPayment;

                    if (i === totalPeriods) {
                        amortization = currentBalance;
                        payment = amortization + interest;
                    }

                    currentBalance -= amortization;
                    if (currentBalance < 0) currentBalance = 0;

                    schedule.push({
                        period: i,
                        payment: payment,
                        amortization: amortization,
                        interest: interest,
                        remainingBalance: currentBalance
                    });

                    totalInterest += interest;
                    totalPaid += payment;
                }

            } else if (type === 'regressive') {
                // Sistema Regresivo (Suma de Dígitos Decreciente para Amortización del Principal)
                const sumOfDigits = (totalPeriods * (totalPeriods + 1)) / 2;

                for (let i = 1; i <= totalPeriods; i++) {
                    let interest = currentBalance * monthlyRate;
                    // Amortización proporcional a (totalPeriods - i + 1)
                    let amortization = rawAsset * (totalPeriods - i + 1) / sumOfDigits;
                    let payment = amortization + interest;

                    if (i === totalPeriods) {
                        amortization = currentBalance;
                        payment = amortization + interest;
                    }

                    currentBalance -= amortization;
                    if (currentBalance < 0) currentBalance = 0;

                    schedule.push({
                        period: i,
                        payment: payment,
                        amortization: amortization,
                        interest: interest,
                        remainingBalance: currentBalance
                    });

                    totalInterest += interest;
                    totalPaid += payment;
                }
            }

            calculationData.schedule = schedule;
            calculationData.totalInterest = totalInterest;
            calculationData.totalPaid = totalPaid;

            // Renderizar la interfaz
            renderMetrics();
            renderTable();
            renderCharts();
            updateCodeOutput();
        }

        // Formateador de moneda profesional
        function formatCurrency(val) {
            return new Intl.NumberFormat('es-US', {
                style: 'currency',
                currency: 'USD'
            }).format(val);
        }

        // Renderizado de Tarjetas de Métricas
        function renderMetrics() {
            const avgPayment = calculationData.totalPaid / calculationData.periods;
            document.getElementById('metric-payment').innerText = formatCurrency(avgPayment);
            document.getElementById('metric-interest').innerText = formatCurrency(calculationData.totalInterest);
            document.getElementById('metric-total').innerText = formatCurrency(calculationData.totalPaid);

            // Actualizar Badge
            document.getElementById('table-badge').innerText = `${calculationData.periods} Períodos`;
        }

        // Renderizado de Tabla Dinámica de Amortización
        function renderTable() {
            const tbody = document.getElementById('amortization-table-body');
            tbody.innerHTML = '';

            calculationData.schedule.forEach(row => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-800/40 transition duration-150";
                
                tr.innerHTML = `
                    <td class="px-4 py-3 text-left font-mono font-bold text-slate-400">#${row.period}</td>
                    <td class="px-4 py-3 text-right font-medium text-white">${formatCurrency(row.payment)}</td>
                    <td class="px-4 py-3 text-right text-emerald-400">${formatCurrency(row.amortization)}</td>
                    <td class="px-4 py-3 text-right text-purple-400">${formatCurrency(row.interest)}</td>
                    <td class="px-4 py-3 text-right font-mono text-slate-400">${formatCurrency(row.remainingBalance)}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Gestión de Gráficos (Ratio y Tendencia) utilizando Chart.js
        function renderCharts() {
            if (ratioChartInstance) ratioChartInstance.destroy();
            if (trendChartInstance) trendChartInstance.destroy();

            // 1. Gráfico de Torta (Ratio de Amortización vs Interés)
            const ctxRatio = document.getElementById('ratioChart').getContext('2d');
            ratioChartInstance = new Chart(ctxRatio, {
                type: 'doughnut',
                data: {
                    labels: ['Capital Principal', 'Intereses Totales'],
                    datasets: [{
                        data: [calculationData.principal, calculationData.totalInterest],
                        backgroundColor: ['#2563eb', '#a855f7'],
                        borderWidth: 2,
                        borderColor: '#0f172a'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    cutout: '70%'
                }
            });

            // 2. Gráfico de Evolución Temporal
            const ctxTrend = document.getElementById('trendChart').getContext('2d');
            const labels = calculationData.schedule.map(r => `${r.period}`);
            const interestData = calculationData.schedule.map(r => r.interest);
            const balanceData = calculationData.schedule.map(r => r.remainingBalance);

            trendChartInstance = new Chart(ctxTrend, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Saldo Restante',
                            data: balanceData,
                            type: 'line',
                            borderColor: '#06b6d4',
                            borderWidth: 2,
                            fill: false,
                            yAxisID: 'yBalance',
                            tension: 0.1,
                            pointRadius: 1
                        },
                        {
                            label: 'Interés por Mes',
                            data: interestData,
                            backgroundColor: '#a855f7',
                            yAxisID: 'yInterest',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: '#64748b', font: { size: 9 } }
                        },
                        yBalance: {
                            position: 'left',
                            grid: { display: false },
                            ticks: { color: '#06b6d4', font: { size: 9 } }
                        },
                        yInterest: {
                            position: 'right',
                            grid: { display: false },
                            ticks: { color: '#a855f7', font: { size: 9 } }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        // Cambiar de lenguaje de generación de código
        function switchLanguage(lang) {
            activeLanguage = lang;
            
            ['javascript', 'python', 'sql', 'json'].forEach(l => {
                const el = document.getElementById(`tab-${l}`);
                el.classList.remove('bg-brand-600', 'text-white');
                el.classList.add('text-slate-400');
            });

            const activeEl = document.getElementById(`tab-${lang}`);
            activeEl.classList.remove('text-slate-400');
            activeEl.classList.add('bg-brand-600', 'text-white');

            document.getElementById('syntax-label').innerText = lang.toUpperCase();

            updateCodeOutput();
        }

        // Inyección dinámica de variables en las plantillas de código automatizado
        function updateCodeOutput() {
            const codeOutput = document.getElementById('code-output');
            
            const pVal = calculationData.principal;
            const rateVal = calculationData.annualRate;
            const termVal = calculationData.periods;
            const systemStr = calculationData.type;

            let codeString = "";

            if (activeLanguage === 'javascript') {
                codeString = `/**
 * ALGORITMO DE AMORTIZACIÓN GENERADO AUTOMÁTICAMENTE
 * EngineFin v2.7 - Diseñado por un Ingeniero de Sistemas
 */

const principal = ${pVal};
const tasaAnual = ${rateVal}; // ${(rateVal*100).toFixed(2)}%
const meses = ${termVal};
const sistema = "${systemStr}"; // french | german | linear | regressive

function calcularAmortizacion(p, tAnual, totalMeses, sist) {
    const tMensual = tAnual / 12;
    let balance = p;
    let cronograma = [];

    let cuotaFija = 0;
    if (sist === 'french') {
        cuotaFija = tMensual > 0 
            ? p * (tMensual * Math.pow(1 + tMensual, totalMeses)) / (Math.pow(1 + tMensual, totalMeses) - 1)
            : p / totalMeses;
    } else if (sist === 'linear') {
        const amortFija = p / totalMeses;
        const interesFijo = p * tMensual;
        cuotaFija = amortFija + interesFijo;
    }

    const sumOfDigits = (totalMeses * (totalMeses + 1)) / 2;

    for (let mes = 1; mes <= totalMeses; mes++) {
        let interes = 0;
        let amortizacion = 0;
        let cuota = 0;

        if (sist === 'french') {
            interes = balance * tMensual;
            amortizacion = cuotaFija - interes;
            cuota = cuotaFija;
        } else if (sist === 'german') {
            interes = balance * tMensual;
            amortizacion = p / totalMeses;
            cuota = amortizacion + interes;
        } else if (sist === 'linear') {
            interes = p * tMensual;
            amortizacion = p / totalMeses;
            cuota = cuotaFija;
        } else if (sist === 'regressive') {
            interes = balance * tMensual;
            amortizacion = p * (totalMeses - mes + 1) / sumOfDigits;
            cuota = amortizacion + interes;
        }

        // Redondeo de ajuste para saldos negativos por floats
        if (mes === totalMeses) {
            amortizacion = balance;
            if (sist !== 'linear' && sist !== 'french') {
                cuota = amortizacion + interes;
            }
        }

        balance -= amortizacion;

        cronograma.push({
            mes,
            cuota: Number(cuota.toFixed(2)),
            amortizacion: Number(amortizacion.toFixed(2)),
            interes: Number(interes.toFixed(2)),
            saldoRestante: Number(Math.max(0, balance).toFixed(2))
        });
    }
    return cronograma;
}

// Ejecutar cálculo
const resultado = calcularAmortizacion(principal, tasaAnual, meses, sistema);
console.log(resultado);`;

            } else if (activeLanguage === 'python') {
                codeString = `'''
ALGORITMO DE AMORTIZACIÓN GENERADO AUTOMÁTICAMENTE
EngineFin v2.7 - Diseñado por un Ingeniero de Sistemas
'''

def calcular_amortizacion(principal, tasa_anual, meses, sistema):
    tasa_mensual = tasa_anual / 12
    balance = principal
    cronograma = []
    
    cuota_fija = 0
    if sistema == 'french':
        if tasa_mensual > 0:
            cuota_fija = principal * (tasa_mensual * (1 + tasa_mensual)**meses) / ((1 + tasa_mensual)**meses - 1)
        else:
            cuota_fija = principal / meses
    elif sistema == 'linear':
        amort_fija = principal / meses
        interes_fijo = principal * tasa_mensual
        cuota_fija = amort_fija + interes_fijo

    sum_of_digits = (meses * (meses + 1)) / 2

    for mes in range(1, meses + 1):
        interes = 0
        amortizacion = 0
        cuota = 0
        
        if sistema == 'french':
            interes = balance * tasa_mensual
            amortizacion = cuota_fija - interes
            cuota = cuota_fija
        elif sistema == 'german':
            interes = balance * tasa_mensual
            amortizacion = principal / meses
            cuota = amortizacion + interes
        elif sistema == 'linear':
            interes = principal * tasa_mensual
            amortizacion = principal / meses
            cuota = cuota_fija
        elif sistema == 'regressive':
            interes = balance * tasa_mensual
            amortizacion = principal * (meses - mes + 1) / sum_of_digits
            cuota = amortizacion + interes
            
        if mes == meses:
            amortizacion = balance
            if sistema != 'linear' and sistema != 'french':
                cuota = amortizacion + interes
            
        balance -= amortizacion
        
        cronograma.append({
            'mes': mes,
            'cuota': round(cuota, 2),
            'amortizacion': round(amortizacion, 2),
            'interes': round(interes, 2),
            'saldo_restante': round(max(0.0, balance), 2)
        })
        
    return cronograma

# Parámetros Inyectados
p_activo = ${pVal}
t_anual = ${rateVal}
meses_plazo = ${termVal}
sist_seleccionado = "${systemStr}"

tabla = calcular_amortizacion(p_activo, t_anual, meses_plazo, sist_seleccionado)
for fila in tabla:
    print(fila)`;

            } else if (activeLanguage === 'sql') {
                codeString = `-- PROCESAMIENTO ANALÍTICO DE INTERESES (SQL SERVER / POSTGRESQL)
-- Generación recursiva de tablas financieras automatizada

WITH RECURSIVE Amortizacion AS (
    -- Fila Base (Mes 0)
    SELECT 
        0 AS Mes,
        CAST(0.00 AS DECIMAL(18,2)) AS Cuota,
        CAST(0.00 AS DECIMAL(18,2)) AS Amortizacion,
        CAST(0.00 AS DECIMAL(18,2)) AS Interes,
        CAST(${pVal}.00 AS DECIMAL(18,2)) AS Saldo
    
    UNION ALL
    
    -- Cálculos Recursivos según el sistema: ${systemStr}
    SELECT 
        Mes + 1,
        -- Lógica de Cuota
        CAST(
            CASE 
                WHEN '${systemStr}' = 'french' THEN 
                    (${pVal} * ((${rateVal}/12) * POWER(1 + (${rateVal}/12), ${termVal}))) / (POWER(1 + (${rateVal}/12), ${termVal}) - 1)
                WHEN '${systemStr}' = 'german' THEN 
                    (${pVal} / ${termVal}) + (Saldo * (${rateVal}/12))
                WHEN '${systemStr}' = 'linear' THEN
                    (${pVal} / ${termVal}) + (${pVal} * (${rateVal}/12))
                WHEN '${systemStr}' = 'regressive' THEN 
                    (${pVal} * (${termVal} - Mes) / (${termVal} * (${termVal} + 1) / 2.0)) + (Saldo * (${rateVal}/12))
            END AS DECIMAL(18,2)
        ) AS Cuota,
        
        -- Lógica de Amortización de Capital
        CAST(
            CASE 
                WHEN '${systemStr}' = 'french' THEN 
                    ((${pVal} * ((${rateVal}/12) * POWER(1 + (${rateVal}/12), ${termVal}))) / (POWER(1 + (${rateVal}/12), ${termVal}) - 1)) - (Saldo * (${rateVal}/12))
                WHEN '${systemStr}' = 'german' THEN 
                    (${pVal} / ${termVal})
                WHEN '${systemStr}' = 'linear' THEN
                    (${pVal} / ${termVal})
                WHEN '${systemStr}' = 'regressive' THEN 
                    (${pVal} * (${termVal} - Mes) / (${termVal} * (${termVal} + 1) / 2.0))
            END AS DECIMAL(18,2)
        ) AS Amortizacion,
        
        -- Interés acumulado del período
        CAST(
            CASE 
                WHEN '${systemStr}' = 'linear' THEN (${pVal} * (${rateVal}/12))
                ELSE (Saldo * (${rateVal}/12))
            END AS DECIMAL(18,2)
        ) AS Interes,
        
        -- Nuevo Saldo
        CAST(
            Saldo - CASE 
                WHEN '${systemStr}' = 'french' THEN 
                    ((${pVal} * ((${rateVal}/12) * POWER(1 + (${rateVal}/12), ${termVal}))) / (POWER(1 + (${rateVal}/12), ${termVal}) - 1)) - (Saldo * (${rateVal}/12))
                WHEN '${systemStr}' = 'german' THEN 
                    (${pVal} / ${termVal})
                WHEN '${systemStr}' = 'linear' THEN
                    (${pVal} / ${termVal})
                WHEN '${systemStr}' = 'regressive' THEN 
                    (${pVal} * (${termVal} - Mes) / (${termVal} * (${termVal} + 1) / 2.0))
            END AS DECIMAL(18,2)
        ) AS Saldo
    FROM Amortizacion
    WHERE Mes < ${termVal}
)
SELECT * FROM Amortizacion WHERE Mes > 0;`;

            } else if (activeLanguage === 'json') {
                const simplifiedSchedule = calculationData.schedule.map(r => ({
                    period: r.period,
                    payment: parseFloat(r.payment.toFixed(2)),
                    principal_paid: parseFloat(r.amortization.toFixed(2)),
                    interest_paid: parseFloat(r.interest.toFixed(2)),
                    remaining_balance: parseFloat(r.remainingBalance.toFixed(2))
                }));

                const apiResponse = {
                    metadata: {
                        system_used: systemStr,
                        original_asset_value: pVal,
                        annual_percentage_rate: rateVal,
                        total_installments: termVal,
                        calculated_total_interest: parseFloat(calculationData.totalInterest.toFixed(2)),
                        grand_total_returned: parseFloat(calculationData.totalPaid.toFixed(2))
                    },
                    amortization_table: simplifiedSchedule
                };
                codeString = JSON.stringify(apiResponse, null, 4);
            }

            codeOutput.innerText = codeString;
        }

        // Función segura para copiado al portapapeles
        function copyCodeToClipboard() {
            const codeText = document.getElementById('code-output').innerText;
            
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showToast("¡Código copiado al portapapeles con éxito!");
                } else {
                    showToast("Error al copiar. Selecciona el texto manualmente.");
                }
            } catch (err) {
                showToast("Error al copiar en este dispositivo.");
            }
            document.body.removeChild(textarea);
        }

        // Mostrar Toast Personalizado
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            
            toastMsg.innerText = message;
            
            toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
            toast.classList.add('translate-y-0', 'opacity-100');
            
            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
            }, 3000);
        }
    </script>
</body>
</html>