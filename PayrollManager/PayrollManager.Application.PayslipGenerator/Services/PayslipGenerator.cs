using Firebase.Storage;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Payslips;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Services
{
    public class PayslipGenerator : IPayslipGenerator
    {
        private const string BASE_PATH = @".\temp";
        private readonly IPayslipsRepository _payslipsRepository;

        public PayslipGenerator(IPayslipsRepository payslipsRepository)
        {
            _payslipsRepository = payslipsRepository ?? throw new ArgumentNullException(nameof(payslipsRepository));
        }

        public async Task GeneratePayslipPdf(Payslip payslip)
        {
            try
            {
                var date = DateTime.Today.Date.ToString("ddMMMMyyyy");
                var fileName = $"{payslip.Id}_payslip_{date}";
                var pdfPath = @$"{BASE_PATH}\{fileName}.pdf";

                string html = $"<div style='font-family: Gill Sans, sans-serif'> <div style='margin: 0 auto; width: 90%; text-align: center'> <h2>Payslip</h2> <h4>{payslip.CompanyName}</h4> " +
                    $"<h6>{payslip.CompanyAddress}</h6> </div> <div style=' margin: 50px auto; width: 90%; border: 2px solid #b3adad; text-align: justify; display: flex; justify-content: space-between; " +
                    $"color: #5f5d5d; ' > <div style='display: inline-block; margin: 30px'> <div>Employee Name: {payslip.Name}</div> <div>Identity Number: {payslip.IdentityNumber}</div> " +
                    $"<div>Gender: {payslip.Gender}</div> <div>Tax Number: {payslip.TaxNumber}</div> </div> <div style='display: inline-block; margin: 30px'> <div>Job Title: {payslip.Jobtitle}</div> " +
                    $"<div>Department: {payslip.Department}</div> <div>Pay Period: {DateTime.Today.Date.ToShortDateString()}</div> <div>Start Date: {payslip.StartDate}</div> </div> </div> " +
                    $"<div style=' margin: 50px auto; width: 90%; text-align: justify; display: flex; justify-content: space-between; color: #5f5d5d !important; ' > <table style=' border: 2px solid #b3adad; " +
                    $"border-collapse: collapse; padding: 5px; width: 100%; ' > <thead> <tr> <th style=' border: 2px solid #b3adad; padding: 5px; background: #f0f0f0; color: #313030; ' > Earnings </th> " +
                    $"<th style=' border: 2px solid #b3adad; padding: 5px; background: #f0f0f0; color: #313030; ' > Amount </th> <th style=' border: 2px solid #b3adad; padding: 5px; background: #f0f0f0; " +
                    $"color: #313030; ' > Deductions </th> <th style=' border: 2px solid #b3adad; padding: 5px; background: #f0f0f0; color: #313030; ' > Amount </th> </tr> </thead> <tbody> <tr> " +
                    $"<td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > Basic Salary </td> <td style=' border: 2px solid #b3adad; " +
                    $"text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.MonthlyBaseSalary} </td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; " +
                    $"background: #ffffff; color: #0a0a0a; ' > Tax </td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.Tax} </td> " +
                    $"</tr> <tr> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > Retirement Contribution </td> <td style=' border: 2px solid #b3adad; " +
                    $"text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.RetirementContribution} </td> <td style=' border: 2px solid #b3adad; text-align: left; " +
                    $"padding: 5px; background: #ffffff; color: #0a0a0a; ' > Medical Aid </td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' >" +
                    $" {payslip.MedicalAid} </td> </tr> <tr> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > Life Insurance </td> <td style=' " +
                    $"border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.LifeInsurance} </td> <td style=' border: 2px solid #b3adad; text-align: left; " +
                    $"padding: 5px; background: #ffffff; color: #0a0a0a; ' ></td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' ></td> </tr> <tr> " +
                    $"<td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > &nbsp; </td> <td style=' border: 2px solid #b3adad; text-align: left; padding:" +
                    $" 5px; background: #ffffff; color: #0a0a0a; ' ></td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' ></td> <td style=' border:" +
                    $" 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' ></td> </tr> <tr> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px;" +
                    $" background: #ffffff; color: #0a0a0a; ' > Total Earnings: </td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' >" +
                    $" {payslip.TotalEarnings} </td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > Total Deductions: </td> <td style=' " +
                    $"border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.TotalDeductions} </td> </tr> <tr> <td style=' border: 2px solid #b3adad; " +
                    $"text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' ></td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; '" +
                    $" ></td> <td style=' border: 2px solid #b3adad; text-align: left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > Nett Pay: </td> <td style=' border: 2px solid #b3adad; text-align: " +
                    $"left; padding: 5px; background: #ffffff; color: #0a0a0a; ' > {payslip.NettPay} </td> </tr> </tbody> </table> </div> </div>";

                //Convert to pdf
                HtmlConverter.ConvertToPdf(html, new PdfWriter(pdfPath));

                //upload
                var url = await UploadPayslipToFirebase(pdfPath, fileName);
                //File.Delete(pdfPath);

                //write to db
                var payslipEntity = new PayslipsEntity
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    DownloadUrl = url,
                    EmployeeId = payslip.Id,
                    PayslipName = $"Payslip_{DateTime.Today.Date.ToString("dd_MMMM_yyyy")}",
                };

                await _payslipsRepository.Create(payslipEntity);

            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }
        }

        public async Task<string> UploadPayslipToFirebase(string filePath, string fileName)
        {
            var stream = File.Open(filePath, FileMode.Open);

            // Construct FirebaseStorage with path to where you want to upload the file and put it there
            var task = new FirebaseStorage("payroll-manager-a6c44.appspot.com")
             .Child("payslips")
             .Child(fileName)
             .PutAsync(stream);

            // Await the task to wait until upload is completed and get the download url
            var downloadUrl = await task;

            return downloadUrl;
        }
    }
}
