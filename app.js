const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowjuan = addKeyword(['sanatorio juan','san juan 23','San Juan 23','SAN JUAN 23','sanatorio san juan 23','Sanatorio San Juan 23','SANATORIO SAN JUAN 23','san juan veintitres','sanatorio sanjuan23',
  'sanatorio sanjuan 23','sanatorio san juan','san juan','sanatorio 23','san juan xxiii','sanatorio xxiii','san juan xxiii roca','san juan 23 general roca','san juan 23 telefono',
  'telefono san juan 23','como llegar al san juan 23','sanjuan23?', 'sanjuan23.', 'san juan 23?']).addAnswer([
  'Si, como no, aquí te dejo una ubicación, solo ingresa al link:  https://g.co/kgs/HvZ8czh', 'ademas te dejo sus numeros de telefonos +54 298-440 3805 , 0298-4430131 , 0298-4430132 y sus horarios de atencion que son de Lun. a vier. 08:00hs a 20:00hs(consultorios)'
  ,'necesitas algo mas?.🤓'
])
 
const flowroca = addKeyword(['clinica roca','Clínica Roca','CLINICA ROCA','clinica roka','clínica roca','clinica roca?','clinica roca.','clínica roca?','clínica roca.','la clinica roca',
  'la clínica roca', 'roca clinica','roca clínica','clinica roca telefono','telefono clinica roca','como llegar a clinica roca','donde queda clinica roca','clinica roca general roca','clinica roca direccion']).addAnswer([
  'Si , como no , aqui te dejo la ubicacion, solo ingresa al link: https://g.co/kgs/xU2ygW2',' ademas aqui te dejo sus contactoss +54 298 443-1821 y Gmail consulta@clinicaroca.com.ar'
])

const flowhospital = addKeyword(['hospital general roca','hospital roca','hospital francisco lopez lima','hospital lópez lima',
  'hospital lopez lima','francisco lopez lima','lópez lima','lopez lima','el hospital','hospital roca telefono','telefono del hospital','hospital direccion',
  'como llegar al hospital','hospital en roca','urgencias hospital','hospital 24hs','emergencia hospital']).addAnswer([
  'Si, como no, aquí te dejo la ubicación, sólo ingresá al link:  https://g.co/kgs/RJBmWg6 ','su Atención es de 24 hs (emergencias y guardia)'
  ,'necesitas algo mas?.🤓'
])

const flowfarma = addKeyword(['farmacia','farmacias','Farmacia','Farmacias','FARMACIA','FARMACIAS','farmacia ahora','farmacia urgente','necesito una farmacia',
 'farmacia cerca','farmacia general roca','farmacias en roca','dame una farmacia','buscar farmacia','farmacia?']).addAnswer([
'Claro aquí tienes las distintas farmacias para acceder a la ubicación da click en el enlace ',
'*Farmacia San Martín*',
'*Farmacia San Martín 1','su Telefono: 2984663634','https://maps.app.goo.gl/bmseaJoRZyejUg4Y7',
'*Farmacia San Martín 2','su Telefono: 2984604848','https://maps.app.goo.gl/2HzrMmPSwtmQGtsR6',
'*Farmacia San Martín 3','su Telefono: 2984663638','https://maps.app.goo.gl/ezUBzGk6rhf4QHFo7',
'*Farmacia San Martín 4','su Telefono: 2984604694','https://maps.app.goo.gl/9QpP98GjSKZJyCPX6',
'*Farmacia San Martín 5','su Telefono: 2984861066','https://maps.app.goo.gl/oTJMTiAkySN1Sd6WA',
'*Farmacia San Martín 6','su Telefono: 2984535875','https://maps.app.goo.gl/B49AWqQbUbKfjq9Y8',
'*Farmacia San Martín 7','su Telefono: 2984226071','https://maps.app.goo.gl/msvVpmUCTjkPUqyV8',
'*Farmacia San Martín 8','su Telefono: 2984131224','https://maps.app.goo.gl/xEsLFo8sv3WKMmqZA',
'*Farmacia San Martín 9','su Telefono: 2984160067','https://maps.app.goo.gl/3sn8W3HzykRbH4rv6'])
.addAnswer(['*Farmacia Bancaria*',
'*Farmacia Bancaria 1','su Telefono: 2984422886','https://maps.app.goo.gl/t19oWjVvyaoJxrqv8',
'*Farmacia Bancaria 2','su Telefono: 2984427795','https://maps.app.goo.gl/ojXFEsa4uskV8rW19',
'*Farmacia Bancaria 3','su Telefono: 2984422464','https://maps.app.goo.gl/awMx2ze8KbbVELTq6',
'*Farmacia Bancaria 4','su Telefono: 2984423686','https://maps.app.goo.gl/4HW1aqrrKWDDxC54A',
'*Farmacia Bancaria Güemes','su Telefono: 2984819595','https://maps.app.goo.gl/sHrjbwwFSLJLNKe98'])
.addAnswer(['*Farmacia Estuardo Romero*',
'*Farmacia Estuardo Romero I','su Telefono: 2984425200','https://maps.app.goo.gl/365cfHtQxcJ1BZno9',
'*Farmacia Estuardo Romero II','su Telefono: 2984385695','https://maps.app.goo.gl/RzJtm6G5jQVhKpDn6',
'*Farmacia Estuardo Romero III','su Telefono: 2984735380','https://maps.app.goo.gl/htHTKRpjWVYaEYVQ7'])
.addAnswer(['*Resto de Farmacias*',
'*Farmacia Mendoza','su Telefono: 2984425301','https://maps.app.goo.gl/eW5pzq1EMo56mhC8A',
'*Farmacia Carmelino','su Telefono: 2984436903','https://maps.app.goo.gl/Rw5iNqSfkurZQMqJ6',
'*Farmacia B° San Cayetano','su Telefono: 2984436566','https://maps.app.goo.gl/6opcKMEM7sG9HbDR9',
'*Farmacia Rohde','su Telefono: 2984434181','https://maps.app.goo.gl/bC4eKPGHB8YeMa9WA',
'*Farmacia Italia','su Telefono: 2984749166','https://maps.app.goo.gl/2wAgj8qGoCNWD94B6',
'*Farmajur','su Telefono: 2984437684','https://maps.app.goo.gl/TuHTmqhgwHDzcWuj6',
'*Farmacia Sanchez','su Telefono: 2984423214','https://maps.app.goo.gl/DgGLS8PNk6vPWPzr6',
'*Farmacia Sud','su Telefono: 2984422595','https://maps.app.goo.gl/Nyc9aoZRzhZuXiGx5',
'*Farmacia y Optica Costanzo','su Telefono: 2984422479','https://maps.app.goo.gl/4Ed87zoiXH9BrL2Y8',
'*Farmacia Del Valle','su Telefono:','https://maps.app.goo.gl/HKyVDenSZi7ZRbhRA',
'*FARMACIA LA PLATA','su Telefono: 2984432268','https://maps.app.goo.gl/xRNGi7tonLpKqsky9',
'*Farmacia San Juan SCS','su Telefono:','https://maps.app.goo.gl/vCnJxkRW8kRMtVZb8',
'*Farmacia Araucana','su Telefono: 2984425748','https://maps.app.goo.gl/kDe9MJa6zXc2aeGNA',
'*MIFARMA','su Telefono: 2984600069','https://maps.app.goo.gl/MBsK6LFiJkv9pG3Y7',
'*Pharmacy Villegas','su Telefono: 2984651277','https://maps.app.goo.gl/o9xjwTJBdtUNpywz5',
'*Farmacia Roca','su Telefono: 2984784634','https://maps.app.goo.gl/TWBCmhEvVm59e38k6',
'*Farmacia y Perfumeria Tiengo','su Telefono: 2984430222','https://maps.app.goo.gl/QJESM7oPDwSd1gxe9',
'*FARMACENTRO','su Telefono: No tiene','https://maps.app.goo.gl/iEAEi6pMb7XwUCss5',
'*Farmacia Mucarsel','su Telefono: 2984426838','https://maps.app.goo.gl/uRSBpVwv6dJVFXPd6',
'*Farmacia Rochdale','su Telefono: 2984539833','https://maps.app.goo.gl/hVSgtJTJBvrFQh5y7',
'*Farmacia Herrera','su Telefono: 29915317965','https://maps.app.goo.gl/nXePccovNhedk5yp8',
'*Farmacia Social','su Telefono: 2984633833','https://maps.app.goo.gl/xQZ7UhtBzsbe4NVw5',
'*Farmacia Del Sol','su Telefono: 2984433176','https://maps.app.goo.gl/gPmmrVq9837KP5EM8',
'*Farmacia Aeroclub','su Telefono: No tiene','https://maps.app.goo.gl/dZKuRKwhZWDd9QXr5',
'*Farmacia Tati House','su Telefono: No tiene','https://maps.app.goo.gl/MHnNQESHeDPeRw2FA',
'*Drogueria Alto valle','su Telefono: No tiene','https://maps.app.goo.gl/UAbZ6ZZgknjmiDFB8',
'*Farmacia Y Perfumeria Santa Teresita','su Telefono: 2984423090','https://maps.app.goo.gl/YDYmuv4v6UobHMBM8',
'*La Botica Scs','su Telefono: 02996596464','https://maps.app.goo.gl/UMY1pCD1Y6vVC7fV6',
'*Paniceres - La Farmacia','su Telefono: 2984428635','https://maps.app.goo.gl/es95X1P7N5rx21nHA',
])

const flowclinica = addKeyword([
  // Ubicaciones
  'ubicaciones de clinicas y hospitales?',
  'ubicacion de clinicas y hospitales?',
  'ubicacion clinicas y hospitales?',
  'ubicaciones clinicas y hospitales?',
  'ubicacion de CLINICAS y HOSPITALES?',
  'UBICACIONES DE CLINICAS Y HOSPITALES?',
  'ubicacion clinicas hospitales?',
  'ubicaciones clinicas hospitales?',
  'ubicacion de hospitales y clinicas?',
  'ubicaciones hospitales y clinicas?',
  'ubicacion hospitales y clinicas?',
  'ubicacion de clinica?',
  'ubicacion de hospital?',
  'ubicacion clinica?',
  'ubicacion hospital?',
  'ubicaciones de clinicas?',
  'ubicaciones de hospitales?',
  'ubicaciones clinicas?',
  'ubicaciones hospitales?',
  'ubicacion de CLINICA?',
  'ubicacion de HOSPITAL?',
  'UBICACION DE CLINICA?',
  'UBICACION DE HOSPITAL?',
  'ubicacion clínica?',
  'ubicacion hospital?',
  'ubicación de clínicas?',
  'ubicación de hospitales?',
  'ubicación de clínica?',
  'ubicación de hospital?',

  // Números
  'numero de clinicas y hospitales?',
  'numeros de clinicas y hospitales?',
  'numero clinicas y hospitales?',
  'numeros clinicas y hospitales?',
  'numero de CLINICAS y HOSPITALES?',
  'NUMERO DE CLINICAS Y HOSPITALES?',
  'NUMEROS DE CLINICAS Y HOSPITALES?',
  'numero clinicas hospitales?',
  'numeros clinicas hospitales?',
  'num clinicas hospitales?',
  'num de clinicas y hospitales?',
  'número de clínicas y hospitales?',
  'números de clínicas y hospitales?',
  'número de clínica?',
  'número de hospital?',
  'números de clínicas?',
  'números de hospitales?',
  'NUMERO DE CLINICA?',
  'NUMERO DE HOSPITAL?',
  'NUMEROS DE CLINICAS?',
  'NUMEROS DE HOSPITALES?',

  // Sin signo de pregunta
  'ubicaciones de clinicas y hospitales',
  'ubicaciones de clinicas',
  'ubicaciones de hospitales',
  'ubicacion de clinica',
  'ubicacion de hospital',
  'numero de clinicas y hospitales',
  'numeros de clinicas y hospitales',
  'numero de clinica',
  'numero de hospital',
  'números de hospitales',
  'número de clínica',
]
).addAnswer([
  'Por ahora solo constamos con las siguientes clinicas y hospitales:',
  '(urgencias y guardia)',
  'sanatorio juan 23',
  'clinica roca',
  'hospital fracisco lopez lima',
  'dime cual es la que necesitas?😉'],
               null,
               null,
[
  flowhospital,
  flowjuan,
  flowroca
])

const flowUbi = addKeyword(['ubicaciones', 'ubicasiones', 'ubicacioness', 'ubicaciónes', 'ubicacionez', 'ubicaci ones', 'ubikaciones', 'ubicacione', 'ubicacioens', 'ubicaciones']).addAnswer(
  ['hasta ahora solo cuento con las siguientes :',
    '👉Farmacias',
    '👉ubicaciones clinica y Hospitales',
   'para acceder a ellos envia como esta escrito 😉'
  ],
  null,
  null, 
  [
    flowclinica,
    flowfarma
  ]
)

const flowWelcome = addKeyword([EVENTS.WELCOME]).addAnswer([
  'No estoy programado para eso aun, puedes repetirme de otra manera ?😉 '
])

const municipio = addKeyword(['1', 'municipalidad', 'munisipalidad', 'municipalidá', 'municipalida', 'municpalidad', 'municipallidad', 'municcipalidad', 'municipalídad', 'municpalida', 'munizipalidad','telefono municipalidad']).addAnswer([
  'aqui tienes el numero de la Municipalidad 2984431400 y su sitio web es https://www.generalroca.gob.ar','necesitas algo mas?.🤓'
])

const flowVallenet = addKeyword(['2', 'vallenet',  'vallenet',
  'Vallenet',
  'VALLENET',
  'valenet',
  'Valenet',
  'VALENET',
  'ballenet',
  'Ballenet',
  'BALLENET',
  'vallenett',
  'Vallenett',
  'VALLENETT',
  'balenet',
  'Balenet',
  'BALENET']).addAnswer([
  'aqui tienes el numero de Vallenet: 08102200140 y su sitio web https://www.vallenet.com.ar/','necesitas algo mas?.🤓'
])

const flowAguas = addKeyword(['3', 'aguas', 'aguaz', 'aguass', 'aguazs', 'aguás', 'aguaz rionegrinas', 'aguas rionegrinas', 'aguasrionegrinas', 'aguas rionegrinas', 'aguas rio negrinas', 'aguas rionegrina', 'aguas rionnegrinas', 'aguas riongerinas', 'aguas rionnegrina', 'aguaz rionegrinas']).addAnswer([
  'aqui tienes el numero de Aguas Rionegrinas: 080099924827 / 2920402808 y su sitio web https://aguasrionegrinas.com/','necesitas algo mas?.🤓'
])

const flowEdersa = addKeyword(['4','edersa', 'Edersa','EDERSA', 'edersa.','edersa servicio','necesito edersa','llamar a edersa','edersa telefono',  'edersa',
  'Edersa',
  'EDERSA',
  'edersa electricidad',
  'Edersa Electricidad',
  'EDERSA ELECTRICIDAD',
  'ederssa',
  'Ederssa',
  'EDERSSA',
  'edrersa',
  'Edrersa',
  'EDRERSA',
  'eders',
  'Eders',
  'EDERS']).addAnswer([
  ' Claro aqui tienes el numero de Edersa: 08102229500 / 02994039150 y su sitio web https://www.edersa.com.ar/',
  'su horario de atención es de Lunes a viernes de 8:00 a 13:00 hs','necesitas algo mas?.🤓'
])

const flowCamusi = addKeyword(['5', 'camusi','Camusi','CAMUSI','camusi', 'camusi telefono','telefono camusi','telefono camuzzi','contacto camusi','contacto camuzzi','llamar camusi','camusi general roca','camuzzi general roca','camusi empresa','camuzzi empresa']).addAnswer([
  'aqui tienes el numero de Camusi: 08105553698 y su sitio Web https://www.camuzzigas.com.ar/',
  'su horario de atención es de Lunes a viernes de 8:00 a 16:00 hs','necesitas algo mas?.🤓'
])

const flowPersonalFlow = addKeyword(['6', 'perssonalflow','internet flow','telefono flow','telefono personal','personal flow telefono','contacto personal flow','llamar personal flow',
  'atencion al cliente personal flow','personal flow general roca','personal flow','Personal Flow','PERSONAL FLOW','perssonalflow','perssonal flow','personalflou','personall flow','personallflou','flow personal',]).addAnswer([
  'aqui tienes el numero de Personal Flow: 08004440800 / *111 y te dejo si sutio web https://www.flow.com.ar','necesitas algo mas?.🤓'
])

const flowNetPatagonia = addKeyword(['7', 'netpatagonia','net patagonia','Net Patagonia','NET PATAGONIA','netpatagonia','net patagonia','Net Patagonia','NET PATAGONIA','netpatagonia',]).addAnswer([
  'aqui tienes el numero de Net Patagonia: 2984334097 / 2984401445 y su sitio web https://netpatagonia.com.ar','necesitas algo mas?.🤓'
])
  

const flowemergencia = addKeyword(['8', 'emergencia','telefono de emergencia','telefonos emergencia','numeros de emergencia','emergencia','emergencias','Emergencia','Emergencias','EMERGENCIA','EMERGENCIAS','urgencia','urgencias',]).addAnswer([
  'Siarme: 0800-999-0946',
  'bomberos: 029844422484',
  'defensa civil: 02984431400 o 103',
  'Comisaria 021 :02984436718',
  'Comisaría 3era: 02984436721', 
  'Comisaria 31: 02984435288','Unidad regional 2da: 02984436707',
  'Policía destacamento 178: 02984425391',
  'Policía zona tránsito: 02984424937'
])

const flowtaxi =addKeyword(['taxi','taxi en general roca','taxi en roca','servicio de taxi','necesito un taxi','taxis', 'taxi','taxis','Taxi','Taxis','TAXI','TAXIS','taxi roca','pedir taxi','llamar taxi','quiero un taxi','telefono taxi','telefono taxis',]).addAnswer([
  'aqui tienes los numeros de las diferentes empresas de taxis',
  'Taxi Car: 2984684087',
  'Taxi Cargo: 2984669000',
  'Taxis Roca: 2984662666',
  'Tagliapietra silvo: 2984644747','necesitas algo mas?.🤓'
])

const flowServicios = addKeyword(['servicios', 'Servicios', 'SERVICIOS','servicios.','servicios',
  'servicio',
  'Servicio',
  'SERVICIO',
  'serbicios',
  'Serbicios',
  'SERBICIOS',
  'servisios',
  'Servisios',
  'SERVISIOS',
  'serbicio',
  'Serbicio',
  'SERBICIO']).addAnswer(
  [
    '👇 Para acceder a la informacion dime el nombrame alguno de los siguente servicios:',
    '1. Municipalidad',
    '2. Vallenet',
    '3. Aguas Rionegrinas',
    '4. Edersa',
    '5. Camusi',
    '6. Personal Flow',
    '7. Net Patagonia',
    '8. Taxis'
  ],
  null,
  null,
  [
    municipio,
    flowVallenet,
    flowAguas,
    flowEdersa,
    flowCamusi,
    flowPersonalFlow,
    flowNetPatagonia,
    flowemergencia,
    flowtaxi
  ]
)

const flowbarrionuevo = addKeyword(['barrio nuevo','nuevo','barrio nuevo',
  'Barrio Nuevo',
  'BARRIO NUEVO',
  'barrionuevo',
  'Barrionuevo',
  'BARRIONUEVO',
  'barrio nuveo',
  'Barrio Nuveo',
  'BARRIO NUveo',
  'bario nuevo',
  'Bario Nuevo',
  'BARIO NUEVO']).addAnswer([
  ' Claro aqui tienes los horarios de *BARRIO NUEVO*','*LUNES A VIERNES*',
'Salidas desde Dársena 4:',' Primer servicio: 06:10 - Último servicio: 23:50','Frecuencia: cada 30 minutos',
'Salidas desde Barrio Nuevo:', 'Primer servicio: 06:40 - Último servicio: 00:10','Frecuencia: cada 30 minutos',
'*SÁBADOS Y DOMINGO*',
'Salidas desde Dársena 4:', 'primer servicio: 06:10 - ultimo servicio: 21:40' ,'frecuencia:cada 40 minutos ',
'Desde Barrio Nuevo:' ,'primer servicio: 06:40 - ultimo servicio: 22:10 ','frecuencia: cada 40 minutos'
])


const flowippv = addKeyword(['ippv','malvinas', 'IPPV', 'MALVINAS','ippv malvinas',
  'Ippv Malvinas',
  'IPPV MALVINAS',
  'ippv-malvinas',
  'Ippv-Malvinas',
  'IPPV-MALVINAS',
  'ippvmalvinas',
  'IppvMalvinas',
  'IPPVMALVINAS',
  'ipv malvinas',
  'Ipv Malvinas',
  'IPV MALVINAS',
  'ippv malvina',
  'Ippv Malvina',
  'IPPV MALVINA']).addAnswer([
'Claro aqui tienes los horarios de *IPPV*','*SABADO Y DOMINGO*', 
'darsena  1(ida): Primer servicio: 06:10 - Ultimo servicio: 21:10 ','frecuencia aproximada: cada 60 minutos',
'mendoza y palacio(ida): Primer servicio: 07:15 -  Ultimo servicio: 21:15','Frecuencia aproximada: cada 60 minutos',
'rionegro y libertad (ida): Primer servicio: 07:17 -Primer servicio: 21:17','Frecuencia aproximada: cada 60 minutos',
'calle 225bis y cuba (ida): Primer servicio: 07:22 - Último servicio: 21:22','Frecuencia aproximada: cada 60 minutos',
'vinter y fothringhan (ida): Primer servicio: 06:25 - Último servicio: 21:25','Frecuencia aproximada: cada 60 minutos',
'vinter y plata:(vuelta): Primer servicio: 06:30 - Último servicio: 21:30','Frecuencia aproximada: cada 60 minutos',
'la plata y jujuy: Primer servicio: 06:35 - Último servicio: 21:35','Frecuencia aproximada: cada 60 minutos',
'lisandro la torre y bahia blanca (vuelta): Primer servicio: 06:37 - Último servicio: 21:37','Frecuencia aproximada: cada 60 minutos',
'venenzuela y jujuy(vuelta): Primer servicio: 06:43 - Último servicio: 21:43','Frecuencia aproximada: cada 60 minutos',
'guatemala y mendoza (vuelta):Primer servicio: 06:50 - Último servicio: 21:50','Frecuencia aproximada: cada 60 minutos',
'darsena 1 : Primer servicio: 07:00 - Último servicio: 22:00','Frecuencia aproximada: cada 60 minutos',
'*Horarios IPPV y MALVINAS LUNES A VIERNES*',
'DÁRSENA 1 (IDA): Primer servicio: 06:10 - Último servicio: 23:00','Frecuencia aproximada: cada 30 minutos',
'MENDOZA Y PALACIO (IDA): Primer servicio: 06:45 - Último servicio: 23:55','Frecuencia aproximada: cada 30 minutos',
'RIO NEGRO Y LIBERTADOR (IDA): Primer servicio: 06:47 - Último servicio: 23:57','Frecuencia aproximada: cada 30 minutos',
'CALLE 225BIS Y VENEZUELA (IDA): Primer servicio: 06:52 - Último servicio: 00:02','Frecuencia aproximada: cada 30 minutos',
'VINTER Y FOTHERINGHAM (IDA): Primer servicio: 06:25 - Último servicio: 00:05','Frecuencia aproximada: cada 30 minutos',
'VINTER Y LA PLATA (VUELTA): Primer servicio: 06:30 - Último servicio: 00:10','Frecuencia aproximada: cada 30 minutos',
'LA PLATA Y JUJUY (VUELTA): Primer servicio: 06:35 - Último servicio: 00:15','Frecuencia aproximada: cada 30 minutos',
'LISANDRO LA TORRE Y BAHÍA BLANCA (VUELTA): Primer servicio: 06:37 - Último servicio: 00:17','Frecuencia aproximada: cada 30 minutos',
'VENEZUELA Y JUJUY (VUELTA): Primer servicio: 06:43 - Último servicio: 00:30','Frecuencia aproximada: cada 30 minutos',
'GUATEMALA Y MENDOZA (VUELTA): Primer servicio: 06:50 - Último servicio: 00:30','Frecuencia aproximada: cada 30 minutos',
'DÁRSENA 1 (VUELTA): Primer servicio: 07:00 - Último servicio: 00:30','Frecuencia aproximada: cada 30 minutos'
])

const flowpuentecero = addKeyword(['puente cero','puente cero',
  'Puente Cero',
  'PUENTE CERO',
  'puentecero',
  'Puentecero',
  'PUENTECERO',
  'puente sero',
  'Puente Sero',
  'PUENTE SERO',
  'puente serro',
  'Puente Serro',
  'PUENTE SERRO',
  'puente ceroo',
  'Puente Ceroo',
  'PUENTE CEROO']).addAnswer([
  'Claro aqui tienes los horarios de *Puente cero*','*LUNES A VIERNES*',
'DÁRSENA 3 (IDA): Primer servicio: 06:35 - Último servicio: 21:10','Frecuencia aproximada: cada 60 a 90 minutos',
'MENDOZA Y SAN MARTÍN (IDA): Primer servicio: 06:35 - Último servicio: 21:10','Frecuencia aproximada: cada 60 a 90 minutos',
'JUJUY Y LA PLATA (IDA): Primer servicio: 06:48 - Último servicio: 21:18','Frecuencia aproximada: cada 60 a 90 minutos',
'VINTER Y LA PLATA (IDA): Primer servicio: 06:50 - Último servicio: 21:20','Frecuencia aproximada: cada 60 a 90 minutos',
'VINTER Y PANAMÁ (IDA): Primer servicio: 06:52 - Último servicio: 21:22','Frecuencia aproximada: cada 60 a 90 minutos',
'PANAMÁ Y AV. C. GARDEL (IDA): Primer servicio: 06:56 - Último servicio: 21:26','Frecuencia aproximada: cada 60 a 90 minutos',
'VINTER Y LA PLATA (VUELTA): rimer servicio: 06:32 - Último servicio: 21:32','Frecuencia aproximada: cada 60 a 90 minutos',
'LA PLATA Y JUJUY (VUELTA): Primer servicio: 06:37 - Último servicio: 21:37','Frecuencia aproximada: cada 60 a 90 minutos',
'L. LA TORRE Y BAHÍA BLANCA (VUELTA): Primer servicio: 06:43 - Último servicio: 21:43','Frecuencia aproximada: cada 60 a 90 minutos',
'VENEZUELA Y JUJUY (VUELTA): Primer servicio: 06:47 - Último servicio: 21:47','Frecuencia aproximada: cada 60 a 90 minutos',
'GUATEMALA Y MENDOZA (VUELTA): Primer servicio: 06:52 - Último servicio: 21:52','Frecuencia aproximada: cada 60 a 90 minutos',
'DÁRSENA 1 (VUELTA): Primer servicio: 06:52 - Último servicio: 21:52','Frecuencia aproximada: cada 60 a 90 minutos',
  '*HORARIOS PUENTE CERO SABADOS* ',
'DÁRSENA 3 (IDA): Primer servicio: 06:10 - Último servicio: 21:10','Frecuencia aproximada: cada 2 hora',
'MENDOZA Y SAN MARTÍN (IDA): Primer servicio: 06:14 - Último servicio: 21:14','Frecuencia aproximada: cada 2 horas',
'JUJUY Y LA PLATA (IDA): Primer servicio: 06:18 - Último servicio: 21:18','Frecuencia aproximada: cada 2 horas',
'VINTER Y LA PLATA (IDA): Primer servicio: 06:20 - Último servicio: 21:20','Frecuencia aproximada: cada 2 horas',
'VINTER Y PANAMÁ (IDA): Primer servicio: 06:22 - Último servicio: 21:22','Frecuencia aproximada: cada 2 horas',
'PANAMÁ Y AV. C. GARDEL (IDA): Primer servicio: 06:26 - Último servicio: 21:26','Frecuencia aproximada: cada 2 horas',
'VINTER Y LA PLATA (VUELTA): Primer servicio: 06:32 - Último servicio: 21:32','Frecuencia aproximada: cada 2 horas',
'LA PLATA Y JUJUY (VUELTA): Primer servicio: 06:37 - Último servicio: 21:37','Frecuencia aproximada: cada',
'L. LA TORRE Y BAHÍA BLANCA (VUELTA): Primer servicio: 06:43 - Último servicio: 21:43','Frecuencia aproximada: cada',
'VENEZUELA Y JUJUY (VUELTA): Primer servicio: 06:47 - Último servicio: 21:47','Frecuencia aproximada: cada ',
'GUATEMALA Y MENDOZA (VUELTA): Primer servicio: 06:52 - Último servicio: 21:52','Frecuencia aproximada: cada',
'DÁRSENA 1 (VUELTA): Primer servicio: 07:05 - ultimo servicio: 22:05','frecuencia aproximada: cada 2 horas'
])

const flowchacramonte = addKeyword(['chacramonte','chacramonte','Chacramonte',  'CHACRAMONTE',  'chacra monte',  'Chacra Monte',
  'CHACRA MONTE',  'chacramon',  'Chacramon',  'CHACRAMON',  'chacramomte',  'Chacramomte', 'CHACRAMOMTE', 'chacramontte',  'Chacramontte','CHACRAMONTT']).addAnswer([
 'Claro aqui tienes los horarios de *Chacramonte*','*LUNES A VIERNES*',
 'DÁRSENA N°1 (ida): Primer servicio: 06:20 - Último servicio: 23:50','Frecuencia aproximada: cada 1 hora',
 'CHACRAMONTE (vuelta): Primer servicio: 06:40 - Último servicio: 00:30','Frecuencia aproximada: cada 1 hora',
 'DESDE LA MARTINA: Primer servicio: 06:40 - Último servicio: 21:40','Frecuencia aproximada: cada 1 hora',
 'ESCUELA 35 : Primer servicio: 09:10 - Último servicio: 21:10','Frecuencia aproximada: cada 2 horas',
 'CHICHE PAISSA: Primer servicio: 09:00 - Último servicio: 21:00','Frecuencia aproximada: cada 6 horas',
 'GÓMEZ: Primer servicio: 22:45 - Último servicio: 00:20','Frecuencia aproximada: cada 1 hora 30 minutos',
 'PASO CÓRDOBA: Primer servicio: 23:10 - Último servicio: 00:40','Frecuencia aproximada: cada 1 hora 30 minutos'
])

const flowmosconi = addKeyword(['mosconi','mosconi',
  'Mosconi','MOSCONI','mosconni','Mosconni','MOSCONNI', 'moscconi', 'Moscconi', 'MOSCCONI', 'moskoni', 'Moskoni', 'MOSKONI', 'moscon','Moscon','MOSCON']).addAnswer([
  'Claro aqui tienes los horarios de *Mosconi*','*LUNES A VIERNES*',
 '-MOSCONI LA RIVERA SALIDAS DESDE DÁRSENA 4:', ' Primer servicio: 06:10 - Último servicio: 23:50','Frecuencia aproximada: cada 1 hora',
 'SALIDAS DESDE MOSCONI:', 'Primer servicio: 06:30 - Último servicio: 21:30','Frecuencia aproximada: cada 1 hora'
])

const flowstefenelli = addKeyword(['stefenelli', 'stefenelli','Stefenelli','STEFENELLI','estefenelli','Estefenelli','ESTEFENELLI','stefeneli','Stefeneli','STEFENELI','estefeneli',
  'Estefeneli','ESTEFENELI','stefenelly','Stefenelly','STEFENELLY']).addAnswer([
 'Claro aqui tienes los horarios de *Stefenelli*','*LUNES A SABADO*',
 'DÁRSENA 2:', 'Primer servicio: 06:10 - Último servicio: 21:10','Frecuencia aproximada: cada 60 minutos',
 'DESDE 70 VIVIENDAS:', 'Primer servicio: 06:20 - Último servicio: 21:20','Frecuencia aproximada: cada 60 minutos',
 'DESDE PLAZA VILLEGAS:', 'Primer servicio: 06:30 - Último servicio: 21:30','Frecuencia aproximada: cada 60 minutos'
])

const flowaeroclub = addKeyword(['aeroclub', 'aero club','Aero Club','AERO CLUB','aeroclub','Aeroclub', 'AEROCLUB','aero clup', 'Aero Clup','AERO CLUP', 'aero clob', 'Aero Clob','AERO CLOB']).addAnswer([
  'Claro aqui tienes los horarios de *Aeroclub*',
  '*LUNES A SABADO*',
  'desde darsena 1: Primer servicio: 06:10 - Último servicio: 23:50','Frecuencia aproximada: cada 1 hora','📝 Últimos tres servicios (21:40, 22:40, 23:50) son combinados con Barrio ',
  'quinta 25: Primer servicio: 06:16 - Último servicio: 21:16','Frecuencia aproximada: cada 1 hora',
  'desde aeroclub (vuelta): Primer servicio: 06:35 - Último servicio: 00:20','Frecuencia aproximada: cada 1 hora'
])

const flowpasocordoba = addKeyword(['paso cordoba','paso cordoba','Paso Cordoba','PASO CORDOBA', 'paso Córdoba','Paso Córdoba','PASO Córdoba',
  'paso cordova','Paso cordova','PASO cordova','paso CORDOBA','paso CORDOVA','PASO CORDOVA','paso corboda', 'Paso corboda','PASO corboda', 'paso corbova','Paso corbova','PASO corbova',
  'paso coroba',  'Paso coroba','PASO coroba','paso cordovaa','Paso cordovaa','PASO cordovaa']).addAnswer([
  'Claro aqui tienes los horarios de *Paso Cordoba*',
  '*LUNES A VIERNES*','salida desde darsena 2 (ida): Primer servicio: 07:05 - Último servicio: 23:50','Frecuencia aproximada: cada 1 hora 30 minutos',
  'paso cordoba: (vuelta) Primer servicio: 06:15 - Último servicio: 21:50','Frecuencia aproximada: cada 1 hora 30 minutos',
  'buenos aires chico: Primer servicio: 06:08 - Último servicio: 19:40','Frecuencia aproximada: cada 4 horas',
  '4 galpones: Primer servicio: 06:05 - Último servicio: 19:50','Frecuencia aproximada: cada 4 horas',
  '827 viv: Primer servicio: 06:40 - Último servicio: 12:42','Frecuencia aproximada: cada 2 horas 30 minutos'
])

const flowgomenesalt= addKeyword(['gomes','altabarda', 'gomez','Gomez','GÓMEZ','altabarda','Altabarda','ALTABARDA','gomez altabarda','altabarda gomez','gómez altabarda','goméz','gomes','gómes','gomez?','altabarda?','colectivo altabarda',
'colectivo gomez','linea altabarda','linea gomez','bondi gomez','bondi altabarda','horarios gomez','horarios altabarda','gomez roca','altabarda roca','gomez general roca','altabarda general roca']).addAnswer([
 'Claro aqui tienes los horarios de *Gomes y Alta Barda*',
 '*LUNES A VIERNES*', 'sale darsena 3: primer servicio: 06:10 - ultimo servicio: 23:50','frecuencia: cada 30 minutos',
 'desde villegas y felix heredia :primer servicio: 06:40 - ultimo servicio: 00:10','frecuencia: cada 30 minutos',
 '*SÁBADOS y DOMINGOS*', 'sale darsena 3:','primer servicio: 06:10 - ultimo servicio: 21:40','frecuencia: cada 30 minutos',
 'desde villegas y felix heredia :primer servicio: 06:40 - ultimo servicio: 00:10','frecuencia: cada 30 minutos',
 ,'primer servicio: 06:40 - ultimo servicio: 22:00','frecuencia : cada 30/40 minutos'
])

const flowHorarios = addKeyword(['horarios colectivo', 'Horarios colectivo', 'horarios Colectivo', 'Horarios', 'horarios','horarios colectivo','horarios de colectivo',
  'horario colectivo','horario de colectivo','colectivo horarios','colectivo horario','horarios colectivos','Horarios Colectivo','Horarios de colectivo','colectivos horarios',
  'colectivos','bondi','bondis','cuando pasa el colectivo','a que hora pasa el colectivo','necesito el bondi','ver horarios colectivo','colectivo?',
  'bondi?','horarios de bondi','colectivo general roca','horarios transporte','ver colectivo']).addAnswer(
  [
    'Claro, para saber los horarios del colectivo tienes que decirme el nombre de tu colectivo o barrio 😊'
  ],
  null,
  null,
)

const flowPrincipal = addKeyword(['hola', 'Hola', 'HOLA','holaa','holaaa','ola','Ola','OLA','holis','holiss','holaaa 😄','buenas','buen dia','buenos dias','buenas tardes','buenas noches','que tal','cómo estás',
  'como estas','saludos','hey','eii','holi','holii','ey bot','hola bot','inicio','start']).addAnswer([
  'Hola, soy Amancio. Te ayudaré con cosas básicas de General Roca para poder ubicarte o saber información de aquí 😌🤓'
])
.addAnswer(
    [
      'Puedo ayudarte con las siguientes cosas: 🤓',
      '• Teléfonos de servicios ',
      '• Ubicaciones (clinicas , hospitales y farmacias)',
      '• Horarios de colectivos',
      'Tenés que comunicarte conmigo diciendome uno de los sigueintes enunciados:',
      '👉 *ubicaciones*',
      '👉 *servicios* ',
      '👉 *horarios*',

    ],
    null,
    null,
    [flowServicios, flowUbi, flowHorarios]
  )
 
const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([
    flowPrincipal,
    flowServicios,
    flowUbi,
    flowHorarios,
    flowWelcome,
    flowVallenet,
    flowAguas,
    flowEdersa,
    flowCamusi,
    flowPersonalFlow,
    flowNetPatagonia,
    flowemergencia,
    flowbarrionuevo,
    flowippv,
    flowpuentecero,
    flowchacramonte,
    flowmosconi,
    flowstefenelli,
    flowaeroclub,
    flowpasocordoba,
    flowgomenesalt,
    flowtaxi,
    municipio,
    flowclinica,
    flowfarma,
    flowroca,
    flowjuan,
    flowhospital
  ])
  const adapterProvider = createProvider(BaileysProvider)

  await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  QRPortalWeb()
}

main()
