const QUESTIONS = {
  1: [
    { id: 1, color: 'blanco', points: 10, question: 'Sofía compra 2 empanadas de $1,25 y un jugo de $0,75. ¿Cuánto gasta en total?', answer: 3.25 },
    { id: 2, color: 'blanco', points: 10, question: 'Una maestra reparte 12 lápices el lunes y 18 el martes. ¿Cuántos lápices repartió en total?', answer: 30 },
    { id: 3, color: 'blanco', points: 10, question: 'En el jardín se plantaron 25 flores rojas y 36 amarillas. ¿Cuántas flores hay en total?', answer: 61 },
    { id: 4, color: 'blanco', points: 10, question: 'Un grupo recolecta 43 tapas el lunes y 57 el martes. ¿Cuántas tapas recolectaron?', answer: 100 },
    { id: 5, color: 'blanco', points: 10, question: 'Una familia compra 4 manzanas ($0,30 c/u) y 3 naranjas ($0,25 c/u). ¿Cuánto pagaron?', answer: 1.95 },
    { id: 6, color: 'blanco', points: 10, question: 'En la biblioteca había 120 libros, se prestaron 45. ¿Cuántos libros quedan?', answer: 75 },
    { id: 7, color: 'blanco', points: 10, question: 'Una tienda tenía 80 caramelos y vendió 37. ¿Cuántos le quedan?', answer: 43 },
    { id: 8, color: 'blanco', points: 10, question: 'Una granja tenía 56 gallinas. Un vendedor compró 18. ¿Cuántas quedan?', answer: 38 },
    { id: 9, color: 'blanco', points: 10, question: 'En un aula había 42 estudiantes, 7 salieron. ¿Cuántos permanecen?', answer: 35 },
    { id: 10, color: 'blanco', points: 10, question: 'Un niño tenía $10,00. Compró una pelota de $6. ¿Cuánto le queda?', answer: 4 },
    { id: 11, color: 'rojo', points: 20, question: 'En el comedor se prepararon 48 panes para 8 mesas. ¿Cuántos panes recibe cada mesa?', answer: 6 },
    { id: 12, color: 'rojo', points: 20, question: 'Una maestra tiene 36 hojas para 9 estudiantes. ¿Cuántas hojas entrega a cada uno?', answer: 4 },
    { id: 13, color: 'rojo', points: 20, question: 'Una familia cocina 24 empanadas para 6 personas. ¿Cuántas come cada persona?', answer: 4 },
    { id: 14, color: 'rojo', points: 20, question: 'En una carrera participaron 60 estudiantes en grupos de 5. ¿Cuántos grupos se formaron?', answer: 12 },
    { id: 15, color: 'rojo', points: 20, question: 'Un agricultor cosechó 90 naranjas en cajas de 10. ¿Cuántas cajas llenó?', answer: 9 },
    { id: 16, color: 'rojo', points: 20, question: 'Se venden 6 sánduches cada día. En 5 días de clases, ¿cuántos se venden?', answer: 30 },
    { id: 17, color: 'rojo', points: 20, question: 'Cada estudiante recibe 3 hojas. Si hay 24 alumnos, ¿cuántas hojas se usan?', answer: 72 },
    { id: 18, color: 'rojo', points: 20, question: 'Cada caja de jugos tiene 12 unidades. Si reciben 4 cajas, ¿cuántos jugos hay?', answer: 48 },
    { id: 19, color: 'rojo', points: 20, question: 'Cada estudiante planta 5 árboles. Si participan 18, ¿cuántos árboles se sembraron?', answer: 90 },
    { id: 20, color: 'rojo', points: 20, question: 'Un panadero prepara 8 panes por bandeja. Si hornea 7 bandejas, ¿cuántos panes hace?', answer: 56 },
    { id: 55, color: 'blanco', points: 10, question: 'Un libro cuesta $12,50 y un cuaderno $8,75. ¿Cuánto cuestan juntos?', answer: 21.25 },
    { id: 56, color: 'blanco', points: 10, question: 'En una caja hay 48 lápices. Se sacan 15. ¿Cuántos quedan?', answer: 33 },
    { id: 57, color: 'blanco', points: 10, question: 'Un autobús lleva 32 pasajeros. Suben 18 más. ¿Cuántos hay ahora?', answer: 50 },
    { id: 58, color: 'blanco', points: 10, question: 'María tenía $50 y gastó $23,50. ¿Cuánto le queda?', answer: 26.50 },
    { id: 59, color: 'blanco', points: 10, question: 'Un terreno mide 25 m de frente y 40 m de fondo. ¿Cuál es su perímetro?', answer: 130 },
    { id: 60, color: 'rojo', points: 20, question: 'Si 7 amigos pagan $45 cada uno, ¿cuánto juntan en total?', answer: 315 },
    { id: 61, color: 'rojo', points: 20, question: 'Una receta necesita 250 g de harina para 10 personas. ¿Cuánta harina para 25 personas?', answer: 625 },
    { id: 62, color: 'rojo', points: 20, question: 'Un tren viaja a 80 km/h. ¿Cuántos kilómetros recorre en 3,5 horas?', answer: 280 },
    { id: 63, color: 'rojo', points: 20, question: 'Se reparten 144 caramelos entre 12 niños. ¿Cuántos recibe cada uno?', answer: 12 },
    { id: 64, color: 'rojo', points: 20, question: 'Un campo rectangular mide 45 m × 30 m. ¿Cuál es su área?', answer: 1350 },
    { id: 91, color: 'blanco', points: 10, question: 'Pedro tiene 15 canicas y gana 23 más. ¿Cuántas tiene ahora?', answer: 38 },
    { id: 92, color: 'blanco', points: 10, question: 'En un frutero hay 18 manzanas y 14 peras. ¿Cuántas frutas hay en total?', answer: 32 },
    { id: 93, color: 'blanco', points: 10, question: 'Un paquete de galletas cuesta $2,50. Si compras 3, ¿cuánto pagas?', answer: 7.50 },
    { id: 94, color: 'blanco', points: 10, question: 'Laura tenía 100 stickers y regaló 37. ¿Cuántos le quedan?', answer: 63 },
    { id: 95, color: 'blanco', points: 10, question: 'Un cine tiene 12 filas con 15 sillas cada una. ¿Cuántas sillas hay?', answer: 180 },
    { id: 96, color: 'blanco', points: 10, question: 'Si 4 helados cuestan $6, ¿cuánto cuesta 1 helado?', answer: 1.50 },
    { id: 97, color: 'blanco', points: 10, question: 'Un jardín tiene 8 filas de 12 rosas cada una. ¿Cuántas rosas hay?', answer: 96 },
    { id: 98, color: 'blanco', points: 10, question: 'Carlos pesa 45 kg y Ana pesa 38 kg. ¿Cuánto pesan juntos?', answer: 83 },
    { id: 99, color: 'blanco', points: 10, question: 'Una caja tiene 24 chocolates. Si se comen 9, ¿cuántos quedan?', answer: 15 },
    { id: 100, color: 'blanco', points: 10, question: 'Si un día tiene 24 horas, ¿cuántas horas tienen 3 días?', answer: 72 },
    { id: 101, color: 'blanco', points: 10, question: 'Un autobús tiene 48 asientos. Si 15 están ocupados, ¿cuántos están libres?', answer: 33 },
    { id: 102, color: 'blanco', points: 10, question: 'María lee 12 páginas por día. En 5 días, ¿cuántas páginas lee?', answer: 60 },
    { id: 103, color: 'blanco', points: 10, question: 'Un kilo de arroz cuesta $1,80. ¿Cuánto cuestan 3 kilos?', answer: 5.40 },
    { id: 104, color: 'blanco', points: 10, question: 'En una clase hay 28 estudiantes. Si faltan 6, ¿cuántos asisten?', answer: 22 },
    { id: 105, color: 'blanco', points: 10, question: 'Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?', answer: 26 },
    { id: 106, color: 'rojo', points: 20, question: 'Si 6 cuadernos cuestan $18, ¿cuánto cuesta 1 cuaderno?', answer: 3 },
    { id: 107, color: 'rojo', points: 20, question: 'Un ciclista recorre 15 km por hora. En 4 horas, ¿cuántos km recorre?', answer: 60 },
    { id: 108, color: 'rojo', points: 20, question: 'Se reparten 96 galletas entre 8 niños. ¿Cuántas recibe cada uno?', answer: 12 },
    { id: 109, color: 'rojo', points: 20, question: 'Un cuadrado tiene lado de 9 cm. ¿Cuál es su perímetro?', answer: 36 },
    { id: 110, color: 'rojo', points: 20, question: 'Si 1 hora tiene 60 minutos, ¿cuántos minutos tienen 2,5 horas?', answer: 150 },
    { id: 111, color: 'rojo', points: 20, question: 'Un libro tiene 240 páginas. Si lees 30 por día, ¿en cuántos días lo terminas?', answer: 8 },
    { id: 112, color: 'rojo', points: 20, question: '3 cajas pesan 45 kg en total. ¿Cuánto pesa cada caja si pesan igual?', answer: 15 },
    { id: 113, color: 'rojo', points: 20, question: 'Un terreno mide 60 m de largo y 25 m de ancho. ¿Cuál es su perímetro?', answer: 170 },
    { id: 114, color: 'rojo', points: 20, question: 'Si 5 lápices cuestan $3,50, ¿cuánto cuestan 10 lápices?', answer: 7 },
    { id: 115, color: 'rojo', points: 20, question: 'Un autobús sale a las 8:30 y llega a las 10:15. ¿Cuántos minutos dura el viaje?', answer: 105 },
    { id: 116, color: 'rojo', points: 20, question: 'En una granja hay 24 vacas y 18 cerdos. ¿Cuántos animales hay en total?', answer: 42 },
    { id: 117, color: 'rojo', points: 20, question: 'Si 12 huevos cuestan $2,40, ¿cuánto cuesta 1 huevo?', answer: 0.20 },
    { id: 118, color: 'rojo', points: 20, question: 'Un cuadrado tiene área de 64 cm². ¿Cuánto mide su lado?', answer: 8 },
    { id: 119, color: 'rojo', points: 20, question: 'Si 8 botellas de agua cuestan $4, ¿cuánto cuestan 20 botellas?', answer: 10 },
    { id: 120, color: 'rojo', points: 20, question: 'Un rectángulo tiene área de 120 m² y ancho de 8 m. ¿Cuánto mide su largo?', answer: 15 }
  ],
  2: [
    { id: 21, color: 'verde', points: 10, question: 'Un grupo usa 2 tablas de 85 cm y 1 de 70 cm. ¿Cuál es el largo total?', answer: 240 },
    { id: 22, color: 'verde', points: 10, question: 'Hay 5 puestos con cables de 2,4 metros cada uno. ¿Cuántos metros de cable se usaron?', answer: 12 },
    { id: 23, color: 'verde', points: 10, question: 'Un grupo usó 12 globos y otro 17. ¿Cuántos globos más usó el segundo?', answer: 5 },
    { id: 24, color: 'verde', points: 10, question: 'Un grupo tenía $25,00 y gastó $17,40. ¿Cuánto dinero les queda?', answer: 7.6 },
    { id: 25, color: 'verde', points: 10, question: 'El perímetro del cartel mide 3,5 m. Si agregan 0,8 m más, ¿cuál es la nueva longitud?', answer: 4.3 },
    { id: 26, color: 'amarillo', points: 20, question: 'Cada grupo necesita 3 vasos de vinagre y 2 de agua. Si hay 5 grupos, ¿cuántos vasos en total?', answer: 25 },
    { id: 27, color: 'amarillo', points: 20, question: 'Una mesa mide 1,2 m de largo. Si se colocan 6 mesas en fila, ¿qué longitud total cubren?', answer: 7.2 },
    { id: 28, color: 'amarillo', points: 20, question: 'Se imprimieron 60 folletos para 10 stands. ¿Cuántos folletos le corresponden a cada stand?', answer: 6 },
    { id: 29, color: 'amarillo', points: 20, question: 'Se usaron 120 cuentas para pulseras de 4 cuentas cada una. ¿Cuántas pulseras elaboraron?', answer: 30 },
    { id: 30, color: 'amarillo', points: 20, question: 'Cada litro de pintura cubre 3,5 m². Si usan 2 litros, ¿qué área total pueden pintar?', answer: 7 },
    { id: 31, color: 'rojo', points: 30, question: 'Si cada grupo presenta 7 minutos y hay 9 grupos antes del tuyo, ¿en qué minuto te toca presentar?', answer: 63 },
    { id: 32, color: 'rojo', points: 30, question: 'Mides 3 alturas: 25 cm, 30 cm y 35 cm. ¿Cuál es la media aritmética?', answer: 30 },
    { id: 33, color: 'rojo', points: 30, question: '5 personas visitaron 3, 5, 2, 4, 6 experimentos. ¿Cuál es el promedio de visitas?', answer: 4 },
    { id: 34, color: 'rojo', points: 30, question: 'Un rectángulo mide 120 cm de largo y 80 cm de ancho. ¿Cuál es su perímetro en metros?', answer: 4 },
    { id: 35, color: 'rojo', points: 30, question: 'Si un evento dura 2,5 horas y comenzó a las 14:30, ¿a qué hora termina? (formato decimal, ej: 17.0)', answer: 17 },
    { id: 65, color: 'verde', points: 10, question: 'Si 3x = 27, ¿cuánto vale x?', answer: 9 },
    { id: 66, color: 'verde', points: 10, question: 'Un triángulo tiene base 12 cm y altura 8 cm. ¿Cuál es su área?', answer: 48 },
    { id: 67, color: 'verde', points: 10, question: 'Si f(x) = 2x + 5, ¿cuánto vale f(3)?', answer: 11 },
    { id: 68, color: 'verde', points: 10, question: '¿Cuál es el 25% de 240?', answer: 60 },
    { id: 69, color: 'verde', points: 10, question: 'Un círculo tiene radio 5 cm. ¿Cuál es su perímetro? (usa π ≈ 3.14)', answer: 31.4 },
    { id: 70, color: 'amarillo', points: 20, question: 'Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?', answer: 4 },
    { id: 71, color: 'amarillo', points: 20, question: 'Datos: 8, 12, 10, 14, 16. ¿Cuál es la media?', answer: 12 },
    { id: 72, color: 'amarillo', points: 20, question: 'Si un producto cuesta $80 y tiene 15% de IVA, ¿cuánto cuesta final?', answer: 92 },
    { id: 73, color: 'amarillo', points: 20, question: 'Un rectángulo tiene perímetro 36 cm y largo 12 cm. ¿Cuánto mide el ancho?', answer: 6 },
    { id: 74, color: 'amarillo', points: 20, question: 'Si 5 obreros hacen una obra en 12 días, ¿en cuántos días la hacen 10 obreros?', answer: 6 },
    { id: 75, color: 'rojo', points: 30, question: 'Resuelve el sistema: x + y = 10, x - y = 4. ¿Cuánto vale x?', answer: 7 },
    { id: 76, color: 'rojo', points: 30, question: 'Si f(x) = x² - 3x + 2, ¿cuánto vale f(4)?', answer: 6 },
    { id: 77, color: 'rojo', points: 30, question: 'Un terreno rectangular tiene área 240 m² y largo 20 m. ¿Cuál es el perímetro?', answer: 64 },
    { id: 78, color: 'rojo', points: 30, question: 'Datos: 5, 8, 12, 15, 20. ¿Cuál es la mediana?', answer: 12 },
    { id: 79, color: 'rojo', points: 30, question: 'Si un auto recorre 180 km en 2,5 horas, ¿cuál es su velocidad promedio?', answer: 72 },
    { id: 121, color: 'verde', points: 10, question: 'Si 4x = 36, ¿cuánto vale x?', answer: 9 },
    { id: 122, color: 'verde', points: 10, question: 'Un cuadrado tiene lado de 7 cm. ¿Cuál es su área?', answer: 49 },
    { id: 123, color: 'verde', points: 10, question: 'Si f(x) = x + 8, ¿cuánto vale f(5)?', answer: 13 },
    { id: 124, color: 'verde', points: 10, question: '¿Cuál es el 50% de 180?', answer: 90 },
    { id: 125, color: 'verde', points: 10, question: 'Un círculo tiene diámetro de 10 cm. ¿Cuál es su radio?', answer: 5 },
    { id: 126, color: 'verde', points: 10, question: 'Si x - 5 = 12, ¿cuánto vale x?', answer: 17 },
    { id: 127, color: 'verde', points: 10, question: 'Un rectángulo mide 15 cm × 6 cm. ¿Cuál es su área?', answer: 90 },
    { id: 128, color: 'verde', points: 10, question: '¿Cuál es el 10% de 350?', answer: 35 },
    { id: 129, color: 'verde', points: 10, question: 'Si 2x + 4 = 10, ¿cuánto vale x?', answer: 3 },
    { id: 130, color: 'verde', points: 10, question: 'Un triángulo equilátero tiene lado de 8 cm. ¿Cuál es su perímetro?', answer: 24 },
    { id: 131, color: 'amarillo', points: 20, question: 'Resuelve: 3x - 9 = 12. ¿Cuánto vale x?', answer: 7 },
    { id: 132, color: 'amarillo', points: 20, question: 'Datos: 4, 7, 9, 12, 18. ¿Cuál es la media?', answer: 10 },
    { id: 133, color: 'amarillo', points: 20, question: 'Si un producto cuesta $120 y tiene 20% de descuento, ¿cuánto cuesta?', answer: 96 },
    { id: 134, color: 'amarillo', points: 20, question: 'Un cilindro tiene radio 3 cm y altura 10 cm. ¿Cuál es su volumen? (usa π ≈ 3.14)', answer: 282.6 },
    { id: 135, color: 'amarillo', points: 20, question: 'Si 8 trabajadores hacen una obra en 6 días, ¿en cuántos días la hacen 12 trabajadores?', answer: 4 },
    { id: 136, color: 'amarillo', points: 20, question: 'Resuelve: x/4 = 7. ¿Cuánto vale x?', answer: 28 },
    { id: 137, color: 'amarillo', points: 20, question: 'Datos: 3, 6, 9, 12, 15, 18. ¿Cuál es la mediana?', answer: 10.5 },
    { id: 138, color: 'amarillo', points: 20, question: 'Un prisma rectangular mide 5×4×3 cm. ¿Cuál es su volumen?', answer: 60 },
    { id: 139, color: 'amarillo', points: 20, question: 'Si f(x) = 4x - 3, ¿cuánto vale f(5)?', answer: 17 },
    { id: 140, color: 'amarillo', points: 20, question: 'Un triángulo tiene base 10 cm y altura 6 cm. ¿Cuál es su área?', answer: 30 },
    { id: 141, color: 'rojo', points: 30, question: 'Resuelve el sistema: 2x + y = 10, x - y = 2. ¿Cuánto vale x?', answer: 4 },
    { id: 142, color: 'rojo', points: 30, question: 'Si f(x) = 2x² - x + 3, ¿cuánto vale f(3)?', answer: 18 },
    { id: 143, color: 'rojo', points: 30, question: 'Un terreno cuadrado tiene área de 400 m². ¿Cuál es su perímetro?', answer: 80 },
    { id: 144, color: 'rojo', points: 30, question: 'Datos: 2, 4, 6, 8, 10. ¿Cuál es la varianza?', answer: 8 },
    { id: 145, color: 'rojo', points: 30, question: 'Si un tren recorre 240 km en 3 horas, ¿cuál es su velocidad en m/s? (redondea)', answer: 22 },
    { id: 146, color: 'rojo', points: 30, question: 'Resuelve: (x + 3)(x - 2) = 0. ¿Cuál es la raíz positiva?', answer: 2 },
    { id: 147, color: 'rojo', points: 30, question: 'Si f(x) = √(x + 7), ¿cuánto vale f(9)?', answer: 4 },
    { id: 148, color: 'rojo', points: 30, question: 'Un cono tiene radio 4 cm y altura 9 cm. ¿Cuál es su volumen? (usa π ≈ 3.14, redondea)', answer: 151 },
    { id: 149, color: 'rojo', points: 30, question: 'Si 3 obreros hacen una obra en 8 días, ¿en cuántos días la hacen 6 obreros?', answer: 4 },
    { id: 150, color: 'rojo', points: 30, question: 'Resuelve: |2x - 6| = 4. ¿Cuál es la raíz mayor?', answer: 5 }
  ],
  3: [
    { id: 36, color: 'azul', points: 10, question: 'Si 2x + 3 = 11, ¿cuánto vale x?', answer: 4 },
    { id: 37, color: 'azul', points: 10, question: 'Si 3x - 7 = 14, ¿cuánto vale x?', answer: 7 },
    { id: 38, color: 'azul', points: 10, question: 'En el sistema 2x + 3y = 6, x - y = 1, ¿cuánto vale x?', answer: 1.8 },
    { id: 39, color: 'azul', points: 10, question: 'Si f(x) = 3x + 5, ¿cuánto vale f(4)?', answer: 17 },
    { id: 40, color: 'azul', points: 10, question: 'Un stand mide 3 m de largo y 2 m de ancho. ¿Cuál es su área en m²?', answer: 6 },
    { id: 41, color: 'azul', points: 10, question: 'Si la feria cobra $2 por adulto y $1.5 por estudiante, y asistieron 240 adultos y 120 estudiantes, ¿cuánto se recaudó?', answer: 660 },
    { id: 42, color: 'azul', points: 10, question: 'El primer día se recolectan 5 botellas, el segundo 8 y el tercero 11. ¿Cuántas se tendrán al día 10?', answer: 32 },
    { id: 43, color: 'azul', points: 10, question: 'Una pintura tarda 15 minutos por capa. Si aplican 4 capas, ¿cuántos minutos en total?', answer: 60 },
    { id: 44, color: 'amarillo', points: 20, question: '3 jugos y 2 galletas cuestan $5,00. 2 jugos y 3 galletas cuestan $4,50. ¿Cuánto cuesta un jugo?', answer: 1.2 },
    { id: 45, color: 'amarillo', points: 20, question: 'Edades: 14, 15, 14, 16, 15. ¿Cuál es la media?', answer: 14.8 },
    { id: 46, color: 'amarillo', points: 20, question: 'Si gastan $15 fijos y $2,5 por cartel adicional, ¿cuánto gastan para 8 carteles?', answer: 35 },
    { id: 47, color: 'amarillo', points: 20, question: 'Un grupo paga $45 con 15% de descuento. ¿Cuánto es el monto final?', answer: 38.25 },
    { id: 48, color: 'amarillo', points: 20, question: 'Datos: 10, 20, 30, 40, 50. ¿Cuál es la mediana?', answer: 30 },
    { id: 49, color: 'naranja', points: 30, question: 'Evalúa la integral definida: ∫₀¹ x² dx', answer: 0.333 },
    { id: 50, color: 'naranja', points: 30, question: 'Evalúa la integral definida: ∫₀² x² dx', answer: 2.667 },
    { id: 51, color: 'naranja', points: 30, question: 'Si f(x) = x³ + 2x, ¿cuánto vale f\'(2)?', answer: 14 },
    { id: 52, color: 'naranja', points: 30, question: 'Si f(x) = 3x² + 4x, ¿cuánto vale f\'(1)?', answer: 10 },
    { id: 53, color: 'naranja', points: 30, question: 'Evalúa la integral definida: ∫₁² 2x dx', answer: 3 },
    { id: 54, color: 'naranja', points: 30, question: 'Evalúa la integral definida: ∫₀¹ 3x² dx', answer: 1 },
    { id: 80, color: 'azul', points: 10, question: 'Si log₂(8) = x, ¿cuánto vale x?', answer: 3 },
    { id: 81, color: 'azul', points: 10, question: 'Si sen(30°) = x, ¿cuánto vale x? (respuesta decimal)', answer: 0.5 },
    { id: 82, color: 'amarillo', points: 20, question: 'Resuelve: x² - 5x + 6 = 0. ¿Cuál es la raíz mayor?', answer: 3 },
    { id: 83, color: 'amarillo', points: 20, question: 'Si f(x) = (2x + 1)², ¿cuánto vale f(2)?', answer: 25 },
    { id: 84, color: 'amarillo', points: 20, question: 'Datos: 10, 15, 20, 25, 30. ¿Cuál es la desviación estándar? (redondea a 2 decimales)', answer: 7.07 },
    { id: 85, color: 'naranja', points: 30, question: 'Si f(x) = x⁴, ¿cuánto vale f\'(2)?', answer: 32 },
    { id: 86, color: 'naranja', points: 30, question: 'Si f(x) = 5x³ - 2x, ¿cuánto vale f\'(1)?', answer: 13 },
    { id: 87, color: 'naranja', points: 30, question: 'Si f(x) = sen(x), ¿cuánto vale f\'(π/2)? (respuesta decimal)', answer: 0 },
    { id: 88, color: 'naranja', points: 30, question: 'Evalúa: ∫₀³ 2x dx', answer: 9 },
    { id: 89, color: 'naranja', points: 30, question: 'Evalúa: ∫₁³ (x² + 1) dx', answer: 11.333 },
    { id: 90, color: 'naranja', points: 30, question: 'Evalúa: ∫₀¹ (3x² + 2x) dx', answer: 2 },
    { id: 151, color: 'azul', points: 10, question: 'Si 5x - 10 = 20, ¿cuánto vale x?', answer: 6 },
    { id: 152, color: 'azul', points: 10, question: 'Si f(x) = x² - 4, ¿cuánto vale f(3)?', answer: 5 },
    { id: 153, color: 'azul', points: 10, question: '¿Cuánto vale log₁₀(1000)?', answer: 3 },
    { id: 154, color: 'azul', points: 10, question: 'Si cos(60°) = x, ¿cuánto vale x? (respuesta decimal)', answer: 0.5 },
    { id: 155, color: 'azul', points: 10, question: 'Si f(x) = 2x³, ¿cuánto vale f(2)?', answer: 16 },
    { id: 156, color: 'azul', points: 10, question: 'Resuelve: x² = 49. ¿Cuál es la raíz positiva?', answer: 7 },
    { id: 157, color: 'azul', points: 10, question: 'Si eˣ = 1, ¿cuánto vale x?', answer: 0 },
    { id: 158, color: 'azul', points: 10, question: '¿Cuánto vale tan(45°)? (respuesta decimal)', answer: 1 },
    { id: 159, color: 'azul', points: 10, question: 'Si f(x) = 1/x, ¿cuánto vale f(4)?', answer: 0.25 },
    { id: 160, color: 'azul', points: 10, question: 'Si ln(e³) = x, ¿cuánto vale x?', answer: 3 },
    { id: 161, color: 'amarillo', points: 20, question: 'Resuelve: x² - 9 = 0. ¿Cuál es la raíz positiva?', answer: 3 },
    { id: 162, color: 'amarillo', points: 20, question: 'Si f(x) = x³ - 2x, ¿cuánto vale f(2)?', answer: 4 },
    { id: 163, color: 'amarillo', points: 20, question: 'Datos: 2, 4, 6, 8, 10. ¿Cuál es la desviación estándar? (redondea a 2 decimales)', answer: 2.83 },
    { id: 164, color: 'amarillo', points: 20, question: 'Resuelve el sistema: x + 2y = 8, 3x - y = 3. ¿Cuánto vale x?', answer: 2 },
    { id: 165, color: 'amarillo', points: 20, question: 'Si f(x) = (x + 1)(x - 3), ¿cuánto vale f(2)?', answer: -3 },
    { id: 166, color: 'amarillo', points: 20, question: '¿Cuánto vale log₂(16)?', answer: 4 },
    { id: 167, color: 'amarillo', points: 20, question: 'Si f(x) = √(2x + 1), ¿cuánto vale f(4)?', answer: 3 },
    { id: 168, color: 'amarillo', points: 20, question: 'Resuelve: 2ˣ = 32. ¿Cuánto vale x?', answer: 5 },
    { id: 169, color: 'amarillo', points: 20, question: 'Si f(x) = |x - 5|, ¿cuánto vale f(2)?', answer: 3 },
    { id: 170, color: 'amarillo', points: 20, question: 'Datos: 1, 3, 5, 7, 9. ¿Cuál es la varianza?', answer: 8 },
    { id: 171, color: 'naranja', points: 30, question: 'Si f(x) = 2x³ + x², ¿cuánto vale f\'(1)?', answer: 8 },
    { id: 172, color: 'naranja', points: 30, question: 'Si f(x) = cos(x), ¿cuánto vale f\'(0)?', answer: 0 },
    { id: 173, color: 'naranja', points: 30, question: 'Evalúa: ∫₀² (3x² + 1) dx', answer: 10 },
    { id: 174, color: 'naranja', points: 30, question: 'Si f(x) = x²·sen(x), ¿cuánto vale f\'(π/2)? (respuesta decimal, redondea)', answer: 3.14 },
    { id: 175, color: 'naranja', points: 30, question: 'Evalúa: ∫₁² (1/x) dx. (respuesta decimal, redondea a 3 decimales)', answer: 0.693 },
    { id: 176, color: 'naranja', points: 30, question: 'Si f(x) = eˣ, ¿cuánto vale f\'(0)?', answer: 1 },
    { id: 177, color: 'naranja', points: 30, question: 'Evalúa: ∫₀¹ (2x³ + 3x) dx', answer: 2 },
    { id: 178, color: 'naranja', points: 30, question: 'Si f(x) = ln(x), ¿cuánto vale f\'(1)?', answer: 1 },
    { id: 179, color: 'naranja', points: 30, question: 'Evalúa: ∫₀^(π/2) cos(x) dx', answer: 1 },
    { id: 180, color: 'naranja', points: 30, question: 'Si f(x) = x·eˣ, ¿cuánto vale f\'(0)?', answer: 1 }
  ]
};

let currentCard = null;
let usedQuestionIds = new Set();

function getRandomQuestion(level) {
  const questions = QUESTIONS[level];
  const available = questions.filter(q => !usedQuestionIds.has(q.id));

  if (available.length === 0) {
    usedQuestionIds.clear();
    return questions[Math.floor(Math.random() * questions.length)];
  }

  const question = available[Math.floor(Math.random() * available.length)];
  usedQuestionIds.add(question.id);
  return question;
}

function getCurrentCard() {
  return currentCard;
}

function loadNextCard(level) {
  currentCard = getRandomQuestion(level);
  return currentCard;
}

function renderCard(card, level) {
  const colorClass = `card-badge-${card.color === 'blanco' ? 'rojo' : card.color}`;

  document.getElementById('card-points').textContent = `${card.points} PTS`;
  document.getElementById('card-meta').textContent = `NIVEL ${level} · ${card.color.toUpperCase()}`;
  document.getElementById('card-question').textContent = card.question;

  const badge = document.getElementById('card-points-badge');
  badge.className = `card-badge ${colorClass}`;
}
