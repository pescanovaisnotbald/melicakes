import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "joanotruiz@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
    }

    const now = new Date().toLocaleString("es-ES", {
      timeZone: "Europe/Madrid",
      dateStyle: "full",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: "Meli&Cakes Web <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `🎂 Nueva consulta de ${name} — Meli&Cakes`,
      html: buildEmail({ name, phone, email, message, date: now }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact route]", err);
    return NextResponse.json({ error: "Error al enviar el mensaje." }, { status: 500 });
  }
}

/* ── Beautiful HTML email ─────────────────────────────────────────── */
function buildEmail(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
}) {
  const { name, phone, email, message, date } = data;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva consulta — Meli&amp;Cakes</title>
</head>
<body style="margin:0;padding:0;background:#fdf6f0;font-family:'Georgia',serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf6f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#c2566b 0%,#e8899a 60%,#f2b5c0 100%);border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.75);font-family:'Helvetica Neue',sans-serif;">
                Pastelería Artesanal · Terrassa
              </p>
              <h1 style="margin:0;font-size:32px;font-weight:400;color:#ffffff;letter-spacing:-0.5px;line-height:1.1;">
                Meli<span style="color:rgba(255,255,255,0.6);">&amp;</span>Cakes
              </h1>
              <div style="width:48px;height:2px;background:rgba(255,255,255,0.35);margin:20px auto 0;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <!-- Title -->
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c2566b;font-family:'Helvetica Neue',sans-serif;">
                Nueva consulta recibida
              </p>
              <h2 style="margin:0 0 28px;font-size:24px;font-weight:400;color:#2e1a1e;line-height:1.3;">
                ${escapeHtml(name)} quiere saber más
              </h2>

              <!-- Field rows -->
              ${field("Nombre", name)}
              ${field("Teléfono", phone || "—")}
              ${field("Email", email, `color:#c2566b;text-decoration:none;`)}
              ${field("Fecha", date)}

              <!-- Message block -->
              <div style="margin-top:28px;">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9b7070;font-family:'Helvetica Neue',sans-serif;">
                  Su idea
                </p>
                <div style="background:#fdf6f0;border-left:3px solid #e8899a;border-radius:0 12px 12px 0;padding:18px 22px;">
                  <p style="margin:0;font-size:16px;color:#2e1a1e;line-height:1.7;font-style:italic;">
                    &ldquo;${escapeHtml(message).replace(/\n/g, "<br/>")}&rdquo;
                  </p>
                </div>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin-top:36px;">
                <a href="mailto:${escapeHtml(email)}"
                   style="display:inline-block;background:linear-gradient(135deg,#c2566b,#e8899a);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:100px;font-size:14px;font-family:'Helvetica Neue',sans-serif;letter-spacing:0.04em;">
                  Responder a ${escapeHtml(name)}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fdf0f2;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#c2566b;font-weight:600;font-family:'Helvetica Neue',sans-serif;">
                Meli&amp;Cakes
              </p>
              <p style="margin:0;font-size:12px;color:#b08888;font-family:'Helvetica Neue',sans-serif;">
                Carrer dels Voluntaris, 44 · 08225 Terrassa, Barcelona
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

function field(label: string, value: string, extraStyle = "") {
  return `
  <div style="display:flex;align-items:baseline;gap:12px;padding:12px 0;border-bottom:1px solid #f5e8eb;">
    <span style="min-width:80px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9b7070;font-family:'Helvetica Neue',sans-serif;">
      ${label}
    </span>
    <span style="font-size:16px;color:#2e1a1e;${extraStyle}">
      ${escapeHtml(value)}
    </span>
  </div>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
