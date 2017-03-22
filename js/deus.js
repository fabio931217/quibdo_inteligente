// JavaScript Document
var PLUGINS_ID;
var PLUGINS_URL;
var BASE_URL ="http://smartquibdo.sigtics.org/services/";
var TOKEN = 'HYT6&/_AB$K+]XxN2rm';
function msg(cont,texto,tipo){
	$('.textomsg',cont).html(texto);
	$(cont).addClass('alert');
	if(tipo=='error'){
		$(cont).addClass('alert-warning');
	}else if(tipo=='complete'){
		$(cont).addClass('alert-success');	
	}
	$(cont).show();
	$(cont).fadeIn(1000).delay(1500).fadeOut(1500);
	//var top = $(cont).position().top  + 500;
	//$(window).scrollTop(top);
}

function Ajax(urlSnd,datos,opt,cb){
	var URLSEND = BASE_URL+urlSnd;
	if(!datos){datos = {};}
	if(opt=='AllUrl'){	URLSEND = urlSnd; }
	
	datos.token = TOKEN;
	$.ajax({
		url: URLSEND,
		type: "POST",
		dataType: 'json',
		data: datos,
		beforeSend: function(){
			$(".cargar").show();
        },
		success: function(r){
			$(".cargar").hide();
			cb(r);
		},
		error: function(r) {
			$(".cargar").hide();
			msg($('.respuesta'),'Error al procesar la informacion','error');
        }
	});		
}



function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}


function proximoMes(fecha){
	var exFecha = fecha.split('-');
	var mes = parseInt(exFecha[1]) + 1;
	var anio = parseInt(exFecha[0]);
	if(mes>12){
		mes=1;
		anio=anio+1;
	}
	if(mes<10){  mes = '0'+mes;}
	var nF = anio+'-'+mes+'-'+exFecha[2];
	return nF;
}


// Quitar puntos
function clearP(val){
	var valor = parseInt(str_replace(',', '', val));
	valor = parseInt(str_replace('.', '', valor));
	if(valor && !isNaN(valor)){
		return valor;
	}else{
		return 0;	
	}
}

// Agregar puntos
function addP(val){
	//val = Math.round(val);
	return number_format(clearP(val),0, '.',',');
}
function addpuntos(){
	$(function(){
		$('.addpuntos').on('keyup', function(e){
		if(event.keyCode!=8){
			var n = parseInt($(this).val().replace(/\D/g,''),10);
			if(!isNaN(n)){ $(this).val(n.toLocaleString());	}
		}
		});
	})
}addpuntos();


function diferenciaF(fMayor,fMenor){
	if(!fMayor || !fMenor){ return 'Error';}
	fMayor = stringToDate(fMayor);
	fMenor = stringToDate(fMenor);
	return fMayor - fMenor;
}

function stringToDate(s) {
  var dateParts = s.split(' ')[0].split('-'); 
  var d = new Date(dateParts[0], --dateParts[1], dateParts[2]);
  return d.getTime();
}

function stringToDateHour(s) {
  var dateParts = s.split(' ')[0].split('-'); 
  var timeParts = s.split(' ')[1].split(':');
  var d = new Date(dateParts[0], --dateParts[1], dateParts[2]);
  d.setHours(timeParts[0], timeParts[1], timeParts[2])
  return d;
}

/*
	ESPACIOS  EN BLANCO
	Evalua si  una cadena tiene espacios en blanco
*/
function tieneEspacios(q) {
	for ( i = 0; i < q.length; i++ ) {
			if ( q.charAt(i) == ' ' ) {
					return true
			}
	}
	return false;
}

function QuitarLoading() {
	$("#recibe_publicaciones").css("display", "block");
    $("#Dcargando").css("display", "none");
}

/*
	CLICK BUTTON
	Activa el HREF de un boton para redireccionar
*/
function clickButon(_THIS){
$(function(){	
	location.href = $(_THIS).attr('href');	
});
}