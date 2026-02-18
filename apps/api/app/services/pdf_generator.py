from io import BytesIO
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer,
    PageBreak,
    Image,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from app.data.mock_das import MOCK_DAS


def generate_da_report_pdf(da_id: str, approval_score: int = 0, similar_projects: list = None) -> BytesIO:
    """
    Generate a PDF report for a Development Application
    
    Args:
        da_id: The ID of the DA to generate report for
        approval_score: The approval score (0-100)
        similar_projects: List of similar projects
    
    Returns:
        BytesIO object containing the PDF
    """
    # Find the DA
    da = next((d for d in MOCK_DAS if d["id"] == da_id), None)
    if not da:
        raise ValueError(f"DA with id {da_id} not found")
    
    # Create BytesIO buffer
    buffer = BytesIO()
    
    # Create PDF document
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#003366'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#003366'),
        spaceAfter=8,
        spaceBefore=8,
        fontName='Helvetica-Bold',
        borderColor=colors.HexColor('#CCCCCC'),
        borderPadding=6,
        backColor=colors.HexColor('#F0F0F0')
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        alignment=TA_LEFT
    )
    
    # Header
    story.append(Paragraph("DEVELOPMENT APPLICATION DETERMINATION REPORT", title_style))
    story.append(Spacer(1, 0.3 * inch))
    
    # Report metadata
    metadata_data = [
        ["Report Generated:", datetime.now().strftime("%d %B %Y")],
        ["DA ID:", da_id],
        ["Council:", da['council']],
    ]
    
    metadata_table = Table(metadata_data, colWidths=[2.5*inch, 3.5*inch])
    metadata_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
        ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 10),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, colors.HexColor('#F5F5F5')]),
    ]))
    story.append(metadata_table)
    story.append(Spacer(1, 0.3 * inch))
    
    # Application Details Section
    story.append(Paragraph("APPLICATION DETAILS", heading_style))
    
    details_data = [
        ["Property Address:", da.get('address', 'N/A')],
        ["Zoning:", da.get('zoning', 'N/A')],
        ["Land Size:", da.get('land_size', 'N/A')],
        ["Maximum Height:", da.get('height', 'N/A')],
        ["Floor Space Ratio (FSR):", da.get('FSR', 'N/A')],
    ]
    
    details_table = Table(details_data, colWidths=[2.5*inch, 3.5*inch])
    details_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
        ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 10),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CCCCCC')),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#E8E8E8')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(details_table)
    story.append(Spacer(1, 0.3 * inch))
    
    # Decision Section
    story.append(Paragraph("DETERMINATION", heading_style))
    
    outcome_color = {
        'Approved': colors.HexColor('#0D7740'),
        'Refused': colors.HexColor('#B71C1C'),
        'Deferred': colors.HexColor('#F59E0B'),
        'Under Assessment': colors.HexColor('#3B82F6'),
    }
    
    decision_data = [
        ["Determination:", da.get('DA_outcome', 'Unknown')],
    ]
    
    decision_table = Table(decision_data, colWidths=[2.5*inch, 3.5*inch])
    decision_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 11),
        ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 11),
        ('TEXTCOLOR', (1, 0), (1, 0), outcome_color.get(da.get('DA_outcome', ''), colors.black)),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CCCCCC')),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#FFE5CC')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('FONTSIZE', (1, 0), (1, 0), 12),
    ]))
    story.append(decision_table)
    story.append(Spacer(1, 0.3 * inch))
    
    # Approval Score Section (if provided)
    if approval_score > 0:
        story.append(Paragraph("APPROVAL LIKELIHOOD SCORE", heading_style))
        
        score_color = colors.HexColor('#0D7740') if approval_score >= 70 else (
            colors.HexColor('#F59E0B') if approval_score >= 50 else colors.HexColor('#B71C1C')
        )
        
        score_data = [
            ["Approval Score:", f"{approval_score}/100"],
        ]
        
        score_table = Table(score_data, colWidths=[2.5*inch, 3.5*inch])
        score_table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'Helvetica', 11),
            ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 11),
            ('TEXTCOLOR', (1, 0), (1, 0), score_color),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CCCCCC')),
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#E8F5E9')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('FONTSIZE', (1, 0), (1, 0), 12),
        ]))
        story.append(score_table)
        story.append(Spacer(1, 0.3 * inch))
    
    # Key Conditions Section
    story.append(Paragraph("KEY CONDITIONS", heading_style))
    
    conditions = da.get('key_conditions', [])
    if conditions:
        conditions_data = [[f"{i+1}. {condition}"] for i, condition in enumerate(conditions)]
        conditions_table = Table(conditions_data, colWidths=[6*inch])
        conditions_table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CCCCCC')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, colors.HexColor('#F9F9F9')]),
        ]))
        story.append(conditions_table)
    else:
        story.append(Paragraph("No specific conditions imposed.", normal_style))
    
    story.append(Spacer(1, 0.3 * inch))
    
    # Similar Projects Section (if provided)
    if similar_projects:
        story.append(PageBreak())
        story.append(Paragraph("SIMILAR PROJECTS REFERENCE", heading_style))
        
        similar_data = [
            ["Address", "Council", "Outcome", "Similarity Score"],
        ]
        
        for project in similar_projects[:5]:  # Limit to 5 projects
            similar_data.append([
                project.get('address', 'N/A'),
                project.get('council', 'N/A'),
                project.get('DA_outcome', 'N/A'),
                f"{project.get('similarity_score', 0):.1%}",
            ])
        
        similar_table = Table(similar_data, colWidths=[2.2*inch, 1.5*inch, 1.3*inch, 1.5*inch])
        similar_table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 10),
            ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#003366')),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CCCCCC')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F5F5F5')]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(similar_table)
        story.append(Spacer(1, 0.3 * inch))
    
    # Footer
    story.append(Spacer(1, 0.5 * inch))
    footer_text = "This report is generated for reference purposes only. For official determination, please refer to the council's official records."
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.HexColor('#666666'),
        alignment=TA_CENTER
    )
    story.append(Paragraph(footer_text, footer_style))
    
    # Build PDF
    doc.build(story)
    buffer.seek(0)
    return buffer
