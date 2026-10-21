import React, { useState } from 'react'

const faqData = [
  {
    question: '¿Cuánto dura la carrera?',
    answer: 'La carrera tiene una duración de 5 años (10 semestres) incluyendo las prácticas profesionales.',
  },
  {
    question: '¿Qué materias se ven en el primer año?',
    answer: 'En el primer año se cursan Introducción a la Ingeniería Agrícola, Suelos y Fertilidad, entre otras materias base.',
  },
  {
    question: '¿Hay oportunidades de práctica?',
    answer: 'Sí, las prácticas de campo están integradas en las asignaturas y hay pasantías con empresas del sector.',
  },
  {
    question: '¿Qué requisitos pide la facultad?',
    answer: 'Para la prematrícula prepara tu cédula de identidad o partida de nacimiento, el título de bachiller o certificado de notas de 4.º y 5.º año, el comprobante de pago o derecho de prematrícula y completa el formulario en el portal institucional. Confirma los requisitos vigentes en el portal oficial.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="section bg-light">
      <div className="container">
        <div className="section-title reveal">
          <h2>Preguntas Frecuentes</h2>
          <p>Todo lo que necesitas saber sobre la carrera.</p>
        </div>
        <div className="faq-list">
          {faqData.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'active' : ''}`} data-faq-index={i}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                {item.question}
                <i className="fa-solid fa-chevron-down" aria-hidden="true" />
              </button>
              <div id={`faq-answer-${i}`} className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}