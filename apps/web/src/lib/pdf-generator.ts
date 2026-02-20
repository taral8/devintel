import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";
import type { DADetail, SimilarProject } from "./types";

// ── Colour palette ──────────────────────────────────────────────
const BRAND_NAVY = rgb(0.063, 0.165, 0.263); // #102a43 brand-900
const BRAND_DARK = rgb(0.15, 0.15, 0.15);
const GREY_600 = rgb(0.42, 0.42, 0.42);
const GREY_400 = rgb(0.62, 0.62, 0.62);
const GREY_200 = rgb(0.88, 0.88, 0.88);
const GREY_100 = rgb(0.94, 0.94, 0.94);
const WHITE = rgb(1, 1, 1);
const GREEN = rgb(0.051, 0.58, 0.533); // #0d9488 teal-600
const RED = rgb(0.725, 0.11, 0.11); // #b91c1c red-700
const AMBER = rgb(0.85, 0.55, 0.04);
const BLUE = rgb(0.23, 0.51, 0.71);

// ── Layout constants ────────────────────────────────────────────
const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN = 50;
const CONTENT_W = PAGE_W - 2 * MARGIN;
const LINE_HEIGHT = 16;

function outcomeColour(outcome: string) {
  switch (outcome) {
    case "Approved":
      return GREEN;
    case "Refused":
      return RED;
    case "Deferred":
      return AMBER;
    case "Under Assessment":
      return BLUE;
    default:
      return BRAND_DARK;
  }
}

function scoreColour(score: number) {
  if (score >= 70) return GREEN;
  if (score >= 50) return AMBER;
  return RED;
}

// ── Helper: wrap long text into lines that fit a given width ────
function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ── Helper: draw a horizontal rule ─────────────────────────────
function drawHR(page: PDFPage, y: number) {
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.5,
    color: GREY_200,
  });
}

// ── Helper: draw a filled rectangle ────────────────────────────
function drawRect(
  page: PDFPage,
  x: number,
  y: number,
  w: number,
  h: number,
  colour: ReturnType<typeof rgb>
) {
  page.drawRectangle({ x, y, width: w, height: h, color: colour });
}

// ── Helper: draw a label + value row ────────────────────────────
function drawKV(
  page: PDFPage,
  label: string,
  value: string,
  y: number,
  fontBold: PDFFont,
  fontNormal: PDFFont,
  fontSize = 10
): number {
  const labelWidth = 150;
  const valueMaxWidth = CONTENT_W - labelWidth - 10;
  const valueLines = wrapText(value, fontNormal, fontSize, valueMaxWidth);
  const rowHeight = Math.max(valueLines.length, 1) * (fontSize + 4) + 8;

  // Background alternating rows are handled by caller
  page.drawText(label, {
    x: MARGIN + 8,
    y: y - fontSize - 4,
    size: fontSize,
    font: fontBold,
    color: BRAND_DARK,
  });

  valueLines.forEach((line, i) => {
    page.drawText(line, {
      x: MARGIN + labelWidth,
      y: y - fontSize - 4 - i * (fontSize + 4),
      size: fontSize,
      font: fontNormal,
      color: GREY_600,
    });
  });

  return rowHeight;
}

// ── Main PDF generator ──────────────────────────────────────────
export async function generateDAReportPDF(da: DADetail): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  // ── Metadata ──────────────────────────────────────────────────
  doc.setTitle(`DA Determination Report — ${da.id.toUpperCase()}`);
  doc.setAuthor("CivroDA");
  doc.setSubject(`Development Application ${da.id} — ${da.address}`);
  doc.setCreator("CivroDA (https://civroda.com)");

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  // ── Utility to ensure page space ──────────────────────────────
  function ensureSpace(needed: number) {
    if (y - needed < MARGIN + 40) {
      // draw footer on current page
      drawPageFooter(page, fontRegular, doc.getPageCount());
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  }

  function drawPageFooter(p: PDFPage, font: PDFFont, pageNum: number) {
    const footerY = 25;
    p.drawLine({
      start: { x: MARGIN, y: footerY + 12 },
      end: { x: PAGE_W - MARGIN, y: footerY + 12 },
      thickness: 0.5,
      color: GREY_200,
    });
    p.drawText("CivroDA — Planning Intelligence", {
      x: MARGIN,
      y: footerY,
      size: 7,
      font,
      color: GREY_400,
    });
    p.drawText(`Page ${pageNum}`, {
      x: PAGE_W - MARGIN - font.widthOfTextAtSize(`Page ${pageNum}`, 7),
      y: footerY,
      size: 7,
      font,
      color: GREY_400,
    });
  }

  // ══════════════════════════════════════════════════════════════
  // HEADER — branded council-style banner
  // ══════════════════════════════════════════════════════════════
  const bannerH = 70;
  drawRect(page, 0, PAGE_H - bannerH, PAGE_W, bannerH, BRAND_NAVY);

  page.drawText("DEVELOPMENT APPLICATION", {
    x: MARGIN,
    y: PAGE_H - 30,
    size: 14,
    font: fontBold,
    color: WHITE,
  });
  page.drawText("DETERMINATION REPORT", {
    x: MARGIN,
    y: PAGE_H - 48,
    size: 14,
    font: fontBold,
    color: WHITE,
  });

  // Council badge
  const councilText = `${da.council} Council`;
  const councilW = fontBold.widthOfTextAtSize(councilText, 10);
  page.drawText(councilText, {
    x: PAGE_W - MARGIN - councilW,
    y: PAGE_H - 35,
    size: 10,
    font: fontBold,
    color: rgb(0.7, 0.85, 1),
  });
  page.drawText("civroda.com", {
    x: PAGE_W - MARGIN - fontRegular.widthOfTextAtSize("civroda.com", 8),
    y: PAGE_H - 50,
    size: 8,
    font: fontRegular,
    color: rgb(0.6, 0.75, 0.9),
  });

  y = PAGE_H - bannerH - 20;

  // ══════════════════════════════════════════════════════════════
  // REPORT METADATA
  // ══════════════════════════════════════════════════════════════
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const metaItems = [
    { label: "Report Date:", value: dateStr },
    { label: "DA Reference:", value: da.id.toUpperCase() },
    { label: "Council:", value: `${da.council} Council` },
  ];

  for (const item of metaItems) {
    page.drawText(item.label, {
      x: MARGIN,
      y,
      size: 9,
      font: fontBold,
      color: GREY_600,
    });
    page.drawText(item.value, {
      x: MARGIN + 110,
      y,
      size: 9,
      font: fontRegular,
      color: BRAND_DARK,
    });
    y -= 16;
  }

  y -= 8;
  drawHR(page, y);
  y -= 20;

  // ══════════════════════════════════════════════════════════════
  // SECTION 1: DETERMINATION OUTCOME (prominent)
  // ══════════════════════════════════════════════════════════════
  const outcomeH = 50;
  const oc = outcomeColour(da.DA_outcome);
  drawRect(page, MARGIN, y - outcomeH, CONTENT_W, outcomeH, GREY_100);
  drawRect(page, MARGIN, y - outcomeH, 5, outcomeH, oc);

  page.drawText("DETERMINATION", {
    x: MARGIN + 16,
    y: y - 18,
    size: 9,
    font: fontBold,
    color: GREY_600,
  });
  page.drawText(da.DA_outcome.toUpperCase(), {
    x: MARGIN + 16,
    y: y - 38,
    size: 18,
    font: fontBold,
    color: oc,
  });

  // Approval score on the right side
  if (da.approval_score > 0) {
    const scoreText = `${da.approval_score}/100`;
    const scoreLabel = "Approval Likelihood";
    const sc = scoreColour(da.approval_score);
    const scoreX = PAGE_W - MARGIN - 120;

    page.drawText(scoreLabel, {
      x: scoreX,
      y: y - 18,
      size: 9,
      font: fontBold,
      color: GREY_600,
    });
    page.drawText(scoreText, {
      x: scoreX,
      y: y - 38,
      size: 18,
      font: fontBold,
      color: sc,
    });
  }

  y -= outcomeH + 20;

  // ══════════════════════════════════════════════════════════════
  // SECTION 2: APPLICATION DETAILS
  // ══════════════════════════════════════════════════════════════
  ensureSpace(180);

  page.drawText("APPLICATION DETAILS", {
    x: MARGIN,
    y,
    size: 12,
    font: fontBold,
    color: BRAND_NAVY,
  });
  y -= 8;
  drawHR(page, y);
  y -= 6;

  const details: [string, string][] = [
    ["Property Address", da.address],
    ["Zoning", da.zoning],
    ["Land Size", da.land_size],
    ["Maximum Height", da.height],
    ["Floor Space Ratio", da.FSR],
  ];

  for (let i = 0; i < details.length; i++) {
    const [label, value] = details[i];
    const rowH = 24;
    if (i % 2 === 0) {
      drawRect(page, MARGIN, y - rowH, CONTENT_W, rowH, GREY_100);
    }
    page.drawText(label, {
      x: MARGIN + 8,
      y: y - 16,
      size: 9,
      font: fontBold,
      color: BRAND_DARK,
    });
    page.drawText(value, {
      x: MARGIN + 160,
      y: y - 16,
      size: 9,
      font: fontRegular,
      color: GREY_600,
    });
    y -= rowH;
  }

  y -= 20;

  // ══════════════════════════════════════════════════════════════
  // SECTION 3: KEY CONDITIONS
  // ══════════════════════════════════════════════════════════════
  ensureSpace(100);

  page.drawText("KEY CONDITIONS", {
    x: MARGIN,
    y,
    size: 12,
    font: fontBold,
    color: BRAND_NAVY,
  });
  y -= 8;
  drawHR(page, y);
  y -= 12;

  if (da.key_conditions.length === 0) {
    page.drawText("No specific conditions imposed.", {
      x: MARGIN + 8,
      y,
      size: 9,
      font: fontRegular,
      color: GREY_600,
    });
    y -= LINE_HEIGHT;
  } else {
    for (let i = 0; i < da.key_conditions.length; i++) {
      const condition = da.key_conditions[i];
      const condLines = wrapText(
        `${i + 1}.  ${condition}`,
        fontRegular,
        9,
        CONTENT_W - 16
      );
      const blockH = condLines.length * 14 + 10;

      ensureSpace(blockH + 10);

      if (i % 2 === 0) {
        drawRect(page, MARGIN, y - blockH, CONTENT_W, blockH, GREY_100);
      }

      // Left accent bar
      drawRect(page, MARGIN, y - blockH, 3, blockH, AMBER);

      condLines.forEach((line, li) => {
        page.drawText(line, {
          x: MARGIN + 12,
          y: y - 14 - li * 14,
          size: 9,
          font: fontRegular,
          color: BRAND_DARK,
        });
      });

      y -= blockH;
    }
  }

  y -= 20;

  // ══════════════════════════════════════════════════════════════
  // SECTION 4: SIMILAR PROJECTS
  // ══════════════════════════════════════════════════════════════
  if (da.similar_projects && da.similar_projects.length > 0) {
    ensureSpace(120);

    page.drawText("SIMILAR PROJECTS IN COUNCIL AREA", {
      x: MARGIN,
      y,
      size: 12,
      font: fontBold,
      color: BRAND_NAVY,
    });
    y -= 8;
    drawHR(page, y);
    y -= 6;

    // Table header
    const colWidths = [200, 85, 90, 90];
    const colHeaders = ["Address", "Outcome", "Similarity", "Conditions"];
    const headerH = 22;
    drawRect(page, MARGIN, y - headerH, CONTENT_W, headerH, BRAND_NAVY);

    let cx = MARGIN + 6;
    colHeaders.forEach((header, hi) => {
      page.drawText(header, {
        x: cx,
        y: y - 15,
        size: 8,
        font: fontBold,
        color: WHITE,
      });
      cx += colWidths[hi];
    });
    y -= headerH;

    // Table rows
    for (let ri = 0; ri < da.similar_projects.length; ri++) {
      const proj = da.similar_projects[ri];
      const rowH = 22;

      ensureSpace(rowH + 10);

      if (ri % 2 === 0) {
        drawRect(page, MARGIN, y - rowH, CONTENT_W, rowH, GREY_100);
      }

      // Truncate address if too long
      let addrText = proj.address;
      const maxAddrW = colWidths[0] - 12;
      while (
        fontRegular.widthOfTextAtSize(addrText, 8) > maxAddrW &&
        addrText.length > 10
      ) {
        addrText = addrText.slice(0, -4) + "...";
      }

      const rowData = [
        addrText,
        proj.DA_outcome,
        `${Math.round(proj.similarity_score * 100)}%`,
        `${proj.key_conditions.length} condition${proj.key_conditions.length !== 1 ? "s" : ""}`,
      ];

      let rx = MARGIN + 6;
      rowData.forEach((cell, ci) => {
        const colour =
          ci === 1 ? outcomeColour(proj.DA_outcome) : BRAND_DARK;
        page.drawText(cell, {
          x: rx,
          y: y - 15,
          size: 8,
          font: ci === 1 ? fontBold : fontRegular,
          color: colour,
        });
        rx += colWidths[ci];
      });

      y -= rowH;
    }

    y -= 20;
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 5: APPROVAL LIKELIHOOD ANALYSIS
  // ══════════════════════════════════════════════════════════════
  if (da.approval_score > 0) {
    ensureSpace(100);

    page.drawText("APPROVAL LIKELIHOOD ANALYSIS", {
      x: MARGIN,
      y,
      size: 12,
      font: fontBold,
      color: BRAND_NAVY,
    });
    y -= 8;
    drawHR(page, y);
    y -= 20;

    const sc = scoreColour(da.approval_score);

    // Score bar background
    const barX = MARGIN;
    const barW = CONTENT_W;
    const barH = 20;
    drawRect(page, barX, y - barH, barW, barH, GREY_200);
    // Score bar fill
    const fillW = (da.approval_score / 100) * barW;
    drawRect(page, barX, y - barH, fillW, barH, sc);
    // Score text
    page.drawText(`${da.approval_score}%`, {
      x: barX + fillW + 8 > PAGE_W - MARGIN - 30 ? barX + fillW - 35 : barX + fillW + 8,
      y: y - 15,
      size: 11,
      font: fontBold,
      color: barX + fillW + 8 > PAGE_W - MARGIN - 30 ? WHITE : sc,
    });

    y -= barH + 12;

    // Interpretation
    let interpretation = "";
    if (da.approval_score >= 80) {
      interpretation =
        "Strong approval likelihood based on comparable project outcomes in this council area.";
    } else if (da.approval_score >= 60) {
      interpretation =
        "Moderate approval likelihood. Similar projects show mixed outcomes — review conditions carefully.";
    } else if (da.approval_score >= 40) {
      interpretation =
        "Below-average approval likelihood. Consider addressing common refusal reasons from similar projects.";
    } else {
      interpretation =
        "Low approval likelihood based on comparable project outcomes. Significant compliance issues may exist.";
    }

    const interpLines = wrapText(
      interpretation,
      fontRegular,
      9,
      CONTENT_W - 16
    );
    for (const line of interpLines) {
      page.drawText(line, {
        x: MARGIN + 8,
        y,
        size: 9,
        font: fontRegular,
        color: GREY_600,
      });
      y -= 14;
    }

    y -= 14;

    // Method note
    const methodText =
      "Score is calculated using a weighted similarity algorithm comparing zoning (40%), land size (20%), height (20%), and FSR (20%) against projects within the same council area.";
    const methodLines = wrapText(methodText, fontRegular, 7, CONTENT_W - 16);
    for (const line of methodLines) {
      page.drawText(line, {
        x: MARGIN + 8,
        y,
        size: 7,
        font: fontRegular,
        color: GREY_400,
      });
      y -= 10;
    }

    y -= 10;
  }

  // ══════════════════════════════════════════════════════════════
  // DISCLAIMER FOOTER
  // ══════════════════════════════════════════════════════════════
  ensureSpace(80);

  drawHR(page, y);
  y -= 14;

  const disclaimer =
    "DISCLAIMER: This report is generated by CivroDA for reference and research purposes only. It does not constitute official council documentation or legal advice. For official determination records, please contact the relevant council directly. Data shown is derived from publicly available development application records.";
  const disclaimerLines = wrapText(disclaimer, fontRegular, 7, CONTENT_W);
  for (const line of disclaimerLines) {
    page.drawText(line, {
      x: MARGIN,
      y,
      size: 7,
      font: fontRegular,
      color: GREY_400,
    });
    y -= 10;
  }

  // Page footers for all pages
  const pages = doc.getPages();
  for (let i = 0; i < pages.length; i++) {
    drawPageFooter(pages[i], fontRegular, i + 1);
  }

  return doc.save();
}
