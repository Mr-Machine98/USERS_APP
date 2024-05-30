# Aplicación USERS_APP fullstack, SpringBoot + React

Un proyecto funcional construido con React y SpringBoot, se trata de un crud en donde se manejan dos roles que cumplen la función de mostrar diferente información dependiendo del usuario que haya ingresado a la aplicación. Pueden descargar un video demostrativo del funcionamiento en este enlace -> https://github.com/Mr-Machine98/USERS_APP/tree/main/video_demostrativo .

> [!IMPORTANT]  
> Las tecnologías utilizadas son las siguientes:
> - React
> - Redux
> - SpringBoot Java
> - PostgreSQL
> - JWT
>   
> Recuerda mirar en el Backend y Frontend, las configuraciones sobre las conexiones de Base de datos y consultas a los EndPoints, por ejemplo:
> ```
> # variables de entorno React
>  VITE_API_BASE_URL=http://localhost:8080
> ```
>
>
> ```
> # Configuración para PostgreSQL proyecto Backend
> spring.datasource.url=jdbc:postgresql://localhost:5432/db_users_app
> spring.datasource.username=
> spring.datasource.password=
> spring.datasource.driver-class-name=org.postgresql.Driver
> spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
> spring.jpa.show-sql=true
> spring.jpa.hibernate.ddl-auto=update
> logging.level.org.hibernate.sql=debug
> ```
> 

Para levantar el proyecto de React utiliza los comandos siguientes:

1- Instalar las dependencias del proyecto: 
```npm
  npm install
```

2- Levantar el proyecto con: 
```npm
  npm run dev
```

3- Ejecuta el backend con el IDE favorito de JAVA: 


![5012780_aca4_3](https://github.com/Mr-Machine98/USERS_APP/assets/74254687/6494e79c-f904-4459-8269-3e52a140fe28)


