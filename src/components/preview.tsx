import { useMemo, useRef } from "react";

import html2canvas from "html2canvas";

import type { SignaturePreviewProps } from "../interfaces/main";

const FIGURES_ART_SRC = "/figures.png";
const SHIELD_LOGO_SRC = "/logo.png";

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

    return `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
<div style="font-family:'Montserrat',Arial,sans-serif;color:#222;line-height:1.1;background:#ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:840px;max-width:840px;background:#ffffff;">
    <tr>
      <td style="width:140px;padding:0;vertical-align:middle;text-align:center;background:#ffffff;overflow:hidden;">
        <img src="/figures.png" alt="" style="display:block;height:100%;width:100%;object-fit:cover;object-position:65% 55%;border:0;background:#ffffff;" />
      </td>
      <td style="padding:0 40px;vertical-align:middle;background:#ffffff;">
        <div style="font-size:24px;font-weight:800;line-height:1;color:#1a1a1a;margin:0 0 4px;">${data.firstName || "Nombres"}</div>
        <div style="font-size:14px;font-weight:700;line-height:1;color:#7a7a7a;margin:0;">${data.lastName || "Apellidos"}</div>
        <div style="height:2px;width:144px;background:#fdc910;margin:12px 0 4px;"></div>
        <div style="font-size:14px;font-weight:700;line-height:1;color:#1a1a1a;margin:0 0 1px;">${data.title || "Cargo"}</div>
        <div style="font-size:9px;font-weight:600;line-height:1;color:#7a7a7a;margin:0 0 4px;">${data.dept || ""}</div>
        ${data.group ? `<div style="font-size:9px;font-weight:600;line-height:1;color:#7a7a7a;margin:0 0 4px;">${data.group}</div>` : ""}
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 3px;vertical-align:middle;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:999px;background:#fdc910;color:#111;font-size:10px;line-height:1;">&#9993;</span>
            </td>
            <td style="padding:0 0 3px 10px;vertical-align:middle;font-size:13px;color:#232323;">
              <a href="mailto:${data.email}" style="color:#232323;text-decoration:none;">${data.email}</a>
            </td>
          </tr>
          ${
            data.phone
              ? `<tr>
            <td style="padding:0 0 3px;vertical-align:middle;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:999px;background:#ececeb;color:#444;font-size:10px;line-height:1;">&#128222;</span>
            </td>
            <td style="padding:0 0 3px 10px;vertical-align:middle;font-size:10px;color:#55565b;">${data.phone}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding:0 0 3px;vertical-align:middle;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:999px;background:#ececeb;color:#444;font-size:10px;line-height:1;">&#128205;</span>
            </td>
            <td style="padding:0 0 3px 10px;vertical-align:middle;font-size:10px;color:#55565b;">${cityLine}</td>
          </tr>
          <tr>
            <td style="padding:0;vertical-align:middle;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:999px;background:#ececeb;color:#444;font-size:10px;line-height:1;">&#127760;</span>
            </td>
            <td style="padding:0 0 0 10px;vertical-align:middle;font-size:10px;color:#55565b;">${data.web}</td>
          </tr>
        </table>
      </td>
      <td style="width:2px;padding:0;background:#ffffff;">
        <div style="width:1px;height:180px;background:#1a1a1a;"></div>
      </td>
      <td style="width:180px;padding:0 10px;text-align:center;vertical-align:middle;background:#ffffff;">
        <img src="/logo.png" alt="" style="display:block;margin:0 auto 5px;height:80px;width:auto;border:0;background:#ffffff;" />
        <div style="font-size:9px;color:#1a1a1a;line-height:1.3;text-align:center;white-space:nowrap;">
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
      const el = signatureRef.current;
      if (!el) return;

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

      const textEls = el.querySelectorAll<HTMLElement>(".icon-text");
      textEls.forEach((t) => (t.style.marginTop = "-14px"));

      const canvas = await html2canvas(el, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      textEls.forEach((t) => (t.style.marginTop = ""));

      const link = document.createElement("a");
      link.download = "firma.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
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
          <div className="inline-block overflow-hidden rounded-2xl border border-gray-200">
            <div
              ref={signatureRef}
              className="inline-flex items-stretch bg-white pl-0 pr-5 py-0"
            >
              {/* Figura decorativa (silueta completa, sin recorte) */}
              <div className="flex w-35 shrink-0 items-center justify-center overflow-hidden bg-white">
                <img
                  src={FIGURES_ART_SRC}
                  alt=""
                  className="h-full w-full object-cover object-[65%_45%]"
                />
              </div>

              {/* Datos */}
              <div className="flex flex-col justify-center px-9">
                <div className="mb-1 text-[24px] font-extrabold leading-none tracking-tight text-[#1a1a1a]">
                  {data.firstName || "Nombres"}
                </div>
                <div className="text-[14px] font-bold leading-none tracking-tight text-[#7a7a7a]">
                  {data.lastName || "Apellidos"}
                </div>
                <div className="mt-3 mb-0.5 h-0.5 w-36 rounded-full bg-[#fdc910]" />
                <div className="text-[14px] font-bold leading-none text-[#1a1a1a]">
                  {data.title || "Cargo"}
                </div>
                <div className="mb-1 text-[9px] font-semibold leading-none text-[#7a7a7a]">
                  {data.dept}
                </div>
                {data.group && (
                  <div className="mb-1 text-[9px] font-semibold leading-none text-[#7a7a7a]">
                    {data.group}
                  </div>
                )}

                <div className="pb-0.5 text-[13px] text-[#232323]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block h-3.5 w-3.5 align-middle mr-2 text-[#fdc910]"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a
                    href={`mailto:${data.email}`}
                    className="icon-text inline-block align-middle text-[#232323] no-underline"
                  >
                    {data.email}
                  </a>
                </div>
                {data.phone && (
                  <div className="pb-0.5 text-[10px] text-[#55565b]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline-block h-3.5 w-3.5 align-middle mr-2 text-[#55565b]"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="icon-text inline-block align-middle">
                      {data.phone}
                    </span>
                  </div>
                )}
                <div className="pb-0.5 text-[10px] text-[#55565b]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block h-3.5 w-3.5 align-middle mr-2 text-[#55565b]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="icon-text inline-block align-middle">
                    {cityLine}
                  </span>
                </div>
                <div className="text-[10px] text-[#55565b]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block h-3.5 w-3.5 align-middle mr-2 text-[#55565b]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="icon-text inline-block align-middle">
                    {data.web}
                  </span>
                </div>
              </div>

              {/* Separador */}
              <div
                className="shrink-0 self-center bg-[#1a1a1a]"
                style={{ width: "1px", height: "180px" }}
              />

              {/* Escudo */}
              <div className="flex w-45 shrink-0 flex-col items-center justify-center px-2.5 text-center">
                <img
                  src={SHIELD_LOGO_SRC}
                  alt=""
                  className="mb-1 h-20 w-auto"
                />
                <div className="whitespace-nowrap text-[9px] leading-snug text-[#1a1a1a]">
                  Alcaldía Distrital de
                  <br />
                  <strong className="font-extrabold">Barrancabermeja</strong>
                </div>
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
