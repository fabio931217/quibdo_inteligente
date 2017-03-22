// JavaScript Document
var PLUGINS_ID;
var PLUGINS_URL;
var BASE_URL ="http://smartquibdo.sigtics.org/services/";
var TOKEN = 'HYT6&/_AB$K+]XxN2rm';
function Get_Ajax(urlSnd,datos,opt,cb){
	var URLSEND = BASE_URL+urlSnd;
	if(!datos){datos = {};}
	if(opt=='AllUrl'){	URLSEND = urlSnd; }
	
	datos.token = TOKEN;
	$.ajax({
		url: URLSEND,
		type: "POST",
		dataType: 'json',
		data: datos,
		success: function(msg){
			cb(msg);
		}
	});		
}
function Set_Ajax(urlSnd,datos,opt,cb){
	var URLSEND = BASE_URL+urlSnd;
	if(!datos){datos = {};}
	if(opt=='AllUrl'){	URLSEND = urlSnd; }
	$.ajax({
		url: URLSEND,
		type: "POST",
		dataType: 'json',
		data: datos,
		success: function(msg){
			cb(msg);
		}
	});		
}



function msg(cont,texto,tipo){
	$('.textomsg',cont).html(texto);
	$(cont).addClass('alert');
	if(tipo=='error'){
		$(cont).addClass('alert-warning');
	}else if(tipo=='complete'){
		$(cont).addClass('alert-success');	
	}
	
	$(cont).fadeIn(1000).delay(1500).fadeOut(1000);
	var top = $(cont).position().top  + 500;
	$(window).scrollTop(top);
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


// PLUGINS SUBIR ARCHIVOS 

$(function(){
$("#PLUGINS_CARGANDO").css({"display":"none","font-size":"200%"});
$(".divAlertPLUGINS").hide(); 
    $(".PLUGINS_UPLOAD").click(function(){
        PLUGINS_ID = ($(this).attr("id"));
        PLUGINS_URL = ($(this).attr("plugarchivo_subido"));
        $("#ModalFile").modal("show");
    });

        $('#PLUGINSformulario_subir_archivo').submit(function(){

          var formData = new FormData($(".PLUGINSformulario_subir_archivo")[0])

            $.ajax({ 
            url:BASE_URL + "services/Upload/subirArchivo",
            type: "POST",
            dataType: 'JSON',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,

            beforeSend: function(){
            	$("#PLUGINS_CARGANDO").css({"display":"block","font-size":"200%"}); 
            	$(".divAlertPLUGINS").hide();               
            },
            success: function(data){
				
				if(data.res){
				      $("#"+PLUGINS_ID).attr("plugarchivo_subido", BASE_URL+data.dataObj);
				       $("#PLUGINS_CARGANDO").css({"display":"none","font-size":"200%"});
				       $(".divAlertPLUGINS").hide();    
				       $("#ModalFile").modal("hide");				
				   }else{
					$(".divAlertPLUGINS").show(); 			
					$("#PLUGINS_CARGANDO").css({"display":"none","font-size":"200%"});   			
				}

            },
            error: function(data) {
            	$(".divAlertPLUGINS").show(); 	
                $("#PLUGINS_CARGANDO").css({"display":"none","font-size":"200%"});       
            }
            });
            return false;
            })
})

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
$(document).ready(function(){
   setTimeout(function(){QuitarLoading();}, 1000);
});


/*
	CLICK BUTTON
	Activa el HREF de un boton para redireccionar
*/
function clickButon(_THIS){
$(function(){	
	location.href = $(_THIS).attr('href');	
});
}