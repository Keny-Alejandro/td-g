# Sistema gestor del PPI Backend

![Sistema gestor del PPI](https://www.politecnicojic.edu.co/images/logo/logo.png)

## Descripción TDG

Los programas de la Técnica Profesional en Programación de Sistemas de Información y Tecnológica en Sistematización de Datos (TyT) de la Facultad de Ingenierías del Politécnico Colombiano Jaime Isaza, han orientado su proceso de enseñanza-aprendizaje (E-A) hacia el desarrollo de Proyectos Pedagógicos Integradores (PPI). En este contexto, cada equipo de estudiantes recibe asesorías y acompañamiento para alcanzar los objetivos en cada una de las etapas de sus proyectos.

Actualmente, el programa TyT utiliza la aplicación Appointedd (2024) para gestionar el proceso de asesorías. En esta aplicación, la planeación de las asesorías es realizada por los asesores, y la validación de su cumplimiento es llevada a cabo por el coordinador. Sin embargo, estos procesos son manuales y la herramienta no es propiedad de la institución. Esto ha creado la necesidad de desarrollar una herramienta propia que se ajuste a las necesidades específicas de la TyT.

## Objetivo del proyecto

Desarrollar de un sistema web responsivo para la gestión de asesorías de Proyectos Pedagógicos Integradores (PPI) y la generación de banner publicitarios de la TyT y validación de cumplimiento de asesorías mediante la implementación de herramientas tecnológicas ajustadas a los requerimientos del cliente.

## Tabla de contenidos
 
- [Instalación](#instalación)
- [Recursos](#recursos)
- [Tecnologías](#tecnologías) 
- [Responsabilidades](#responsabilidades)
- [Contacto](#contacto)
- [Contacto](#contacto)




## Instalación

```bash
git clone [https://github.com/Danielbu82192/Proyecto-PPI-Frontend-DPrueba.git](https://github.com/Keny-Alejandro/td-g.git)
cd td-g
npm install
```

## Recursos
Para el desarrollo del back-end fue necesario el uso de los siguientes recursos:

- **api:** Recurso creado para la manipulación de la api de Google.
- **asginatura:** Recurso creado para la manipulación de las asignaturas.
- **backup:** Recurso creado para la eliminación de la información y a su vez la exportación de los mismos.
- **baner:** Recurso creado para la manipulación de los banners.
- **citas_asesoria_ppi:** Recurso creado para la manipulación de las citas de asesoría.
- **configuracion_entrega:** Recurso creado para la manipulación y configuración de las entregas.
- **entrega_equipo_ppi:** Recurso creado para manipulación de las entregas realizadas por los estudiantes.
- **equipo_ppi:** Recurso creado para manipular y administrar la información de las bitácoras de cada equipo.
- **equipo_ppi_jic:** Este recurso nos permite manipular y unir los equipos con cada módulo sol.
- **equipo_usuario:** Recurso creado para la manipulación de los equipos que serán conformados por los estudiantes para el desarrollo de los proyectos.
- **estado_cita:** Recurso creado para la manipulación de los estados de las citas.
- **estado_seguimiento:** Recurso creado para la manipulación de los estados pertenecientes a los seguimientos de cada cita de asesoría.
- **estado_seguimiento_cambio:** Este recurso nos permite la manipulación y unión de los estados seguimientos y los seguimientos de cada cita de asesoría, donde se anexa la fecha en al que el asesor puede modificar la cita.
- **helpers:** Recurso creado para la validación de formatos de los archivos subidos.
- **hora_semanal:** Recurso creado para la manipulación y almacenamiento de las horas de los asesores y su salón correspondiente.
- **notificaciones:** Recurso creado para la manipulación de las notificaciones.
- **observacion_cita:** Recurso creado para la manipulación y almacenamiento de los motivos de cancelación de las citas por parte del asesor.
- **programa:** Recurso creado para la manipulación y almacenamiento de los programas.
- **rol:** Recurso creado para la manipulación y almacenamiento de los roles de los usuarios.
- **seguimiento_ppi:** Recurso creado para la manipulación y almacenamiento de los seguimientos de las citas de asesorías.
- **semanas:** Recurso creado para la manipulación y almacenamiento de las semanas con respecto al semestre poli registrado por el coordinador.
- **tipo_cita:** Recurso creado para la manipulación y almacenamiento del tipo de la cita.
- **tipo_entrega:** Recurso creado para la manipulación y almacenamiento del tipo de la entrega.
- **usuario:** Recurso creado para la manipulación de cada uno de los usuarios.
- **usuario_asginatura:** Recurso creado para la manipulación y asociación de los usuarios y asignatura.
- **usuario_calificacion:** Recurso creado para la manipulación y almacenamiento de las calificaciones de cada usuario.


## Responsabilidades

La división de responsabilidades del desarrollo de los módulos anteriores fue dividida en 2 equipos donde los equipos se encuentran conformados por los estudiantes Daniel Bustamante Castro y Jose Alejandro Zapata Giraldo donde los mencionados anteriormente tuvieron la responsabilidad del desarrollo de los módulos de asesorías, bitácoras y login, mientras que el otro equipo es conformado por los estudiantes Keny Alejandro Serrato Ávila y Alejandro Bernal Duque los cuales tuvieron la responsabilidad del desarrollo de los módulos de gestión académica y gestión documental.

## Notas

En la version actual hay que tener en cuenta la siguiente información:

- En la versión actual, los servicios de Google no se encuentran desplegados sino en versión de prueba, lo cual implica que, para acceder a la aplicación, es necesario estar registrado en la API de Google, ya que no se encuentra abierta al público.

- El almacenamiento de las actividades subidas al aplicativo se encuentra alojado en un bucket de Amazon Web Services (AWS). Actualmente, se utiliza la capa gratuita, que ofrece almacenamiento limitado. En futuras versiones, si se sobrepasa este límite, se generarán costos adicionales.


## Tecnologías

En el presente proyecto se realiza el desarrollo del backend del Sistema Gestor del PPI, utilizando tecnologías modernas y eficientes para garantizar una experiencia de usuario fluida y atractiva.
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="ReactJs" width="200" >
  <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png" alt="NextJS" width="250" > 
</p>

El backend ha sido desarrollado con **Nest.js**, un poderoso framework de **Node.js** que permite la construir aplicaciones del lado del servidor eficientes, confiables y escalables. A continuación, se detallan las principales tecnologías y dependencias utilizadas en este proyecto:

- **XLSX:** Biblioteca para trabajar con archivos Excel, permitiendo la importación y exportación de datos en formato XLSX.
- **XLSX-populate:** Biblioteca para la manipulación avanzada de archivos Excel, proporcionando una API para crear y modificar hojas de cálculo Excel.
- **TypeORM:** ORM para TypeScript y JavaScript, que facilita la interacción con bases de datos mediante un enfoque orientado a objetos.
- **Nodemailer:** Biblioteca para enviar correos electrónicos desde aplicaciones Node.js.
- **Google APIs:** Biblioteca para interactuar con las APIs de Google, como Google Drive, Google Sheets, etc.
- *Multer:** Middleware para Node.js que gestiona la carga de archivos en aplicaciones Express.
- **Date-fns:** Biblioteca para el manejo y manipulación de fechas en JavaScript.
- **AWS SDK:** Conjunto de herramientas de Amazon Web Services para interactuar con los servicios de AWS desde tu aplicación.
- **Archiver:** Biblioteca para crear archivos ZIP y otros formatos de archivo, facilitando la compresión y empaquetado de archivos.

## Contacto 

El proyecto fue desarollado por los siguientes estuidantes pertenecientes al politecnico jaime isaza cadavid:

**Daniel Bustamante Castro** Daniel_bustamante82192@elpoli.edu.co

**Jose Alejandro Zapata Giraldo** jose_zapata82192@elpoli.edu.co

**Alejandro Bernal Duque** alejandro_bernal82191@elpoli.edu.co

**Keny Alejandro Serrato Ávila** keny_serrato82181@elpoli.edu.co
