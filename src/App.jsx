import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <header className="text-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>
          Sociedad Civil Microbuses Cerritos Blancos
        </h1>
        <p style={{ color: '#6b7280' }}>Sistema de Facturación Fiscal</p>
      </header>
      <InvoiceForm />
    </div>
  );
}

export default App;
