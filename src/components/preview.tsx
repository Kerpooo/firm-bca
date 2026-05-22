import { useRef } from "react";
import type { SignaturePreviewProps } from "../interfaces/main";
import html2canvas from "html2canvas";

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const signatureRef = useRef<HTMLDivElement>(null);

  const generateSignatureHTML = () => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>

    <!-- Logo -->
    <td style="padding-right:20px; vertical-align:middle;">
      <img
        src="https://www.barrancabermeja.gov.co/info/barrancabermeja_bco/media/galeria/thumbs/thgaleria_700X400_1507.webp"
        width="180"
        style="display:block; border:0;"
      />
    </td>



    <!-- Información -->
    <td style="padding-left:20px; vertical-align:top;">

      <div
        style="
          font-size:18px;
          font-weight:700;
          color:#000;
          margin-bottom:4px;
        "
      >
        ${data.name}
      </div>

      <div
        style="
          font-size:14px;
          font-weight:700;
          color:#333;
          margin-bottom:10px;
        "
      >
        ${data.title}
      </div>

      ${
        data.dept
          ? `
      <div
        style="
          font-size:13px;
          color:#333;
          margin-bottom:10px;
        "
      >
        ${data.dept}
      </div>
      `
          : ""
      }

      ${
        data.phone
          ? `
      <div style="font-size:13px; color:#333; margin-bottom:4px;">
        📞 ${data.phone}
      </div>
      `
          : ""
      }

      <div style="font-size:13px; color:#333; margin-bottom:4px;">
        📍 ${data.address}
      </div>

      <div style="font-size:13px; color:#333; margin-bottom:4px;">
        🏙️ ${data.city}
      </div>

      <div style="font-size:13px; margin-bottom:4px;">
        ✉️
        <a
          href="mailto:${data.email}"
          style="color:#2c6f8f; text-decoration:none;"
        >
          ${data.email}
        </a>
      </div>

      <div style="font-size:13px;">
        🌐
        <a
          href="https://${data.web}"
          style="color:#2c6f8f; text-decoration:none;"
        >
          ${data.web}
        </a>
      </div>

    </td>
  </tr>
</table>
`;
  };

  const copyHTMLSignature = async () => {
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
    if (!signatureRef.current) return;

    try {
      const canvas = await html2canvas(signatureRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");

      link.download = "firma.png";
      link.href = canvas.toDataURL("image/png");

      link.click();
    } catch (error) {
      console.error(error);
      alert("Error al descargar");
    }
  };

  return (
    <div className="flex-1">
      <h2 className="mb-4 text-[15px] font-bold text-[#333]">Vista previa</h2>

      <div className="overflow-x-auto rounded-xl bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div ref={signatureRef} className="inline-block bg-white p-4">
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            className='font-["Nunito","Segoe_UI",Arial,sans-serif]'
          >
            <tbody>
              <tr>
                {/* Logo */}
                <td
                  style={{
                    paddingRight: "20px",
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    width={180}
                    style={{
                      display: "block",
                      border: 0,
                    }}
                  />
                </td>

                {/* Contenido */}
                <td
                  style={{
                    paddingLeft: "20px",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000",
                      marginBottom: "4px",
                    }}
                  >
                    {data.name}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    {data.title}
                  </div>

                  {data.dept && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#333",
                        marginBottom: "10px",
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
                    }}
                  >
                    📍 {data.address}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    🏙️ {data.city}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    ✉️{" "}
                    <a
                      href={`mailto:${data.email}`}
                      style={{
                        color: "#2c6f8f",
                        textDecoration: "none",
                      }}
                    >
                      {data.email}
                    </a>
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    🌐{" "}
                    <a
                      href={`https://${data.web}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#2c6f8f",
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
        className="mt-5 text-black w-full rounded-lg bg-[#FBC710] px-4 py-3.5 text-[15px] font-bold transition hover:opacity-90 active:scale-[0.98] cursor-pointer"
      >
        ⬇ Descargar firma PNG
      </button>

      {/* Copiar HTML */}
      <button
        onClick={copyHTMLSignature}
        className="mt-2.5 w-full rounded-lg border-2 border-[#FBC710] bg-transparent px-4 py-3.5 text-[15px] font-bold text-black transition hover:bg-[#E5B400] hover:text-white active:scale-[0.98] cursor-pointer"
      >
        📋 Copiar HTML para correo
      </button>

      <p className="mt-2 text-center text-xs text-[#888]">
        Descarga el PNG o copia el HTML para Outlook/Gmail.
      </p>
    </div>
  );
}
