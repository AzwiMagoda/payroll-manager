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

                string html = $"<body> <div style = 'color:blue;text-align:center;'><h2> Payslip </h2> <h4> Company Name </h4> <h6> Company Address </h6> </div> " +
                    $"<div style = 'margin: auto; width: 90%;'> <div style = 'float:left;'> <p> Employee Name: {payslip.Name} </p> <p> Identity Number: {payslip.IdentityNumber} </p> " +
                    $"<p> Gender: {payslip.Gender} </p> <p> Tax Number: {payslip.TaxNumber} </p> </div> <div style = 'float:left; margin-left: 20%'> <p> Job Title: {payslip.Jobtitle} <p> " +
                    $"Depatment: {payslip.Department} </p> <p> Pay Period: {DateTime.Today.Date.ToShortDateString()} </p> <p> Start Date: {payslip.StartDate.Date.ToShortDateString()} </p> </div> </div> </body>";

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
