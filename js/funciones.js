function obtenert_publicaciones() {
	Get_Ajax('Publicaciones/listado_publicaciones',{},false,function(data){
		if(data.res){
			$("#recibe_publicaciones").html(data.dataObj);
			QuitarLoading();
		}else{
					
	    }
	})
}