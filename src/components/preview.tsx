import { useRef, useMemo } from "react";
import { SHIELD_BLUE, SHIELD_BLACK } from "../constants/brand";
import type { SignaturePreviewProps } from "../interfaces/main";
import html2canvas from "html2canvas";

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const signatureRef = useRef<HTMLDivElement>(null);

  const isValid = useMemo(() => {
    const required = [
      "name",
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

    // basic email validation
    const email = (data as any).email as string;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return false;

    return true;
  }, [data]);

  const generateSignatureHTML = () => {
    return `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<div style="font-family: 'Montserrat', Arial, sans-serif; color: #000; line-height:1.1;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right:6px; vertical-align:middle; padding-top:0; padding-bottom:0;">
        <img src="https://www.barrancabermeja.gov.co/info/barrancabermeja_bco/media/galeria/thumbs/thgaleria_700X400_1507.webp" width="160" style="display:block; border:0; object-fit:contain;" />
      </td>
      <td style="padding-left:6px; vertical-align:top; padding-top:0; padding-bottom:0;">
        <div style="font-size:16px; font-weight:700; margin:0;">${data.name}</div>
        <div style="font-size:13px; font-weight:700; color:${SHIELD_BLACK}; margin:0 0 2px 0;">${data.title}</div>
        ${data.dept ? `<div style="font-size:12px; color:#333; margin:0 0 4px 0;">${data.dept}</div>` : ""}
        ${data.phone ? `<div style="font-size:12px; color:#333; margin:0 0 2px 0;">📞 ${data.phone}</div>` : ""}
        <div style="font-size:12px; color:#333; margin:0 0 2px 0;">📍 ${data.address}</div>
        <div style="font-size:12px; color:#333; margin:0 0 2px 0;">🏙️ ${data.city}</div>
        <div style="font-size:12px; margin:0 0 2px 0;">✉️ <a href="mailto:${data.email}" style="color:${SHIELD_BLUE}; text-decoration:none;">${data.email}</a></div>
        <div style="font-size:12px; margin:0;">🌐 <a href="https://${data.web}" style="color:${SHIELD_BLUE}; text-decoration:none;">${data.web}</a></div>
      </td>
    </tr>
  </table>
</div>
`;
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

      alert("Firma HTML copiada");
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
      // Create a temporary clone with extra bottom padding so the PNG has white space below
      const extraBottom = 20; // pixels of extra whitespace at bottom
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
      <h2 className="mb-4 text-[15px] font-bold text-[#333]">Vista previa</h2>
      <div className="overflow-x-auto rounded-xl bg-white  shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div ref={signatureRef} className="inline-block bg-white p-3">
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            className='font-["Montserrat","Arial",sans-serif]'
          >
            <tbody>
              <tr>
                {/* Logo */}
                <td
                  style={{
                    paddingRight: "8px",
                    verticalAlign: "middle",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    width={220}
                    style={{
                      display: "block",
                      border: 0,
                      objectFit: "contain",
                    }}
                  />
                </td>

                {/* Contenido */}
                <td
                  style={{
                    paddingLeft: "8px",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    {data.name}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: SHIELD_BLACK,
                      marginBottom: "6px",
                      lineHeight: 1.2,
                    }}
                  >
                    {data.title}
                  </div>

                  {data.dept && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#333",
                        marginBottom: "6px",
                        lineHeight: 1.2,
                      }}
                    >
                      {data.dept}
                    </div>
                  )}

                  {data.phone && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#333",
                        marginBottom: "4px",
                        lineHeight: 1.2,
                      }}
                    >
                      📞 {data.phone}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    📍 {data.address}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    🏙️ {data.city}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    ✉️{" "}
                    <a
                      href={`mailto:${data.email}`}
                      style={{
                        color: SHIELD_BLUE,
                        textDecoration: "none",
                      }}
                    >
                      {data.email}
                    </a>
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.2,
                    }}
                  >
                    🌐{" "}
                    <a
                      href={`https://${data.web}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: SHIELD_BLUE,
                        textDecoration: "none",
                      }}
                    >
                      {data.web}
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Descargar PNG */}
      <button
        onClick={downloadSignaturePNG}
        disabled={!isValid}
        className={`mt-3 text-black w-full rounded-lg bg-brand-yellow px-4 py-3.5 text-[15px] font-bold transition active:scale-[0.98] ${!isValid ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
      >
        ⬇ Descargar firma PNG
      </button>

      {/* Copiar HTML */}
      <button
        onClick={copyHTMLSignature}
        disabled={!isValid}
        className={`mt-2 w-full rounded-lg border-2 border-brand-yellow bg-transparent px-4 py-3.5 text-[15px] font-bold text-black transition active:scale-[0.98] ${!isValid ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
      >
        📋 Copiar HTML para correo
      </button>

      <p className="mt-2 text-center text-xs text-[#888]">
        Descarga el PNG o copia el HTML para Outlook/Gmail.
      </p>
    </div>
  );
}
