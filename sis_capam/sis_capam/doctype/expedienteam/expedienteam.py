# -*- coding: utf-8 -*-
# Copyright (c) 2019, ericklopez and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ExpedienteAM(Document):
	pass
@frappe.whitelist()
def newFc(doc_name):
	
	existe = frappe.db.sql("select EXISTS(select * from tabFicha_Clinica where name = '"+ doc_name +"')")
	frappe.logger().debug('La ficha existe')
	frappe.logger().debug(existe)
	frappe.logger().debug(existe[0][0])

	pn = frappe.db.get_value("ExpedienteAM",doc_name,"primer_nombre")
	pa = frappe.db.get_value("ExpedienteAM",doc_name,"primer_apellido")
	cp = frappe.db.get_value("ExpedienteAM",doc_name,"conocido_por")
	ed = frappe.db.get_value("ExpedienteAM",doc_name,"edad")
	ec = frappe.db.get_value("ExpedienteAM",doc_name,"estado_civil_real")
	# log = frappe.get_logger("ExpedienteAM")
	if existe[0][0] == 1:
		#log.info("existe1")
		#exam = frappe.get_doc({'doctype':"ExpedienteAM",doc_name})

		#pname = exam.primer_nombre
		frappe.db.set_value("Ficha_Clinica", doc_name,"nombre_completo",pn + ' ' + pa + ', ' + cp)
		frappe.db.set_value("Ficha_Clinica", doc_name,"lestado_civil_real", ec)
		frappe.db.set_value("Ficha_Clinica", doc_name,"ledad", ed)
		frappe.db.set_value("Ficha_Clinica", doc_name,"lnombre", pn)
		frappe.db.set_value("Ficha_Clinica", doc_name,"lapellido", pa)
		frappe.db.set_value("Ficha_Clinica", doc_name,"lconocido_por", cp)

		#doc.update()
	else:
		#log.info("existe0")
		doc = frappe.new_doc("Ficha_Clinica")
		doc.update({"name":doc_name,"lexpediente":doc_name, "codigo":doc_name, \
		 "nombre_completo":pn + ' ' + pa + ', ' + cp })
		doc.insert()
	#frappe.db.sql("call set_active_estado ('" + doc_name + "')")
	#frappe.db.commit()
