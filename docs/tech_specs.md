### El siguiente documento detalla los requerimientos técnicos para ejecutar el Proyecto Integrador de la materia Programación Orientada a Objetos de la Universidad de Palermo.

<br />

Requerimientos de producto:
- Objetivo: generar un sistema que permita la gestión de premios por fielidad
- Seleccionar productos y realizar canje a partir de puntos cumulados
- Validar que se cuente con la cantidad de puntos adecuados
- Usuario puede canjear más de un pun producto si le sobran puntos luego del primer canje
- Indicar si un producto está disponible o no

Requerimientos técnicos:
- Aplicación basada en NestJS y Typescript. Esto permite agilizar los tiempos de desarrollo utilizando un framework muy conocido en el mercado por su robustez, performance y facilidad para instalar. A su vez Typescript introducirá el tipado estricto y estático lo cuál asegurará la calidad del código.
- Un solo servicio y servidor ya que el tráfico no merece más.
- TypeORM y MySQL para la base de datos porque la información está en su mayoría estrictamente relacionada. Typeorm provee una gran capa de abstracción para la conexión e interacción con la base de datos.

Patrones de diseño:
- NestJS trabaja con el modelo singleton por detrás. Esto quiere decir que una vez declarado el provider en un módulo se instanciará y se usará esta a lo largo de la aplicación.
- Patrón Strategy para mantener consistencia entre productos mediante una interfaz
- Builder para instanciar los objetos más complejos como el del Redeem

Ejecución y planificación:
- 1 semana de investigación, relevamiento y documentación
- 3 semanas de desarrollo
- 1 semana de testeo manual y unitario