// Copyright (c) 2019, ericklopez and contributors
// For license information, please see license.txt

frappe.ui.form.on('ExpedienteAM', {
	refresh: function(frm) {

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