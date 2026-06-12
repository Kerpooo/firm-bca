import { useRef, useMemo } from "react";
import { SHIELD_BLUE, SHIELD_BLACK } from "../constants/brand";
import type { SignaturePreviewProps } from "../interfaces/main";
import html2canvas from "html2canvas";
import { LOGO_BASE64 } from "../constants/logoBase64";
import { IconPhone, IconMapPin, IconBuildingCommunity, IconAt, IconGlobe } from "@tabler/icons-react";

const SVG_PHONE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#009540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/></svg>`;
const SVG_PIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#E20613" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"/></svg>`;
const SVG_BUILDING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#009FE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"/><path d="M13 7l0 .01"/><path d="M17 7l0 .01"/><path d="M17 11l0 .01"/><path d="M17 15l0 .01"/></svg>`;
const SVG_MAIL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#009FE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"/></svg>`;
const SVG_GLOBE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#009540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M5.75 15a8.015 8.015 0 1 0 9.25 -13"/><path d="M11 17v4"/><path d="M7 21h8"/></svg>`;

const ICON_CLASS = "mr-1.5 inline align-middle shrink-0";

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const signatureRef = useRef<HTMLDivElement>(null);

  const isValid = useMemo(() => {
    const required = ["name", "title", "dept", "email", "address", "city", "web"] as const;
    for (const key of required) {
      const value = (data as any)[key];
      if (!value || String(value).trim() === "") return false;
    }
    const email = (data as any).email as string;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return false;
    return true;
  }, [data]);

  const generateSignatureHTML = () => {
    return `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<div style="font-family:'Montserrat',Arial,sans-serif;color:#333;line-height:1.15;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="text-align:center;padding-bottom:10px;">
        <img src="${LOGO_BASE64}" width="120" style="display:inline-block;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="padding-left:4px;">
        <div style="font-size:15px;font-weight:700;color:#000;margin:0 0 1px;">${data.name}</div>
        <div style="font-size:12px;font-weight:600;color:${SHIELD_BLACK};margin:0 0 4px;">${data.title}</div>
        ${data.dept ? `<div style="font-size:11px;color:#555;margin:0 0 2px;">${data.dept}</div>` : ""}
        ${data.group ? `<div style="font-size:11px;color:#555;margin:0 0 2px;">${data.group}</div>` : ""}
        <div style="height:1px;background:#e0e0e0;margin:7px 0;"></div>
        ${data.phone ? `<div style="font-size:11px;color:#555;margin:0 0 3px;">${SVG_PHONE}${data.phone}</div>` : ""}
        <div style="font-size:11px;color:#555;margin:0 0 3px;">${SVG_PIN}${data.address}</div>
        <div style="font-size:11px;color:#555;margin:0 0 3px;">${SVG_BUILDING}${data.city}</div>
        <div style="font-size:11px;margin:0 0 3px;">${SVG_MAIL}<a href="mailto:${data.email}" style="color:${SHIELD_BLUE};text-decoration:none;">${data.email}</a></div>
        <div style="font-size:11px;margin:0;">${SVG_GLOBE}<a href="https://${data.web}" style="color:${SHIELD_BLUE};text-decoration:none;">${data.web}</a></div>
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
    if (!signatureRef.current) return;
    try {
      const extraBottom = 20;
      let tempEl: HTMLElement | null = null;
      try {
        const original = signatureRef.current as HTMLElement;
        tempEl = original.cloneNode(true) as HTMLElement;
        tempEl.style.paddingBottom = `${extraBottom}px`;
        tempEl.style.background = "#ffffff";
        tempEl.style.position = "fixed";
        tempEl.style.left = "-9999px";
        tempEl.style.top = "0";
        document.body.appendChild(tempEl);
        const canvas = await html2canvas(tempEl, {
          scale: 4,
          useCORS: true,
          backgroundColor: "#ffffff",
        });
        const link = document.createElement("a");
        link.download = "firma.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } finally {
        if (tempEl && tempEl.parentNode) tempEl.parentNode.removeChild(tempEl);
      }
    } catch (error) {
      console.error(error);
      alert("Error al descargar");
    }
  };

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
              Vista previa de firma
            </span>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <div ref={signatureRef} className="inline-block">
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              className='font-["Montserrat",Arial,sans-serif]'
              style={{ color: "#333", lineHeight: 1.15 }}
            >
              <tbody>
                <tr>
                  <td style={{ textAlign: "center", paddingBottom: "10px" }}>
                    <img src={LOGO_BASE64} alt="Logo" width={120} style={{ display: "inline-block", border: 0 }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "4px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#000", margin: "0 0 1px" }}>
                      {data.name}
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: SHIELD_BLACK, margin: "0 0 4px" }}>
                      {data.title}
                    </div>
                    {data.dept && (
                      <div style={{ fontSize: "11px", color: "#555", margin: "0 0 2px" }}>{data.dept}</div>
                    )}
                    {data.group && (
                      <div style={{ fontSize: "11px", color: "#555", margin: "0 0 2px" }}>{data.group}</div>
                    )}
                    <div style={{ height: "1px", background: "#e0e0e0", margin: "7px 0" }} />

                    {data.phone && (
                      <div style={{ fontSize: "11px", color: "#555", margin: "0 0 3px" }}>
                        <IconPhone size={14} color="#009540" className={ICON_CLASS} />
                        {data.phone}
                      </div>
                    )}

                    <div style={{ fontSize: "11px", color: "#555", margin: "0 0 3px" }}>
                      <IconMapPin size={14} color="#E20613" className={ICON_CLASS} />
                      {data.address}
                    </div>

                    <div style={{ fontSize: "11px", color: "#555", margin: "0 0 3px" }}>
                      <IconBuildingCommunity size={14} color="#009FE3" className={ICON_CLASS} />
                      {data.city}
                    </div>

                    <div style={{ fontSize: "11px", margin: "0 0 3px" }}>
                      <IconAt size={14} color="#009FE3" className={ICON_CLASS} />
                      <a href={`mailto:${data.email}`} style={{ color: SHIELD_BLUE, textDecoration: "none" }}>
                        {data.email}
                      </a>
                    </div>

                    <div style={{ fontSize: "11px", margin: 0 }}>
                      <IconGlobe size={14} color="#009540" className={ICON_CLASS} />
                      <a href={`https://${data.web}`} target="_blank" rel="noreferrer" style={{ color: SHIELD_BLUE, textDecoration: "none" }}>
                        {data.web}
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={downloadSignaturePNG}
          disabled={!isValid}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-black transition hover:brightness-95 active:scale-[0.98] ${!isValid ? "opacity-50 pointer-events-none" : ""}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
          </svg>
          Descargar PNG
        </button>

        <button
          onClick={copyHTMLSignature}
          disabled={!isValid}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-brand-yellow px-4 py-3 text-sm font-bold text-black transition hover:bg-brand-yellow/10 active:scale-[0.98] ${!isValid ? "opacity-50 pointer-events-none" : ""}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
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
