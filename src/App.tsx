import { useState } from "react";

import "./App.css";

import { InformationForm } from "./components/form";
import SignaturePreview from "./components/preview";

import type { SignatureData } from "./interfaces/main";

function App() {
  const [formData, setFormData] = useState<SignatureData>({
    firstName: "",
    lastName: "",
    title: "",
    dept: "",
    group: "",
    email: "talento.humano@barrancabermeja.gov.co",
    phone: "",
    address: "Calle 49 No. 3-61 Sector Comercial",
    city: "Barrancabermeja, Santander",
    web: "www.barrancabermeja.gov.co",
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-5 sm:px-8">
          <img
            src="/logo.png"
            alt="Alcaldía de Barrancabermeja"
            className="h-14 w-auto"
          />
          <div>
            <h1 className="text-xl font-black tracking-tight text-shield-blue sm:text-2xl">
              Generador de Firmas
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Alcaldía Distrital de Barrancabermeja
            </p>
          </div>
        </div>
        <div className="flex h-0.75">
          <div className="flex-1 bg-shield-green" />
          <div className="flex-1 bg-shield-blue" />
          <div className="flex-1 bg-shield-red" />
          <div className="flex-1 bg-shield-yellow" />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black">
            i
          </span>
          <p className="text-sm leading-relaxed text-gray-600">
            Completa la información del funcionario para generar una firma
            institucional compatible con clientes de correo electrónico.
          </p>
        </div>

        <div className="flex flex-col gap-8 xl:flex-row">
          <InformationForm data={formData} onChange={setFormData} />
          <SignaturePreview data={formData} />
        </div>
      </main>
    </div>
  );
}

export default App;
