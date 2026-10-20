export const planEstudios2026 = {
    universidad: 'Universidad Nacional de Ingeniería (UNI)',
    carrera: 'Ingeniería Agrícola',
    plan: 'Plan de Estudio 2026',
    modalidades: [
        {
            nombre: 'Modalidad Presencial',
            descripcion: 'Carrera de Ingeniería Agrícola en modalidad presencial.'
        },
        {
            nombre: 'Modalidad Semipresencial (Programa UNICAM)',
            descripcion: 'Clases los domingos en la Finca Agrícola Experimental UNI.'
        }
    ],
    anios: [
        {
            numero: 1,
            nombre: 'I Año',
            semestres: [
                {
                    numero: 1,
                    nombre: 'I Semestre',
                    asignaturas: [
                        { codigo: 'AC2101', nombre: 'Identidad Nacional y Orgullo Patrio' },
                        { codigo: 'AC2102', nombre: 'Matemática I' },
                        { codigo: 'AC2103', nombre: 'Química General' },
                        { codigo: 'AC2104', nombre: 'Competencias Digitales' },
                        { codigo: 'AG2105', nombre: 'Introducción a la Ingeniería Agrícola' },
                        { codigo: 'AC2106', nombre: 'Redacción Técnica' }
                    ]
                },
                {
                    numero: 2,
                    nombre: 'II Semestre',
                    asignaturas: [
                        { codigo: 'AC2107', nombre: 'Geometría Descriptiva' },
                        { codigo: 'AC2108', nombre: 'Matemática II' },
                        { codigo: 'AC2109', nombre: 'Física I' },
                        { codigo: 'AC2110', nombre: 'Introducción a la Programación' },
                        { codigo: 'AC2111', nombre: 'Historia e Identidad Nacional' },
                        { codigo: 'AC2112', nombre: 'Inglés Comunicativo A1' }
                    ]
                }
            ]
        },
        {
            numero: 2,
            nombre: 'II Año',
            semestres: [
                {
                    numero: 3,
                    nombre: 'III Semestre',
                    asignaturas: [
                        { codigo: 'AC2113', nombre: 'Dibujo Técnico' },
                        { codigo: 'AC2114', nombre: 'Matemática III' },
                        { codigo: 'AC2115', nombre: 'Física II' },
                        { codigo: 'AC2116', nombre: 'Estadística' },
                        { codigo: 'AG2117', nombre: 'Estática' },
                        { codigo: 'AC2118', nombre: 'Inglés Comunicativo A2' },
                        { codigo: 'AG21P1', nombre: 'Práctica Profesional I', tipo: 'practica' }
                    ]
                },
                {
                    numero: 4,
                    nombre: 'IV Semestre',
                    asignaturas: [
                        { codigo: 'AG2119', nombre: 'Edafología' },
                        { codigo: 'AG2120', nombre: 'Materiales de Construcción' },
                        { codigo: 'AG2121', nombre: 'Hidráulica I' },
                        { codigo: 'AG2122', nombre: 'Dinámica' },
                        { codigo: 'AG2123', nombre: 'Sistemas CAD' },
                        { codigo: 'AC2124', nombre: 'Inglés Comunicativo A2+' }
                    ]
                }
            ]
        },
        {
            numero: 3,
            nombre: 'III Año',
            semestres: [
                {
                    numero: 5,
                    nombre: 'V Semestre',
                    asignaturas: [
                        { codigo: 'AG2125', nombre: 'Buenas Prácticas Agrícolas' },
                        { codigo: 'AC2126', nombre: 'Métodos Numéricos' },
                        { codigo: 'AG2127', nombre: 'Hidráulica II' },
                        { codigo: 'AG2128', nombre: 'Teoría de Mecanismos y Máquinas' },
                        { codigo: 'AC2129', nombre: 'Innovación y Emprendimiento' },
                        { codigo: 'AG2130', nombre: 'Topografía I' }
                    ]
                },
                {
                    numero: 6,
                    nombre: 'VI Semestre',
                    asignaturas: [
                        { codigo: 'AG2131', nombre: 'Fuerza Motriz en la Agricultura' },
                        { codigo: 'AG2132', nombre: 'Estaciones y Equipos de Bombeo' },
                        { codigo: 'AG2133', nombre: 'Mecánica de Suelo' },
                        { codigo: 'AG2134', nombre: 'Ingeniería Económica' },
                        { codigo: 'AC2135', nombre: 'Filosofía de la Ciencia' },
                        { codigo: 'AG2136', nombre: 'Topografía II' },
                        { codigo: 'AG21P2', nombre: 'Práctica Profesional II', tipo: 'practica' }
                    ]
                }
            ]
        },
        {
            numero: 4,
            nombre: 'IV Año',
            semestres: [
                {
                    numero: 7,
                    nombre: 'VII Semestre',
                    asignaturas: [
                        { codigo: 'AG2137', nombre: 'Mecanización Agrícola I' },
                        { codigo: 'AG2138', nombre: 'Ingeniería de Riego I' },
                        { codigo: 'AG2139', nombre: 'Resistencia de Materiales' },
                        { codigo: 'AG2140', nombre: 'Formulación y Evaluación de Proyectos' },
                        { codigo: 'AG2141', nombre: 'Hidrología Subterránea' },
                        { codigo: 'AG2142', nombre: 'Sistemas de Información Geográfica' }
                    ]
                },
                {
                    numero: 8,
                    nombre: 'VIII Semestre',
                    asignaturas: [
                        { codigo: 'AG2143', nombre: 'Mecanización Agrícola II' },
                        { codigo: 'AG2144', nombre: 'Ingeniería de Riego II' },
                        { codigo: 'AC2145', nombre: 'Ambiente y Cambio Climático' },
                        { codigo: 'AG2146', nombre: 'Taller de Culminación de Estudios I' },
                        { codigo: 'AG2147', nombre: 'Construcciones Rurales' }
                    ],
                    optativas: [
                        {
                            nombre: 'Optativa 1',
                            opciones: [
                                { codigo: 'AG2101', nombre: 'Electrotecnia' },
                                { codigo: 'AG2102', nombre: 'Producción en Ambientes Controlados' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            numero: 5,
            nombre: 'V Año',
            semestres: [
                {
                    numero: 9,
                    nombre: 'IX Semestre',
                    asignaturas: [
                        { codigo: 'AG21P3', nombre: 'Práctica Profesional III', tipo: 'practica' },
                        { codigo: 'AG2149', nombre: 'Explotación de Maquinaria Agrícola' },
                        { codigo: 'AG2150', nombre: 'Explotación de Sistemas de Riego' },
                        { codigo: 'AG2151', nombre: 'Abastecimiento de Agua' },
                        { codigo: 'AG2152', nombre: 'Taller de Culminación de Estudios II' },
                        { codigo: 'AG2153', nombre: 'Gerencia Empresarial' }
                    ],
                    optativas: [
                        {
                            nombre: 'Optativa 2',
                            opciones: [
                                { codigo: 'AG2103', nombre: 'Planificación de la Mecanización Agrícola' },
                                { codigo: 'AG2104', nombre: 'Agricultura de Precisión' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const asignaturasPlanEstudios2026 = planEstudios2026.anios
    .flatMap((anio) => anio.semestres)
    .reduce((total, semestre) => (
        total +
        semestre.asignaturas.length +
        (semestre.optativas || []).reduce((opcionesTotal, optativa) => (
            opcionesTotal + optativa.opciones.length
        ), 0)
    ), 0)

export const practicasProfesionales2026 = planEstudios2026.anios
    .flatMap((anio) => anio.semestres)
    .flatMap((semestre) => semestre.asignaturas
        .filter((asignatura) => asignatura.tipo === 'practica')
        .map((asignatura) => ({ ...asignatura, semestre: semestre.nombre })))
