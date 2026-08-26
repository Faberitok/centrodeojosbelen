# Constitution

## Propósito
Este documento define las reglas no negociables para desarrollar la landing. Es una base agnóstica a features: debe seguir siendo válida aunque cambien secciones, copy, integraciones o proveedores.

## Principios No Negociables
- Resolver el problema antes que decorar la interfaz.
- Mantener la implementación simple, legible y fácil de cambiar.
- Evitar duplicación: si algo se repite, extraer una abstracción razonable.
- Preferir composición pequeña antes que componentes monolíticos.
- No mezclar responsabilidad visual, lógica de negocio e infraestructura cuando se pueda evitar.
- No hardcodear secretos, emails, teléfonos ni URLs sensibles.
- No depender de supuestos mágicos del entorno: todo valor configurable va por variables de entorno.
- No agregar comentarios decorativos ni redundantes; solo explicar decisiones complejas o no obvias.
- Mantener nombres claros y específicos.
- Priorizar accesibilidad, responsive y semántica HTML desde el inicio.

## Reglas de Desarrollo
- La landing debe poder correr localmente sin depender de Vercel.
- Cada integración externa debe tener una capa de adaptación para poder reemplazarla.
- Los formularios deben validar en cliente y en servidor.
- La persistencia y el envío de correo no deben bloquear la UI.
- Los errores deben mostrarse con mensajes simples y accionables.
- Cualquier cambio de diseño debe preservar la intención visual general y no introducir patrones genéricos o corporativos vacíos.
- Si una decisión de UI requiere assets no disponibles, dejar un placeholder explícito para reemplazo posterior.
- Las animaciones son progressive enhancement: la página debe funcionar completamente sin ellas.
- Los textos de todas las secciones deben estar centralizados en un archivo de contenido, no dispersos en componentes.
- Los valores de entorno requeridos deben estar documentados en un `.env.example` en el repositorio.

## Criterios de Calidad
- Código fácil de leer en una sola pasada.
- Componentes reutilizables cuando de verdad aporten valor.
- Pocas dependencias, solo las necesarias.
- Estilo consistente con la identidad visual definida por la documentación.
- Preparado para evolución sin reescrituras grandes.

## Límites
- No sobreingeniar.
- No crear capas de abstracción sin necesidad real.
- No copiar código si una pequeña función o componente compartido lo resuelve.
- No introducir decisiones de plataforma que compliquen el desarrollo local.
- No asumir que el contenido final está completo si falta una imagen, un correo o un número de WhatsApp: esos valores deben quedar configurables.
