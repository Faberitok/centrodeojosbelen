<!--
SYNC IMPACT REPORT
==================
Version change: (unversioned template) → 1.0.0
Modified principles: N/A — initial ratification from docu/constitution.md
Added sections: Principios No Negociables, Reglas de Desarrollo, Criterios de Calidad, Límites, Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible (Constitution Check section present)
  - .specify/templates/spec-template.md ✅ compatible (no conflicting references)
  - .specify/templates/tasks-template.md ✅ compatible (no conflicting references)
Follow-up TODOs: none — all placeholders resolved
-->

# Landing Page FaberIT — Constitution

## Propósito

Este documento define las reglas no negociables para desarrollar la landing page de FaberIT.
Es agnóstico a features: DEBE seguir siendo válido aunque cambien secciones, copy, integraciones o proveedores.

## Principios No Negociables

### I. Problema antes que Decoración
Resolver el problema del usuario DEBE ser la prioridad antes que decorar la interfaz.
Todo componente o sección que no aporte valor real al usuario DEBE justificar su existencia.

### II. Simplicidad y Legibilidad
La implementación DEBE ser simple, legible y fácil de cambiar.
Evitar duplicación: si algo se repite, extraer una abstracción razonable.
Preferir composición de componentes pequeños antes que monolitos.

### III. Separación de Responsabilidades
No mezclar responsabilidad visual, lógica de negocio e infraestructura cuando se pueda evitar.
Los textos de todas las secciones DEBEN estar centralizados en un archivo de contenido, no dispersos en componentes.

### IV. Configurabilidad y Seguridad
No hardcodear secretos, emails, teléfonos ni URLs sensibles.
Todo valor configurable DEBE ir por variables de entorno.
Los valores de entorno requeridos DEBEN estar documentados en `.env.example` en el repositorio.

### V. Accesibilidad y Calidad Visual
Priorizar accesibilidad, responsive y semántica HTML desde el inicio.
Las animaciones son progressive enhancement: la página DEBE funcionar completamente sin ellas.
Todo cambio de diseño DEBE preservar la intención visual general y no introducir patrones genéricos vacíos.

## Reglas de Desarrollo

- La landing DEBE poder correr localmente sin depender de Vercel.
- Cada integración externa DEBE tener una capa de adaptación para poder reemplazarla.
- Los formularios DEBEN validar en cliente y en servidor.
- La persistencia y el envío de correo NO DEBEN bloquear la UI.
- Los errores DEBEN mostrarse con mensajes simples y accionables.
- Si una decisión de UI requiere assets no disponibles, dejar un placeholder explícito para reemplazo posterior.
- No agregar comentarios decorativos ni redundantes; solo explicar decisiones complejas o no obvias.
- Mantener nombres claros y específicos.

## Criterios de Calidad

- Código fácil de leer en una sola pasada.
- Componentes reutilizables cuando de verdad aporten valor.
- Pocas dependencias, solo las necesarias.
- Estilo consistente con la identidad visual definida en `docu/requirements.md` y `docu/plan.md`.
- Preparado para evolución sin reescrituras grandes.

## Límites

- No sobreingeniar.
- No crear capas de abstracción sin necesidad real.
- No copiar código si una pequeña función o componente compartido lo resuelve.
- No introducir decisiones de plataforma que compliquen el desarrollo local.
- No asumir que el contenido final está completo si falta una imagen, un correo o un número de
  WhatsApp: esos valores DEBEN quedar configurables.

## Governance

Esta constitución es el documento rector para todas las decisiones de implementación.
Cualquier práctica, patrón o decisión técnica que contradiga estos principios DEBE ser rechazada o
escalar para enmienda explícita.

Procedimiento de enmienda:
1. Identificar el principio o regla a cambiar.
2. Documentar la justificación (qué problema resuelve la enmienda).
3. Incrementar la versión según Semantic Versioning:
   - MAJOR: Eliminación o redefinición incompatible de un principio.
   - MINOR: Nuevo principio o sección añadida.
   - PATCH: Clarificaciones, redacción, correcciones menores.
4. Actualizar `LAST_AMENDED_DATE`.
5. Revisar `docu/plan.md` y `docu/requirements.md` para consistencia.

Para guía de desarrollo en tiempo de ejecución, ver `docu/plan.md` y `docu/constitution.md`.

**Version**: 1.0.0 | **Ratified**: 2026-05-20 | **Last Amended**: 2026-05-20
