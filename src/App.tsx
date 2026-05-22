import { useState } from "react";

import "./App.css";

import { InformationForm } from "./components/form";
import SignaturePreview from "./components/preview";

import type { SignatureData } from "./interfaces/main";

function App() {
  const [formData, setFormData] = useState<SignatureData>({
    name: "Dirección de Talento Humano",
    title: "",
    dept: "",
    group: "Grupo de Gestión Administrativa",
    email: "talento.humano@barrancabermeja.gov.co",
    phone: "",
    address: "Calle 49 No. 3-61 Sector Comercial",
    city: "Barrancabermeja, Santander",
    web: "www.barrancabermeja.gov.co",
  });

  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Alcaldía de Barrancabermeja"
              className="h-16 w-auto"
            />

            <div>
              <h1 className="text-3xl font-black text-[#222]">
                Generador de Firmas Institucionales
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                Alcaldía Distrital de Barrancabermeja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 rounded-2xl border border-[#dbe4ea] bg-[#f8fafc] px-5 py-4">
          <p className="text-sm leading-relaxed text-[#4b5563]">
            Completa la información del funcionario para generar una firma
            institucional compatible con clientes de correo electrónico.
          </p>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <InformationForm data={formData} onChange={setFormData} />

          <SignaturePreview data={formData} />
        </div>
      </section>
    </main>
  );
}

export default App;
