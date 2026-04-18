var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* Inicializamos la imagen */
var image = new Image();
var imageqr = new Image();

$(document).ready(function(){
    var curd_id = getUrlParameter('curd_id');

    $.post("../../controller/usuario.php?op=mostrar_curso_detalle", { curd_id : curd_id }, function (data) {
        data = JSON.parse(data);
        console.log(data);

        /* Ruta de la Imagen */
        image.src = data.cur_img;
        /* Dimensionamos y seleccionamos imagen */
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            /* Definimos tamaño de la fuente */
            ctx.font = '40px Arial';
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            /*var x = canvas.width / 2;
            ctx.fillText(data.usu_nom+' '+ data.usu_apep+' '+data.usu_apem, x, 250);*/

            ctx.font = '40px Arial';
            var x = canvas.width / 2;
            ctx.fillText(data.usu_nom+' '+ data.usu_apep+' '+data.usu_apem, x, 350);
            /*ctx.fillText(data.cur_nom, x, 350);*/

            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            ctx.font = '16px Arial';
            ctx.fillText('Por su participación en calidad de organizador en el "' +data.cur_nom+'",', x, 420);
            ctx.fillText('realizado el '+data.cur_fechini.split('-')[2]+' y '+data.cur_fechfin.split('-')[2]+' de ' +meses[parseInt(data.cur_fechini.split('-')[1]) - 1]+ ' del ' +data.cur_fechini.split('-')[0]+ ', con un total de ', x, 445);
            /*ctx.font = '15px Arial';
            ctx.fillText('Instructor', x, 450);*/

                        
            ctx.font = '16px Arial';
            ctx.fillText('Tacna, '+data.cur_fechfin.split('-')[2]+' de '+meses[parseInt(data.cur_fechini.split('-')[1]) - 1]+ ' del ' +data.cur_fechini.split('-')[0]+ '' , x, 490);

            /* Ruta de la Imagen */
            imageqr.src = "../../public/qr/"+curd_id+".png";
            /* Dimensionamos y seleccionamos imagen */
            imageqr.onload = function() {
                ctx.drawImage(imageqr, 400, 500, 100, 100);
            }
            /*$('#cur_descrip').html(data.cur_descrip);*/

        };

    });

});

$(document).on("click","#btnpng", function(){
    let lblpng = document.createElement('a');
    lblpng.download = "Certificado.png";
    lblpng.href = canvas.toDataURL();
    lblpng.click();
});

$(document).on("click","#btnpdf", function(){
    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF('l', 'mm');
    doc.addImage(imgData, 'PNG', 30, 15);
    doc.save('Certificado.pdf');
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
