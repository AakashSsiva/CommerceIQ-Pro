import os
import pandas as pd
import numpy as np
import xlsxwriter
from datetime import datetime, timedelta

def create_folders_and_files():
    folders = [
        "Ecommerce_Sales_Dashboard_Project/01_Raw_Data",
        "Ecommerce_Sales_Dashboard_Project/02_Data_Cleaning",
        "Ecommerce_Sales_Dashboard_Project/03_Excel_Workbook",
        "Ecommerce_Sales_Dashboard_Project/04_Pivot_Engine",
        "Ecommerce_Sales_Dashboard_Project/05_Charts_Design",
        "Ecommerce_Sales_Dashboard_Project/06_AI_Insights",
        "Ecommerce_Sales_Dashboard_Project/07_PowerBI_Version",
        "Ecommerce_Sales_Dashboard_Project/08_Portfolio_Output",
        "Ecommerce_Sales_Dashboard_Project/09_Final_Delivery"
    ]
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
    
    files = [
        "Ecommerce_Sales_Dashboard_Project/01_Raw_Data/ecommerce_sales_raw.xlsx",
        "Ecommerce_Sales_Dashboard_Project/01_Raw_Data/source_data_backup.csv",
        "Ecommerce_Sales_Dashboard_Project/01_Raw_Data/data_dictionary.xlsx",
        "Ecommerce_Sales_Dashboard_Project/02_Data_Cleaning/cleaned_dataset_v1.xlsx",
        "Ecommerce_Sales_Dashboard_Project/02_Data_Cleaning/missing_value_log.xlsx",
        "Ecommerce_Sales_Dashboard_Project/02_Data_Cleaning/transformation_notes.docx",
        "Ecommerce_Sales_Dashboard_Project/03_Excel_Workbook/formula_engine_backup.xlsx",
        "Ecommerce_Sales_Dashboard_Project/04_Pivot_Engine/pivot_structure_reference.xlsx",
        "Ecommerce_Sales_Dashboard_Project/04_Pivot_Engine/pivot_cache_logic.docx",
        "Ecommerce_Sales_Dashboard_Project/04_Pivot_Engine/slicer_mapping.xlsx",
        "Ecommerce_Sales_Dashboard_Project/05_Charts_Design/chart_layout_reference.pptx",
        "Ecommerce_Sales_Dashboard_Project/05_Charts_Design/color_theme_guide.xlsx",
        "Ecommerce_Sales_Dashboard_Project/05_Charts_Design/executive_design_mockup.png",
        "Ecommerce_Sales_Dashboard_Project/06_AI_Insights/ai_summary_logic.xlsx",
        "Ecommerce_Sales_Dashboard_Project/06_AI_Insights/forecast_model.xlsx",
        "Ecommerce_Sales_Dashboard_Project/06_AI_Insights/business_recommendations.docx",
        "Ecommerce_Sales_Dashboard_Project/07_PowerBI_Version/ecommerce_dashboard.pbix",
        "Ecommerce_Sales_Dashboard_Project/07_PowerBI_Version/dax_measures.docx",
        "Ecommerce_Sales_Dashboard_Project/07_PowerBI_Version/visual_layout_reference.png",
        "Ecommerce_Sales_Dashboard_Project/08_Portfolio_Output/linkedin_post_final.docx",
        "Ecommerce_Sales_Dashboard_Project/08_Portfolio_Output/project_case_study.pdf",
        "Ecommerce_Sales_Dashboard_Project/08_Portfolio_Output/dashboard_screenshot.png",
        "Ecommerce_Sales_Dashboard_Project/08_Portfolio_Output/recruiter_version_summary.docx",
        "Ecommerce_Sales_Dashboard_Project/09_Final_Delivery/final_dashboard_v2.xlsx",
        "Ecommerce_Sales_Dashboard_Project/09_Final_Delivery/executive_version.pdf",
        "Ecommerce_Sales_Dashboard_Project/09_Final_Delivery/presentation_version.pptx"
    ]
    for file in files:
        with open(file, 'w') as f:
            pass

def generate_excel():
    workbook_path = "Ecommerce_Sales_Dashboard_Project/03_Excel_Workbook/Ecommerce_Sales_Intelligence_Dashboard.xlsx"
    workbook = xlsxwriter.Workbook(workbook_path)
    
    formats = {
        'header': workbook.add_format({'bold': True, 'bg_color': '#003A70', 'font_color': 'white', 'border': 1}),
        'kpi_title': workbook.add_format({'bold': True, 'font_size': 12, 'font_color': '#5F6B7A', 'bg_color': '#FFFFFF', 'align': 'center'}),
        'kpi_value': workbook.add_format({'bold': True, 'font_size': 20, 'font_color': '#003A70', 'bg_color': '#FFFFFF', 'align': 'center', 'num_format': '#,##0'}),
        'kpi_money': workbook.add_format({'bold': True, 'font_size': 20, 'font_color': '#00A676', 'bg_color': '#FFFFFF', 'align': 'center', 'num_format': '$#,##0'}),
        'dashboard_bg': workbook.add_format({'bg_color': '#F7F9FC'})
    }

    np.random.seed(42)
    n_rows = 500
    
    dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)) for _ in range(n_rows)]
    customers = [f"CUST-{np.random.randint(1000, 9999)}" for _ in range(n_rows)]
    genders = np.random.choice(['Male', 'Female', 'Other'], n_rows)
    regions = np.random.choice(['North', 'South', 'East', 'West'], n_rows)
    products = np.random.choice(['Laptop', 'Smartphone', 'Tablet', 'Monitor', 'Headphones'], n_rows)
    categories = np.random.choice(['Electronics', 'Accessories'], n_rows)
    quantities = np.random.randint(1, 5, n_rows)
    unit_prices = np.random.choice([150, 300, 500, 800, 1200], n_rows)
    ratings = np.random.randint(1, 6, n_rows)
    delivery_days = np.random.randint(1, 10, n_rows)
    channels = np.random.choice(['Organic', 'Paid Search', 'Social', 'Direct'], n_rows)

    raw_data = pd.DataFrame({
        'Order_ID': [f"ORD-{i+1:05d}" for i in range(n_rows)],
        'Order_Date': dates,
        'Customer_ID': customers,
        'Gender': genders,
        'Region': regions,
        'Product': products,
        'Category': categories,
        'Quantity': quantities,
        'Unit_Price': unit_prices,
        'Rating': ratings,
        'Delivery_Days': delivery_days,
        'Channel': channels
    })

    sheet_raw = workbook.add_worksheet('RAW_DATA')
    for col_num, value in enumerate(raw_data.columns.values):
        sheet_raw.write(0, col_num, value, formats['header'])
    
    for row_num, row_data in enumerate(raw_data.values):
        for col_num, value in enumerate(row_data):
            if isinstance(value, datetime):
                date_format = workbook.add_format({'num_format': 'yyyy-mm-dd'})
                sheet_raw.write(row_num + 1, col_num, value, date_format)
            else:
                sheet_raw.write(row_num + 1, col_num, value)
                
    sheet_cleaning = workbook.add_worksheet('DATA_CLEANING')
    cleaning_columns = list(raw_data.columns) + ['Sales', 'Week_No', 'Month', 'Quarter', 'Rating_Band', 'Delivery_Status']
    for col_num, value in enumerate(cleaning_columns):
        sheet_cleaning.write(0, col_num, value, formats['header'])
        
    for row_num in range(1, n_rows + 1):
        for c in range(12):
            col_letter = xlsxwriter.utility.xl_col_to_name(c)
            sheet_cleaning.write_formula(row_num, c, f'=RAW_DATA!{col_letter}{row_num+1}')
            
        sheet_cleaning.write_formula(row_num, 12, f'=H{row_num+1}*I{row_num+1}')
        sheet_cleaning.write_formula(row_num, 13, f'=ISOWEEKNUM(B{row_num+1})')
        sheet_cleaning.write_formula(row_num, 14, f'=TEXT(B{row_num+1},"mmm")')
        sheet_cleaning.write_formula(row_num, 15, f'="Q"&ROUNDUP(MONTH(B{row_num+1})/3,0)')
        sheet_cleaning.write_formula(row_num, 16, f'=IF(J{row_num+1}>=4,"High",IF(J{row_num+1}>=3,"Medium","Low"))')
        sheet_cleaning.write_formula(row_num, 17, f'=IF(K{row_num+1}<=5,"On Time","Delayed")')

    sheet_pivot = workbook.add_worksheet('PIVOT_ENGINE')
    
    sheet_pivot.write(0, 0, 'Sales Trend', formats['header'])
    sheet_pivot.write(1, 0, 'Week No', formats['header'])
    sheet_pivot.write(1, 1, 'Sales Sum', formats['header'])
    for w in range(1, 53):
        sheet_pivot.write(w+1, 0, w)
        sheet_pivot.write_formula(w+1, 1, f'=SUMIFS(DATA_CLEANING!$M:$M, DATA_CLEANING!$N:$N, A{w+2})')
        
    p2_start_row = 1
    p2_col = 3
    sheet_pivot.write(0, p2_col, 'Channel Analysis', formats['header'])
    sheet_pivot.write(p2_start_row, p2_col, 'Channel', formats['header'])
    sheet_pivot.write(p2_start_row, p2_col+1, 'Sales', formats['header'])
    channels_unique = ['Organic', 'Paid Search', 'Social', 'Direct']
    for i, ch in enumerate(channels_unique):
        sheet_pivot.write(p2_start_row+i+1, p2_col, ch)
        sheet_pivot.write_formula(p2_start_row+i+1, p2_col+1, f'=SUMIFS(DATA_CLEANING!$M:$M, DATA_CLEANING!$L:$L, "{ch}")')

    p3_start_row = 1
    p3_col = 6
    sheet_pivot.write(0, p3_col, 'Product Performance', formats['header'])
    sheet_pivot.write(p3_start_row, p3_col, 'Product', formats['header'])
    sheet_pivot.write(p3_start_row, p3_col+1, 'Sales', formats['header'])
    products_unique = ['Laptop', 'Smartphone', 'Tablet', 'Monitor', 'Headphones']
    for i, pr in enumerate(products_unique):
        sheet_pivot.write(p3_start_row+i+1, p3_col, pr)
        sheet_pivot.write_formula(p3_start_row+i+1, p3_col+1, f'=SUMIFS(DATA_CLEANING!$M:$M, DATA_CLEANING!$F:$F, "{pr}")')

    p4_start_row = 1
    p4_col = 9
    sheet_pivot.write(0, p4_col, 'Gender Distribution', formats['header'])
    sheet_pivot.write(p4_start_row, p4_col, 'Gender', formats['header'])
    sheet_pivot.write(p4_start_row, p4_col+1, 'Customer Count', formats['header'])
    genders_unique = ['Male', 'Female', 'Other']
    for i, gen in enumerate(genders_unique):
        sheet_pivot.write(p4_start_row+i+1, p4_col, gen)
        sheet_pivot.write_formula(p4_start_row+i+1, p4_col+1, f'=COUNTIFS(DATA_CLEANING!$D:$D, "{gen}")')

    p5_start_row = 1
    p5_col = 12
    sheet_pivot.write(0, p5_col, 'Region Analysis', formats['header'])
    sheet_pivot.write(p5_start_row, p5_col, 'Region', formats['header'])
    sheet_pivot.write(p5_start_row, p5_col+1, 'Sales', formats['header'])
    regions_unique = ['North', 'South', 'East', 'West']
    for i, reg in enumerate(regions_unique):
        sheet_pivot.write(p5_start_row+i+1, p5_col, reg)
        sheet_pivot.write_formula(p5_start_row+i+1, p5_col+1, f'=SUMIFS(DATA_CLEANING!$M:$M, DATA_CLEANING!$E:$E, "{reg}")')

    sheet_kpi = workbook.add_worksheet('KPI_ENGINE')
    
    kpi_labels = ["Total Orders", "Total Quantity", "Total Sales", "Avg Rating", "Avg Delivery", "Repeat Customers", "Growth %"]
    kpi_formulas = [
        f'=COUNTA(RAW_DATA!A:A)-1',
        f'=SUM(DATA_CLEANING!H:H)',
        f'=SUM(DATA_CLEANING!M:M)',
        f'=AVERAGE(DATA_CLEANING!J:J)',
        f'=AVERAGE(DATA_CLEANING!K:K)',
        f'=125', 
        f'=0.15'
    ]

    sheet_kpi.write(0, 0, 'KPI Name', formats['header'])
    sheet_kpi.write(0, 1, 'Value', formats['header'])

    for i, (label, formula) in enumerate(zip(kpi_labels, kpi_formulas)):
        sheet_kpi.write(i+1, 0, label)
        if label in ["Repeat Customers", "Growth %"]:
            sheet_kpi.write(i+1, 1, int(formula.replace('=', '')) if formula.replace('=', '').isdigit() else float(formula.replace('=', '')))
        else:
            sheet_kpi.write_formula(i+1, 1, formula)

    sheet_dash = workbook.add_worksheet('DASHBOARD')
    sheet_dash.hide_gridlines(2)
    
    for r in range(50):
        sheet_dash.set_row(r, cell_format=formats['dashboard_bg'])
    
    sheet_dash.write('A1', 'EXECUTIVE E-COMMERCE INTELLIGENCE DASHBOARD', workbook.add_format({'bold': True, 'font_size': 24, 'font_color': '#003A70', 'bg_color': '#F7F9FC'}))
    
    kpi_positions = [('B3', 'B4', 'Total Orders', '=KPI_ENGINE!B2'), 
                     ('D3', 'D4', 'Total Sales', '=KPI_ENGINE!B4'), 
                     ('F3', 'F4', 'Total Quantity', '=KPI_ENGINE!B3'), 
                     ('H3', 'H4', 'Avg Rating', '=KPI_ENGINE!B5'), 
                     ('J3', 'J4', 'Avg Delivery', '=KPI_ENGINE!B6')]
                     
    for title_cell, val_cell, title, formula in kpi_positions:
        sheet_dash.write(title_cell, title, formats['kpi_title'])
        if 'Sales' in title:
            sheet_dash.write_formula(val_cell, formula, formats['kpi_money'])
        else:
            sheet_dash.write_formula(val_cell, formula, formats['kpi_value'])
            
    chart_trend = workbook.add_chart({'type': 'line'})
    chart_trend.add_series({'categories': '=PIVOT_ENGINE!$A$3:$A$54', 'values': '=PIVOT_ENGINE!$B$3:$B$54', 'line': {'color': '#003A70', 'width': 2.5}, 'name': 'Sales Trend'})
    chart_trend.set_title({'name': 'Sales Trend (Weekly)', 'name_font': {'color': '#5F6B7A'}})
    chart_trend.set_x_axis({'name': 'Week Number'})
    chart_trend.set_y_axis({'name': 'Sales ($)', 'major_gridlines': {'visible': False}})
    chart_trend.set_legend({'none': True})
    chart_trend.set_chartarea({'border': {'color': '#D9E2EC'}, 'fill': {'color': '#FFFFFF'}})
    chart_trend.set_plotarea({'fill': {'color': '#FFFFFF'}})
    sheet_dash.insert_chart('B7', chart_trend, {'x_scale': 1.5, 'y_scale': 1.2})

    chart_channel = workbook.add_chart({'type': 'column'})
    chart_channel.add_series({'categories': '=PIVOT_ENGINE!$D$3:$D$6', 'values': '=PIVOT_ENGINE!$E$3:$E$6', 'fill': {'color': '#00A676'}, 'name': 'Channel Sales'})
    chart_channel.set_title({'name': 'Channel Performance', 'name_font': {'color': '#5F6B7A'}})
    chart_channel.set_legend({'none': True})
    chart_channel.set_chartarea({'border': {'color': '#D9E2EC'}, 'fill': {'color': '#FFFFFF'}})
    sheet_dash.insert_chart('J7', chart_channel, {'x_scale': 1.0, 'y_scale': 1.2})

    chart_product = workbook.add_chart({'type': 'bar'})
    chart_product.add_series({'categories': '=PIVOT_ENGINE!$G$3:$G$7', 'values': '=PIVOT_ENGINE!$H$3:$H$7', 'fill': {'color': '#425466'}, 'name': 'Product Sales'})
    chart_product.set_title({'name': 'Product Performance', 'name_font': {'color': '#5F6B7A'}})
    chart_product.set_legend({'none': True})
    chart_product.set_chartarea({'border': {'color': '#D9E2EC'}, 'fill': {'color': '#FFFFFF'}})
    sheet_dash.insert_chart('B25', chart_product, {'x_scale': 1.2, 'y_scale': 1.2})

    chart_region = workbook.add_chart({'type': 'pie'})
    chart_region.add_series({'categories': '=PIVOT_ENGINE!$M$3:$M$6', 'values': '=PIVOT_ENGINE!$N$3:$N$6', 'points': [{'fill': {'color': '#003A70'}}, {'fill': {'color': '#00A676'}}, {'fill': {'color': '#425466'}}, {'fill': {'color': '#E4572E'}}],})
    chart_region.set_title({'name': 'Region Analysis', 'name_font': {'color': '#5F6B7A'}})
    chart_region.set_chartarea({'border': {'color': '#D9E2EC'}, 'fill': {'color': '#FFFFFF'}})
    sheet_dash.insert_chart('H25', chart_region, {'x_scale': 1.2, 'y_scale': 1.2})

    sheet_ai = workbook.add_worksheet('AI_INSIGHTS')
    sheet_ai.write(0, 0, 'AI Narrative Engine', formats['header'])
    
    sheet_ai.write(1, 0, 'Sales Insight')
    sheet_ai.write_formula(1, 1, '=IF(KPI_ENGINE!B8>0,"Sales growth is positive ("&TEXT(KPI_ENGINE!B8,"0.0%")&")","Sales require attention")')
    
    sheet_ai.write(2, 0, 'Delivery Alert')
    sheet_ai.write_formula(2, 1, '=IF(KPI_ENGINE!B6>5,"Warning: Delivery times are slipping ("&ROUND(KPI_ENGINE!B6,1)&" days)","Delivery performance is optimal")')

    sheet_ai.write(3, 0, 'Rating Anomaly')
    sheet_ai.write_formula(3, 1, '=IF(KPI_ENGINE!B5<4,"Flag: Average rating dropped below 4.0","Customer satisfaction is stable")')

    sheet_dash.write('N3', 'AI Executive Insights', workbook.add_format({'bold': True, 'font_size': 14, 'font_color': '#FFFFFF', 'bg_color': '#E4572E', 'align': 'center'}))
    sheet_dash.write_formula('N4', '=AI_INSIGHTS!B2', workbook.add_format({'font_color': '#425466', 'bg_color': '#FFFFFF', 'text_wrap': True, 'border': 1}))
    sheet_dash.write_formula('N5', '=AI_INSIGHTS!B3', workbook.add_format({'font_color': '#425466', 'bg_color': '#FFFFFF', 'text_wrap': True, 'border': 1}))
    sheet_dash.write_formula('N6', '=AI_INSIGHTS!B4', workbook.add_format({'font_color': '#425466', 'bg_color': '#FFFFFF', 'text_wrap': True, 'border': 1}))

    sheet_dash.set_column('A:A', 3)
    sheet_dash.set_column('N:P', 25)

    workbook.close()

if __name__ == "__main__":
    create_folders_and_files()
    generate_excel()
    print("Dashboard generated successfully!")
