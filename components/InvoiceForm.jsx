import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const COMPANY = {
  name: 'Sociedad Civil Microbuses Cerritos Blancos de Administración Obrera Ruta 13',
  address: 'Av. Florencio Jiménez, entre Km 4 y 5, Calle 1, Casa Nro S/N, Sector Ruiz Pineda 1, Estado Lara',
  phone: '0416-4943136',
  rif: 'J-085044620',
};

export default function InvoiceForm() {
  const [client, setClient] = useState({
    name: '',
    lastName: '',
    id: '',
    address: '',
    phone: '',
  });
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [controlNumber, setControlNumber] = useState('');

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const generatePDF = (copyType) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- Encabezado de la Empresa ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(COMPANY.name, pageWidth / 2, 20, { align: 'center', maxWidth: pageWidth - 20 });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`RIF: ${COMPANY.rif}`, pageWidth / 2, 26, { align: 'center' });
    doc.text(`Dirección: ${COMPANY.address}`, pageWidth / 2, 30, { align: 'center', maxWidth: pageWidth - 20 });
    doc.text(`Teléfono: ${COMPANY.phone}`, pageWidth / 2, 34, { align: 'center' });

    // --- Título del Documento ---
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURA', pageWidth / 2, 45, { align: 'center' });
    
    // Etiqueta de Original o Copia
    doc.setFontSize(10);
    doc.setTextColor(copyType === 'Original' ? 0 : 150);
    doc.text(copyType.toUpperCase(), pageWidth - 20, 45, { align: 'right' });
    doc.setTextColor(0);

    // --- Datos de la Factura (N° Factura y N° Control) ---
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('N° de Factura:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceNumber || '001', 60, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('N° de Control:', 20, 67);
    doc.setFont('helvetica', 'normal');
    doc.text(controlNumber || '00-00000001', 60, 67);

    doc.setFont('helvetica', 'bold');
    doc.text('Fecha de Emisión:', 20, 74);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('es-VE'), 60, 74);

    // --- Datos del Cliente ---
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 20, 87);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${client.name} ${client.lastName}`, 20, 94);
    doc.text(`Cédula: ${client.id}`, 20, 101);
    doc.text(`Dirección: ${client.address}`, 20, 108, { maxWidth: pageWidth - 40 });
    doc.text(`Teléfono: ${client.phone}`, 20, 115);

    // --- Concepto y Monto ---
    doc.setFont('helvetica', 'bold');
    doc.text('CONCEPTO DE PAGO', 20, 127);
    doc.setFont('helvetica', 'normal');
    doc.text(concept, 20, 134, { maxWidth: pageWidth - 40 });

    doc.setFont('helvetica', 'bold');
    doc.text('MONTO', 20, 147);
    doc.setFont('helvetica', 'normal');
    doc.text(`Bs. ${parseFloat(amount || 0).toFixed(2)}`, 20, 154);

    // --- Pie de Página ---
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento emitido según normativa del SENIAT.', pageWidth / 2, 175, { align: 'center' });
    doc.text('Gracias por su preferencia.', pageWidth / 2, 180, { align: 'center' });

    // Abrir en nueva pestaña para imprimir o descargar
    const pdfBlob = doc.output('bloburl');
    window.open(pdfBlob, '_blank');
  };

  const handlePrint = () => {
    if (!client.name || !client.lastName || !client.id || !concept || !amount) {
      alert('Por favor, complete todos los campos obligatorios (Nombre, Apellido, Cédula, Concepto y Monto).');
      return;
    }
    generatePDF('Original');
    setTimeout(() => {
      generatePDF('Copia');
    }, 1000);
  };

  return (
    <div className="glass-card p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos del Cliente */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Datos del Cliente</h2>
          <input name="name" placeholder="Nombre" value={client.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input name="lastName" placeholder="Apellido" value={client.lastName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input name="id" placeholder="Cédula de Identidad" value={client.id} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input name="address" placeholder="Dirección" value={client.address} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input name="phone" placeholder="Teléfono" value={client.phone} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        </div>

        {/* Datos de la Factura */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Detalles de la Factura</h2>
          <input placeholder="N° de Factura (Ej. 001)" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <input placeholder="N° de Control (Ej. 00-00000001)" value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <textarea placeholder="Concepto de Pago" value={concept} onChange={(e) => setConcept(e.target.value)} className="w-full p-2 border rounded mb-2" rows="3" />
          <input type="number" placeholder="Monto en Bs." value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded mb-2" />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Imprimir Original y Copia
        </button>
      </div>
    </div>
  );
}