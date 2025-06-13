/**
Ejercicio 10: Lectura desde una API y guardado como archivo local
Crear un script en Node.js que:
1.
Obtenga datos desde una API pública usando fetch
2.
Permita elegir cuántos usuarios descargar (--count=10)
3.
Convierta los datos al formato deseado (--to=json, csv, yaml o txt)
4.
Los guarde en un archivo local
Detalles de la API (pública y sin clave):
•
https://randomuser.me/
Requisitos:
•
Leer la documentación de https://randomuser.me/documentation
•
El script debe ejecutarse así: node descarga.js --count=20 --to=csv
•
Usa fetch para obtener los datos
•
Extrae solo los siguientes campos:
o
nombre completo (nombre + apellido)
o
email
o
ciudad
•
Guarda los datos en un archivo:
o
usuarios.json si --to=json
o
usuarios.csv si --to=csv
o
usuarios.txt si --to=txt
Extras opcionales:
•
Validar que el número (--count) sea un entero positivo
•
Mostrar por consola:
o
"Descargando usuarios..."
o
"Guardado correctamente en usuarios.csv"
•
Permitir que el nombre del archivo se indique con --out=archivo.txt (opcional)
 */