## Monokera Tech Interview

1. Desarrollar una webapp en NextJs y consumiendo el API https://rickandmortyapi.com/api
realices las siguientes vistas:

- Vista paginada (20 resultados por página) de listado de personajes con filtro por
nombre y una sección con los 5 últimos personajes vistos (a los cuales el usuario
haya entrado a ver detalles)
- Vista detalle del personaje en donde se encuentre su foto, sus datos personales
(nombre, estado, especie, tipo y género), datos sobre su origen (nombre, tipo y
dimensión) y datos sobre su ubicación (nombre, tipo y dimensión).

## Explicacion de como se construyo el codigo.

- Se utilizo NextJS como framework de react, se inicio un patron de dise#o hexagonal, sin la separacion de componentes presentacionales o funcionales, 
    en vez de realizarse esa opcion, y teniendo en cuenta el tamano de la solicitud se implemento una separacion de componentes de la libreria shadcn como libreria de UI,
    para el manejo de componentes basicos.

    y se creo un set de componentes compartidos, que pueden ser utilizados en las paginas.

- El desarrollo se inicio con tailwindcss y shadcn como librerias base.
- Se genero un pull request [`link`](https://github.com/Dav1nx1/MonokeraTechInterview/pull/1). con un inicio de migracion a la metodologia BEM CSS. y para ilustrar el uso y manejo de pull requests. En ese mismo pull request se realizaron cambios en el README, para agregar otro tipo de readme, que va a quedar despues de la revision de esta prueba tecnica.
- Se genero otro pull requests que va directo a la rama main, para emular un hotfix o como se trabajaria en caso de un hotfix directo [`hotfix`](https://github.com/Dav1nx1/MonokeraTechInterview/pull/2

- Decisiones tecnicas.
    - No se utilizo ninguna libreria de manejo de estado. debido a que se prefirio utilizar una metodologia de contexto, decision tomada, debido al requerimiento.
    - El contexto actual solo se utilizo para almacenar las ultimas visitas a el link de detalle del cliente.
    - Las peticiones son cacheadas luego de realizarse la primera vez.
    - Se trato de utilizar en su mayoria los beneficios de NextJS para este tipo de desarrollos cortos. No se implemento SSR
    - Se desarrollo una app full responsive.
    - Se agrego debounce en el buscador, y un minimo de characteres de 3, para prevenir consumos elevados a la api
    - El buscador, utiliza la API expuesta por rickandmorty.com para hacer el uso del buscador, en otros casos, se pueden manejar otras estrategias, tanto del lado del servidor como del lado del cliente.
    - Se implementaron tecnicas para el manejo de performance, y prevenir re-renders en la aplicacion.
    - Se utilizo typescript
    - Se genero una estructura basica de tests utilizando JEST.
    - No se implementaron tests con cypress, se trato de realizar los mocks necesarios para las pruebas unitarias en JEST.
    - Se implemento React Query v5

- Conclusion

    Espero este breve trabajo, para el cual dispuse solo algunas horas, debido a mi trabajo actual, les de una claro detalle de mi manera de trabajar, y mi manera de ejecutar requerimientos. Acerca de puntos de mejora de esta aplicacion, hay varios, dependiendo de lo que se necesite mejorar, o lo que se necesite ajustar, pero ya iria atado a un requerimiento mas grande, o otras funcionalidades. Doy gracias por la oportunidad, y espero que este codigo, junto a la entrevista tecnica que tuvimos, les genere la confianza suficiente para seguir avanzando en el proceso de seleccion.

    Agradecido de antemano.
