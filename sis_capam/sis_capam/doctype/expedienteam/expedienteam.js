// Copyright (c) 2019, ericklopez and contributors
// For license information, please see license.txt

frappe.ui.form.on('ExpedienteAM', {
	refresh: function(frm) {
		calculate_puntuation(frm);
		calculate_ingresos(frm);
		
	}
});

frappe.ui.form.on('ExpedienteAM', {
	on_load: function(frm) {

	}
});

frappe.ui.form.on('ExpedienteAM', {
	before_save: function(frm) {
		var pn = frm.doc.primer_nombre;
		var pa = frm.doc.primer_apellido;
		var cp = frm.doc.conocido_por;
		frm.set_value('nombre_completo', pn + ' ' + pa + ', ' + cp);
	}
});


frappe.ui.form.on('ExpedienteAM', {
	after_save: function(frm) {
		var fc = frappe.model.get_new_doc("Ficha_Clinica");
		var curr_exp = frm.doc.name;
		//alert(frm.doc.__islocal);
		fc.codigo=curr_exp;

		//	alert("crea ficha");
		frappe.call({
                method: "sis_capam.sis_capam.doctype.expedienteam.expedienteam.newFc",
                args: {
                        doc_name: curr_exp
                }
        });
		
		//frappe.set_route("Form", "Ficha_Clinica", fc.name);
	}
});


frappe.ui.form.on("ExpedienteAM","fecha_nacimiento", function(frm){
	var parts =frm.doc.fecha_nacimiento.split('-');
	var nac = new Date(parts[0], parts[1] - 1, parts[2]);
	
	var nd = calculate_age(new Date(nac));
	//if(frm.doc.edad == 0 || frm.doc.edad == null ){
		frm.set_value("edad",nd);
	//}
});

frappe.ui.form.on("ExpedienteAM","edad", function(frm){
	//alert(frm.doc.fecha_nacimiento);
	//alert(frm.doc.edad);
	//if(typeof frm.doc.fecha_nacimiento === "undefined"){
	//	frm.set_value("fecha_nacimiento",'15-01-2018');
	//	console.log('hola');
	//}
});

frappe.ui.form.on("ExpedienteAM","situacion_familiar", function(frm){
	calculate_puntuation(frm);
});

frappe.ui.form.on("ExpedienteAM","situacion_economica", function(frm){
	calculate_puntuation(frm);
});
frappe.ui.form.on("ExpedienteAM","vivienda_adecuada", function(frm){
	calculate_puntuation(frm);
});
frappe.ui.form.on("ExpedienteAM","relaciones_sociales", function(frm){
	calculate_puntuation(frm);
});
frappe.ui.form.on("ExpedienteAM","red_social_apoyo", function(frm){
	calculate_puntuation(frm);
});


function calculate_puntuation(frm){
	var pt  = frm.doc.situacion_familiar;
	var se 	= frm.doc.situacion_economica;
	var va  = frm.doc.vivienda_adecuada;
	var rs  = frm.doc.relaciones_sociales;
	var ra  = frm.doc.red_social_apoyo;
	//alert(pt);
	var npt = Number(pt.substring(0,1));
	var nse	= Number(se.substring(0,1));
	var nva = Number(va.substring(0,1));
	var nrs = Number(rs.substring(0,1));
	var nra = Number(ra.substring(0,1));
	//npt = npt + 6;
	// alert(npt);
	frm.set_value("puntuacion_total",npt + nse + nva + nrs + nra);

}

frappe.ui.form.on("ExpedienteAM","btn_ficha_salud", function(frm){
	var doc = frm.doc;
	var docname = frm.doc.name;
	//alert(doc.__islocal);
	frappe.set_route("Form", "Ficha_Clinica", docname);
});

frappe.ui.form.on("ExpedienteAM","sec2_pension_salario", function(frm){
	calculate_ingresos(frm);
});
frappe.ui.form.on("ExpedienteAM","sec2_ingresos_serv_comercio", function(frm){
	calculate_ingresos(frm);
});
frappe.ui.form.on("ExpedienteAM","sec2_bono", function(frm){
	calculate_ingresos(frm);
});
frappe.ui.form.on("ExpedienteAM","sec2_remesas", function(frm){
	calculate_ingresos(frm);
});
frappe.ui.form.on("ExpedienteAM","sec2_cuotas", function(frm){
	calculate_ingresos(frm);
});
frappe.ui.form.on("ExpedienteAM","sec2_otros", function(frm){
	calculate_ingresos(frm);
});


function calculate_ingresos(frm) {
	var ps = frm.doc.sec2_pension_salario;
	var sc = frm.doc.sec2_ingresos_serv_comercio;
	var bo = frm.doc.sec2_bono;
	var re = frm.doc.sec2_remesas;
	var cf = frm.doc.sec2_cuotas;
	var ot = frm.doc.sec2_otros;

	frm.set_value("sec2_total_ingresos",ps + sc + bo + re + cf + ot);
}

frappe.ui.form.on("ExpedienteAM","btnedad", function(frm){
	//frm.set_df_property("fecha_nacimiento","read_only",1);
	//alert(frm.get_df_property("fecha_nacimiento","read_only"));
	//frm.toggle_enable("fecha_nacimiento",false);
	//frm.toggle_display("fecha_nacimiento",true);
});


function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}