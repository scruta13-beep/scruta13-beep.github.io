import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Sociedad Civil Microbuses Cerritos Blancos
          </h1>
          <p className="text-gray-600">Sistema de Facturación Fiscal</p>
        </header>
        <InvoiceForm />
      </div>
    </div>
  );
}

export default App;