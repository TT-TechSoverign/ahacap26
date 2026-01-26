import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import logging
from concurrent.futures import ThreadPoolExecutor
import asyncio

# Gmail SMTP Config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465 # SSL
SMTP_USER = os.getenv("SMTP_USER", "office@affordablehome-ac.com") 
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

logger = logging.getLogger("uvicorn.error")

executor = ThreadPoolExecutor(max_workers=3)

# Placeholder for Logo - Base64 encoded SVG
LOGO_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiB6b29tQW5kUGFuPSJtYWduaWZ5IiB2aWV3Qm94PSIwIDAgMzc1IDM3NC45OTk5OTEiIGhlaWdodD0iNTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2ZXJzaW9uPSIxLjAiPjxkZWZzPjxmaWx0ZXIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBpZD0iODg4YWRhNjI5OCI+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAxIDAiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIvPjwvZmlsdGVyPjxmaWx0ZXIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBpZD0iZDM4MmJkMDc5ZCI+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwLjIxMjYgMC43MTUyIDAuMDcyMiAwIDAiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIvPjwvZmlsdGVyPjxnLz48Y2xpcFBhdGggaWQ9ImExMzU1OTE1YWQiPjxwYXRoIGQ9Ik0gMzAgMTEuMTgzNTk0IEwgMzQ0LjgzNTkzOCAxMS4xODM1OTQgTCAzNDQuODM1OTM4IDE4MSBMIDMwIDE4MSBaIE0gMzAgMTEuMTgzNTk0ICIgY2xpcC1ydWxlPSJub256ZXJvIi8+PC9jbGlwUGF0aD48bWFzayBpZD0iNGRlZWI1OTRjZiI+PGcgZmlsdGVyPSJ1cmwoIzg4OGFkYTYyOTgpIj48ZyBmaWx0ZXI9InVybCgjZDM4MmJkMDc5ZCkiIHRyYW5zZm9ybT0ibWF0cml4KDAuMjM5OTA5LCAwLCAwLCAwLjI0MDEyNywgMjkuODM0NDk1LCAxMS4xODI4OTUpIj48aW1hZ2UgeD0iMCIgeT0iMCIgd2lkdGg9IjEzMTMiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFCU0VBQUFMRkNBQUFBQUFaa25sTUFBQUFBbUpMUjBRQS80ZVB6TDhBQUNBQVNVUkJWSGljN0oxM3ZOUlVGc2ZQdlptODkraFZRRkdLZ21VVlJjUzY2eUtDMkJ0ZHdjWXFSYXlnSUlnRlVld2lpQ2k2aXBVaVRXeW9ZTU82ZHJHQ3dGTlVlcS92VFhMdjJUOGVVdWJOWkpMTVpISXk3M3ozODFtRVNUbTVTWDY1T2ZlWGN3RVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVlobUVZaG1FWWhtRVloc2t5SXV3QUdHWjNaTmdCTU14dUdNM01zRU5nR0lhaGlkRWJ4eGVFSFFURE1BeEZ6TUdJT0tWcTJHRXdETVBRby9JemlJajRjVDFPUmpJTXcreUJxUDBPbHJHb09hZkhHWVpoZGtNMCtSSC9adTN4TEpFTXd6QTdrYTFXNEM1S3p6ZkNEb2hoR0lZS3h1bmJjQSt1aVlVZEVzTXdEQTFFejFKN0Q0RzA4U0UyUmpJTXd3Q0FjYVBlVXlBUkZiNVlPZXl3R0laaHdxZnd2NWdva0loS2Y3QlgySUV4RE1PRVRjMDN0U29ua0loYS9YeEEyS0V4RE1PRVM2TnZWVEtCUk5ScXhiRmhCOGN3REJNbUxmOVVPcWxBSW1wNzY3bjhlUTNETUJXWHR1dnNWQUtKaUxicXo5NXhobUVxS0tKSGFma3htajBrRWtleWQ1eGhtQXBKRXBkUElncGZZTmNQd3pBVmtNSW5rcmg4eWtta2ZxOXUySUV5RE1Qa21wcXprN3A4eWttayttbi9zRU5sR0liSkxVMitSemNDaWFqVjZ1UEREcFpoR0NhWEhQNjdkaGpFVHBESXJXZnlrRGJETUJVRzBYNWpTaHRrc2pkdGZRWFgrbUVZcG9KZ1hHeDVFVWhFRysvakdiNFlocWtRbUVOY0RHSW5TdVFrbnVHTFlaZ0tRT1duUEFza29zSjU5Y0lPbkdFWUptaHF2dXB5RUR0Qkl2V0M1bUdIempBTUV5ejdmdVZMSUJHMVduWlUyTUV6RE1NRVNRdjNMcC95RXJubERIYjlNQXlUdDRoMm5sdytpZGpxY25iOU1BeVRweGc5UGJwOHlra2t1MzRZaHNsVENtL3hNWWlkS0pGVHFvZDlHQXpETU5tbjhtTVpDeVNpd25mWTljTXdUTjVSKzNXZmc5aUpFdmxUczdBUGhXRVlKcnMwL2lZckFvbW85Y3BqZVBvYWhtSHlpWlovWUVaak5MdExwTnArSnMvTndEQk0zaURiYi9adGcwd21rZGliaDdRWmhza1R6SXQxWmk2ZlJHeDhxRERzZzJJWWhza0dCY095TUlpZEtKRVR1TllQd3pCNVFPV0hzaTZRaUFybjdoWDJnVEVNdzJSSzdkZXlOSWlkS0pFL0hCRDJvVEVNdzJSRzQ2OERFVWhFalN1T1p0Y1B3ekFSUnJUS25zdW5uRVNxN1dkeklRdUdZU0tMMFNHYkxwL3lFb2w5MlBYREJBa2JiNWtBTVh0T05VVndiOEpDcUhQc0w2ekF0czh3REJNY1JUY0dNSWk5SndxZjRWby9ETU5Fa0tvUEJ6UkdzNmRFenFrZjlvRXlETU40WmE5Z1hEN2xKZklIbnVHTFlaaUkwZFR2akYxZTBiamlHSjYraG1HWUNDRmFMZzNNNVZOT0l2VTJydlhETUV4ME1OcXNEOURsVTA0aWxicVlYVDlNRVBDamx3a0FzOVBMUlFHNmZCSVJBanZHdjJUWEQ4TXdVYUJvWUk1U2tMdXcyZlhETUV3a3FESW1jQnRrZVJTK3c2NGZobUhJVXljN00zWjVsMGllNFl0aEdPcGtiY1l1cjJoY2RYVFlCODh3RE9QRW9jVTVjL21VazBpOTlaU3dENTloR0NZMWJUYUdKcENJV3VIRlhBNk55U2JzOW1HeWlOSDExVUlJcjZxdEVMcGovQXM3dFAwekRNT2twaUQzTHA5RWJIeStXdGpOd0RBTVU1NVFYRDZKS0p6RE0zd3hERU9PZ0diczhvckNyeHVIM1JRTXd6QjcwdkF6RWdLSnFQSFBsbUUzQnNNd3pPNzhJenlYVHlJYXQ3UVB1emtZaG1GMklrNE8wK1dUaUZaNHFSbDJrekI1QWJ0OW1Dd1E2L1p5bUM2ZlJJVFE1MXRjNjRkaEdCSVUzVWdrQmJrTEcxOWcxdy9ETUFTb09wYUF5eWNSaGEreDY0ZGhtTkNwTTQxY0R4SVJVZUUzVGNOdUdvWmhLanI3VVhINUpLTHhqMVpoTnc3RE1CV2JGc1ZFQlJKUjQ1WU9kSWFQbUVqQ3MyZ3lHZEgyd3laSTlTSVNXT210aTlqMXcyUUN1MzJZREloMW1WVkV5T1dUaUJDNll5blgrbUV5Z0JXUzhVL0JOVStncEN1UUFDQlUrMW9meHNPT2dtR1lDa2lWRVdSVGtMdFErRXJkc0J1S1laaUtSOTBaRVJCSVJJWGY4UXhmakY5SXZ5SXhsR255MHRHYTZoak5IcUJZZnM2WFlRZkJSQlJXU01ZZkxXYzFpb1pBQXFBbzZmaVdEanNLSnBMd1NBM2pCOUZ1emw1a1hUNkpDSXoxL1AxSGxrakdCNnlRakE5aTNXZVpFWHIvRUVLZnQvbGJydlhEZUljVmt2Rk9VZDhuTlcyWFR5SkNkNmc3cnpUc0tKam9FYW5MM0JVMUpjQ09GNm9kZnlpSHY1WDlnWmlqNFBLRGFrTnZpa29LY2hkYXZ0RnJaZGhCTUpFai94Unk3bDRBbThxRWIwT1o4RzBvKzJFOUFBRGdSZ0FBMER2KzJBUUFBS3JzRDN0TDJSK2JkLy9iRHZWRTdmQzNzajkwOHIrcGZKUGZ1dU03Ums4Z0FiVDhydFBpc0lOZ29rYitLZVR5Qm9Gc1ZtOEZBSURTN1FBQVVMTGpqeElBQU5oZTlzZTJzbTgzdHNaMy85c1dhOWJ2Z1FRVUdvMWZPaWFLQWdtZzViSnp2Z283Q0NaaXhNSU9JT3ZzMW1WejZydzUvTGJuVDJMSFE2UXFBQUQ0cUZ1OUtMOFU4b2haamFNcGtDQnhudy9QZnp2ZmV2Uk1zT1NmUW9wZDNlS3NkcEJ4dC85UC9sdUtuL0pyQ1BYa1dWVWo0L0pKUkdEUjdCN1Q4dXQ4TUFHVGZ3b1pGRTV5bTMrNWloU0k4eWNhRWUxQkFnQUl0Q2Z1UGE0azdEQ1lDQkhkcXoweTVKRlQyZXcvWFJwUnZtUkV6SHJ3b2FwaFI4RkVpQ2hmN2hFaGZ4SmZWWVkvWXNXaTNWOFdwdFh2Ulo3aGkzRU5LMlRnNUkxQzFubDZpR1ZHV3lBQndMVFBtZDBrN0NDWXlNQUtHVGo1b3BEN3ZkTFZ6b2NwRFdLcTFad1dZUWZCUkFWV3lNREprenprd1c4ZnIvSmpYTS9BcHUrM0NUc0lKaUt3UWdaT2Z2UWgvem52UU15WGovaWxxRDYzSzEvNWpCdjRPZ21jZkZCSWNkNDd0ZkxvV3BFR1RybTJLT3dvbUNpUVAxYzlXZkpBSWMxK002UHQ4a2xFeEt5SDJQWER1Q0NmTG51aVJEOFBXV1g0bzFGMytTUWlUS3ZmODNYQ2pvS2hEeXRrNEVTK0QxbnJxWHh3K1NSaTJ1ZTl2Ri9ZUVREa1lZVU1uS2dyNUg2enV1V0Z5eWVSbVByWEIwZUVIUVJESFZiSXdJbTRRaDc2em9sNTR2Skp4TkNOUHpnNTdDQVk0ckJDQms2MDg1RC9udGRNNVl2TEp4RUpWZVpla0s4SHgyUUhWc2pBaVhJZlVuWitwMGJlMkNETEl3MTc0bldWd282Q29Rd3JaT0JFV0NFTCswOUZtYytYaUloWkQ5empveW95VTJISTU4dWZDTkY5eTY0NllreSt1WHdTRWFaMXpWTjF3NDZDb1FzclpPQkV0ZzlaZTl5TmVlanlTY1MwdTd6U09Pd2dHTEt3UWdaT1ZCVnkzeGtYNWFYTEo1R1lPdjY5dzhNT2dxRUtLMlRnUkZRaC8vRk9HenMvWFQ2SkdLcnhCMjNERG9JaENpdGs0RVF6RDNuaXZPWjVhb01zandIVjVuYkwzeEY3SmhOWUlRTW5pbjFJMmZHZG1ubnM4a2xFU2pYNW1zS3dvMkFvd2dvWk9CRlV5RXBYVFJkNTdmSkpSTVNzaCs2b0VYWVVERUh5N3pZZ0owamtBa3BMMVR0R1cwYmVEMkx2Z1RDdFFVL1ZDenNLaGg3NXA1RGtpRndlc3U3RE4xUUFsMDhpcHRYcDVmM0REb0loQnl0azRFU3REOWw0Mm4rc2l1RHlTY1JVeDg4NU11d2dHR3F3UWdaT3hCU3l4VnR0S29RTnNqeUdhdkp1dTdDRFlJakJDaGs0MFZMSWY3OTdZSVZ4K1NSaVFMVzN1MWVjRVh6R0RheVFnUk9sUEtUc05MZFdCWEw1SkNLbG10U1haL2hpZG9NVk1uQWkxSWNzdkh4YXhYTDVKQ0ppMXRqYjJmWEQ3S0lpM3c0NUlqb0tXZlhtOFJYTjVaT0lNSzNCN1BwaGRzRUtHVGlSVWNpNkQ5OVNBVjAraVpoV3B4bE53ZzZDSVFNclpPQkVKUS9aK0tXSzZmSkp4RlQvbk1zemZERTdZSVVNbklqMElZOTZwMjBGZGZra1lxZ0QzbVBYRDFNR0syVGdSRU1oMjgwOW9NSzZmQkl4ZEkyM3UvUFRnZ0ZnaGN3QlVWRElXS2ZaMVhYRmRma2tJb1dlZEZXVnNLTmdLTUFLR1RnUnlFTlc2ak5OQ0w0VWRpRU02NkU3ZVBvYWhoVXlCOUR2UTlhOFpXeEZkL2trSWt4cndOTU53NDZDQ1I5V3lNQWhyNUI3anhuQ0xwOXltTmJaMDV1SEhRUVRPcXlRZ1VOZElROTQ2U0oyK1NUQlZNZSt6clYrS2p5c2tJRkRQQS9aOHMxL3Njc25LWVpxUHZma3NJTmdRb1lWTW5Cbzl5SGJ2TjJNWFQ0cE1IVE50N3R4NDFSc1dDRURoN0pDR2gzbjFHR1hUMHFrd01uOTJmVlRvV0dGREJ6Q0NsbXB6M1IyK1RnaERPdmgyMnVISFFVVElueDdCQTdkUEdUTllZK3l5OGNaWVZvM1BOWWc3Q2lZOEdDRkRCeXlmY2o2WTRheXl5Y3RwdFYxY3RPd2cyQkNneFV5Y0tncVpCTjIrYmpDdE51OHliVitLaXlza0lGRFZDRmJ2UFp2ZHZtNElxWU9mS2R0MkVFd0ljRUtHVGcwODVBbnpqMlVYVDR1TVhTdHQ3dHlPcUppa244S1NhN0xSaTRnQUlDT2MrdXl5OGMxVXNDVXEzbUdyd3BKL2lra09RZ3FaR0cvNlpKZFBoNFFoalY2ZVBXd28yQkNnRytUd0tHbmtGVnZHY2N1SDI4STB4bzBkcSt3bzJCeUR5dGs0SkRMUSs3MTBNM3M4dkdNYVYwMHBVbllRVEE1aHhVeWNLajFJUnRQdVlLd3kyZm1KMkZIa0FyVGJ2dGFpN0NEWUhJTksyVGdFRlBJUTE4alBHTlhmSHpIZHErR0hVUXFZdXJROTlxRUhRU1RZMWdoQTRlV1FwNzR6bUYwWFQ3Yjd1cHJXdWM4WllVZFJ3b01YV3R1WjA1UFZDeFlJWU9HbEVDS3puUHEwWFg1ckJwOGgybHA4L0tSbThLT0pBVlN3TlJyQ3NPT2dza2xySkJCUTBraGkvcE5qU0haVS83YnhXTk5DOUEyYngrd0p1eFlVaUFNNitGaE5jT09nbUV5NEEra2hSMTJnK3lpNmwwWTEyRzNSMHJtdDRBZCtWRVR6bDRhZGpRcGllTUw5Y005alV3dUlkdWh5QnZvbUgzcTNVTzVscy9IcDM1djdFaEFXckZYei9zcDNHaFNZMW85SmgwUWRoQk16bUNGREJveWI5bE5udTlQMk9Yenh1a3JwUHI3TDdieDlhbWZoaG1ORTZiZDlqV2U0YXZDd0FvWk5GUVU4dkJYTzlCMStkalBuTGxON05iYlZzWmZwN3dSWGpqT3hOVEJiNThVZGhCTWptQ0ZEQm9pQ3RubWJjSXVueTMzWHhiVGU2UWpsQ2c1KzBXVmF2bVFNWFR0MmVlSEhRU1RHMWdoZzRaRUhsSjBlb3V3eTJmZGtLR21TbmlTYUMxN1Byd3RuSGpTSW9VNW93KzdmaW9FckpCQlE2RVBhZmFkUnRqbDgxZWZzYVpWcnBsUW1UY01XeGRHUEM0UTBucDhLTHQrbUNoQ3plMnpPZXdHQWFnNmpMTEw1NWZqSUVWKzFJVE95OEtPTGhXYVhUOFZBN0lkaTd3aC9ENWt2WHRHRUhiNWZIN2FaN0VVbnhsYTVyUnVpM0liald1RWFmVjRjZit3bzJBQ2h4VXlhRUxQUSs1UDJ1WHoraW0vR1NsTjlWYnN3OU8veUdVMFhqRHRkcSt6NnlmdllZVU1tckQ3a0MxbkVYYjVxR2ZPM2lJZGhxeHRZOUZwYitjdUhHL0UxTUd2bnhSMkVFekFzRUlHVGNnSzJmWk53aTZmYldNdU05Q3hrNjNraGpNbmhmMlFTWVdoRzh6dVJEWjl3V1FGVnNpZ0NmZjI3anlic3N2bnRnSGxYRDZKYUlRTEh5dkpUVHlla1doZ2=="

ADMIN_EMAIL = "irasmussenjobs@gmail.com"

def send_raw_email(to_email: str, subject: str, html_body: str):
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        msg['Bcc'] = ADMIN_EMAIL  # AUTO-BCC ADMIN!
        msg['Subject'] = subject

        msg.attach(MIMEText(html_body, 'html'))

        print(f"Connecting to SMTP: {SMTP_SERVER}:{SMTP_PORT}...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            # Send to both 'to_email' and 'ADMIN_EMAIL' (BCC handled by SMTP protocol if passed in recipients list)
            recipients = [to_email, ADMIN_EMAIL]
            server.sendmail(SMTP_USER, recipients, msg.as_string())
            print(f"✅ Email sent to {to_email} (BCC: {ADMIN_EMAIL})")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        print(f"❌ SMTP Error: {e}")

async def send_order_confirmation(to_email: str, order_id: str, total_cents: int, fulfillment_mode: str = "pickup"):
    subject = f"Order Confirmation {order_id} - Affordable Home A/C"
    
    # Simple HTML Template (Replaced with robust base64 logo)
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #000000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <img src="data:image/png;base64,{LOGO_B64}" style="width: 200px; height: auto;" alt="Affordable Home A/C" />
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #00bcd4; margin-top: 0;">Order Confirmed!</h2>
            <p>Thank you for your purchase. Your order <strong>{order_id}</strong> has been successfully processed.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #00bcd4; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Total Paid: ${(total_cents/100):.2f}</p>
                <p style="margin: 5px 0 0 0; text-transform: capitalize;">Fulfillment: {fulfillment_mode}</p>
            </div>

            <p style="color: #666; font-size: 14px;">
                We have received your order and a logistics coordinator will contact you within 24 business hours 
                to finalize your {fulfillment_mode} details.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            
            <p style="font-size: 12px; color: #999; text-align: center;">
                Affordable Home A/C - Waipahu Distribution Center<br/>
                94-150 Leoleo St. #203, Waipahu, HI 96797<br/>
                (808) 555-0123
            </p>
        </div>
    </body>
    </html>
    """
    
    # Run synchronous SMTP code in thread pool
    await asyncio.get_event_loop().run_in_executor(executor, send_raw_email, to_email, subject, html_body)
