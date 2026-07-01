import { useMemo, useRef } from "react";

import html2canvas from "html2canvas";

import type { SignaturePreviewProps } from "../interfaces/main";

const FIGURES_ART_SRC = "/figures.png";
const SHIELD_LOGO_SRC = "/logo.png";

const IconMail = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1a1a1a"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="block shrink-0"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#55565b"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="block shrink-0"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconPin = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ec1c5e"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="block shrink-0"
  >
    <path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      fill="#ec1c5e"
      fillOpacity={0.12}
    />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconGlobe = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#29a8e0"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="block shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const signatureRef = useRef<HTMLDivElement>(null);

  const isValid = useMemo(() => {
    const required = [
      "firstName",
      "lastName",
      "title",
      "dept",
      "email",
      "address",
      "city",
      "web",
    ] as const;
    for (const key of required) {
      const value = (data as any)[key];
      if (!value || String(value).trim() === "") return false;
    }

    const email = (data as any).email as string;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [data]);

  const generateSignatureHTML = () => {
    const cityLine = [data.address, data.city].filter(Boolean).join(", ");

    const ICON_MAIL =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="display:block;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
    const ICON_PHONE =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#55565b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="display:block;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const ICON_PIN =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec1c5e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="display:block;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#ec1c5e" fill-opacity="0.12"/><circle cx="12" cy="10" r="3"/></svg>';
    const ICON_GLOBE =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#29a8e0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="display:block;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

    return `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
<div style="font-family:'Montserrat',Arial,sans-serif;color:#222;line-height:1.1;background:#ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#ffffff;">
    <tr>
      <td style="width:280px;padding:0;vertical-align:middle;text-align:center;background:#ffffff;overflow:hidden;">
        <img src="/figures.png" alt="" style="display:block;height:100%;width:100%;object-fit:cover;object-position:65% 55%;border:0;background:#ffffff;" />
      </td>
      <td style="padding:0 60px 0 80px;vertical-align:middle;background:#ffffff;white-space:nowrap;">
        <div style="font-size:48px;font-weight:800;line-height:1;color:#1a1a1a;margin:0 0 8px;">${data.firstName || "Nombres"}</div>
        <div style="font-size:28px;font-weight:700;line-height:1;color:#7a7a7a;margin:0;">${data.lastName || "Apellidos"}</div>
        <div style="height:3px;width:288px;background:#fdc910;margin:24px 0 12px;"></div>
        <div style="font-size:28px;font-weight:700;line-height:1;color:#1a1a1a;margin:0 0 2px;">${data.title || "Cargo"}</div>
        <div style="font-size:18px;font-weight:600;line-height:1;color:#7a7a7a;margin:0 0 8px;">${data.dept || ""}</div>
        ${data.group ? `<div style="font-size:18px;font-weight:600;line-height:1;color:#7a7a7a;margin:0 0 8px;">${data.group}</div>` : ""}
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="width:22px;height:22px;padding:0 0 8px;vertical-align:middle;">${ICON_MAIL}</td>
            <td style="padding:0 0 8px 10px;vertical-align:middle;font-size:26px;color:#232323;">
              <a href="mailto:${data.email}" style="color:#232323;text-decoration:none;">${data.email}</a>
            </td>
          </tr>
          ${
            data.phone
              ? `<tr>
            <td style="width:22px;height:22px;padding:0 0 8px;vertical-align:middle;">${ICON_PHONE}</td>
            <td style="padding:0 0 8px 10px;vertical-align:middle;font-size:20px;color:#55565b;">${data.phone}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="width:22px;height:22px;padding:0 0 8px;vertical-align:middle;">${ICON_PIN}</td>
            <td style="padding:0 0 8px 10px;vertical-align:middle;font-size:20px;color:#55565b;">${cityLine}</td>
          </tr>
          <tr>
            <td style="width:22px;height:22px;padding:0;vertical-align:middle;">${ICON_GLOBE}</td>
            <td style="padding:0 0 0 10px;vertical-align:middle;font-size:20px;color:#55565b;">${data.web}</td>
          </tr>
        </table>
      </td>
      <td style="width:2px;padding:0 36px;background:#ffffff;">
        <div style="width:2px;height:260px;background:#1a1a1a;"></div>
      </td>
      <td style="padding:0 20px 0 0;text-align:center;vertical-align:middle;background:#ffffff;white-space:nowrap;">
        <img src="/logo.png" alt="" style="display:block;margin:0 auto 40px;height:280px;width:auto;border:0;background:#ffffff;" />
        <div style="font-size:18px;color:#1a1a1a;line-height:1.3;text-align:center;white-space:nowrap;">
          Alcaldía Distrital de<br/>
          <strong style="font-weight:800;">Barrancabermeja</strong>
        </div>
      </td>
    </tr>
  </table>
</div>`;
  };

  const copyHTMLSignature = async () => {
    if (!isValid) {
      alert("Completa los campos obligatorios antes de copiar la firma.");
      return;
    }

    try {
      const html = generateSignatureHTML();
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
      alert("Firma HTML copiada ✓");
    } catch (error) {
      console.error(error);
      alert("Error al copiar");
    }
  };

  const downloadSignaturePNG = async () => {
    if (!isValid) {
      alert("Completa los campos obligatorios antes de descargar la firma.");
      return;
    }

    try {
      const html = generateSignatureHTML();

      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      document.body.appendChild(wrapper);

      const el = wrapper.children[1] as HTMLElement;

      const imgs = Array.from(el.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            }),
        ),
      );

      await document.fonts.ready;

      const canvas = await html2canvas(el, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const cropped = document.createElement("canvas");
      const cropBottom = 8;
      cropped.width = canvas.width;
      cropped.height = canvas.height - cropBottom;
      const ctx = cropped.getContext("2d")!;
      ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height - cropBottom,
        0,
        0,
        cropped.width,
        cropped.height,
      );

      const link = document.createElement("a");
      link.download = "firma.png";
      link.href = cropped.toDataURL("image/png");
      link.click();

      document.body.removeChild(wrapper);
    } catch (error) {
      console.error(error);
      alert("Error al descargar");
    }
  };

  const cityLine = [data.address, data.city].filter(Boolean).join(", ");

  return (
    <div className="flex-1">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
        Vista previa
      </h2>

      <div className="overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white shadow-lg shadow-gray-200/50">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-shield-red" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-shield-yellow" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-shield-green" />
            <span className="ml-2 text-[10px] font-medium text-gray-400">
              Plantilla editable
            </span>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <div
            ref={signatureRef}
            className="inline-flex items-stretch rounded-2xl border border-gray-200 bg-white pl-0 pr-0 py-0"
          >
            {/* Figura decorativa (silueta completa, sin recorte) */}
            <div className="flex w-70 shrink-0 items-center justify-center overflow-hidden">
              <img
                src={FIGURES_ART_SRC}
                alt=""
                className="h-full w-full object-cover object-[65%_55%]"
              />
            </div>

            {/* Datos */}
            <div className="flex flex-col justify-center px-16">
              <div className="mb-2 text-[48px] font-extrabold leading-none tracking-tight text-[#1a1a1a]">
                {data.firstName || "Nombres"}
              </div>
              <div className="text-[28px] font-bold leading-none tracking-tight text-[#7a7a7a]">
                {data.lastName || "Apellidos"}
              </div>
              <div className="mt-6 mb-3 h-0.75 w-72 rounded-full bg-[#fdc910]" />
              <div className="text-[28px] font-bold leading-none text-[#1a1a1a]">
                {data.title || "Cargo"}
              </div>
              <div className="mb-2 text-[18px] font-semibold leading-none text-[#7a7a7a]">
                {data.dept}
              </div>
              {data.group && (
                <div className="mb-2 text-[18px] font-semibold leading-none text-[#7a7a7a]">
                  {data.group}
                </div>
              )}

              <div
                className="grid items-center gap-x-2.5 gap-y-2"
                style={{ gridTemplateColumns: "22px 1fr" }}
              >
                <IconMail />
                <div className="leading-none text-[26px] text-[#232323]">
                  <a
                    href={`mailto:${data.email}`}
                    className="text-[#232323] no-underline"
                  >
                    {data.email}
                  </a>
                </div>
                {data.phone && (
                  <>
                    <IconPhone />
                    <div className="leading-none text-[20px] text-[#55565b]">
                      {data.phone}
                    </div>
                  </>
                )}
                <IconPin />
                <div className="leading-none text-[20px] text-[#55565b]">
                  {cityLine}
                </div>
                <IconGlobe />
                <div className="leading-none text-[20px] text-[#55565b]">
                  {data.web}
                </div>
              </div>
            </div>

            {/* Separador */}
            <div
              className="shrink-0 self-center bg-[#1a1a1a] mx-9"
              style={{ width: "2px", height: "260px" }}
            />

            {/* Escudo */}
            <div className="flex shrink-0 flex-col items-center justify-center pr-5 text-center">
              <img src={SHIELD_LOGO_SRC} alt="" className="mb-12 h-70 w-auto" />
              <div className="whitespace-nowrap text-[18px] leading-snug text-[#1a1a1a]">
                Alcaldía Distrital de
                <br />
                <strong className="font-extrabold">Barrancabermeja</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={downloadSignaturePNG}
          disabled={!isValid}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-black transition hover:brightness-95 active:scale-[0.98] ${!isValid ? "pointer-events-none opacity-50" : ""}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12"
            />
          </svg>
          Descargar PNG
        </button>

        <button
          onClick={copyHTMLSignature}
          disabled={!isValid}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-brand-yellow px-4 py-3 text-sm font-bold text-black transition hover:bg-brand-yellow/10 active:scale-[0.98] ${!isValid ? "pointer-events-none opacity-50" : ""}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copiar HTML
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400">
        Compatible con Outlook, Gmail y otros clientes de correo.
      </p>
    </div>
  );
}
