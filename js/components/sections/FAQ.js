import { esc } from '../../utils/dom.js'

const faqData = [
    {
        question: '¿Cuánto dura la carrera?',
        answer: 'La carrera tiene una duración de 5 años (10 semestres) incluyendo las prácticas profesionales.'
    },
    {
        question: '¿Qué materias se ven en el primer año?',
        answer: 'En el primer año se cursan Introducción a la Ingeniería Agrícola, Suelos y Fertilidad, entre otras materias base.'
    },
    {
        question: '¿Hay oportunidades de práctica?',
        answer: 'Sí, las prácticas de campo están integradas en las asignaturas y hay pasantías con empresas del sector.'
    },
    {
        question: '¿Qué requisitos pide la facultad?',
        answer: 'Para la prematrícula prepara tu cédula de identidad o partida de nacimiento, el título de bachiller o certificado de notas de 4.º y 5.º año, el comprobante de pago o derecho de prematrícula y completa el formulario en el portal institucional. Confirma los requisitos vigentes en el portal oficial.'
    }
]

const state = { openIndex: null }

function FAQ() {
    return `
        <section id="faq" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Preguntas Frecuentes</h2>
                    <p>Todo lo que necesitas saber sobre la carrera.</p>
                </div>
                <div class="faq-list">
                    ${faqData.map((item, i) => `
                        <div class="faq-item ${state.openIndex === i ? 'active' : ''}" data-faq-index="${i}">
                            <button
                                class="faq-question"
                                data-action="faq-toggle"
                                data-index="${i}"
                                aria-expanded="${state.openIndex === i}"
                                aria-controls="faq-answer-${i}"
                            >
                                ${esc(item.question)}
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div id="faq-answer-${i}" class="faq-answer">
                                <p>${esc(item.answer)}</p>
                            </div>
                        </div>`).join('')}
                </div>
            </div>
        </section>
    `
}

export function faqToggle(index) {
    state.openIndex = state.openIndex === index ? null : index

    document.querySelectorAll('.faq-item').forEach((item, i) => {
        const button = item.querySelector('.faq-question')
        const isOpen = i === state.openIndex
        item.classList.toggle('active', isOpen)
        button.setAttribute('aria-expanded', String(isOpen))
    })
}

export default FAQ
