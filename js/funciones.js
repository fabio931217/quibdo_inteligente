function atras() {
   $("#informacion_publicaciones").hide();
   $("#menu").show();
}
function ver(id) {
  var data = {};
  data.id= id;
  $("#id_blog").val(id);
  Ajax('Publicaciones/Informacion_publicacion',data,false,function(data){
    if(data.res){
      $("#recibe_comentarios").html(data.dataObj.comentarios);
      $("#recibe_foto").html(data.dataObj.foto);
      $("#recibe_contenido").html(data.dataObj.contenido);
      $("#recibe_titulo").html(data.dataObj.titulo);
      $("#recibe_fecha").html(data.dataObj.fecha);
    }else{
          
      }
  })

   $("#informacion_publicaciones").show();
   $("#menu").hide();
}

function obtenert_publicaciones() {
	Ajax('Publicaciones/listado_publicaciones',{},false,function(data){
		if(data.res){
			$("#recibe_publicaciones").html(data.dataObj);
			QuitarLoading();
		}else{
					
	    }
	})
}

function obtener_categorias() {
	Ajax('Publicaciones/listado_categorias',{},false,function(data){
		if(data.res){
			$(".categoria").html(data.dataObj);
		}else{
					
	    }
	})
}

function publicar() {
    $('#frmpublicar').submit(function(){

          var formData = new FormData($("#frmpublicar")[0]);

			$.ajax({
					url:BASE_URL+'Publicaciones/Registrar_publicacion',
					type: 'POST',
					data: formData,
					cache: false,
					async: true,
					contentType: false,
					processData: false,
		    beforeSend: function(){
					$("#aceptarP").hide();
					$("#pa").show();
            },
			success: function(data) {
				   	if(data.res){
                      msg($('.respuesta'),data.dataObj,'complete');
                      obtenert_publicaciones();
                      document.getElementById("frmpublicar").reset();	
					}else{
                      msg($('.respuesta'),data.dataObj,'error');
					}
					$("#aceptarP").show();

			}, xhr: function(){
						// get the native XmlHttpRequest object
						var xhr = $.ajaxSettings.xhr() ;
						// set the onprogress event handler
						xhr.upload.onprogress = function(evt){ var width = evt.loaded/evt.total*100;
                            var elem = document.getElementById("progreso"); 
                            elem.style.width = width + '%'; 
                            $("#progreso").html("Subiendo archivos... "+ parseInt(width) + '%');
						 } ;
						// set the onload event handler
						xhr.upload.onload = function(){ $("#pa").hide(); $("#aceptarP").show(); } ;
						// return the customized object
						return xhr ;
						// 50% Complete (info)
            }
		});
      return false;
    })
}

function contactar() {
  $("#frmcontactar").submit(function(){
	var datos = $("#frmcontactar").serialize();
	Ajax('Publicaciones/Registrar_sugerencias',datos,false,function(data){
		if(data.res){
			msg($('.respuesta'),data.dataObj,'complete');
			document.getElementById("frmcontactar").reset();
		}else{
			msg($('.respuesta'),data.dataObj,'error');		
	    }
	 })
	 return false;
   })
}

function comentar() {
  $("#frmcomentar").submit(function(){
	var datos = $("#frmcomentar").serialize();
	Ajax('Publicaciones/Registrar_comentario',datos,false,function(data){
		if(data.res){
			msg($('.respuesta'),data.dataObj.msg,'complete');
			$("#recibe_comentarios").html(data.dataObj.comentarios);
			document.getElementById("frmcomentar").reset();
		}else{
			msg($('.respuesta'),data.dataObj.msg,'error');		
	    }
	 })
	 return false;
   })
}

function buscar() {
  $("#frmbuscar").submit(function(){
	var datos = $("#frmbuscar").serialize();
	Ajax('Publicaciones/Buscar_publicaciones',datos,false,function(data){
		if(data.res){
			$("#recibe_consulta").html(data.dataObj);
		}else{
			msg($('.respuesta'),'No se encontro informacion','error');	
			$("#recibe_consulta").html(data.dataObj);	
	    }
	 })
	 return false;
   })
}


